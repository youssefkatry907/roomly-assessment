/**
 * The request body for POST /bookings.
 *
 * Inherited from a previous iteration of this service. Validation decorators
 * were never added. `startsAt` and `endsAt` arrive as ISO-8601 strings and the
 * handler needs Dates.
 *
 * TODO(candidate): validate this properly - and look hard at every field
 * before you keep it.
 */
export class CreateBookingDto {
  public roomId: string;

  public startsAt: string;

  public endsAt: string;

  public attendeeCount: number;

  // The mobile client sends these along with the rest of the form.
  public tenantId: string;

  public organizerId: string;
}
