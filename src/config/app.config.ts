import { Injectable } from '@nestjs/common';
import { BookingRulesConfig } from '../booking/domain/policies/booking-rules.policy';

/**
 * Typed access to configuration. Nothing outside this file may read
 * `process.env` - the rest of the application asks for a typed value.
 *
 * `bookingRules` is frozen: the policy takes exactly this shape.
 */
@Injectable()
export class AppConfig {
  public constructor() {
    // TODO(candidate)
  }

  public get port(): number {
    // TODO(candidate)
    throw new Error('AppConfig.port is not implemented');
  }

  public get isProduction(): boolean {
    // TODO(candidate)
    throw new Error('AppConfig.isProduction is not implemented');
  }

  public get bookingRules(): BookingRulesConfig {
    // TODO(candidate)
    throw new Error('AppConfig.bookingRules is not implemented');
  }
}
