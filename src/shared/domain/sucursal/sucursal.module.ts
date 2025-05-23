import { Module } from '@nestjs/common';
import { SucursalesService } from './sucursal.service';
import { DatabaseModule } from 'src/infrastructure/persistence/prisma/database.module';
import { SucursalesController } from 'src/infrastructure/api/sucursal.controller';
@Module({
  imports: [DatabaseModule],
  controllers: [SucursalesController],
  providers: [SucursalesService],
})
export class SucursalModule {}
