import { Injectable } from '@nestjs/common';
import { Booking } from '../domain/entities/booking.entity';
import { BookingRepository } from '../domain/repositories/booking.repository.port';

/**
 * The persistence adapter. Follow InMemoryRoomRepository: store records, hand
 * back aggregates, and make sure a caller holding a returned object cannot
 * reach into the store through it.
 *
 * `save` is an upsert - the cancel path re-saves an existing booking.
 */
@Injectable()
export class InMemoryBookingRepository implements BookingRepository {
  public async save(booking: Booking): Promise<void> {
    // TODO(candidate)
    throw new Error('InMemoryBookingRepository.save is not implemented');
  }

  public async findById(id: string): Promise<Booking | null> {
    // TODO(candidate)
    throw new Error('InMemoryBookingRepository.findById is not implemented');
  }

  public async findConfirmedByRoomInWindow(
    roomId: string,
    from: Date,
    to: Date,
  ): Promise<Booking[]> {
    // TODO(candidate)
    throw new Error('InMemoryBookingRepository.findConfirmedByRoomInWindow is not implemented');
  }

  public async countUpcomingByOrganizer(organizerId: string, now: Date): Promise<number> {
    // TODO(candidate)
    throw new Error('InMemoryBookingRepository.countUpcomingByOrganizer is not implemented');
  }
}
