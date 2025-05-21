import { Module } from '@nestjs/common';
import { ClientesController } from './controllers/clientes.controller';
import { ClienteService } from './services/cliente.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [ClientesController],
  providers: [ClienteService, PrismaService],
  imports: [],
})
export class DomainModule {}
