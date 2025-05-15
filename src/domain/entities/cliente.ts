import { PreferenciasCliente } from '../value-objects/preferencias-cliente';

export class Cliente {
  private constructor(
    private readonly id: string,
    private nombre: string,
    private telefono: string,
    private email: string,
    private preferencias: PreferenciasCliente,
  ) {}

  static create(props: Omit<Cliente, 'id'>, id: string): Cliente {
    return new Cliente(id, props.Nombre, props.Telefono, props.Email, props.Preferencias);
  }

  get Id(): string {
    return this.id;
  }

  get Nombre(): string {
    return this.nombre;
  }

  set Nombre(nombre: string) {
    this.nombre = nombre;
  }

  get Telefono(): string {
    return this.telefono;
  }

  set Telefono(telefono: string) {
    this.telefono = telefono;
  }

  get Email(): string {
    return this.email;
  }

  set Email(email: string) {
    this.email = email;
  }

  get Preferencias(): PreferenciasCliente {
    return this.preferencias;
  }

  set Preferencias(preferencias: PreferenciasCliente) {
    this.preferencias = preferencias;
  }
}
