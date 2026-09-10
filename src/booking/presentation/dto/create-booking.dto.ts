import { IsInt, IsISO8601, IsNotEmpty, IsString, Min } from 'class-validator';

/**
 * The request body for POST /bookings.
 *
 * Identity (tenantId / organizerId) comes from the verified principal only —
 * those fields must not appear here.
 */
export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  public roomId!: string;

  @IsISO8601({ strict: true })
  public startsAt!: string;

  @IsISO8601({ strict: true })
  public endsAt!: string;

  @IsInt()
  @Min(1)
  public attendeeCount!: number;
}
