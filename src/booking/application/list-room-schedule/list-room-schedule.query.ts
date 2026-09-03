/** FROZEN CONTRACT - do not modify. */
import { Principal } from '../../../auth/principal';

export interface ListRoomScheduleQuery {
  readonly principal: Principal;
  readonly roomId: string;
  /** Calendar day in UTC, formatted YYYY-MM-DD. */
  readonly date: string;
}
