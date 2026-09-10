import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { BookingModule } from './booking/booking.module';
import { configValidationSchema } from './config/config.schema';
import { HealthController } from './health/health.controller';
import { DomainExceptionFilter } from './shared/filters/domain-exception.filter';
import { SharedModule } from './shared/shared.module';

/**
 * The composition root.
 *
 * Configuration (validated, no defaults), the global guards in a defensible
 * order, the global validation pipe, the global exception filter, the Clock
 * binding, and the booking context.
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidationSchema,
      validationOptions: { abortEarly: false },
    }),
    SharedModule,
    BookingModule,
  ],
  controllers: [HealthController],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    },
    { provide: APP_FILTER, useClass: DomainExceptionFilter },
  ],
})
export class AppModule {}
