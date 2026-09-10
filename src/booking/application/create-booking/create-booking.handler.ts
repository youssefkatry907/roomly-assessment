import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { AppConfig } from '../../../config/app.config';
import { CLOCK, Clock } from '../../../shared/clock/clock.port';
import { BOOKING_REPOSITORY, ROOM_REPOSITORY } from '../../domain/booking.tokens';
import { Booking } from '../../domain/entities/booking.entity';
import { InvalidTimeRangeError, RoomNotFoundError } from '../../domain/errors/booking.errors';
import { assertBookingIsAllowed } from '../../domain/policies/booking-rules.policy';
import { BookingRepository } from '../../domain/repositories/booking.repository.port';
import { RoomRepository } from '../../domain/repositories/room.repository.port';
import { TimeRange } from '../../domain/value-objects/time-range.vo';
import { CreateBookingCommand } from './create-booking.command';

/**
 * Orchestration only: load through the ports, let the domain decide, persist,
 * return. Every rule in the brief is enforced by the policy or the aggregate -
 * if this class grows a chain of `if` statements about business hours or
 * overlaps, the domain has leaked into the application layer.
 *
 * The class name, the constructor's role and `execute` are frozen; how you
 * inject the ports, the clock and the configuration is yours.
 */
@Injectable()
export class CreateBookingHandler {
  public constructor(
    @Inject(BOOKING_REPOSITORY) private readonly bookings: BookingRepository,
    @Inject(ROOM_REPOSITORY) private readonly rooms: RoomRepository,
    @Inject(CLOCK) private readonly clock: Clock,
    private readonly config: AppConfig,
  ) {}

  public async execute(command: CreateBookingCommand): Promise<Booking> {
    const startsAt = CreateBookingHandler.parseInstant(command.startsAt);
    const endsAt = CreateBookingHandler.parseInstant(command.endsAt);

    const room = await this.rooms.findById(command.roomId);
    if (!room || room.tenantId !== command.principal.tenantId) {
      throw new RoomNotFoundError();
    }

    const range = TimeRange.create(startsAt, endsAt);
    const now = this.clock.now();
    const bufferMs = room.bufferMinutes * 60 * 1000;
    const windowFrom = new Date(range.start.getTime() - bufferMs);
    const windowTo = new Date(range.end.getTime() + bufferMs);

    const bookingsInWindow = await this.bookings.findConfirmedByRoomInWindow(
      room.id,
      windowFrom,
      windowTo,
    );
    const upcomingBookingsForOrganizer = await this.bookings.countUpcomingByOrganizer(
      command.principal.userId,
      now,
    );

    assertBookingIsAllowed({
      room,
      range,
      attendeeCount: command.attendeeCount,
      now,
      bookingsInWindow,
      upcomingBookingsForOrganizer,
      config: this.config.bookingRules,
    });

    const booking = Booking.create({
      id: randomUUID(),
      tenantId: command.principal.tenantId,
      roomId: room.id,
      organizerId: command.principal.userId,
      range,
      attendeeCount: command.attendeeCount,
      createdAt: now,
    });

    await this.bookings.save(booking);
    return booking;
  }

  private static parseInstant(value: string): Date {
    // Require an absolute instant (Z or ±HH:MM). Bare local datetimes depend on host TZ.
    if (!/(?:Z|[+-]\d{2}:\d{2})$/i.test(value)) {
      throw new InvalidTimeRangeError('timestamp must be a valid ISO-8601 instant');
    }
    const instant = new Date(value);
    if (Number.isNaN(instant.getTime())) {
      throw new InvalidTimeRangeError('timestamp must be a valid ISO-8601 instant');
    }
    return instant;
  }
}
