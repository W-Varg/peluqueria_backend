import { EstadoReserva } from '../../../domain/value-objects/estado-reserva';
import { Horario } from '../../../domain/value-objects/horario';
import { Cliente } from '../../../domain/aggregates/client/entities/cliente';
import { Servicio } from '../../../domain/aggregates/service/entities/servicio';

interface ReservaProps {
  cliente: Cliente;
  servicio: Servicio;
  horario: Horario;
  estado: EstadoReserva;
}

export class Reserva {
  private constructor(
    private readonly _id: string,
    private _cliente: Cliente,
    private _servicio: Servicio,
    private _horario: Horario,
    private _estado: EstadoReserva,
  ) {}

  static create(props: ReservaProps, id: string): Reserva {
    return new Reserva(id, props.cliente, props.servicio, props.horario, props.estado);
  }

  get id(): string {
    return this._id;
  }

  get cliente(): Cliente {
    return this._cliente;
  }

  get servicio(): Servicio {
    return this._servicio;
  }

  get horario(): Horario {
    return this._horario;
  }

  get estado(): EstadoReserva {
    return this._estado;
  }

  cancelar(): void {
    if (this._estado === EstadoReserva.CANCELADA) {
      throw new Error('La reserva ya está cancelada');
    }
    this._estado = EstadoReserva.CANCELADA;
  }

  confirmar(): void {
    if (this._estado !== EstadoReserva.PENDIENTE) {
      throw new Error('Solo se pueden confirmar reservas pendientes');
    }
    this._estado = EstadoReserva.CONFIRMADA;
  }
}
