import { Inject, Injectable } from '@nestjs/common';
import { AppConfig } from '../../../config/app.config';
import { CLOCK, Clock } from '../../../shared/clock/clock.port';
import { BOOKING_REPOSITORY } from '../../domain/booking.tokens';
import { Booking } from '../../domain/entities/booking.entity';
import { BookingNotFoundError } from '../../domain/errors/booking.errors';
import { assertCancellationIsAllowed } from '../../domain/policies/booking-rules.policy';
import { BookingRepository } from '../../domain/repositories/booking.repository.port';
import { CancelBookingCommand } from './cancel-booking.command';

/** Enforces R-CANCEL through the policy, and R-TENANT before it. */
@Injectable()
export class CancelBookingHandler {
  public constructor(
    @Inject(BOOKING_REPOSITORY) private readonly bookings: BookingRepository,
    @Inject(CLOCK) private readonly clock: Clock,
    private readonly config: AppConfig,
  ) {}

  public async execute(command: CancelBookingCommand): Promise<Booking> {
    const booking = await this.bookings.findById(command.bookingId);
    if (!booking || booking.tenantId !== command.principal.tenantId) {
      throw new BookingNotFoundError();
    }

    // Same visibility as get: MEMBER may only act on own bookings (404, not 403).
    if (command.principal.role === 'MEMBER' && booking.organizerId !== command.principal.userId) {
      throw new BookingNotFoundError();
    }

    assertCancellationIsAllowed({
      booking,
      actorUserId: command.principal.userId,
      actorIsManager: command.principal.role === 'MANAGER',
      now: this.clock.now(),
      config: this.config.bookingRules,
    });

    const cancelled = booking.cancel();
    await this.bookings.save(cancelled);
    return cancelled;
  }
}
