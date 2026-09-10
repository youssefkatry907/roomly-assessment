import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getCorsOrigins } from './config/cors-config';

/** GIVEN - the process entry point. */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const isProduction = process.env.NODE_ENV === 'production';

  app.enableCors({
    origin: getCorsOrigins(),
    credentials: true,
  });

  if (!isProduction) {
    app.useLogger(['log', 'debug', 'verbose', 'warn', 'error']);
  }

  app.enableShutdownHooks();
  await app.listen(Number(process.env.PORT ?? 3000));
}

void bootstrap();
