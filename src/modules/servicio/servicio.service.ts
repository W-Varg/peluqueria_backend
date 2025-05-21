import { Injectable, NotFoundException } from '@nestjs/common';
import { Servicio } from '../../domain/entities/servicio';
import { Duracion } from '../../domain/value-objects/duracion';
import { Precio } from '../../domain/value-objects/precio';
import { PrismaService } from '../../database/prisma.service';
import { CreateServicioDto } from './interface/dto/create-servicio.dto';

@Injectable()
export class ServicioService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateServicioDto): Promise<Servicio> {
    const servicio = await this.prisma.servicio.create({
      data: {
        nombre: dto.nombre,
        duracion: dto.duracion,
        precio: dto.precio,
        descripcion: dto.descripcion,
      },
    });

    return Servicio.create(
      servicio.id.toString(),
      servicio.nombre,
      new Duracion(servicio.duracion),
      new Precio(servicio.precio),
      servicio.descripcion,
    );
  }

  async findAll(): Promise<Servicio[]> {
    const servicios = await this.prisma.servicio.findMany();
    return servicios.map((servicio) =>
      Servicio.create(
        servicio.id.toString(),
        servicio.nombre,
        new Duracion(servicio.duracion),
        new Precio(servicio.precio),
        servicio.descripcion,
      ),
    );
  }

  async findOne(id: string): Promise<Servicio> {
    const servicio = await this.prisma.servicio.findUnique({
      where: { id: parseInt(id) },
    });

    if (!servicio) {
      throw new NotFoundException(`Servicio con ID ${id} no encontrado`);
    }

    return Servicio.create(
      servicio.id.toString(),
      servicio.nombre,
      new Duracion(servicio.duracion),
      new Precio(servicio.precio),
      servicio.descripcion,
    );
  }

  async update(id: string, dto: CreateServicioDto): Promise<Servicio> {
    const servicio = await this.prisma.servicio.update({
      where: { id: parseInt(id) },
      data: {
        nombre: dto.nombre,
        duracion: dto.duracion,
        precio: dto.precio,
        descripcion: dto.descripcion,
      },
    });

    return Servicio.create(
      servicio.id.toString(),
      servicio.nombre,
      new Duracion(servicio.duracion),
      new Precio(servicio.precio),
      servicio.descripcion,
    );
  }

  async remove(id: string): Promise<void> {
    await this.prisma.servicio.delete({
      where: { id: parseInt(id) },
    });
  }
}
