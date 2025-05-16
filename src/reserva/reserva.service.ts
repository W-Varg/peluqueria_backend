import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Reserva } from '../domain/entities/reserva';
import { CreateReservaDto } from '../domain/dto/create-reserva.dto';
import { EstadoReserva } from '../domain/value-objects/estado-reserva';

@Injectable()
export class ReservaService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateReservaDto): Promise<Reserva> {
    const reserva = await this.prisma.reserva.create({
      data: {
        fecha: dto.fecha,
        hora: new Date(
          dto.fecha.getFullYear(),
          dto.fecha.getMonth(),
          dto.fecha.getDate(),
          parseInt(dto.horaInicio.split(':')[0]),
          parseInt(dto.horaInicio.split(':')[1]),
        ),
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

    return new Reserva({
      id: reserva.id.toString(),
      cliente: new Cliente({
        id: reserva.cliente.id.toString(),
        nombre: reserva.cliente.usuario.name,
        telefono: reserva.cliente.telefono,
        email: reserva.cliente.usuario.email,
        preferencias: new PreferenciasCliente({
          horario: [],
          estilista: [],
          servicios: [],
        }),
      }),
      servicio: new Servicio({
        id: reserva.servicio.id.toString(),
        nombre: reserva.servicio.nombre,
        duracion: new Duracion(reserva.servicio.duracion),
        precio: new Precio(reserva.servicio.precio, 'USD'),
        descripcion: reserva.servicio.descripcion,
      }),
      horario: new Horario(reserva.fecha, dto.horaInicio, dto.horaFin),
      estado: reserva.estado,
    });
  }

  async findAll(): Promise<Reserva[]> {
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

    return reservas.map(
      (reserva) =>
        new Reserva({
          id: reserva.id.toString(),
          cliente: new Cliente({
            id: reserva.cliente.id.toString(),
            nombre: reserva.cliente.usuario.name,
            telefono: reserva.cliente.telefono,
            email: reserva.cliente.usuario.email,
            preferencias: new PreferenciasCliente({
              horario: [],
              estilista: [],
              servicios: [],
            }),
          }),
          servicio: new Servicio({
            id: reserva.servicio.id.toString(),
            nombre: reserva.servicio.nombre,
            duracion: new Duracion(reserva.servicio.duracion),
            precio: new Precio(reserva.servicio.precio, 'USD'),
            descripcion: reserva.servicio.descripcion,
          }),
          horario: new Horario(
            reserva.fecha,
            new Date(reserva.hora).getHours() + ':' + new Date(reserva.hora).getMinutes(),
            new Date(reserva.hora).getHours() + ':' + new Date(reserva.hora).getMinutes() + 1,
          ),
          estado: reserva.estado,
        }),
    );
  }

  async findOne(id: string): Promise<Reserva> {
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
      throw new Error('Reserva no encontrada');
    }

    return new Reserva({
      id: reserva.id.toString(),
      cliente: new Cliente({
        id: reserva.cliente.id.toString(),
        nombre: reserva.cliente.usuario.name,
        telefono: reserva.cliente.telefono,
        email: reserva.cliente.usuario.email,
        preferencias: new PreferenciasCliente({
          horario: [],
          estilista: [],
          servicios: [],
        }),
      }),
      servicio: new Servicio({
        id: reserva.servicio.id.toString(),
        nombre: reserva.servicio.nombre,
        duracion: new Duracion(reserva.servicio.duracion),
        precio: new Precio(reserva.servicio.precio, 'USD'),
        descripcion: reserva.servicio.descripcion,
      }),
      horario: new Horario(
        reserva.fecha,
        new Date(reserva.hora).getHours() + ':' + new Date(reserva.hora).getMinutes(),
        new Date(reserva.hora).getHours() + ':' + new Date(reserva.hora).getMinutes() + 1,
      ),
      estado: reserva.estado,
    });
  }

  async update(id: string, dto: CreateReservaDto): Promise<Reserva> {
    const reserva = await this.prisma.reserva.update({
      where: { id: parseInt(id) },
      data: {
        fecha: dto.fecha,
        hora: new Date(
          dto.fecha.getFullYear(),
          dto.fecha.getMonth(),
          dto.fecha.getDate(),
          parseInt(dto.horaInicio.split(':')[0]),
          parseInt(dto.horaInicio.split(':')[1]),
        ),
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

    return new Reserva({
      id: reserva.id.toString(),
      cliente: new Cliente({
        id: reserva.cliente.id.toString(),
        nombre: reserva.cliente.usuario.name,
        telefono: reserva.cliente.telefono,
        email: reserva.cliente.usuario.email,
        preferencias: new PreferenciasCliente({
          horario: [],
          estilista: [],
          servicios: [],
        }),
      }),
      servicio: new Servicio({
        id: reserva.servicio.id.toString(),
        nombre: reserva.servicio.nombre,
        duracion: new Duracion(reserva.servicio.duracion),
        precio: new Precio(reserva.servicio.precio, 'USD'),
        descripcion: reserva.servicio.descripcion,
      }),
      horario: new Horario(reserva.fecha, dto.horaInicio, dto.horaFin),
      estado: reserva.estado,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.reserva.delete({
      where: { id: parseInt(id) },
    });
  }
}
