import { Servicio } from '../aggregates/service/entities/servicio';

export interface ServicioRepository {
  create(servicio: Servicio): Promise<Servicio>;
  findAll(): Promise<Servicio[]>;
  findById(id: number): Promise<Servicio | null>;
  update(id: number, servicio: Servicio): Promise<Servicio>;
  delete(id: number): Promise<void>;
}
