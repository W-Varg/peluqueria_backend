import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaClientRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: { usuarioId: number; telefono?: string }) {
    return this.prisma.cliente.create({
      data: {
        usuarioId: data.usuarioId,
        telefono: data.telefono,
      },
      include: {
        usuario: true,
        reservas: true,
      },
    });
  }

  async findById(id: number) {
    return this.prisma.cliente.findUnique({
      where: { id },
      include: {
        usuario: true,
        reservas: {
          include: {
            servicio: true,
            empleado: true,
          },
        },
      },
    });
  }

  async findByUsuarioId(usuarioId: number) {
    return this.prisma.cliente.findUnique({
      where: { usuarioId },
      include: {
        usuario: true,
        reservas: true,
      },
    });
  }

  async findAll() {
    return this.prisma.cliente.findMany({
      include: {
        usuario: true,
        reservas: {
          include: {
            servicio: true,
          },
        },
      },
    });
  }

  async findActive() {
    return this.prisma.cliente.findMany({
      where: {
        estado: true,
      },
      include: {
        usuario: true,
        reservas: true,
      },
    });
  }

  async update(
    id: number,
    data: {
      telefono?: string;
      estado?: boolean;
      visitasTotal?: number;
      ultimaVisita?: Date;
    },
  ) {
    return this.prisma.cliente.update({
      where: { id },
      data,
      include: {
        usuario: true,
        reservas: true,
      },
    });
  }

  async incrementVisitas(id: number) {
    return this.prisma.cliente.update({
      where: { id },
      data: {
        visitasTotal: { increment: 1 },
        ultimaVisita: new Date(),
      },
    });
  }

  async delete(id: number) {
    return this.prisma.cliente.delete({
      where: { id },
    });
  }
}
