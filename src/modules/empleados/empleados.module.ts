import { Module } from '@nestjs/common';
import { EmpleadosService } from './empleados.service';
import { EmpleadosController } from './empleados.controller';
// import { DatabaseModule } from 'src/database/database.module';
// import { AuthModule } from 'src/auth/auth.module';

@Module({
  // imports: [DatabaseModule, AuthModule],
  controllers: [EmpleadosController],
  providers: [EmpleadosService],
  exports: [EmpleadosService],
})
export class EmpleadosModule {}
