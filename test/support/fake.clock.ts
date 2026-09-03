import { Clock } from '../../src/shared/clock/clock.port';

/** GIVEN. The test suite's Clock. Time only moves when a test moves it. */
export class FakeClock implements Clock {
  private current: Date;

  public constructor(iso: string) {
    this.current = new Date(iso);
  }

  public now(): Date {
    return new Date(this.current.getTime());
  }

  public set(iso: string): void {
    this.current = new Date(iso);
  }

  public advanceMinutes(minutes: number): void {
    this.current = new Date(this.current.getTime() + minutes * 60_000);
  }
}
