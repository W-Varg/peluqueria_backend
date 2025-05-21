import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Cliente } from '../entities/cliente';
import { CreateClienteDto } from '../dto/create-cliente.dto';
import { PrismaService } from '../../database/prisma.service';
import { PreferenciasCliente } from '../value-objects/preferencias-cliente';
import { Prisma } from '@prisma/client';

type PrismaClienteWithRelations = Prisma.ClienteGetPayload<{
  include: {
    usuario: true;
  };
}>;

@Injectable()
export class ClienteService {
  constructor(private prisma: PrismaService) {}

  private mapToEntity(data: PrismaClienteWithRelations): Cliente {
    const preferencias = PreferenciasCliente.create({
      horario: [],
      estilista: [],
      servicios: [],
    });

    const props = {
      nombre: data.usuario.name,
      telefono: data.telefono || '',
      email: data.usuario.email,
      usuarioId: data.usuario.id,
      preferencias: preferencias,
      estado: data.estado,
      visitas: data.visitasTotal,
      ultimaVisita: data.ultimaVisita,
    };

    return Cliente.create(props, data.id.toString());
  }

  async create(dto: CreateClienteDto): Promise<Cliente> {
    try {
      // Verificar si ya existe un usuario con ese email
      const existingUser = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (existingUser) {
        throw new BadRequestException('Ya existe un usuario con ese email');
      }

      const cliente = await this.prisma.cliente.create({
        data: {
          telefono: dto.telefono,
          usuario: {
            create: {
              email: dto.email,
              name: dto.nombre,
              password: '', // Temporal password, should be handled by auth service
              rol: 'CLIENTE',
            },
          },
        },
        include: {
          usuario: true,
        },
      });

      return this.mapToEntity(cliente);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(
        `Error al crear el cliente: ${error instanceof Error ? error.message : 'Error desconocido'}`,
      );
    }
  }

  async findAll(): Promise<Cliente[]> {
    try {
      const clientes = await this.prisma.cliente.findMany({
        include: {
          usuario: true,
          reservas: {
            orderBy: {
              fecha: 'desc',
            },
            take: 1,
          },
        },
      });

      return clientes.map((cliente) => this.mapToEntity(cliente));
    } catch {
      throw new BadRequestException('Error al obtener los clientes');
    }
  }

  async findOne(id: string): Promise<Cliente> {
    try {
      const cliente = await this.prisma.cliente.findUnique({
        where: { id: parseInt(id) },
        include: {
          usuario: true,
          reservas: {
            orderBy: {
              fecha: 'desc',
            },
            take: 1,
          },
        },
      });

      if (!cliente) {
        throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
      }

      return this.mapToEntity(cliente);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error al obtener el cliente');
    }
  }

  async update(id: string, dto: CreateClienteDto): Promise<Cliente> {
    try {
      // Verificar si existe el cliente
      await this.findOne(id);

      // Verificar si el nuevo email ya está en uso por otro usuario
      if (dto.email) {
        const existingUser = await this.prisma.user.findFirst({
          where: {
            email: dto.email,
            cliente: {
              id: {
                not: parseInt(id),
              },
            },
          },
        });

        if (existingUser) {
          throw new BadRequestException('El email ya está en uso por otro usuario');
        }
      }

      const cliente = await this.prisma.cliente.update({
        where: { id: parseInt(id) },
        data: {
          telefono: dto.telefono,
          usuario: {
            update: {
              email: dto.email,
              name: dto.nombre,
            },
          },
        },
        include: {
          usuario: true,
        },
      });

      return this.mapToEntity(cliente);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(
        `Error al actualizar el cliente: ${error instanceof Error ? error.message : 'Error desconocido'}`,
      );
    }
  }

  async remove(id: string): Promise<void> {
    try {
      // Verificar si existe el cliente
      await this.findOne(id);

      await this.prisma.cliente.delete({
        where: { id: parseInt(id) },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error al eliminar el cliente');
    }
  }
}
