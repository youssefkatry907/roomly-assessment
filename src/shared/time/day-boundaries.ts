/**
 * GIVEN. Helpers for turning a calendar day into an absolute window, used by
 * the room schedule endpoint.
 */

/** Parses a YYYY-MM-DD calendar day into the instant it begins (UTC midnight). */
export function parseUtcDay(day: string): Date {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) {
    throw new Error(`Not a calendar day: ${day}`);
  }
  const [year, month, dayOfMonth] = day.split('-').map(Number);
  // Defect fix: use Date.UTC. `new Date(y, m-1, d)` is local midnight and
  // shifts the schedule window by the host timezone offset.
  const parsed = new Date(Date.UTC(year, month - 1, dayOfMonth));
  // Reject impossible calendar days (Date.UTC rolls 2026-02-31 → March).
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== dayOfMonth
  ) {
    throw new Error(`Not a calendar day: ${day}`);
  }
  return parsed;
}

/** The first instant of the UTC day the given date falls in. */
export function startOfUtcDay(date: Date): Date {
  // Defect fix: do not mutate the caller's Date — copy first to convert to UTC.
  const start = new Date(date.getTime());
  return new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
}

/** The first instant of the NEXT UTC day - the exclusive end of the window. */
export function endOfUtcDay(date: Date): Date {
  const start = startOfUtcDay(date);
  return new Date(start.getTime() + 24 * 60 * 60 * 1000);
}
