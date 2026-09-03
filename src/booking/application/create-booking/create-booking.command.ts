/** FROZEN CONTRACT - do not modify. */
import { Principal } from '../../../auth/principal';

export interface CreateBookingCommand {
  readonly principal: Principal;
  readonly roomId: string;
  readonly startsAt: Date;
  readonly endsAt: Date;
  readonly attendeeCount: number;
}
