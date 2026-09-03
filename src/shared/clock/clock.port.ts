/**
 * FROZEN CONTRACT - do not modify.
 *
 * The only sanctioned source of the current time. Nothing else in the
 * application may construct a Date from the system clock: the test suite
 * drives time through a fake implementation of this port, so a direct
 * `new Date()` anywhere else makes that code untestable and will fail.
 */
export interface Clock {
  now(): Date;
}

export const CLOCK = Symbol('CLOCK');
