# DESIGN

**Booking.** Immutable aggregate (`create` / `reconstitute` / `cancel` → new instance). Time is a half-open `TimeRange` so overlap, buffer, grid, and day-minutes live in one place. Status is only CONFIRMED or CANCELLED.

**Rules.** Structural time → `TimeRange`. Create rules (room, past, hours, grid, capacity, quota, overlap, buffer) → `assertBookingIsAllowed`. Cancel (who + cutoff) → `assertCancellationIsAllowed`. Tenant isolation → handlers: wrong tenant and missing id both look like not-found. MEMBER cancel of someone else's booking is also not-found (same as get), so existence is not leaked via 403. Controllers stay HTTP-only.

**R-PAST.** Reject only if start is before `now` (equal is fine).

**R-CANCEL.** Managers get the same cutoff as organizers — one config value, no silent manager bypass.

**Real DB.** Keep the domain checks. For concurrency, use optimistic locking on the room (a `version` column): check overlaps, insert the booking, then `UPDATE rooms SET version = version + 1 WHERE id = ? AND version = ?`. If zero rows update, another booking won the race — retry or return conflict. That uses normal rows under MVCC; no `tstzrange` (timezone-aware timestamp range) exclusion constraint required.

**Skeleton gripe.** Unscoped `findById` makes every handler responsible for R-TENANT; tenant-scoped ports would be safer.
