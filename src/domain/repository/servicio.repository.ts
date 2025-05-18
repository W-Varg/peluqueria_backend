import { Servicio } from '../entities/servicio';

export interface ServicioRepository {
  create(servicio: Servicio): Promise<Servicio>;
  findAll(): Promise<Servicio[]>;
  findById(id: string): Promise<Servicio | null>;
  update(id: string, servicio: Servicio): Promise<Servicio>;
  delete(id: string): Promise<void>;
}
