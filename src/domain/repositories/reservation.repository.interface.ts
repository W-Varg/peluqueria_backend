import { Reservation } from '../entities/reservation.entity';

export interface IReservationRepository {
  create(reservation: Reservation): Promise<Reservation>;
  findById(id: number): Promise<Reservation | null>;
  findByClientId(clientId: number): Promise<Reservation[]>;
  findByEmployeeId(employeeId: number): Promise<Reservation[]>;
  findByDateRange(startDate: Date, endDate: Date): Promise<Reservation[]>;
  update(id: number, reservation: Partial<Reservation>): Promise<Reservation>;
  delete(id: number): Promise<void>;
}
