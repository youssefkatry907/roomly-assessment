/** FROZEN CONTRACT - do not modify. */
import { Principal } from '../../../auth/principal';

export interface CancelBookingCommand {
  readonly principal: Principal;
  readonly bookingId: string;
}
