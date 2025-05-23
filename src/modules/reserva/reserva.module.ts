import { Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';
import { DatabaseModule } from 'src/infrastructure/persistence/prisma/database.module';
import { EmployeeAssignmentService } from '../../domain/services/employee-assignment.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ReservaController],
  providers: [ReservaService, EmployeeAssignmentService],
  exports: [ReservaService],
})
export class ReservaModule {}
