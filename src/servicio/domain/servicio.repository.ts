import { Servicio } from './servicio.entity';

export interface IServicioRepository {
  findById(id: number): Promise<Servicio>;
  findAll(): Promise<Servicio[]>;
  save(servicio: Servicio): Promise<void>;
  update(servicio: Servicio): Promise<void>;
  delete(id: number): Promise<void>;
  verificarDisponibilidad(id: number): Promise<boolean>;
}
