import { TimeRange } from '../value-objects/time-range.vo';

export type BookingStatus = 'CONFIRMED' | 'CANCELLED';

export interface BookingProps {
  readonly id: string;
  readonly tenantId: string;
  readonly roomId: string;
  readonly organizerId: string;
  readonly range: TimeRange;
  readonly attendeeCount: number;
  readonly status: BookingStatus;
  readonly createdAt: Date;
}

/**
 * The aggregate. Immutable in the same style as Room: private constructor,
 * static factories, getters, and state transitions that return a NEW instance
 * rather than mutating this one.
 *
 * The SIGNATURES are a frozen contract. The bodies, and any invariant you
 * decide belongs in the constructor, are yours.
 */
export class Booking {
  private constructor(private readonly props: BookingProps) {}

  /** A newly organised booking. Starts CONFIRMED. */
  public static create(input: Omit<BookingProps, 'status'>): Booking {
    // TODO(candidate)
    throw new Error('Booking.create is not implemented');
  }

  /** Rebuild from storage, invariants re-checked. */
  public static reconstitute(props: BookingProps): Booking {
    // TODO(candidate)
    throw new Error('Booking.reconstitute is not implemented');
  }

  public get id(): string {
    // TODO(candidate)
    throw new Error('Booking.id is not implemented');
  }

  public get tenantId(): string {
    // TODO(candidate)
    throw new Error('Booking.tenantId is not implemented');
  }

  public get roomId(): string {
    // TODO(candidate)
    throw new Error('Booking.roomId is not implemented');
  }

  public get organizerId(): string {
    // TODO(candidate)
    throw new Error('Booking.organizerId is not implemented');
  }

  public get range(): TimeRange {
    // TODO(candidate)
    throw new Error('Booking.range is not implemented');
  }

  public get attendeeCount(): number {
    // TODO(candidate)
    throw new Error('Booking.attendeeCount is not implemented');
  }

  public get status(): BookingStatus {
    // TODO(candidate)
    throw new Error('Booking.status is not implemented');
  }

  public get createdAt(): Date {
    // TODO(candidate)
    throw new Error('Booking.createdAt is not implemented');
  }

  public get isConfirmed(): boolean {
    // TODO(candidate)
    throw new Error('Booking.isConfirmed is not implemented');
  }

  public hasStartedBy(now: Date): boolean {
    // TODO(candidate)
    throw new Error('Booking.hasStartedBy is not implemented');
  }

  /**
   * Returns the cancelled booking. Whether the caller is entitled to cancel,
   * and whether the cutoff has passed, are NOT decided here - see the policy.
   * Cancelling something already cancelled is not an error.
   */
  public cancel(): Booking {
    // TODO(candidate)
    throw new Error('Booking.cancel is not implemented');
  }

  public toProps(): BookingProps {
    // TODO(candidate)
    throw new Error('Booking.toProps is not implemented');
  }
}
