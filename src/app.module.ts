import { Module } from '@nestjs/common';
import { HealthController } from './health/health.controller';

/**
 * The composition root.
 *
 * TODO(candidate): configuration (validated, no defaults), the global guards
 * in a defensible order, the global validation pipe, the global exception
 * filter, the Clock binding, and the booking context.
 */
@Module({
  controllers: [HealthController],
})
export class AppModule {}
