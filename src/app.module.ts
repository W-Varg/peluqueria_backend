import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { SucursalModule } from './modules/sucursal/sucursal.module';
import { EmpleadosModule } from './modules/empleados/empleados.module';
import configuration from './configurations/configuration';
import { ServicioModule } from './modules/servicio.module';
import { PrismaService } from './database/prisma.service';
import { ReservationModule } from './reserva/reservation.module';
import { ReservaModule } from './reserva/reserva.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    DatabaseModule,
    AuthModule,
    /* ----------------------------------------------------- modules ---------------------------------------------------- */
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
