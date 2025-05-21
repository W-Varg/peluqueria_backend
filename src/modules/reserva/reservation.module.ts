import { Module } from '@nestjs/common';
import { CreateReservationUseCase } from '../../application/use-cases/create-reservation.use-case';
import { PrismaService } from '../../database/prisma.service';
import { EmployeeAssignmentService } from '../../domain/services/employee-assignment.service';
import { DatabaseModule } from '../../database/database.module';
import { PrismaReservationRepository } from './prisma-reservation.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    CreateReservationUseCase,
    PrismaService,
    EmployeeAssignmentService,
    {
      provide: 'IReservationRepository',
      useClass: PrismaReservationRepository,
    },
  ],
  exports: [CreateReservationUseCase, PrismaService],
})
export class ReservationModule {}
