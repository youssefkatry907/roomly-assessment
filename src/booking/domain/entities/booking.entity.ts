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
    return Booking.reconstitute({ ...input, status: 'CONFIRMED' });
  }

  /** Rebuild from storage, invariants re-checked. */
  public static reconstitute(props: BookingProps): Booking {
    if (props.attendeeCount < 1) {
      throw new Error(`Booking ${props.id} has attendeeCount below one.`);
    }
    return new Booking({
      ...props,
      createdAt: new Date(props.createdAt.getTime()),
    });
  }

  public get id(): string {
    return this.props.id;
  }

  public get tenantId(): string {
    return this.props.tenantId;
  }

  public get roomId(): string {
    return this.props.roomId;
  }

  public get organizerId(): string {
    return this.props.organizerId;
  }

  public get range(): TimeRange {
    return this.props.range;
  }

  public get attendeeCount(): number {
    return this.props.attendeeCount;
  }

  public get status(): BookingStatus {
    return this.props.status;
  }

  public get createdAt(): Date {
    return new Date(this.props.createdAt.getTime());
  }

  public get isConfirmed(): boolean {
    return this.props.status === 'CONFIRMED';
  }

  public hasStartedBy(now: Date): boolean {
    return now.getTime() >= this.props.range.start.getTime();
  }

  /**
   * Returns the cancelled booking. Whether the caller is entitled to cancel,
   * and whether the cutoff has passed, are NOT decided here - see the policy.
   * Cancelling something already cancelled is not an error.
   */
  public cancel(): Booking {
    if (this.props.status === 'CANCELLED') {
      return this;
    }
    return Booking.reconstitute({ ...this.toProps(), status: 'CANCELLED' });
  }

  public toProps(): BookingProps {
    return {
      id: this.props.id,
      tenantId: this.props.tenantId,
      roomId: this.props.roomId,
      organizerId: this.props.organizerId,
      range: this.props.range,
      attendeeCount: this.props.attendeeCount,
      status: this.props.status,
      createdAt: new Date(this.props.createdAt.getTime()),
    };
  }
}
