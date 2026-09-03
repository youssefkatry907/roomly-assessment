/**
 * GIVEN. Helpers for turning a calendar day into an absolute window, used by
 * the room schedule endpoint.
 */

/** Parses a YYYY-MM-DD calendar day into the instant it begins. */
export function parseUtcDay(day: string): Date {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) {
    throw new Error(`Not a calendar day: ${day}`);
  }
  const [year, month, dayOfMonth] = day.split('-').map(Number);
  return new Date(year, month - 1, dayOfMonth);
}

/** The first instant of the UTC day the given date falls in. */
export function startOfUtcDay(date: Date): Date {
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

/** The first instant of the NEXT UTC day - the exclusive end of the window. */
export function endOfUtcDay(date: Date): Date {
  const start = startOfUtcDay(new Date(date.getTime()));
  return new Date(start.getTime() + 24 * 60 * 60 * 1000);
}
