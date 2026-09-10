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
    if (end.getTime() <= start.getTime()) {
      throw new InvalidTimeRangeError('end must be strictly after start');
    }
    return new TimeRange(new Date(start.getTime()), new Date(end.getTime()));
  }

  public get start(): Date {
    return new Date(this._start.getTime());
  }

  public get end(): Date {
    return new Date(this._end.getTime());
  }

  public get durationMinutes(): number {
    return (this._end.getTime() - this._start.getTime()) / (60 * 1000);
  }

  /** Minutes from UTC midnight of the day the range starts on. */
  public get startMinuteOfDay(): number {
    return (
      this._start.getUTCHours() * 60 +
      this._start.getUTCMinutes() +
      this._start.getUTCSeconds() / 60 +
      this._start.getUTCMilliseconds() / 60_000
    );
  }

  /**
   * Minutes from UTC midnight of the day the range STARTS on - so a range
   * running 23:00 to 24:00 yields 1440, and anything above 1440 has crossed
   * midnight. This is what makes "ends exactly at closing time" expressible.
   */
  public get endMinuteOfDay(): number {
    const startDayUtc = Date.UTC(
      this._start.getUTCFullYear(),
      this._start.getUTCMonth(),
      this._start.getUTCDate(),
    );
    return (this._end.getTime() - startDayUtc) / (60 * 1000);
  }

  public crossesUtcMidnight(): boolean {
    return this.endMinuteOfDay > 24 * 60;
  }

  /** True when the two intervals share at least one instant. */
  public overlaps(other: TimeRange): boolean {
    return this._start.getTime() < other._end.getTime() && other._start.getTime() < this._end.getTime();
  }

  /** A new range with the same start and the end pushed out by `minutes`. */
  public extendEndBy(minutes: number): TimeRange {
    return TimeRange.create(this.start, new Date(this._end.getTime() + minutes * 60 * 1000));
  }

  /** True when the start sits exactly on a `minutes`-wide grid line. */
  public startsOnGrid(minutes: number): boolean {
    const totalMinutes =
      this._start.getUTCHours() * 60 +
      this._start.getUTCMinutes() +
      this._start.getUTCSeconds() / 60 +
      this._start.getUTCMilliseconds() / 60_000;
    return totalMinutes % minutes === 0;
  }
}
