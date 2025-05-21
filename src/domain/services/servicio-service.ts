import { Servicio } from '../entities/servicio';
import { IServicioRepository } from '../repository/i-servicio-repository';

export class ServicioService {
  constructor(private readonly servicioRepository: IServicioRepository) {}

  async crearServicio(servicio: Servicio): Promise<Servicio> {
    return await this.servicioRepository.crear(servicio);
  }

  async obtenerServicio(id: string): Promise<Servicio | null> {
    return await this.servicioRepository.buscarPorId(id);
  }

  async actualizarServicio(servicio: Servicio): Promise<void> {
    await this.servicioRepository.actualizar(servicio);
  }

  async eliminarServicio(id: string): Promise<void> {
    await this.servicioRepository.eliminar(id);
  }

  async listarServicios(): Promise<Servicio[]> {
    return await this.servicioRepository.buscarTodos();
  }
}
