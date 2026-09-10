import { Injectable } from '@nestjs/common';
import { Booking, BookingProps } from '../domain/entities/booking.entity';
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
  private readonly bookings = new Map<string, BookingProps>();

  public async save(booking: Booking): Promise<void> {
    this.bookings.set(booking.id, booking.toProps());
  }

  public async findById(id: string): Promise<Booking | null> {
    const record = this.bookings.get(id);
    return record ? Booking.reconstitute({ ...record }) : null;
  }

  public async findConfirmedByRoomInWindow(
    roomId: string,
    from: Date,
    to: Date,
  ): Promise<Booking[]> {
    const fromMs = from.getTime();
    const toMs = to.getTime();

    return [...this.bookings.values()]
      .map((record) => Booking.reconstitute({ ...record }))
      .filter((booking) => {
        if (booking.roomId !== roomId || !booking.isConfirmed) {
          return false;
        }
        const start = booking.range.start.getTime();
        const end = booking.range.end.getTime();
        // Intersects [from, to): start < to && end > from
        return start < toMs && end > fromMs;
      })
      .sort((a, b) => a.range.start.getTime() - b.range.start.getTime());
  }

  public async countUpcomingByOrganizer(organizerId: string, now: Date): Promise<number> {
    let count = 0;
    for (const record of this.bookings.values()) {
      const booking = Booking.reconstitute({ ...record });
      if (
        booking.organizerId === organizerId &&
        booking.isConfirmed &&
        !booking.hasStartedBy(now)
      ) {
        count += 1;
      }
    }
    return count;
  }
}
