export class Precio {
  private constructor(
    private readonly monto: number,
    private readonly moneda: string,
  ) {}

  static create(monto: number, moneda: string): Precio {
    if (monto <= 0) {
      throw new Error('El monto debe ser mayor a 0');
    }
    return new Precio(monto, moneda);
  }

  get Monto(): number {
    return this.monto;
  }

  get Moneda(): string {
    return this.moneda;
  }
}
