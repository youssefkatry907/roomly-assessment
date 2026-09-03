import { Injectable } from '@nestjs/common';
import { Booking } from '../../domain/entities/booking.entity';
import { CreateBookingCommand } from './create-booking.command';

/**
 * Orchestration only: load through the ports, let the domain decide, persist,
 * return. Every rule in the brief is enforced by the policy or the aggregate -
 * if this class grows a chain of `if` statements about business hours or
 * overlaps, the domain has leaked into the application layer.
 *
 * The class name, the constructor's role and `execute` are frozen; how you
 * inject the ports, the clock and the configuration is yours.
 */
@Injectable()
export class CreateBookingHandler {
  public constructor() {
    // TODO(candidate) - inject BOOKING_REPOSITORY, ROOM_REPOSITORY, CLOCK
    // and the booking rules configuration.
  }

  public async execute(command: CreateBookingCommand): Promise<Booking> {
    // TODO(candidate)
    throw new Error('CreateBookingHandler.execute is not implemented');
  }
}
