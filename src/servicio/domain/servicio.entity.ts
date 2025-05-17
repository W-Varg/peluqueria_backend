import { AggregateRoot } from '@nestjs/cqrs';

export interface ServicioProducto {
  productoId: number;
  cantidad: number;
}

export class Servicio extends AggregateRoot {
  constructor(
    private readonly nombre: string,
    private readonly descripcion: string,
    private readonly duracion: number,
    private precio: number,
    private productos: ServicioProducto[] = [],
    private readonly id: number | null = null,
  ) {
    super();
  }

  // Getters
  getId(): number | null {
    return this.id;
  }

  getNombre(): string {
    return this.nombre;
  }

  getDescripcion(): string {
    return this.descripcion;
  }

  getDuracion(): number {
    return this.duracion;
  }

  getPrecio(): number {
    return this.precio;
  }

  getProductos(): ServicioProducto[] {
    return [...this.productos];
  }

  // Domain methods
  actualizarPrecio(nuevoPrecio: number): void {
    if (nuevoPrecio <= 0) {
      throw new Error('El precio debe ser mayor a 0');
    }
    this.precio = nuevoPrecio;
    // Aquí podrías emitir un evento de dominio
    // this.apply(new ServicioPrecioActualizado(this.id, nuevoPrecio));
  }

  agregarProducto(producto: ServicioProducto): void {
    this.productos.push(producto);
    // this.apply(new ProductoAgregadoAServicio(this.id, producto));
  }

  verificarDisponibilidadProductos(): boolean {
    // Lógica para verificar si hay stock suficiente de todos los productos
    return this.productos.every((producto) => producto.cantidad > 0);
  }

  calcularPrecioTotal(): number {
    // Podría incluir lógica adicional como descuentos
    return this.precio;
  }
}
