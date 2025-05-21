import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Reserva } from '../domain/entities/reserva';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { EstadoReserva } from '../domain/value-objects/estado-reserva';
import { Cliente } from '../domain/entities/cliente';
import { Servicio } from '../domain/entities/servicio';
import { PreferenciasCliente } from '../domain/value-objects/preferencias-cliente';
import { Duracion } from '../domain/value-objects/duracion';
import { Precio } from '../domain/value-objects/precio';
import { Horario } from '../domain/value-objects/horario';
import { Prisma } from '@prisma/client';
import { EmployeeAssignmentService } from '../domain/services/employee-assignment.service';

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
  constructor(
    private prisma: PrismaService,
    private employeeAssignmentService: EmployeeAssignmentService,
  ) {}

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

  private convertToDate(fecha: Date, horaStr: string): Date {
    const [hours, minutes] = horaStr.split(':').map(Number);
    return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), hours, minutes);
  }

  async create(createReservaDto: CreateReservaDto) {
    // Si no se proporciona empleadoId, buscar uno disponible
    if (!createReservaDto.empleadoId) {
      const hora = this.convertToDate(createReservaDto.fecha, createReservaDto.horaInicio);
      const empleadoId = await this.employeeAssignmentService.findAvailableEmployee(
        createReservaDto.fecha,
        hora,
        createReservaDto.servicioId,
      );

      if (!empleadoId) {
        throw new NotFoundException('No hay empleados disponibles para este horario');
      }

      createReservaDto.empleadoId = empleadoId;
    }

    const hora = this.convertToDate(createReservaDto.fecha, createReservaDto.horaInicio);

    return this.prisma.reserva.create({
      data: {
        fecha: createReservaDto.fecha,
        hora,
        clienteId: createReservaDto.clienteId,
        empleadoId: createReservaDto.empleadoId,
        servicioId: createReservaDto.servicioId,
        estado: createReservaDto.estado,
      },
      include: {
        cliente: true,
        empleado: true,
        servicio: true,
      },
    });
  }

  async findAll() {
    return this.prisma.reserva.findMany({
      include: {
        cliente: true,
        empleado: true,
        servicio: true,
      },
    });
  }

  async findOne(id: string) {
    const reserva = await this.prisma.reserva.findUnique({
      where: { id: parseInt(id) },
      include: {
        cliente: true,
        empleado: true,
        servicio: true,
      },
    });

    if (!reserva) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada`);
    }

    return reserva;
  }

  async update(id: string, updateReservaDto: UpdateReservaDto) {
    const reserva = await this.findOne(id);

    // Si se está actualizando la fecha/hora y no hay empleado asignado, buscar uno disponible
    if ((updateReservaDto.fecha || updateReservaDto.horaInicio) && !updateReservaDto.empleadoId) {
      const hora = updateReservaDto.horaInicio
        ? this.convertToDate(updateReservaDto.fecha || reserva.fecha, updateReservaDto.horaInicio)
        : reserva.hora;

      const empleadoId = await this.employeeAssignmentService.findAvailableEmployee(
        updateReservaDto.fecha || reserva.fecha,
        hora,
        updateReservaDto.servicioId || reserva.servicioId,
      );

      if (!empleadoId) {
        throw new NotFoundException('No hay empleados disponibles para este horario');
      }

      updateReservaDto.empleadoId = empleadoId;
    }

    const hora = updateReservaDto.horaInicio
      ? this.convertToDate(updateReservaDto.fecha || reserva.fecha, updateReservaDto.horaInicio)
      : undefined;

    return this.prisma.reserva.update({
      where: { id: parseInt(id) },
      data: {
        fecha: updateReservaDto.fecha,
        hora,
        clienteId: updateReservaDto.clienteId,
        empleadoId: updateReservaDto.empleadoId,
        servicioId: updateReservaDto.servicioId,
        estado: updateReservaDto.estado,
      },
      include: {
        cliente: true,
        empleado: true,
        servicio: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id); // Verificar si existe
    return this.prisma.reserva.delete({
      where: { id: parseInt(id) },
    });
  }
}
