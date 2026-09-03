import { Booking } from '../entities/booking.entity';
import { Room } from '../entities/room.entity';
import { TimeRange } from '../value-objects/time-range.vo';

/** Domain constants. Deliberately not configuration - see the brief, R-GRID. */
export const MIN_BOOKING_MINUTES = 15;
export const BOOKING_START_GRID_MINUTES = 5;

export interface BookingRulesConfig {
  readonly maxActiveBookingsPerUser: number;
  readonly cancellationCutoffMinutes: number;
}

export interface BookingCreationContext {
  readonly room: Room;
  readonly range: TimeRange;
  readonly attendeeCount: number;
  readonly now: Date;
  /**
   * Every CONFIRMED booking on this room that could possibly interact with
   * `range`. The handler fetches a window; deciding what actually conflicts
   * within it is this function's job, not the repository's.
   */
  readonly bookingsInWindow: readonly Booking[];
  /** How many not-yet-started CONFIRMED bookings the organiser already holds. */
  readonly upcomingBookingsForOrganizer: number;
  readonly config: BookingRulesConfig;
}

export interface CancellationContext {
  readonly booking: Booking;
  readonly actorUserId: string;
  readonly actorIsManager: boolean;
  readonly now: Date;
  readonly config: BookingRulesConfig;
}

/**
 * Enforces R-OVERLAP, R-BUFFER, R-HOURS, R-GRID, R-CAP, R-QUOTA, R-PAST and
 * R-ROOM. Throws the matching DomainError on the first rule violated; returns
 * void when the booking is allowed.
 *
 * SIGNATURE FROZEN. This is where the rules live - a handler that re-states
 * any of them has moved the domain out of the domain.
 */
export function assertBookingIsAllowed(context: BookingCreationContext): void {
  // TODO(candidate)
  throw new Error('assertBookingIsAllowed is not implemented');
}

/**
 * Enforces R-CANCEL. Throws BookingActionForbiddenError when the actor is not
 * entitled, CancellationWindowClosedError when the cutoff has passed.
 *
 * SIGNATURE FROZEN.
 */
export function assertCancellationIsAllowed(context: CancellationContext): void {
  // TODO(candidate)
  throw new Error('assertCancellationIsAllowed is not implemented');
}
