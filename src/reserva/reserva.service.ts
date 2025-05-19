import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Reserva } from '../domain/entities/reserva';
import { CreateReservaDto } from '../domain/dto/create-reserva.dto';
import { UpdateReservaDto } from '../domain/dto/update-reserva.dto';
import { EstadoReserva } from '../domain/value-objects/estado-reserva';
import { Cliente } from '../domain/entities/cliente';
import { Servicio } from '../domain/entities/servicio';
import { PreferenciasCliente } from '../domain/value-objects/preferencias-cliente';
import { Duracion } from '../domain/value-objects/duracion';
import { Precio } from '../domain/value-objects/precio';
import { Horario } from '../domain/value-objects/horario';
import { Prisma } from '@prisma/client';

type PrismaReservaWithRelations = Prisma.ReservaGetPayload<{
  include: {
    cliente: {
      include: {
        usuario: true;
      };
    };
    servicio: true;
    empleado: {
      include: {
        usuario: true;
      };
    };
  };
}>;

@Injectable()
export class ReservaService {
  constructor(private prisma: PrismaService) {}

  private mapReservaToEntity(reserva: PrismaReservaWithRelations): Reserva {
    // Create Cliente entity
    const clienteProps = {
      nombre: reserva.cliente.usuario.name,
      telefono: reserva.cliente.telefono || '',
      email: reserva.cliente.usuario.email,
      preferencias: PreferenciasCliente.create({
        horario: [],
        estilista: [],
        servicios: [],
      }),
      id: reserva.cliente.id.toString(),
    };
    const cliente = Cliente.create(clienteProps, reserva.cliente.id.toString());

    // Create Servicio entity
    const servicio = Servicio.create(
      reserva.servicio.id.toString(),
      reserva.servicio.nombre,
      new Duracion(reserva.servicio.duracion),
      new Precio(reserva.servicio.precio),
      reserva.servicio.descripcion,
    );

    // Create Horario value object
    const horaInicio = new Date(reserva.hora);
    const horaFin = new Date(horaInicio.getTime() + reserva.servicio.duracion * 60000);
    const horario = Horario.create(
      reserva.fecha,
      `${horaInicio.getHours().toString().padStart(2, '0')}:${horaInicio.getMinutes().toString().padStart(2, '0')}`,
      `${horaFin.getHours().toString().padStart(2, '0')}:${horaFin.getMinutes().toString().padStart(2, '0')}`,
    );

    // Create Reserva entity
    return Reserva.create(
      {
        cliente: cliente,
        servicio: servicio,
        horario: horario,
        estado: reserva.estado as EstadoReserva,
      },
      reserva.id.toString(),
    );
  }

  async create(dto: CreateReservaDto): Promise<Reserva> {
    try {
      // Validar disponibilidad del horario
      await this.validarDisponibilidad(dto);

      const horaInicio = new Date(
        dto.fecha.getFullYear(),
        dto.fecha.getMonth(),
        dto.fecha.getDate(),
        parseInt(dto.horaInicio.split(':')[0]),
        parseInt(dto.horaInicio.split(':')[1]),
      );

      const reserva = await this.prisma.reserva.create({
        data: {
          fecha: dto.fecha,
          hora: horaInicio,
          clienteId: parseInt(dto.clienteId),
          empleadoId: parseInt(dto.empleadoId),
          servicioId: parseInt(dto.servicioId),
          estado: dto.estado || EstadoReserva.PENDIENTE,
        },
        include: {
          cliente: {
            include: { usuario: true },
          },
          empleado: {
            include: { usuario: true },
          },
          servicio: true,
        },
      });

      return this.mapReservaToEntity(reserva);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(
        `Error al crear la reserva: ${error instanceof Error ? error.message : 'Error desconocido'}`,
      );
    }
  }

  async findAll(): Promise<Reserva[]> {
    try {
      const reservas = await this.prisma.reserva.findMany({
        include: {
          cliente: {
            include: { usuario: true },
          },
          empleado: {
            include: { usuario: true },
          },
          servicio: true,
        },
      });

      return reservas.map((reserva) => this.mapReservaToEntity(reserva));
    } catch {
      throw new BadRequestException('Error al obtener las reservas');
    }
  }

  async findOne(id: string): Promise<Reserva> {
    try {
      const reserva = await this.prisma.reserva.findUnique({
        where: { id: parseInt(id) },
        include: {
          cliente: {
            include: { usuario: true },
          },
          empleado: {
            include: { usuario: true },
          },
          servicio: true,
        },
      });

      if (!reserva) {
        throw new NotFoundException(`Reserva con ID ${id} no encontrada`);
      }

      return this.mapReservaToEntity(reserva);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error al obtener la reserva');
    }
  }

  async update(id: string, dto: UpdateReservaDto): Promise<Reserva> {
    try {
      // Verificar si existe la reserva
      await this.findOne(id);

      // Validar disponibilidad del nuevo horario
      if (dto.fecha && dto.horaInicio) {
        await this.validarDisponibilidad(dto, parseInt(id));
      }

      const horaInicio =
        dto.fecha && dto.horaInicio
          ? new Date(
              dto.fecha.getFullYear(),
              dto.fecha.getMonth(),
              dto.fecha.getDate(),
              parseInt(dto.horaInicio.split(':')[0]),
              parseInt(dto.horaInicio.split(':')[1]),
            )
          : undefined;

      const reserva = await this.prisma.reserva.update({
        where: { id: parseInt(id) },
        data: {
          fecha: dto.fecha,
          hora: horaInicio,
          clienteId: dto.clienteId ? parseInt(dto.clienteId) : undefined,
          empleadoId: dto.empleadoId ? parseInt(dto.empleadoId) : undefined,
          servicioId: dto.servicioId ? parseInt(dto.servicioId) : undefined,
          estado: dto.estado,
        },
        include: {
          cliente: {
            include: { usuario: true },
          },
          empleado: {
            include: { usuario: true },
          },
          servicio: true,
        },
      });

      return this.mapReservaToEntity(reserva);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error al actualizar la reserva');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id); // Verificar si existe
      await this.prisma.reserva.delete({
        where: { id: parseInt(id) },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error al eliminar la reserva');
    }
  }

  private async validarDisponibilidad(
    dto: CreateReservaDto | UpdateReservaDto,
    excludeReservaId?: number,
  ): Promise<void> {
    if (!dto.fecha || !dto.horaInicio || !dto.empleadoId || !dto.servicioId) {
      throw new BadRequestException('Faltan datos requeridos para validar la disponibilidad');
    }

    const horaInicio = new Date(
      dto.fecha.getFullYear(),
      dto.fecha.getMonth(),
      dto.fecha.getDate(),
      parseInt(dto.horaInicio.split(':')[0]),
      parseInt(dto.horaInicio.split(':')[1]),
    );

    // Obtener el servicio para conocer su duración
    const servicio = await this.prisma.servicio.findUnique({
      where: { id: parseInt(dto.servicioId) },
    });

    if (!servicio) {
      throw new BadRequestException('Servicio no encontrado');
    }

    const horaFin = new Date(horaInicio.getTime() + servicio.duracion * 60000);

    // Buscar reservas que se superpongan
    const reservasSuperpuestas = await this.prisma.reserva.findMany({
      where: {
        AND: [
          { empleadoId: parseInt(dto.empleadoId) },
          { fecha: dto.fecha },
          {
            OR: [
              {
                AND: [
                  { hora: { lte: horaInicio } },
                  {
                    hora: {
                      gt: new Date(horaInicio.getTime() - servicio.duracion * 60000),
                    },
                  },
                ],
              },
              {
                AND: [{ hora: { gte: horaInicio } }, { hora: { lt: horaFin } }],
              },
            ],
          },
          { id: { not: excludeReservaId } },
        ],
      },
    });

    if (reservasSuperpuestas.length > 0) {
      throw new BadRequestException('El horario seleccionado no está disponible');
    }
  }
}
