import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { SucursalModule } from './modules/sucursal/sucursal.module';
import { EmpleadosModule } from './modules/empleados/empleados.module';
import configuration from './configurations/configuration';
import { ServicioModule } from './servicio/servicio.module';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    DatabaseModule,
    AuthModule,
    /* ----------------------------------------------------- modules ---------------------------------------------------- */
    SucursalModule,
    EmpleadosModule,
    ServicioModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
