import { PreferenciasCliente } from '../value-objects/preferencias-cliente';

export class Cliente {
  private constructor(
    private readonly _id: string,
    private _nombre: string,
    private _telefono: string,
    private _email: string,
    private _usuarioId: number,
    private _preferencias: PreferenciasCliente,
  ) {}

  static create(
    props: {
      nombre: string;
      telefono: string;
      email: string;
      usuarioId: number;
      preferencias: PreferenciasCliente;
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
}
