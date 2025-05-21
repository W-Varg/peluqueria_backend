import { Module } from '@nestjs/common';
import { ServicioController } from './servicio/servicio.controller';
import { ServicioService } from '../application/services/servicio.service';
import { PrismaServicioRepository } from './reserva/servicio.repository.impl';
import { SERVICIO_REPOSITORY } from '../domain/repository/servicio.repository.token';
import { PrismaService } from '../database/prisma.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
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
