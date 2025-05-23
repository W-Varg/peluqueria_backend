import { ServiceAggregate } from '../aggregates/service/service.aggregate';

export interface IServiceRepository {
  save(service: ServiceAggregate): Promise<void>;
  findById(id: string): Promise<ServiceAggregate | null>;
  findByName(name: string): Promise<ServiceAggregate | null>;
  findAll(): Promise<ServiceAggregate[]>;
  findActive(): Promise<ServiceAggregate[]>;
  delete(id: string): Promise<void>;
} 