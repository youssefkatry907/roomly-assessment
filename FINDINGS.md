# FINDINGS

Defects found in given (non-TODO) code and fixed.

**1. AuthGuard — client-controlled role.** Fell back to `x-user-role` when the token had no role, so a member could escalate to manager. Fix: role must come from the verified token (`MEMBER` | `MANAGER`) or the request is 401.

**2. day-boundaries — wrong UTC / invalid days.** Local midnight, in-place mutation, and rolled dates like `2026-02-31`. Fix: `Date.UTC`, copy before truncating, round-trip year/month/day.

**3. TokenService — silent JWT default.** Missing `JWT_SECRET` fell back to `dev-secret-change-me`, so production could mint forgeable tokens. Fix: constructor throws if the secret is missing or empty.

**4. CreateBookingDto — body identity.** Accepted `tenantId` / `organizerId` from the client. Trusting them would allow booking as someone else. Fix: drop those fields; identity comes only from `Principal`.

**5. main / CORS — open credentialed CORS.** `origin: true` with credentials, plus `NODE_ENV == 'prod'` never matching real production. Fix: allowlist via `CORS_ORIGINS`; detect production with `NODE_ENV === 'production'`.

**6. Cancel privacy leak.** Same-tenant non-owner MEMBER got 403 on cancel while get returned 404, revealing that the id existed. Fix: cancel uses the same visibility check as get (404).