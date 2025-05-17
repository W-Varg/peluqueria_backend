import { Injectable } from '@nestjs/common';
import { Servicio } from '../domain/entities/servicio';
import { Duracion } from 'src/domain/value-objects/duracion';
import { Precio } from 'src/domain/value-objects/precio';
import { PrismaService } from 'src/database/prisma.service';
import { CreateServicioDto } from './interface/dto/create-servicio.dto';

@Injectable()
export class ServicioService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateServicioDto): Promise<Servicio> {
    const servicio = await this.prisma.servicio.create({
      data: {
        nombre: dto.nombre,
        duracion: dto.duracion,
        precio: dto.precio.monto,
        descripcion: dto.descripcion,
      },
    });

    return Servicio.create({
      id: servicio.id.toString(),
      nombre: servicio.nombre,
      duracion: servicio.duracion,
      precio: {
        monto: servicio.precio,
        moneda: 'USD',
      },
      descripcion: servicio.descripcion,
    });
  }

  async findAll(): Promise<Servicio[]> {
    const servicios = await this.prisma.servicio.findMany();
    return servicios.map((servicio) =>
      Servicio.create({
        id: servicio.id.toString(),
        nombre: servicio.nombre,
        duracion: servicio.duracion,
        precio: {
          monto: servicio.precio,
          moneda: 'USD',
        },
        descripcion: servicio.descripcion,
      }),
    );
  }

  async findOne(id: string): Promise<Servicio> {
    const servicio = await this.prisma.servicio.findUnique({
      where: { id: parseInt(id) },
    });

    if (!servicio) {
      throw new Error('Servicio no encontrado');
    }

    return Servicio.create({
      id: servicio.id.toString(),
      nombre: servicio.nombre,
      duracion: servicio.duracion,
      precio: {
        monto: servicio.precio,
        moneda: 'USD',
      },
      descripcion: servicio.descripcion,
    });
  }

  async update(id: string, dto: CreateServicioDto): Promise<Servicio> {
    const servicio = await this.prisma.servicio.update({
      where: { id: parseInt(id) },
      data: {
        nombre: dto.nombre,
        duracion: dto.duracion,
        precio: dto.precio.monto,
        descripcion: dto.descripcion,
      },
    });

    return Servicio.create({
      id: servicio.id.toString(),
      nombre: servicio.nombre,
      duracion: servicio.duracion,
      precio: {
        monto: servicio.precio,
        moneda: 'USD',
      },
      descripcion: servicio.descripcion,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.servicio.delete({
      where: { id: parseInt(id) },
    });
  }
}
