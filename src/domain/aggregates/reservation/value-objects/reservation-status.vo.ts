import { ValueObject } from '../../../../shared/domain/value-object.base';
import { DomainError } from '../../../../shared/domain/domain.error';

export enum ReservationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  NO_SHOW = 'NO_SHOW',
}

interface ReservationStatusProps {
  value: ReservationStatus;
}

export class ReservationStatusVO extends ValueObject<ReservationStatusProps> {
  private constructor(props: ReservationStatusProps) {
    super(props);
  }

  public static create(status: ReservationStatus): ReservationStatusVO {
    if (!Object.values(ReservationStatus).includes(status)) {
      throw new DomainError(`Estado de reserva inválido: ${status}`);
    }

    return new ReservationStatusVO({ value: status });
  }

  public get value(): ReservationStatus {
    return this.props.value;
  }

  public isPending(): boolean {
    return this.props.value === ReservationStatus.PENDING;
  }

  public isConfirmed(): boolean {
    return this.props.value === ReservationStatus.CONFIRMED;
  }

  public isCancelled(): boolean {
    return this.props.value === ReservationStatus.CANCELLED;
  }

  public isCompleted(): boolean {
    return this.props.value === ReservationStatus.COMPLETED;
  }

  public isNoShow(): boolean {
    return this.props.value === ReservationStatus.NO_SHOW;
  }

  public canBeCancelled(): boolean {
    return this.isPending() || this.isConfirmed();
  }

  public canBeConfirmed(): boolean {
    return this.isPending();
  }

  public canBeCompleted(): boolean {
    return this.isConfirmed();
  }

  public canBeMarkedAsNoShow(): boolean {
    return this.isConfirmed();
  }
}
