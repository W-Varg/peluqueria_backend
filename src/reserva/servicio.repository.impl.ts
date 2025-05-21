import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ServicioRepository } from '../domain/repository/servicio.repository';
import { Servicio } from '../domain/entities/servicio';
import { Duracion } from '../domain/value-objects/duracion';
import { Precio } from '../domain/value-objects/precio';

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
      id: created.id.toString(),
      nombre: created.nombre,
      duracion: created.duracion,
      precio: created.precio,
      descripcion: created.descripcion,
    });
  }

  async findAll(): Promise<Servicio[]> {
    const servicios = await this.prisma.servicio.findMany();
    return servicios.map((servicio) =>
      Servicio.fromPrimitives({
        id: servicio.id.toString(),
        nombre: servicio.nombre,
        duracion: servicio.duracion,
        precio: servicio.precio,
        descripcion: servicio.descripcion,
      }),
    );
  }

  async findById(id: string): Promise<Servicio | null> {
    const servicio = await this.prisma.servicio.findUnique({
      where: { id: parseInt(id) },
    });

    if (!servicio) {
      return null;
    }

    return Servicio.fromPrimitives({
      id: servicio.id.toString(),
      nombre: servicio.nombre,
      duracion: servicio.duracion,
      precio: servicio.precio,
      descripcion: servicio.descripcion,
    });
  }

  async update(id: string, servicio: Servicio): Promise<Servicio> {
    const data = servicio.toPrimitives();
    const updated = await this.prisma.servicio.update({
      where: { id: parseInt(id) },
      data: {
        nombre: data.nombre,
        duracion: data.duracion,
        precio: data.precio,
        descripcion: data.descripcion,
      },
    });

    return Servicio.fromPrimitives({
      id: updated.id.toString(),
      nombre: updated.nombre,
      duracion: updated.duracion,
      precio: updated.precio,
      descripcion: updated.descripcion,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.servicio.delete({
      where: { id: parseInt(id) },
    });
  }
}
