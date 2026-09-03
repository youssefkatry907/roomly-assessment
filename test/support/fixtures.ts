import { RoomProps } from '../../src/booking/domain/entities/room.entity';
import { Principal } from '../../src/auth/principal';

/** GIVEN. Two tenants, so cross-tenant behaviour is always testable. */
export const TENANT_A = 'tenant-a';
export const TENANT_B = 'tenant-b';

export const ALICE: Principal = { userId: 'alice', tenantId: TENANT_A, role: 'MEMBER' };
export const BOB: Principal = { userId: 'bob', tenantId: TENANT_A, role: 'MEMBER' };
export const MAYA: Principal = { userId: 'maya', tenantId: TENANT_A, role: 'MANAGER' };
export const CARLOS: Principal = { userId: 'carlos', tenantId: TENANT_B, role: 'MEMBER' };

/** 09:00-18:00 UTC, seats 8, 10 minutes of turnaround, 4 hours maximum. */
export const ROOM_ATRIUM: RoomProps = {
  id: 'room-atrium',
  tenantId: TENANT_A,
  name: 'Atrium',
  capacity: 8,
  opensAt: 9 * 60,
  closesAt: 18 * 60,
  bufferMinutes: 10,
  maxBookingMinutes: 240,
  isActive: true,
};

/** No turnaround buffer, seats 2, short maximum. */
export const ROOM_BOOTH: RoomProps = {
  id: 'room-booth',
  tenantId: TENANT_A,
  name: 'Booth',
  capacity: 2,
  opensAt: 8 * 60,
  closesAt: 20 * 60,
  bufferMinutes: 0,
  maxBookingMinutes: 60,
  isActive: true,
};

export const ROOM_CLOSED: RoomProps = {
  ...ROOM_ATRIUM,
  id: 'room-closed',
  name: 'Cellar',
  isActive: false,
};

/** Belongs to the OTHER tenant. */
export const ROOM_FOREIGN: RoomProps = {
  ...ROOM_ATRIUM,
  id: 'room-foreign',
  name: 'Overseas',
  tenantId: TENANT_B,
};

export const ALL_ROOMS: readonly RoomProps[] = [
  ROOM_ATRIUM,
  ROOM_BOOTH,
  ROOM_CLOSED,
  ROOM_FOREIGN,
];

/** Helper: an ISO instant on the reference day, 2026-04-14 (a Tuesday). */
export const DAY = '2026-04-14';
export function at(time: string): Date {
  return new Date(`${DAY}T${time}:00.000Z`);
}
