import { AggregateRoot } from '../../../shared/domain/aggregate-root.base';
import { ClientInfoVO } from './value-objects/client-info.vo';

export interface ClientProps {
  id: string;
  info: ClientInfoVO;
  createdAt: Date;
  updatedAt: Date;
  lastVisit?: Date;
  totalVisits: number;
}

export class ClientAggregate extends AggregateRoot<ClientProps> {
  private constructor(props: ClientProps) {
    super(props);
  }

  public static create(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
  ): ClientAggregate {
    const clientInfo = ClientInfoVO.create(firstName, lastName, email, phone);
    const now = new Date();

    return new ClientAggregate({
      id,
      info: clientInfo,
      createdAt: now,
      updatedAt: now,
      totalVisits: 0,
    });
  }

  // Getters
  public get id(): string {
    return this.props.id;
  }

  public get info(): ClientInfoVO {
    return this.props.info;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public get lastVisit(): Date | undefined {
    return this.props.lastVisit;
  }

  public get totalVisits(): number {
    return this.props.totalVisits;
  }

  // Métodos de negocio
  public updateInfo(firstName: string, lastName: string, email: string, phone: string): void {
    this.props.info = ClientInfoVO.create(firstName, lastName, email, phone);
    this.props.updatedAt = new Date();
  }

  public registerVisit(): void {
    const now = new Date();
    this.props.lastVisit = now;
    this.props.totalVisits += 1;
    this.props.updatedAt = now;
  }

  public hasVisitedBefore(): boolean {
    return this.props.totalVisits > 0;
  }

  public isFrequentClient(): boolean {
    return this.props.totalVisits >= 5;
  }

  public daysSinceLastVisit(): number | null {
    if (!this.props.lastVisit) {
      return null;
    }
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - this.props.lastVisit.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}
