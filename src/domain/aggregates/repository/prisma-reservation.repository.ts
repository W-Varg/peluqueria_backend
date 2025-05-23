import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/persistence/prisma/prisma.service';
import { IReservationRepository } from '../../interface/i-reservation.repository';
import { Reservation } from '../reservation/entities/reservation.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaReservationRepository implements IReservationRepository {
  constructor(private prisma: PrismaService) {}

  async create(reservation: Reservation): Promise<Reservation> {
    const createData: Prisma.ReservaUncheckedCreateInput = {
      fecha: reservation.fecha,
      hora: reservation.hora,
      clienteId: reservation.clienteId,
      empleadoId: reservation.empleadoId as number,
      servicioId: reservation.servicioId,
      estado: reservation.estado,
    };

    const created = await this.prisma.reserva.create({
      data: createData,
    });
    return new Reservation(created);
  }

  async findById(id: number): Promise<Reservation | null> {
    const reservation = await this.prisma.reserva.findUnique({
      where: { id },
    });
    return reservation ? new Reservation(reservation) : null;
  }

  async findByClientId(clientId: number): Promise<Reservation[]> {
    const reservations = await this.prisma.reserva.findMany({
      where: { clienteId: clientId },
    });
    return reservations.map((r) => new Reservation(r));
  }

  async findByEmployeeId(employeeId: number): Promise<Reservation[]> {
    const reservations = await this.prisma.reserva.findMany({
      where: { empleadoId: employeeId },
    });
    return reservations.map((r) => new Reservation(r));
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Reservation[]> {
    const reservations = await this.prisma.reserva.findMany({
      where: {
        fecha: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
    return reservations.map((r) => new Reservation(r));
  }

  async update(id: number, reservation: Partial<Reservation>): Promise<Reservation> {
    const updateData: Prisma.ReservaUncheckedUpdateInput = {
      fecha: reservation.fecha,
      hora: reservation.hora,
      clienteId: reservation.clienteId,
      empleadoId: reservation.empleadoId as number | undefined,
      servicioId: reservation.servicioId,
      estado: reservation.estado,
    };

    const updated = await this.prisma.reserva.update({
      where: { id },
      data: updateData,
    });
    return new Reservation(updated);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.reserva.delete({
      where: { id },
    });
  }
}
