import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infrastructure/persistence/prisma/database.module';
import { AuthModule } from './infrastructure/auth/auth.module';
import { SucursalModule } from './modules/sucursal/sucursal.module';
import { EmpleadosModule } from './modules/empleados/empleados.module';
import configuration from './common/configurations/configuration';
import { ServicioModule } from './modules/servicio.module';
import { PrismaService } from './infrastructure/persistence/prisma/prisma.service';
import { ReservationModule } from './modules/reserva/reservation.module';
import { ReservaModule } from './modules/reserva/reserva.module';
import { DomainModule } from './domain/domain.module';
import { AppController } from './infrastructure/api/app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    DatabaseModule,
    AuthModule,
    /* ----------------------------------------------------- modules ---------------------------------------------------- */
    DomainModule,
    SucursalModule,
    EmpleadosModule,
    ServicioModule,
    ReservationModule,
    ReservaModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
