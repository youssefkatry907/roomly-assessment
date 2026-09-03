import { TimeRange } from '../../src/booking/domain/value-objects/time-range.vo';
import { InvalidTimeRangeError } from '../../src/booking/domain/errors/booking.errors';
import { at } from '../support/fixtures';

describe('TimeRange', () => {
  it('rejects a range that ends before it starts', () => {
    expect(() => TimeRange.create(at('11:00'), at('10:00'))).toThrow(InvalidTimeRangeError);
  });

  it('rejects a zero-length range', () => {
    expect(() => TimeRange.create(at('10:00'), at('10:00'))).toThrow(InvalidTimeRangeError);
  });

  it('reports its duration in minutes', () => {
    expect(TimeRange.create(at('10:00'), at('11:30')).durationMinutes).toBe(90);
  });

  it('treats touching ranges as not overlapping (half-open)', () => {
    const morning = TimeRange.create(at('09:00'), at('10:00'));
    const later = TimeRange.create(at('10:00'), at('11:00'));
    expect(morning.overlaps(later)).toBe(false);
    expect(later.overlaps(morning)).toBe(false);
  });

  it('detects a partial overlap in both directions', () => {
    const a = TimeRange.create(at('09:00'), at('10:30'));
    const b = TimeRange.create(at('10:00'), at('11:00'));
    expect(a.overlaps(b)).toBe(true);
    expect(b.overlaps(a)).toBe(true);
  });

  it('expresses the day boundaries in minutes from midnight', () => {
    const range = TimeRange.create(at('09:00'), at('10:30'));
    expect(range.startMinuteOfDay).toBe(540);
    expect(range.endMinuteOfDay).toBe(630);
    expect(range.crossesUtcMidnight()).toBe(false);
  });

  it('does not let a caller mutate it through its getters', () => {
    const range = TimeRange.create(at('09:00'), at('10:00'));
    range.start.setUTCFullYear(1999);
    expect(range.start.getUTCFullYear()).toBe(2026);
  });
});
