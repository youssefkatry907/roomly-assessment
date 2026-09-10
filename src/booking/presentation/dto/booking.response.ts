import { Principal } from '../../../auth/principal';
import { Booking } from '../../domain/entities/booking.entity';

/**
 * The wire shape of a booking.
 *
 * The aggregate itself is not a response body. Organiser identity on the room
 * schedule is visible to managers only.
 */
export class BookingResponse {
  public readonly id: string;
  public readonly roomId: string;
  public readonly startsAt: string;
  public readonly endsAt: string;
  public readonly attendeeCount: number;
  public readonly status: string;
  public readonly organizerId?: string;

  private constructor(fields: {
    id: string;
    roomId: string;
    startsAt: string;
    endsAt: string;
    attendeeCount: number;
    status: string;
    organizerId?: string;
  }) {
    this.id = fields.id;
    this.roomId = fields.roomId;
    this.startsAt = fields.startsAt;
    this.endsAt = fields.endsAt;
    this.attendeeCount = fields.attendeeCount;
    this.status = fields.status;
    if (fields.organizerId !== undefined) {
      this.organizerId = fields.organizerId;
    }
  }

  public static from(booking: Booking, viewer: Principal, forSchedule = false): BookingResponse {
    const includeOrganizer =
      !forSchedule || viewer.role === 'MANAGER' || booking.organizerId === viewer.userId;

    return new BookingResponse({
      id: booking.id,
      roomId: booking.roomId,
      startsAt: booking.range.start.toISOString(),
      endsAt: booking.range.end.toISOString(),
      attendeeCount: booking.attendeeCount,
      status: booking.status,
      ...(includeOrganizer ? { organizerId: booking.organizerId } : {}),
    });
  }
}
