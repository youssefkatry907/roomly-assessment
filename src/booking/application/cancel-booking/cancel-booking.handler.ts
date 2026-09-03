import { Injectable } from '@nestjs/common';
import { Booking } from '../../domain/entities/booking.entity';
import { CancelBookingCommand } from './cancel-booking.command';

/** Enforces R-CANCEL through the policy, and R-TENANT before it. */
@Injectable()
export class CancelBookingHandler {
  public constructor() {
    // TODO(candidate)
  }

  public async execute(command: CancelBookingCommand): Promise<Booking> {
    // TODO(candidate)
    throw new Error('CancelBookingHandler.execute is not implemented');
  }
}
