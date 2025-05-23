import { Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { ReservaController } from '../../../infrastructure/api/reserva.controller';
import { DatabaseModule } from 'src/infrastructure/persistence/prisma/database.module';
import { EmployeeAssignmentService } from '../../../application/use-cases/reservation/find-available-employee.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [ReservaController],
  providers: [ReservaService, EmployeeAssignmentService],
  exports: [ReservaService],
})
export class ReservaModule {}
