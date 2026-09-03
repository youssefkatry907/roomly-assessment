/**
 * FROZEN CONTRACT - do not modify.
 *
 * Note what is NOT here: there is no `hasConflict(...)`. Deciding whether two
 * periods collide is a domain rule, not something an adapter should know.
 */
import { Booking } from '../entities/booking.entity';

export interface BookingRepository {
  save(booking: Booking): Promise<void>;

  findById(id: string): Promise<Booking | null>;

  /**
   * Every CONFIRMED booking for the room whose range intersects [from, to).
   * Ordered by start, ascending.
   */
  findConfirmedByRoomInWindow(roomId: string, from: Date, to: Date): Promise<Booking[]>;

  /** CONFIRMED bookings by this organiser that have not started by `now`. */
  countUpcomingByOrganizer(organizerId: string, now: Date): Promise<number>;
}
