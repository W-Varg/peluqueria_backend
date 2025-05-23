import { AggregateRoot } from '../../../shared/domain/aggregate-root.base';
import { DomainError } from '../../../shared/domain/domain.error';
import { ReservationDateVO } from './value-objects/reservation-date.vo';
import { ReservationStatus, ReservationStatusVO } from './value-objects/reservation-status.vo';

export interface ReservationProps {
  id: string;
  clientId: string;
  serviceId: string;
  date: ReservationDateVO;
  status: ReservationStatusVO;
  createdAt: Date;
  updatedAt: Date;
}

export class ReservationAggregate extends AggregateRoot<ReservationProps> {
  private constructor(props: ReservationProps) {
    super(props);
  }

  public static create(
    id: string,
    clientId: string,
    serviceId: string,
    date: Date,
    duration: number,
  ): ReservationAggregate {
    const reservationDate = ReservationDateVO.create(date, duration);
    const status = ReservationStatusVO.create(ReservationStatus.PENDING);
    const now = new Date();

    return new ReservationAggregate({
      id,
      clientId,
      serviceId,
      date: reservationDate,
      status,
      createdAt: now,
      updatedAt: now,
    });
  }

  // Getters
  public get id(): string {
    return this.props.id;
  }

  public get clientId(): string {
    return this.props.clientId;
  }

  public get serviceId(): string {
    return this.props.serviceId;
  }

  public get date(): ReservationDateVO {
    return this.props.date;
  }

  public get status(): ReservationStatusVO {
    return this.props.status;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  // Métodos de negocio
  public confirm(): void {
    if (!this.status.canBeConfirmed()) {
      throw new DomainError('No se puede confirmar la reserva en su estado actual');
    }
    this.props.status = ReservationStatusVO.create(ReservationStatus.CONFIRMED);
    this.props.updatedAt = new Date();
  }

  public cancel(): void {
    if (!this.status.canBeCancelled()) {
      throw new DomainError('No se puede cancelar la reserva en su estado actual');
    }
    this.props.status = ReservationStatusVO.create(ReservationStatus.CANCELLED);
    this.props.updatedAt = new Date();
  }

  public complete(): void {
    if (!this.status.canBeCompleted()) {
      throw new DomainError('No se puede completar la reserva en su estado actual');
    }
    this.props.status = ReservationStatusVO.create(ReservationStatus.COMPLETED);
    this.props.updatedAt = new Date();
  }

  public markAsNoShow(): void {
    if (!this.status.canBeMarkedAsNoShow()) {
      throw new DomainError('No se puede marcar la reserva como no show en su estado actual');
    }
    this.props.status = ReservationStatusVO.create(ReservationStatus.NO_SHOW);
    this.props.updatedAt = new Date();
  }

  public overlapsWithReservation(other: ReservationAggregate): boolean {
    if (this.id === other.id) {
      return false; // Una reserva no puede solaparse consigo misma
    }
    return this.date.overlaps(other.date);
  }

  // Método para actualizar la fecha/hora de la reserva
  public updateDateTime(newDate: Date, newDuration: number): void {
    if (!this.status.isPending()) {
      throw new DomainError('Solo se puede modificar la fecha de reservas pendientes');
    }
    this.props.date = ReservationDateVO.create(newDate, newDuration);
    this.props.updatedAt = new Date();
  }
}
