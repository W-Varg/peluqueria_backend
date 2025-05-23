import { Module } from '@nestjs/common';
import { ClientesController } from '../infrastructure/api/clientes.controller';
import { ClienteService } from './aggregates/repository/client.repository';
import { PrismaService } from 'src/infrastructure/persistence/prisma/prisma.service';

@Module({
  controllers: [ClientesController],
  providers: [ClienteService, PrismaService],
  imports: [],
})
export class DomainModule {}
