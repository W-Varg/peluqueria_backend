import { ClientAggregate } from '../aggregates/client/client.aggregate';

export interface IClientRepository {
  save(client: ClientAggregate): Promise<void>;
  findById(id: string): Promise<ClientAggregate | null>;
  findByEmail(email: string): Promise<ClientAggregate | null>;
  findAll(): Promise<ClientAggregate[]>;
  delete(id: string): Promise<void>;
}
