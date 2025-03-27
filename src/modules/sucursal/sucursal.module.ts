import { Module } from '@nestjs/common';
import { SucursalesService } from './sucursal.service';
import { SucursalesController } from './sucursal.controller';

@Module({
  controllers: [SucursalesController],
  providers: [SucursalesService],
})
export class SucursalModule {}
