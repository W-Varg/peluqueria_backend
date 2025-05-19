import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ServicioRepository } from '../../domain/repository/servicio.repository';
import { CreateServicioDto } from '../dtos/servicio/create-servicio.dto';
import { Servicio } from '../../domain/entities/servicio';
import { Duracion } from '../../domain/value-objects/duracion';
import { Precio } from '../../domain/value-objects/precio';
import { SERVICIO_REPOSITORY } from '../../domain/repository/servicio.repository.token';

@Injectable()
export class ServicioService {
  constructor(
    @Inject(SERVICIO_REPOSITORY)
    private readonly servicioRepository: ServicioRepository,
  ) {}

  async create(dto: CreateServicioDto): Promise<Servicio> {
    const servicio = Servicio.create(
      '0', // ID temporal, será reemplazado por la base de datos
      dto.nombre,
      new Duracion(dto.duracion),
      new Precio(dto.precio),
      dto.descripcion,
    );

    return this.servicioRepository.create(servicio);
  }

  async findAll(): Promise<Servicio[]> {
    return this.servicioRepository.findAll();
  }

  async findById(id: string): Promise<Servicio> {
    const servicio = await this.servicioRepository.findById(id);
    if (!servicio) {
      throw new NotFoundException(`Servicio con ID ${id} no encontrado`);
    }
    return servicio;
  }

  async update(id: string, dto: CreateServicioDto): Promise<Servicio> {
    await this.findById(id); // Verifica que existe

    const servicio = Servicio.create(
      id,
      dto.nombre,
      new Duracion(dto.duracion),
      new Precio(dto.precio),
      dto.descripcion,
    );

    return this.servicioRepository.update(id, servicio);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id); // Verifica que existe
    await this.servicioRepository.delete(id);
  }
}
