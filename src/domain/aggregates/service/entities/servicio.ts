import { Duracion } from '../../../value-objects/duracion';
import { Precio } from '../../../value-objects/precio';

export class Servicio {
  constructor(
    private readonly _id: number,
    private _nombre: string,
    private _duracion: Duracion,
    private _precio: Precio,
    private _descripcion: string,
    private _estado: boolean,
  ) {
    this.validarNombre(_nombre);
    this.validarDescripcion(_descripcion);
  }

  private validarNombre(nombre: string): void {
    if (!nombre || nombre.trim().length === 0) {
      throw new Error('El nombre no puede estar vacío');
    }
    if (nombre.length > 100) {
      throw new Error('El nombre no puede tener más de 100 caracteres');
    }
  }

  private validarDescripcion(descripcion: string): void {
    if (!descripcion || descripcion.trim().length === 0) {
      throw new Error('La descripción no puede estar vacía');
    }
    if (descripcion.length > 500) {
      throw new Error('La descripción no puede tener más de 500 caracteres');
    }
  }

  // Getters
  get id(): number {
    return this._id;
  }

  get nombre(): string {
    return this._nombre;
  }

  get duracion(): Duracion {
    return this._duracion;
  }

  get precio(): Precio {
    return this._precio;
  }

  get descripcion(): string {
    return this._descripcion;
  }

  get estado(): boolean {
    return this._estado;
  }

  // Setters con validación
  set nombre(nombre: string) {
    this.validarNombre(nombre);
    this._nombre = nombre;
  }

  set duracion(duracion: Duracion) {
    this._duracion = duracion;
  }

  set precio(precio: Precio) {
    this._precio = precio;
  }

  set descripcion(descripcion: string) {
    this.validarDescripcion(descripcion);
    this._descripcion = descripcion;
  }

  // Factory method
  static create(
    id: number,
    nombre: string,
    duracion: Duracion,
    precio: Precio,
    descripcion: string,
    estado = true,
  ): Servicio {
    return new Servicio(id, nombre, duracion, precio, descripcion, estado);
  }

  // Método para crear desde datos primitivos
  static fromPrimitives(data: {
    id: number;
    nombre: string;
    duracion: number;
    precio: number;
    descripcion: string;
    estado: boolean;
  }): Servicio {
    return new Servicio(
      data.id,
      data.nombre,
      new Duracion(data.duracion),
      new Precio(data.precio),
      data.descripcion,
      data.estado,
    );
  }

  // Método para convertir a primitivos (útil para persistencia)
  toPrimitives() {
    return {
      id: this._id,
      nombre: this._nombre,
      duracion: this._duracion.minutos,
      precio: this._precio.monto,
      descripcion: this._descripcion,
    };
  }
}
