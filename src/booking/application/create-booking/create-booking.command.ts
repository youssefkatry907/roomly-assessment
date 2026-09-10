/** FROZEN CONTRACT - do not modify. */
import { Principal } from '../../../auth/principal';

export interface CreateBookingCommand {
  readonly principal: Principal;
  readonly roomId: string;
  readonly startsAt: string;
  readonly endsAt: string;
  readonly attendeeCount: number;
}
