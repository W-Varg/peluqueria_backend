import { Reserva } from '../entities/reserva';
import { IReservaRepository } from '../repository/i-reserva-repository';

export class ReservaService {
  constructor(private readonly reservaRepository: IReservaRepository) {}

  async crearReserva(reserva: Reserva): Promise<Reserva> {
    return await this.reservaRepository.crear(reserva);
  }

  async obtenerReserva(id: string): Promise<Reserva | null> {
    return await this.reservaRepository.buscarPorId(id);
  }

  async obtenerReservasPorCliente(idCliente: string): Promise<Reserva[]> {
    return await this.reservaRepository.buscarPorCliente(idCliente);
  }

  async obtenerReservasPorFecha(fecha: Date): Promise<Reserva[]> {
    return await this.reservaRepository.buscarPorFecha(fecha);
  }

  async actualizarReserva(reserva: Reserva): Promise<void> {
    await this.reservaRepository.actualizar(reserva);
  }

  async eliminarReserva(id: string): Promise<void> {
    await this.reservaRepository.eliminar(id);
  }
}
