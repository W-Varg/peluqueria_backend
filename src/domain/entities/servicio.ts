import { Duracion } from '../value-objects/duracion';
import { Precio } from '../value-objects/precio';

export class Servicio {
  private constructor(
    private readonly id: string,
    private nombre: string,
    private duracion: Duracion,
    private precio: Precio,
    private descripcion: string,
  ) {}

  static create(props: Omit<Servicio, 'id'>, id: string): Servicio {
    return new Servicio(id, props.Nombre, props.Duracion, props.Precio, props.Descripcion);
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

  get Duracion(): Duracion {
    return this.duracion;
  }

  set Duracion(duracion: Duracion) {
    this.duracion = duracion;
  }

  get Precio(): Precio {
    return this.precio;
  }

  set Precio(precio: Precio) {
    this.precio = precio;
  }

  get Descripcion(): string {
    return this.descripcion;
  }

  set Descripcion(descripcion: string) {
    this.descripcion = descripcion;
  }
}
