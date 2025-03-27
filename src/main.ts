import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { configSwagger, IPackageJson, printServerInitLog } from './helpers/swagger.helper';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // await app.listen(process.env.PORT ?? 3000);
  const configService = app.get(ConfigService);
  const packageJson = configService.get<IPackageJson>('packageJson')!;

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  configSwagger(app, packageJson);

  const port = configService.get<number>('port') || 3000;
  await app.listen(port, '0.0.0.0').then(async () => {
    await printServerInitLog(app, packageJson);
  });
}
bootstrap();
