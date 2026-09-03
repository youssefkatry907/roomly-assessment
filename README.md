# Roomly

A meeting room booking service, partially built. Your task brief is the separate
document you were sent; this file covers only how to run the thing.

## Setup

```bash
npm install
cp .env.example .env      # fill in every value - none of them have defaults
npm test                  # the visible suite. Most of it is red. That is the starting point.
npm run typecheck
npm run lint
```

Node 22 or newer. No database, no Docker, no external service.

## Layout

```
src/booking/domain/          pure TypeScript. No framework, no config, no adapters.
src/booking/application/     handlers. Depend on ports, never on adapters.
src/booking/infrastructure/  adapters behind those ports.
src/booking/presentation/    HTTP. Controllers and DTOs, nothing else.
src/auth  src/config  src/shared
test/visible/                ships with the repo
test/support/                fixtures, the fake clock, the test app factory
```

`npm run lint` enforces the layer boundaries and forbids reading the system
clock outside `SystemClock`. It is not decoration - it is part of the grade.

## Frozen contracts

Anything whose header says **FROZEN CONTRACT**, plus the class names, method
names and signatures of the files marked `TODO(candidate)`. The grading suite
compiles against those exact identifiers. Implement the bodies; do not rename
the surface. If you think a contract is wrong, say so in `DESIGN.md`.

Also frozen, because the tests assert on them:

**Routes and success codes**

| Method | Path                                  | Status |
| ------ | ------------------------------------- | ------ |
| POST   | `/bookings`                           | 201    |
| POST   | `/bookings/:id/cancel`                | 200    |
| GET    | `/bookings/:id`                       | 200    |
| GET    | `/rooms/:id/schedule?date=YYYY-MM-DD` | 200    |
| GET    | `/health`                             | 200    |

**The booking response body**

```jsonc
{
  "id": "…",
  "roomId": "room-atrium",
  "startsAt": "2026-04-14T10:00:00.000Z",   // ISO-8601, UTC
  "endsAt": "2026-04-14T11:00:00.000Z",
  "attendeeCount": 4,
  "status": "CONFIRMED",
  "organizerId": "alice"                     // see the brief: not for every reader
}
```

**Request body for `POST /bookings`**: `roomId`, `startsAt`, `endsAt`,
`attendeeCount`. What the DTO currently declares beyond that is your problem to
think about.

## Time

Everything is UTC. A room's `opensAt` / `closesAt` are minutes from UTC
midnight, so 09:00 is `540`. There is no timezone handling in this exercise and
you should not add any.

## Authentication

`TokenService` issues and verifies a small signed token; the tests mint their
own with it. `Authorization: Bearer <token>`. Two roles, `MEMBER` and
`MANAGER`, and two tenants in the fixtures so that cross-tenant behaviour is
always observable.

## What to hand back

The repository including `.git`, plus `DESIGN.md` and `FINDINGS.md`. See the
brief for what goes in each.

## One thing that is not a defect

Out of the box `npm run lint` reports "defined but never used" on the
parameters of the unimplemented stubs. That is the skeleton telling you what
you have not written yet; the errors disappear as you implement each body. Do
not silence them with underscores.
