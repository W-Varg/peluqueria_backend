import { DomainError } from 'src/shared/domain/domain.error';
import { ValueObject } from 'src/shared/domain/value-object.base';

interface ReservationDateProps {
  date: Date;
  duration: number; // duración en minutos
}

export class ReservationDateVO extends ValueObject<ReservationDateProps> {
  private constructor(props: ReservationDateProps) {
    super(props);
  }

  public static create(date: Date, duration: number): ReservationDateVO {
    // Validar que la fecha no sea en el pasado
    if (date < new Date()) {
      throw new DomainError('La fecha de reserva no puede ser en el pasado');
    }

    // Validar que la duración sea positiva y razonable (entre 15min y 4 horas)
    if (duration < 15 || duration > 240) {
      throw new DomainError('La duración debe estar entre 15 minutos y 4 horas');
    }

    // Validar que la fecha sea en horario laboral (9:00 - 19:00)
    const hour = date.getHours();
    if (hour < 9 || hour >= 19) {
      throw new DomainError('Las reservas solo se pueden hacer entre 9:00 y 19:00');
    }

    // Validar que no sea domingo (0 = domingo, 6 = sábado)
    if (date.getDay() === 0) {
      throw new DomainError('No se pueden hacer reservas los domingos');
    }

    return new ReservationDateVO({ date, duration });
  }

  public get value(): Date {
    return this.props.date;
  }

  public get duration(): number {
    return this.props.duration;
  }

  public get endTime(): Date {
    const endTime = new Date(this.props.date);
    endTime.setMinutes(endTime.getMinutes() + this.props.duration);
    return endTime;
  }

  public overlaps(other: ReservationDateVO): boolean {
    const thisStart = this.value;
    const thisEnd = this.endTime;
    const otherStart = other.value;
    const otherEnd = other.endTime;

    return thisStart < otherEnd && thisEnd > otherStart;
  }
}
