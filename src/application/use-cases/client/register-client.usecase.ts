import { Injectable } from '@nestjs/common';
import { ClientAggregate } from '../../../domain/aggregates/client/client.aggregate';
import { IClientRepository } from '../../../domain/repositories/client.repository';
import { v4 as uuidv4 } from 'uuid';

export interface RegisterClientCommand {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface RegisterClientResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: Date;
}

@Injectable()
export class RegisterClientUseCase {
  constructor(private readonly clientRepository: IClientRepository) {}

  async execute(command: RegisterClientCommand): Promise<RegisterClientResponse> {
    // Verificar si ya existe un cliente con el mismo email
    const existingClient = await this.clientRepository.findByEmail(command.email);
    if (existingClient) {
      throw new Error('Ya existe un cliente registrado con este email');
    }

    // Crear el agregado de cliente
    const clientId = uuidv4();
    const client = ClientAggregate.create(
      clientId,
      command.firstName,
      command.lastName,
      command.email,
      command.phone,
    );

    // Persistir el cliente
    await this.clientRepository.save(client);

    // Retornar respuesta
    return {
      id: client.id,
      firstName: client.info.firstName,
      lastName: client.info.lastName,
      email: client.info.email,
      phone: client.info.phone,
      createdAt: client.createdAt,
    };
  }
}
