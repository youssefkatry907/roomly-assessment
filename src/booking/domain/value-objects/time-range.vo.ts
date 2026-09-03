import { InvalidTimeRangeError } from '../errors/booking.errors';

/**
 * A half-open interval [start, end) in absolute UTC time.
 *
 * The SIGNATURES below are a frozen contract - the test suite calls exactly
 * these. The BODIES are yours. Every question about how two periods relate
 * should be answerable here, once, rather than re-derived at each call site.
 */
export class TimeRange {
  private constructor(
    private readonly _start: Date,
    private readonly _end: Date,
  ) {}

  /** @throws InvalidTimeRangeError when end is not strictly after start. */
  public static create(start: Date, end: Date): TimeRange {
    // TODO(candidate)
    throw new Error('TimeRange.create is not implemented');
  }

  public get start(): Date {
    // TODO(candidate) - callers must not be able to mutate the range.
    throw new Error('TimeRange.start is not implemented');
  }

  public get end(): Date {
    // TODO(candidate)
    throw new Error('TimeRange.end is not implemented');
  }

  public get durationMinutes(): number {
    // TODO(candidate)
    throw new Error('TimeRange.durationMinutes is not implemented');
  }

  /** Minutes from UTC midnight of the day the range starts on. */
  public get startMinuteOfDay(): number {
    // TODO(candidate)
    throw new Error('TimeRange.startMinuteOfDay is not implemented');
  }

  /**
   * Minutes from UTC midnight of the day the range STARTS on - so a range
   * running 23:00 to 24:00 yields 1440, and anything above 1440 has crossed
   * midnight. This is what makes "ends exactly at closing time" expressible.
   */
  public get endMinuteOfDay(): number {
    // TODO(candidate)
    throw new Error('TimeRange.endMinuteOfDay is not implemented');
  }

  public crossesUtcMidnight(): boolean {
    // TODO(candidate)
    throw new Error('TimeRange.crossesUtcMidnight is not implemented');
  }

  /** True when the two intervals share at least one instant. */
  public overlaps(other: TimeRange): boolean {
    // TODO(candidate)
    throw new Error('TimeRange.overlaps is not implemented');
  }

  /** A new range with the same start and the end pushed out by `minutes`. */
  public extendEndBy(minutes: number): TimeRange {
    // TODO(candidate)
    throw new Error('TimeRange.extendEndBy is not implemented');
  }

  /** True when the start sits exactly on a `minutes`-wide grid line. */
  public startsOnGrid(minutes: number): boolean {
    // TODO(candidate)
    throw new Error('TimeRange.startsOnGrid is not implemented');
  }
}
