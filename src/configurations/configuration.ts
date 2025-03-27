import { join } from 'path';
import { IPackageJson } from 'src/helpers/swagger.helper';
import { readFileSync } from 'fs';

export default () => {
  const packageJsonPath = join(process.cwd(), 'package.json');
  const pjson: IPackageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

  return {
    packageJson: pjson,
    port: Number(process.env.ENV_PORT) || 8001,
    appMaxSize: process.env.ENV_FILE_MAX_SIZE || '100mb',
    showSwagger: process.env.ENV_SWAGGER_SHOW || 'false',
    debugServer: process.env.ENV_DEBUG_SERVER || 'false',
    debugFrontEnd: process.env.ENV_DEBUG_FRONT || 'false',

    nodeEnv: process.env.NODE_ENV || 'dev',
    cors: process.env.APP_CORS_ORIGINS ?? '',
    JWT_SECRET: process.env.JWT_SECRET || 'secretKey',
  };
};
