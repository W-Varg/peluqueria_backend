import { Injectable, Inject } from '@nestjs/common';
import { Reservation } from '../../../domain/aggregates/reservation/entities/reservation.entity';
import { IReservationRepository } from '../../../domain/interface/i-reservation.repository';
import { EstadoReserva } from '@prisma/client';
import { EmployeeAssignmentService } from './find-available-employee.usecase';
import { CreateReservationDto } from 'src/shared/domain/reserva/dtos/reservation.dto';

@Injectable()
export class CreateReservationUseCase {
  constructor(
    @Inject('IReservationRepository')
    private readonly reservationRepository: IReservationRepository,
    private readonly employeeAssignmentService: EmployeeAssignmentService,
  ) {}

  async execute(createReservationDto: CreateReservationDto): Promise<Reservation> {
    if (!this.isValidReservationTime(createReservationDto.fecha)) {
      throw new Error('La fecha de reserva no puede ser en el pasado');
    }

    // Buscar un empleado disponible
    const empleadoId = await this.employeeAssignmentService.findAvailableEmployee(
      createReservationDto.fecha,
      createReservationDto.hora,
      createReservationDto.servicioId,
    );

    const reservation = new Reservation({
      ...createReservationDto,
      empleadoId: empleadoId,
      estado: EstadoReserva.PENDIENTE,
    });

    return this.reservationRepository.create(reservation);
  }

  private isValidReservationTime(fecha: Date): boolean {
    const now = new Date();
    return fecha >= now;
  }
}
