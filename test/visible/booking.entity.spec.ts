import { Booking } from '../../src/booking/domain/entities/booking.entity';
import { TimeRange } from '../../src/booking/domain/value-objects/time-range.vo';
import { ALICE, ROOM_ATRIUM, at } from '../support/fixtures';

function newBooking(): Booking {
  return Booking.create({
    id: 'bk-1',
    tenantId: ALICE.tenantId,
    roomId: ROOM_ATRIUM.id,
    organizerId: ALICE.userId,
    range: TimeRange.create(at('10:00'), at('11:00')),
    attendeeCount: 4,
    createdAt: at('08:00'),
  });
}

describe('Booking', () => {
  it('is created confirmed', () => {
    expect(newBooking().status).toBe('CONFIRMED');
    expect(newBooking().isConfirmed).toBe(true);
  });

  it('cancels into a new instance and leaves the original alone', () => {
    const booking = newBooking();
    const cancelled = booking.cancel();

    expect(cancelled.status).toBe('CANCELLED');
    expect(booking.status).toBe('CONFIRMED');
    expect(cancelled).not.toBe(booking);
  });

  it('knows whether it has started', () => {
    const booking = newBooking();
    expect(booking.hasStartedBy(at('09:59'))).toBe(false);
    expect(booking.hasStartedBy(at('10:30'))).toBe(true);
  });
});
