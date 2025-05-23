import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/persistence/prisma/prisma.service';
import { ServicioRepository } from '../../domain/interface/servicio.repository';
import { Servicio } from '../../domain/aggregates/service/entities/servicio';

@Injectable()
export class PrismaServicioRepository implements ServicioRepository {
  constructor(private prisma: PrismaService) {}

  async create(servicio: Servicio): Promise<Servicio> {
    const data = servicio.toPrimitives();
    const created = await this.prisma.servicio.create({
      data: {
        nombre: data.nombre,
        duracion: data.duracion,
        precio: data.precio,
        descripcion: data.descripcion,
      },
    });

    return Servicio.fromPrimitives({
      id: created.id,
      nombre: created.nombre,
      duracion: created.duracion,
      precio: created.precio,
      descripcion: created.descripcion,
      estado: created.estado ?? true,
    });
  }

  async findAll(): Promise<Servicio[]> {
    const servicios = await this.prisma.servicio.findMany();
    return servicios.map((servicio) =>
      Servicio.fromPrimitives({
        id: servicio.id,
        nombre: servicio.nombre,
        duracion: servicio.duracion,
        precio: servicio.precio,
        descripcion: servicio.descripcion,
        estado: servicio.estado,
      }),
    );
  }

  async findById(id: number): Promise<Servicio | null> {
    const servicio = await this.prisma.servicio.findUnique({
      where: { id: id },
    });

    if (!servicio) {
      return null;
    }

    return Servicio.fromPrimitives({
      id: servicio.id,
      nombre: servicio.nombre,
      duracion: servicio.duracion,
      precio: servicio.precio,
      descripcion: servicio.descripcion,
      estado: servicio.estado,
    });
  }

  async update(id: number, servicio: Servicio): Promise<Servicio> {
    const data = servicio.toPrimitives();
    const updated = await this.prisma.servicio.update({
      where: { id: id },
      data: {
        nombre: data.nombre,
        duracion: data.duracion,
        precio: data.precio,
        descripcion: data.descripcion,
      },
    });

    return Servicio.fromPrimitives({
      id: updated.id,
      nombre: updated.nombre,
      duracion: updated.duracion,
      precio: updated.precio,
      descripcion: updated.descripcion,
      estado: updated.estado ?? true,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.servicio.delete({
      where: { id: id },
    });
  }
}
