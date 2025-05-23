import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ServicioRepository } from '../interface/servicio.repository';
import { CreateServicioDto } from '../../application/dto/create-servicio.dto';
import { Servicio } from '../aggregates/service/entities/servicio';
import { Duracion } from '../value-objects/duracion';
import { Precio } from '../value-objects/precio';
import { SERVICE_REPOSITORY } from '../interface/servicio.repository.token';

@Injectable()
export class ServicioService {
  constructor(
    @Inject(SERVICE_REPOSITORY)
    private readonly servicioRepository: ServicioRepository,
  ) {}

  async create(dto: CreateServicioDto): Promise<Servicio> {
    const servicio = Servicio.create(
      0, // ID temporal, será reemplazado por la base de datos
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

  async findById(id: number): Promise<Servicio> {
    const servicio = await this.servicioRepository.findById(id);
    if (!servicio) {
      throw new NotFoundException(`Servicio con ID ${id} no encontrado`);
    }
    return servicio;
  }

  async update(id: number, dto: CreateServicioDto): Promise<Servicio> {
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

  async delete(id: number): Promise<void> {
    await this.findById(id); // Verifica que existe
    await this.servicioRepository.delete(id);
  }
}
