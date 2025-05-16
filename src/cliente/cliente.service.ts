import { Injectable } from '@nestjs/common';
import { Cliente } from '../domain/entities/cliente';
import { CreateClienteDto } from '../domain/dto/create-cliente.dto';
import { PrismaService } from 'src/database/database.service';

@Injectable()
export class ClienteService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateClienteDto): Promise<Cliente> {
    const cliente = await this.prisma.cliente.create({
      data: {
        nombre: dto.nombre,
        telefono: dto.telefono,
        email: dto.email,
        preferencias: dto.preferencias,
        usuario: {
          create: {
            email: dto.email,
            name: dto.nombre,
            rol: 'CLIENTE',
          },
        },
      },
      include: {
        usuario: true,
      },
    });

    return new Cliente({
      id: cliente.id.toString(),
      nombre: cliente.nombre,
      telefono: cliente.telefono,
      email: cliente.email,
      preferencias: cliente.preferencias,
    });
  }

  async findAll(): Promise<Cliente[]> {
    const clientes = await this.prisma.cliente.findMany({
      include: {
        usuario: true,
      },
    });

    return clientes.map(
      (cliente) =>
        new Cliente({
          id: cliente.id.toString(),
          nombre: cliente.nombre,
          telefono: cliente.telefono,
          email: cliente.email,
          preferencias: cliente.preferencias,
        }),
    );
  }

  async findOne(id: string): Promise<Cliente> {
    const cliente = await this.prisma.cliente.findUnique({
      where: { id: parseInt(id) },
      include: {
        usuario: true,
      },
    });

    if (!cliente) {
      throw new Error('Cliente no encontrado');
    }

    return new Cliente({
      id: cliente.id.toString(),
      nombre: cliente.nombre,
      telefono: cliente.telefono,
      email: cliente.email,
      preferencias: cliente.preferencias,
    });
  }

  async update(id: string, dto: CreateClienteDto): Promise<Cliente> {
    const cliente = await this.prisma.cliente.update({
      where: { id: parseInt(id) },
      data: {
        nombre: dto.nombre,
        telefono: dto.telefono,
        email: dto.email,
        preferencias: dto.preferencias,
      },
      include: {
        usuario: true,
      },
    });

    return new Cliente({
      id: cliente.id.toString(),
      nombre: cliente.nombre,
      telefono: cliente.telefono,
      email: cliente.email,
      preferencias: cliente.preferencias,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.cliente.delete({
      where: { id: parseInt(id) },
    });
  }
}
