import {
  assertBookingIsAllowed,
  BookingRulesConfig,
} from '../../src/booking/domain/policies/booking-rules.policy';
import { Booking } from '../../src/booking/domain/entities/booking.entity';
import { Room } from '../../src/booking/domain/entities/room.entity';
import { TimeRange } from '../../src/booking/domain/value-objects/time-range.vo';
import {
  CapacityExceededError,
  OutsideBusinessHoursError,
  TimeSlotUnavailableError,
} from '../../src/booking/domain/errors/booking.errors';
import { ALICE, ROOM_ATRIUM, at } from '../support/fixtures';

const config: BookingRulesConfig = {
  maxActiveBookingsPerUser: 3,
  cancellationCutoffMinutes: 60,
};

const atrium = Room.reconstitute(ROOM_ATRIUM);

function existing(from: string, to: string): Booking {
  return Booking.create({
    id: `bk-${from}`,
    tenantId: ALICE.tenantId,
    roomId: ROOM_ATRIUM.id,
    organizerId: 'someone-else',
    range: TimeRange.create(at(from), at(to)),
    attendeeCount: 2,
    createdAt: at('08:00'),
  });
}

function check(range: TimeRange, bookingsInWindow: Booking[] = [], attendeeCount = 4): void {
  assertBookingIsAllowed({
    room: atrium,
    range,
    attendeeCount,
    now: at('08:00'),
    bookingsInWindow,
    upcomingBookingsForOrganizer: 0,
    config,
  });
}

describe('assertBookingIsAllowed', () => {
  it('allows a well-formed booking in an empty room', () => {
    expect(() => check(TimeRange.create(at('10:00'), at('11:00')))).not.toThrow();
  });

  it('rejects a booking that starts before the room opens', () => {
    expect(() => check(TimeRange.create(at('08:30'), at('09:30')))).toThrow(
      OutsideBusinessHoursError,
    );
  });

  it('allows a booking that ends exactly at closing time', () => {
    expect(() => check(TimeRange.create(at('17:00'), at('18:00')))).not.toThrow();
  });

  it('rejects an overlapping booking', () => {
    expect(() =>
      check(TimeRange.create(at('10:00'), at('11:00')), [existing('10:30', '11:30')]),
    ).toThrow(TimeSlotUnavailableError);
  });

  it('rejects a booking that starts inside the turnaround buffer', () => {
    // Atrium needs 10 minutes after each booking.
    expect(() =>
      check(TimeRange.create(at('11:05'), at('12:00')), [existing('10:00', '11:00')]),
    ).toThrow(TimeSlotUnavailableError);
  });

  it('allows a booking that starts exactly when the buffer ends', () => {
    expect(() =>
      check(TimeRange.create(at('11:10'), at('12:00')), [existing('10:00', '11:00')]),
    ).not.toThrow();
  });

  it('rejects more attendees than the room seats', () => {
    expect(() => check(TimeRange.create(at('10:00'), at('11:00')), [], 9)).toThrow(
      CapacityExceededError,
    );
  });
});
