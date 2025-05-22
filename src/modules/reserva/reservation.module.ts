import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { EmployeeAssignmentService } from '../../domain/services/employee-assignment.service';
import { DatabaseModule } from '../../database/database.module';
import { PrismaReservationRepository } from '../../domain/repository/prisma-reservation.repository';
import { CreateReservationUseCase } from 'src/domain/use-cases/create-reservation.use-case';

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
