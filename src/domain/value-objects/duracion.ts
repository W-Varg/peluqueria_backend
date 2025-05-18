export class Duracion {
  constructor(private readonly _minutos: number) {
    this.validarDuracion(_minutos);
  }

  private validarDuracion(minutos: number): void {
    if (minutos <= 0) {
      throw new Error('La duración debe ser mayor a 0 minutos');
    }
  }

  get minutos(): number {
    return this._minutos;
  }

  equals(other: Duracion): boolean {
    return this.minutos === other.minutos;
  }

  toString(): string {
    const horas = Math.floor(this.minutos / 60);
    const minutosRestantes = this.minutos % 60;

    if (horas > 0) {
      return `${horas}h ${minutosRestantes}min`;
    }
    return `${minutosRestantes}min`;
  }
}
