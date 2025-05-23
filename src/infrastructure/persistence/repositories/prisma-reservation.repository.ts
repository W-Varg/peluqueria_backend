import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaReservationRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    fecha: Date;
    hora: Date;
    clienteId: number;
    servicioId: number;
    empleadoId: number;
  }) {
    return this.prisma.reserva.create({
      data: {
        fecha: data.fecha,
        hora: data.hora,
        clienteId: data.clienteId,
        servicioId: data.servicioId,
        empleadoId: data.empleadoId,
        estado: 'PENDIENTE',
      },
    });
  }

  async findById(id: number) {
    return this.prisma.reserva.findUnique({
      where: { id },
      include: {
        cliente: true,
        servicio: true,
        empleado: true,
      },
    });
  }

  async findByDateRange(startDate: Date, endDate: Date) {
    return this.prisma.reserva.findMany({
      where: {
        fecha: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        cliente: true,
        servicio: true,
        empleado: true,
      },
    });
  }

  async findByClientId(clienteId: number) {
    return this.prisma.reserva.findMany({
      where: { clienteId },
      include: {
        servicio: true,
        empleado: true,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.reserva.delete({
      where: { id },
    });
  }
}
