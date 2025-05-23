import { Module } from '@nestjs/common';
import { EmpleadosService } from './empleados.service';
import { EmpleadosController } from './empleados.controller';
import { DatabaseModule } from 'src/infrastructure/persistence/prisma/database.module'; // import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule],
  // imports: [DatabaseModule, AuthModule],
  controllers: [EmpleadosController],
  providers: [EmpleadosService],
  exports: [EmpleadosService],
})
export class EmpleadosModule {}
