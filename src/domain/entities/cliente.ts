import { PreferenciasCliente } from '../value-objects/preferencias-cliente';

export class Cliente {
  private constructor(
    private readonly _id: string,
    private _nombre: string,
    private _telefono: string,
    private _email: string,
    private _usuarioId: number,
    private _preferencias: PreferenciasCliente,
    private _estado: boolean,
    private _visitas: number,
    private _ultimaVisita: Date | null,
  ) {}

  static create(
    props: {
      nombre: string;
      telefono: string;
      email: string;
      usuarioId: number;
      preferencias: PreferenciasCliente;
      estado: boolean;
      visitas: number;
      ultimaVisita: Date | null;
    },
    id: string,
  ): Cliente {
    return new Cliente(
      id,
      props.nombre,
      props.telefono,
      props.email,
      props.usuarioId,
      props.preferencias,
      props.estado,
      props.visitas,
      props.ultimaVisita,
    );
  }

  get id(): string {
    return this._id;
  }

  get nombre(): string {
    return this._nombre;
  }

  set nombre(nombre: string) {
    this._nombre = nombre;
  }

  get telefono(): string {
    return this._telefono;
  }

  set telefono(telefono: string) {
    this._telefono = telefono;
  }

  get email(): string {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  get preferencias(): PreferenciasCliente {
    return this._preferencias;
  }

  set preferencias(preferencias: PreferenciasCliente) {
    this._preferencias = preferencias;
  }

  get estado(): boolean {
    return this._estado;
  }

  get visitas(): number {
    return this._visitas;
  }

  get ultimaVisita(): Date | null {
    return this._ultimaVisita;
  }
}
