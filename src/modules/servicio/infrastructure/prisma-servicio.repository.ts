import { Injectable } from '@nestjs/common';
import { IServicioRepository } from '../domain/servicio.repository';
import { Servicio } from '../domain/servicio.entity';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PrismaServicioRepository implements IServicioRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: number): Promise<Servicio> {
    const servicioData = await this.prisma.servicio.findUnique({
      where: { id },
      include: {
        productos: {
          include: {
            producto: true,
          },
        },
      },
    });

    if (!servicioData) {
      throw new Error('Servicio no encontrado');
    }

    return new Servicio(
      servicioData.nombre,
      servicioData.descripcion,
      servicioData.duracion,
      servicioData.precio,
      servicioData.productos,
      servicioData.id,
    );
  }

  async findAll(): Promise<Servicio[]> {
    const servicios = await this.prisma.servicio.findMany({
      include: {
        productos: {
          include: {
            producto: true,
          },
        },
      },
    });

    return servicios.map(
      (s) => new Servicio(s.nombre, s.descripcion, s.duracion, s.precio, s.productos, s.id),
    );
  }

  async save(servicio: Servicio): Promise<void> {
    await this.prisma.servicio.create({
      data: {
        nombre: servicio.getNombre(),
        descripcion: servicio.getDescripcion(),
        duracion: servicio.getDuracion(),
        precio: servicio.getPrecio(),
        productos: {
          create: servicio.getProductos().map((p) => ({
            productoId: p.productoId,
            cantidad: p.cantidad,
          })),
        },
      },
    });
  }

  async update(servicio: Servicio): Promise<void> {
    const id = servicio.getId();
    if (!id) {
      throw new Error('No se puede actualizar un servicio sin ID');
    }

    await this.prisma.servicio.update({
      where: { id },
      data: {
        nombre: servicio.getNombre(),
        descripcion: servicio.getDescripcion(),
        duracion: servicio.getDuracion(),
        precio: servicio.getPrecio(),
        productos: {
          deleteMany: {},
          create: servicio.getProductos().map((p) => ({
            productoId: p.productoId,
            cantidad: p.cantidad,
          })),
        },
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.servicio.delete({
      where: { id },
    });
  }

  async verificarDisponibilidad(id: number): Promise<boolean> {
    const servicio = await this.prisma.servicio.findUnique({
      where: { id },
      include: {
        productos: {
          include: {
            producto: true,
          },
        },
      },
    });

    if (!servicio) {
      throw new Error('Servicio no encontrado');
    }

    // Verificar que todos los productos tengan stock suficiente
    return servicio.productos.every((sp) => sp.producto.stock >= sp.cantidad);
  }
}
