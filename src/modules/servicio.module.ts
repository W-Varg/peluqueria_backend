import { Module } from '@nestjs/common';
import { ServicioController } from '../interface/controllers/servicio.controller';
import { ServicioService } from '../application/services/servicio.service';
import { PrismaServicioRepository } from '../infrastructure/persistence/prisma/repositories/servicio.repository.impl';
import { SERVICIO_REPOSITORY } from '../domain/repository/servicio.repository.token';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [ServicioController],
  providers: [
    ServicioService,
    PrismaService,
    {
      provide: SERVICIO_REPOSITORY,
      useClass: PrismaServicioRepository,
    },
  ],
  exports: [ServicioService],
})
export class ServicioModule {}
