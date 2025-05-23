import { Cliente } from '../aggregates/client/entities/cliente';

export interface IClienteRepository {
  crear(cliente: Cliente): Promise<Cliente>;
  buscarPorId(id: string): Promise<Cliente | null>;
  buscarTodos(): Promise<Cliente[]>;
  actualizar(cliente: Cliente): Promise<void>;
  eliminar(id: string): Promise<void>;
}
