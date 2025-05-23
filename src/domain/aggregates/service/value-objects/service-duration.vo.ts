import { ValueObject } from '../../../../shared/domain/value-object.base';
import { DomainError } from '../../../../shared/domain/domain.error';

interface ServiceDurationProps {
  minutes: number;
}

export class ServiceDurationVO extends ValueObject<ServiceDurationProps> {
  private constructor(props: ServiceDurationProps) {
    super(props);
  }

  public static create(minutes: number): ServiceDurationVO {
    if (!Number.isInteger(minutes)) {
      throw new DomainError('La duración debe ser un número entero de minutos');
    }

    if (minutes < 15) {
      throw new DomainError('La duración mínima del servicio es de 15 minutos');
    }

    if (minutes > 240) {
      throw new DomainError('La duración máxima del servicio es de 4 horas');
    }

    return new ServiceDurationVO({ minutes });
  }

  public get minutes(): number {
    return this.props.minutes;
  }

  public get hours(): number {
    return this.props.minutes / 60;
  }

  public get hoursAndMinutes(): { hours: number; minutes: number } {
    const hours = Math.floor(this.props.minutes / 60);
    const minutes = this.props.minutes % 60;
    return { hours, minutes };
  }

  public toString(): string {
    const { hours, minutes } = this.hoursAndMinutes;
    if (hours === 0) {
      return `${minutes} minutos`;
    }
    if (minutes === 0) {
      return `${hours} hora${hours > 1 ? 's' : ''}`;
    }
    return `${hours} hora${hours > 1 ? 's' : ''} y ${minutes} minutos`;
  }
}
