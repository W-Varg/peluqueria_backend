export class Horario {
  private constructor(
    private readonly fecha: Date,
    private readonly horaInicio: string,
    private readonly horaFin: string,
  ) {}

  static create(fecha: Date, horaInicio: string, horaFin: string): Horario {
    // Validaciones de formato de hora
    if (!horaInicio.match(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)) {
      throw new Error('Formato de hora inicio inválido');
    }
    if (!horaFin.match(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)) {
      throw new Error('Formato de hora fin inválido');
    }

    return new Horario(fecha, horaInicio, horaFin);
  }

  get Fecha(): Date {
    return this.fecha;
  }

  get HoraInicio(): string {
    return this.horaInicio;
  }

  get HoraFin(): string {
    return this.horaFin;
  }

  get DuracionEnMinutos(): number {
    const [horaInicioH, horaInicioM] = this.horaInicio.split(':').map(Number);
    const [horaFinH, horaFinM] = this.horaFin.split(':').map(Number);

    const inicio = horaInicioH * 60 + horaInicioM;
    const fin = horaFinH * 60 + horaFinM;

    return fin - inicio;
  }
}
