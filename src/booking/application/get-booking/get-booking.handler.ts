import { Injectable } from '@nestjs/common';
import { Booking } from '../../domain/entities/booking.entity';
import { GetBookingQuery } from './get-booking.query';

/**
 * A MEMBER may read their own bookings; a MANAGER may read any booking in
 * their own tenant. Everything else must be indistinguishable from a booking
 * that does not exist (R-TENANT).
 */
@Injectable()
export class GetBookingHandler {
  public constructor() {
    // TODO(candidate)
  }

  public async execute(query: GetBookingQuery): Promise<Booking> {
    // TODO(candidate)
    throw new Error('GetBookingHandler.execute is not implemented');
  }
}
