/**
 * FROZEN CONTRACT - do not modify.
 *
 * A bookable room. Immutable: private constructor, static factory, getters
 * only. All times are UTC; `opensAt` and `closesAt` are minutes from midnight
 * UTC (so 09:00 is 540).
 */
export interface RoomProps {
  readonly id: string;
  readonly tenantId: string;
  readonly name: string;
  readonly capacity: number;
  readonly opensAt: number;
  readonly closesAt: number;
  readonly bufferMinutes: number;
  readonly maxBookingMinutes: number;
  readonly isActive: boolean;
}

export class Room {
  private constructor(private readonly props: RoomProps) {}

  public static reconstitute(props: RoomProps): Room {
    if (props.opensAt < 0 || props.closesAt > 24 * 60 || props.opensAt >= props.closesAt) {
      throw new Error(`Room ${props.id} has impossible business hours.`);
    }
    if (props.capacity < 1) {
      throw new Error(`Room ${props.id} has a capacity below one.`);
    }
    return new Room({ ...props });
  }

  public get id(): string {
    return this.props.id;
  }

  public get tenantId(): string {
    return this.props.tenantId;
  }

  public get name(): string {
    return this.props.name;
  }

  public get capacity(): number {
    return this.props.capacity;
  }

  public get opensAt(): number {
    return this.props.opensAt;
  }

  public get closesAt(): number {
    return this.props.closesAt;
  }

  public get bufferMinutes(): number {
    return this.props.bufferMinutes;
  }

  public get maxBookingMinutes(): number {
    return this.props.maxBookingMinutes;
  }

  public get isActive(): boolean {
    return this.props.isActive;
  }

  public toProps(): RoomProps {
    return { ...this.props };
  }
}
