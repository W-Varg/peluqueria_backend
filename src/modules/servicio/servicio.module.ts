import { Module } from '@nestjs/common';
import { PrismaServicioRepository } from './infrastructure/prisma-servicio.repository';
import { ServicioService } from './application/servicio.service';
import { ServicioController } from './interface/servicio.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [ServicioController],
  providers: [
    ServicioService,
    PrismaService,
    {
      provide: 'IServicioRepository',
      useClass: PrismaServicioRepository,
    },
  ],
  exports: [ServicioService],
})
export class ServicioModule {}
