import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { PrismaService } from 'src/infrastructure/persistence/prisma/prisma.service';

@Injectable()
export class EmpleadosService {
  constructor(private prisma: PrismaService) {}

  async create(createEmpleadoDto: CreateEmpleadoDto) {
    const usuario = await this.prisma.user.findUnique({
      where: { id: createEmpleadoDto.usuarioId },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const sucursal = await this.prisma.sucursal.findUnique({
      where: { id: createEmpleadoDto.sucursalId },
    });

    if (!sucursal) {
      throw new NotFoundException('Sucursal no encontrada');
    }

    const empleado = await this.prisma.empleado.create({
      data: createEmpleadoDto,
      include: {
        usuario: true,
        sucursal: true,
      },
    });

    return this.mapToResponseDto(empleado);
  }

  async findAll() {
    const empleados = await this.prisma.empleado.findMany({
      include: {
        usuario: true,
        sucursal: true,
      },
    });

    return empleados.map(this.mapToResponseDto);
  }

  async findOne(id: number) {
    const empleado = await this.prisma.empleado.findUnique({
      where: { id },
      include: {
        usuario: true,
        sucursal: true,
      },
    });

    if (!empleado) {
      throw new NotFoundException(`Empleado con ID ${id} no encontrado`);
    }

    return this.mapToResponseDto(empleado);
  }

  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto) {
    try {
      const empleado = await this.prisma.empleado.update({
        where: { id },
        data: updateEmpleadoDto,
        include: {
          usuario: true,
          sucursal: true,
        },
      });

      return this.mapToResponseDto(empleado);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Empleado con ID ${id} no encontrado`);
      }
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      // Verificar si hay reservas asociadas
      const reservas = await this.prisma.reserva.count({
        where: { empleadoId: id },
      });

      if (reservas > 0) {
        throw new Error('No se puede eliminar el empleado porque tiene reservas asociadas');
      }

      await this.prisma.empleado.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Empleado con ID ${id} no encontrado`);
      }
      throw error;
    }
  }

  private mapToResponseDto(empleado: any) {
    return {
      id: empleado.id,
      nombre: empleado.usuario.name,
      email: empleado.usuario.email,
      rol: empleado.usuario.rol,
      sucursalId: empleado.sucursalId,
      sucursalNombre: empleado.sucursal.nombre,
      createdAt: empleado.createdAt,
    };
  }
}
