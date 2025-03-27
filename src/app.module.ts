import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { SucursalModule } from './modules/sucursal/sucursal.module';
import { EmpleadosModule } from './modules/empleados/empleados.module';
import configuration from './configurations/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    DatabaseModule,
    AuthModule,
    /* ----------------------------------------------------- modules ---------------------------------------------------- */
    SucursalModule,
    EmpleadosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
