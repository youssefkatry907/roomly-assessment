import { Inject, Injectable } from '@nestjs/common';
import { BOOKING_REPOSITORY } from '../../domain/booking.tokens';
import { Booking } from '../../domain/entities/booking.entity';
import { BookingNotFoundError } from '../../domain/errors/booking.errors';
import { BookingRepository } from '../../domain/repositories/booking.repository.port';
import { GetBookingQuery } from './get-booking.query';

/**
 * A MEMBER may read their own bookings; a MANAGER may read any booking in
 * their own tenant. Everything else must be indistinguishable from a booking
 * that does not exist (R-TENANT).
 */
@Injectable()
export class GetBookingHandler {
  public constructor(
    @Inject(BOOKING_REPOSITORY) private readonly bookings: BookingRepository,
  ) {}

  public async execute(query: GetBookingQuery): Promise<Booking> {
    const booking = await this.bookings.findById(query.bookingId);
    if (!booking || booking.tenantId !== query.principal.tenantId) {
      throw new BookingNotFoundError();
    }

    if (query.principal.role === 'MEMBER' && booking.organizerId !== query.principal.userId) {
      throw new BookingNotFoundError();
    }

    return booking;
  }
}
