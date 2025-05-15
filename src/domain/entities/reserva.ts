import { EstadoReserva } from '../value-objects/estado-reserva';
import { Horario } from '../value-objects/horario';
import { Cliente } from './cliente';
import { Servicio } from './servicio';

export class Reserva {
  private constructor(
    private readonly id: string,
    private cliente: Cliente,
    private servicio: Servicio,
    private horario: Horario,
    private estado: EstadoReserva,
  ) {}

  static create(props: Omit<Reserva, 'id'>, id: string): Reserva {
    return new Reserva(id, props.Cliente, props.Servicio, props.Horario, props.Estado);
  }

  get Id(): string {
    return this.id;
  }

  get Cliente(): Cliente {
    return this.cliente;
  }

  get Servicio(): Servicio {
    return this.servicio;
  }

  get Horario(): Horario {
    return this.horario;
  }

  get Estado(): EstadoReserva {
    return this.estado;
  }

  cancelar(): void {
    if (this.estado === EstadoReserva.CANCELADA) {
      throw new Error('La reserva ya está cancelada');
    }
    this.estado = EstadoReserva.CANCELADA;
  }

  confirmar(): void {
    if (this.estado !== EstadoReserva.PENDIENTE) {
      throw new Error('Solo se pueden confirmar reservas pendientes');
    }
    this.estado = EstadoReserva.CONFIRMADA;
  }
}
