import { Cliente } from '../entities/cliente';
import { IClienteRepository } from '../repository/i-cliente-repository';

export class ClienteService {
  constructor(private readonly clienteRepository: IClienteRepository) {}

  async crearCliente(cliente: Cliente): Promise<Cliente> {
    return await this.clienteRepository.crear(cliente);
  }

  async obtenerCliente(id: string): Promise<Cliente | null> {
    return await this.clienteRepository.buscarPorId(id);
  }

  async actualizarCliente(cliente: Cliente): Promise<void> {
    await this.clienteRepository.actualizar(cliente);
  }

  async eliminarCliente(id: string): Promise<void> {
    await this.clienteRepository.eliminar(id);
  }

  async listarClientes(): Promise<Cliente[]> {
    return await this.clienteRepository.buscarTodos();
  }
}
