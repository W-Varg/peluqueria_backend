import { Module } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/persistence/prisma/prisma.service';
import { EmployeeAssignmentService } from '../../../application/use-cases/reservation/find-available-employee.usecase';
import { DatabaseModule } from 'src/infrastructure/persistence/prisma/database.module';
import { PrismaReservationRepository } from 'src/domain/aggregates/repository/prisma-reservation.repository';
import { CreateReservationUseCase } from 'src/application/use-cases/reservation/create-reservation.use-case';

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
