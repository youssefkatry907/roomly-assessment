/** FROZEN CONTRACT - do not modify. */
import { Principal } from '../../../auth/principal';

export interface GetBookingQuery {
  readonly principal: Principal;
  readonly bookingId: string;
}
