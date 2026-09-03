import { Injectable } from '@nestjs/common';
import { Clock } from './clock.port';

/** The production Clock. The one place in src/ allowed to read the system time. */
@Injectable()
export class SystemClock implements Clock {
  public now(): Date {
    // TODO(candidate)
    throw new Error('SystemClock.now is not implemented');
  }
}
