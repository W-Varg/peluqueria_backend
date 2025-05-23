import { Module } from '@nestjs/common';
import { SucursalesService } from './sucursal.service';
import { SucursalesController } from './sucursal.controller';
import { DatabaseModule } from 'src/infrastructure/persistence/prisma/database.module';
@Module({
  imports: [DatabaseModule],
  controllers: [SucursalesController],
  providers: [SucursalesService],
})
export class SucursalModule {}
