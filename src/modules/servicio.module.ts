import { Module } from '@nestjs/common';
import {
  PublicServicesController,
  ServicioController,
} from '../infrastructure/api/servicio.controller';
import { ServicioService } from '../domain/services/servicio.service';
import { PrismaServicioRepository } from './reserva/servicio.repository.impl';
import { SERVICE_REPOSITORY } from '../domain/interface/servicio.repository.token';
import { PrismaService } from '../infrastructure/persistence/prisma/prisma.service';
import { DatabaseModule } from 'src/infrastructure/persistence/prisma/database.module';
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
