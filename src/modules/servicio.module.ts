import { Module } from '@nestjs/common';
import { PublicServicesController, ServicioController } from './servicio/servicio.controller';
import { ServicioService } from '../domain/services/servicio.service';
import { PrismaServicioRepository } from './reserva/servicio.repository.impl';
import { SERVICE_REPOSITORY } from '../domain/repository/servicio.repository.token';
import { PrismaService } from '../database/prisma.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ServicioController, PublicServicesController],
  providers: [
    ServicioService,
    PrismaService,
    {
      provide: SERVICE_REPOSITORY,
      useClass: PrismaServicioRepository,
    },
  ],
  exports: [ServicioService],
})
export class ServicioModule {}
