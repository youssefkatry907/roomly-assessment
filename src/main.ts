import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/** GIVEN - the process entry point. */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const isProduction = process.env.NODE_ENV == 'prod';

  if (!isProduction) {
    app.enableCors({ origin: true, credentials: true });
    app.useLogger(['log', 'debug', 'verbose', 'warn', 'error']);
  }

  app.enableShutdownHooks();
  await app.listen(Number(process.env.PORT ?? 3000));
}

void bootstrap();
