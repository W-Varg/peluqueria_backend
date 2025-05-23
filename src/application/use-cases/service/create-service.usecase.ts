import { Injectable } from '@nestjs/common';
import { ServiceAggregate } from '../../../domain/aggregates/service/service.aggregate';
import { IServiceRepository } from '../../../domain/repositories/service.repository';
import { v4 as uuidv4 } from 'uuid';

export interface CreateServiceCommand {
  name: string;
  description: string;
  durationInMinutes: number;
  price: number;
}

export interface CreateServiceResponse {
  id: string;
  name: string;
  description: string;
  duration: {
    minutes: number;
    formatted: string;
  };
  price: number;
  isActive: boolean;
  createdAt: Date;
}

@Injectable()
export class CreateServiceUseCase {
  constructor(private readonly serviceRepository: IServiceRepository) {}

  async execute(command: CreateServiceCommand): Promise<CreateServiceResponse> {
    // Verificar si ya existe un servicio con el mismo nombre
    const existingService = await this.serviceRepository.findByName(command.name);
    if (existingService) {
      throw new Error('Ya existe un servicio con este nombre');
    }

    // Crear el agregado de servicio
    const serviceId = uuidv4();
    const service = ServiceAggregate.create(
      serviceId,
      command.name,
      command.description,
      command.durationInMinutes,
      command.price,
    );

    // Persistir el servicio
    await this.serviceRepository.save(service);

    // Retornar respuesta
    return {
      id: service.id,
      name: service.name,
      description: service.description,
      duration: {
        minutes: service.getDurationInMinutes(),
        formatted: service.getDurationFormatted(),
      },
      price: service.price,
      isActive: service.isActive,
      createdAt: service.createdAt,
    };
  }
} 