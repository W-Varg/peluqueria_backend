export class PreferenciasCliente {
  private constructor(
    private readonly preferencias: {
      horario: string[];
      estilista: string[];
      servicios: string[];
    },
  ) {}

  static create(preferencias: {
    horario: string[];
    estilista: string[];
    servicios: string[];
  }): PreferenciasCliente {
    return new PreferenciasCliente(preferencias);
  }

  get Preferencias(): {
    horario: string[];
    estilista: string[];
    servicios: string[];
  } {
    return this.preferencias;
  }
}
