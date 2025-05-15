import { Servicio } from '../entities/servicio';

export interface IServicioRepository {
  crear(servicio: Servicio): Promise<Servicio>;
  buscarPorId(id: string): Promise<Servicio | null>;
  buscarTodos(): Promise<Servicio[]>;
  actualizar(servicio: Servicio): Promise<void>;
  eliminar(id: string): Promise<void>;
}
