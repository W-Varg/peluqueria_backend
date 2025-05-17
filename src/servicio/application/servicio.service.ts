import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { IServicioRepository } from '../domain/servicio.repository';
import { Servicio } from '../domain/servicio.entity';
import { CreateServicioDto } from '../interface/dto/create-servicio.dto';
import { UpdateServicioDto } from '../interface/dto/update-servicio.dto';

@Injectable()
export class ServicioService {
  constructor(
    @Inject('IServicioRepository')
    private servicioRepository: IServicioRepository,
  ) {}

  async findAll(): Promise<Servicio[]> {
    try {
      return await this.servicioRepository.findAll();
    } catch {
      throw new BadRequestException('Error al obtener los servicios');
    }
  }

  async findById(id: number): Promise<Servicio> {
    try {
      const servicio = await this.servicioRepository.findById(id);
      if (!servicio) {
        throw new NotFoundException(`Servicio con ID ${id} no encontrado`);
      }
      return servicio;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error al obtener el servicio');
    }
  }

  async create(createServicioDto: CreateServicioDto): Promise<void> {
    try {
      const servicio = new Servicio(
        createServicioDto.nombre,
        createServicioDto.descripcion,
        createServicioDto.duracion,
        createServicioDto.precio,
        createServicioDto.productos,
      );
      await this.servicioRepository.save(servicio);
    } catch {
      throw new BadRequestException('Error al crear el servicio');
    }
  }

  async update(id: number, updateServicioDto: UpdateServicioDto): Promise<void> {
    try {
      const servicioExistente = await this.findById(id);
      const servicio = new Servicio(
        updateServicioDto.nombre || servicioExistente.getNombre(),
        updateServicioDto.descripcion || servicioExistente.getDescripcion(),
        updateServicioDto.duracion || servicioExistente.getDuracion(),
        updateServicioDto.precio || servicioExistente.getPrecio(),
        updateServicioDto.productos || servicioExistente.getProductos(),
        id,
      );
      await this.servicioRepository.update(servicio);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error al actualizar el servicio');
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.findById(id);
      await this.servicioRepository.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error al eliminar el servicio');
    }
  }

  async verificarDisponibilidad(id: number): Promise<boolean> {
    try {
      await this.findById(id);
      return await this.servicioRepository.verificarDisponibilidad(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error al verificar la disponibilidad del servicio');
    }
  }

  async actualizarPrecio(id: number, nuevoPrecio: number): Promise<void> {
    try {
      const servicio = await this.findById(id);
      servicio.actualizarPrecio(nuevoPrecio);
      await this.servicioRepository.update(servicio);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error al actualizar el precio del servicio');
    }
  }
}
