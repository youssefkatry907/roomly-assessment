/**
 * FROZEN CONTRACT - do not modify, rename, or add to.
 *
 * The exception filter maps these to HTTP. Note deliberately that there is no
 * "wrong tenant" error: see R-TENANT in the brief and think about which of
 * these a cross-tenant identifier must produce.
 */
import { DomainError } from '../../../shared/errors/domain.error';

export class RoomNotFoundError extends DomainError {
  public readonly code = 'ROOM_NOT_FOUND';
  public constructor() {
    super('Room not found.');
  }
}

export class BookingNotFoundError extends DomainError {
  public readonly code = 'BOOKING_NOT_FOUND';
  public constructor() {
    super('Booking not found.');
  }
}

export class RoomInactiveError extends DomainError {
  public readonly code = 'ROOM_INACTIVE';
  public constructor() {
    super('This room is not accepting bookings.');
  }
}

export class InvalidTimeRangeError extends DomainError {
  public readonly code = 'INVALID_TIME_RANGE';
  public constructor(reason: string) {
    super(`Invalid time range: ${reason}`);
  }
}

export class OutsideBusinessHoursError extends DomainError {
  public readonly code = 'OUTSIDE_BUSINESS_HOURS';
  public constructor() {
    super('The booking falls outside the room business hours.');
  }
}

export class TimeSlotUnavailableError extends DomainError {
  public readonly code = 'TIME_SLOT_UNAVAILABLE';
  public constructor() {
    super('The room is already booked for part of that period.');
  }
}

export class CapacityExceededError extends DomainError {
  public readonly code = 'CAPACITY_EXCEEDED';
  public constructor() {
    super('The attendee count exceeds the room capacity.');
  }
}

export class BookingQuotaExceededError extends DomainError {
  public readonly code = 'BOOKING_QUOTA_EXCEEDED';
  public constructor() {
    super('You already hold the maximum number of upcoming bookings.');
  }
}

export class BookingInPastError extends DomainError {
  public readonly code = 'BOOKING_IN_PAST';
  public constructor() {
    super('A booking cannot start in the past.');
  }
}

export class CancellationWindowClosedError extends DomainError {
  public readonly code = 'CANCELLATION_WINDOW_CLOSED';
  public constructor() {
    super('This booking can no longer be cancelled.');
  }
}

export class BookingActionForbiddenError extends DomainError {
  public readonly code = 'BOOKING_ACTION_FORBIDDEN';
  public constructor() {
    super('You may not act on this booking.');
  }
}
