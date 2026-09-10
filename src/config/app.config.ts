import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BookingRulesConfig } from '../booking/domain/policies/booking-rules.policy';

/**
 * Typed access to configuration. Nothing outside this file may read
 * `process.env` - the rest of the application asks for a typed value.
 *
 * `bookingRules` is frozen: the policy takes exactly this shape.
 */
@Injectable()
export class AppConfig {
  public constructor(private readonly config: ConfigService) {}

  public get port(): number {
    return this.config.getOrThrow<number>('PORT');
  }

  public get isProduction(): boolean {
    return this.config.getOrThrow<string>('NODE_ENV') === 'production';
  }

  public get bookingRules(): BookingRulesConfig {
    return {
      maxActiveBookingsPerUser: this.config.getOrThrow<number>('MAX_ACTIVE_BOOKINGS_PER_USER'),
      cancellationCutoffMinutes: this.config.getOrThrow<number>('CANCELLATION_CUTOFF_MINUTES'),
    };
  }
}
