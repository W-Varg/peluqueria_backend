import { Reserva } from '../entities/reserva';

export interface IReservaRepository {
  crear(reserva: Reserva): Promise<Reserva>;
  buscarPorId(id: string): Promise<Reserva | null>;
  buscarPorCliente(idCliente: string): Promise<Reserva[]>;
  buscarPorFecha(fecha: Date): Promise<Reserva[]>;
  actualizar(reserva: Reserva): Promise<void>;
  eliminar(id: string): Promise<void>;
}
