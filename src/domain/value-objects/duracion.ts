export class Duracion {
  private constructor(private readonly minutos: number) {}

  static create(minutos: number): Duracion {
    if (minutos <= 0) {
      throw new Error('La duración debe ser mayor a 0 minutos');
    }
    return new Duracion(minutos);
  }

  get Minutos(): number {
    return this.minutos;
  }
}
