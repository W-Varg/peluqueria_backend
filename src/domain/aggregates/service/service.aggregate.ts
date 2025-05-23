import { AggregateRoot } from '../../../shared/domain/aggregate-root.base';
import { DomainError } from '../../../shared/domain/domain.error';
import { ServiceDurationVO } from './value-objects/service-duration.vo';

export interface ServiceProps {
  id: string;
  name: string;
  description: string;
  duration: ServiceDurationVO;
  price: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class ServiceAggregate extends AggregateRoot<ServiceProps> {
  private constructor(props: ServiceProps) {
    super(props);
  }

  public static create(
    id: string,
    name: string,
    description: string,
    durationInMinutes: number,
    price: number,
  ): ServiceAggregate {
    if (!name || name.trim().length < 3) {
      throw new DomainError('El nombre del servicio debe tener al menos 3 caracteres');
    }

    if (price < 0) {
      throw new DomainError('El precio no puede ser negativo');
    }

    const duration = ServiceDurationVO.create(durationInMinutes);
    const now = new Date();

    return new ServiceAggregate({
      id,
      name: name.trim(),
      description: description.trim(),
      duration,
      price,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });
  }

  // Getters
  public get id(): string {
    return this.props.id;
  }

  public get name(): string {
    return this.props.name;
  }

  public get description(): string {
    return this.props.description;
  }

  public get duration(): ServiceDurationVO {
    return this.props.duration;
  }

  public get price(): number {
    return this.props.price;
  }

  public get isActive(): boolean {
    return this.props.isActive;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  // Métodos de negocio
  public updateDetails(
    name: string,
    description: string,
    durationInMinutes: number,
    price: number,
  ): void {
    if (!name || name.trim().length < 3) {
      throw new DomainError('El nombre del servicio debe tener al menos 3 caracteres');
    }

    if (price < 0) {
      throw new DomainError('El precio no puede ser negativo');
    }

    this.props.name = name.trim();
    this.props.description = description.trim();
    this.props.duration = ServiceDurationVO.create(durationInMinutes);
    this.props.price = price;
    this.props.updatedAt = new Date();
  }

  public activate(): void {
    if (this.props.isActive) {
      throw new DomainError('El servicio ya está activo');
    }
    this.props.isActive = true;
    this.props.updatedAt = new Date();
  }

  public deactivate(): void {
    if (!this.props.isActive) {
      throw new DomainError('El servicio ya está inactivo');
    }
    this.props.isActive = false;
    this.props.updatedAt = new Date();
  }

  public calculateTotalPrice(quantity: number): number {
    if (quantity < 1) {
      throw new DomainError('La cantidad debe ser al menos 1');
    }
    return this.props.price * quantity;
  }

  public getDurationInMinutes(): number {
    return this.props.duration.minutes;
  }

  public getDurationFormatted(): string {
    return this.props.duration.toString();
  }
}
