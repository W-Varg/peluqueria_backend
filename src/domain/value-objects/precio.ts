export class Precio {
  constructor(
    private readonly _monto: number,
    private readonly _moneda: string = 'BOB',
  ) {
    this.validarMonto(_monto);
  }

  private validarMonto(monto: number): void {
    if (monto < 0) {
      throw new Error('El monto no puede ser negativo');
    }
  }

  get monto(): number {
    return this._monto;
  }

  get moneda(): string {
    return this._moneda;
  }

  equals(other: Precio): boolean {
    return this.monto === other.monto && this.moneda === other.moneda;
  }

  toString(): string {
    return `${this.monto} ${this.moneda}`;
  }
}
