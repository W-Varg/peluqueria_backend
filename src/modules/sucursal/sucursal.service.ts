import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSucursalDto, UpdateSucursalDto } from './dto/input.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class SucursalesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSucursalDto: CreateSucursalDto) {
    const result = await this.prisma.sucursal.create({
      data: createSucursalDto,
    });

    return result;
  }

  async findAll() {
    return this.prisma.sucursal.findMany();
  }

  async findOne(id: number) {
    const sucursal = await this.prisma.sucursal.findUnique({
      where: { id },
    });

    if (!sucursal) {
      throw new NotFoundException(`Sucursal con ID ${id} no encontrada`);
    }

    return sucursal;
  }

  async update(id: number, updateSucursalDto: UpdateSucursalDto) {
    try {
      return await this.prisma.sucursal.update({
        where: { id },
        data: updateSucursalDto,
      });
    } catch (error) {
      throw new NotFoundException(`Sucursal con ID ${id} no encontrada`);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      // Verificar si hay empleados asociados
      const empleados = await this.prisma.empleado.count({
        where: { sucursalId: id },
      });

      if (empleados > 0) {
        throw new Error('No se puede eliminar la sucursal porque tiene empleados asociados');
      }

      await this.prisma.sucursal.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Sucursal con ID ${id} no encontrada`);
      }
      throw error;
    }
  }

  async getEmpleadosBySucursal(id: number) {
    const sucursal = await this.prisma.sucursal.findUnique({
      where: { id },
      include: {
        empleados: {
          include: {
            usuario: true,
          },
        },
      },
    });

    if (!sucursal) {
      throw new NotFoundException(`Sucursal con ID ${id} no encontrada`);
    }

    return sucursal.empleados.map((empleado) => ({
      id: empleado.id,
      nombre: empleado.usuario.name,
      email: empleado.usuario.email,
    }));
  }
}
