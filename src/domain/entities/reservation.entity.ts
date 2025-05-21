import { EstadoReserva } from '@prisma/client';

export class Reservation {
  id: number;
  fecha: Date;
  hora: Date;
  clienteId: number;
  empleadoId: number | null;
  servicioId: number;
  estado: EstadoReserva;

  constructor(data: Partial<Reservation>) {
    Object.assign(this, data);
  }

  public isValidReservationTime(): boolean {
    const now = new Date();
    return this.fecha >= now;
  }

  public canBeCancelled(): boolean {
    return this.estado === EstadoReserva.PENDIENTE || this.estado === EstadoReserva.CONFIRMADA;
  }

  public cancel(): void {
    if (!this.canBeCancelled()) {
      throw new Error('La reserva no puede ser cancelada en su estado actual');
    }
    this.estado = EstadoReserva.CANCELADA;
  }

  public confirm(): void {
    if (this.estado !== EstadoReserva.PENDIENTE) {
      throw new Error('Solo se pueden confirmar reservas pendientes');
    }
    if (!this.empleadoId) {
      throw new Error('No se puede confirmar una reserva sin empleado asignado');
    }
    this.estado = EstadoReserva.CONFIRMADA;
  }

  public complete(): void {
    if (this.estado !== EstadoReserva.CONFIRMADA) {
      throw new Error('Solo se pueden completar reservas confirmadas');
    }
    this.estado = EstadoReserva.COMPLETADA;
  }

  public assignEmployee(empleadoId: number): void {
    this.empleadoId = empleadoId;
  }
}
