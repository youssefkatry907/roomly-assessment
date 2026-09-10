import { Inject, Injectable } from '@nestjs/common';
import { endOfUtcDay, parseUtcDay } from '../../../shared/time/day-boundaries';
import { BOOKING_REPOSITORY, ROOM_REPOSITORY } from '../../domain/booking.tokens';
import { Booking } from '../../domain/entities/booking.entity';
import { InvalidTimeRangeError, RoomNotFoundError } from '../../domain/errors/booking.errors';
import { BookingRepository } from '../../domain/repositories/booking.repository.port';
import { RoomRepository } from '../../domain/repositories/room.repository.port';
import { ListRoomScheduleQuery } from './list-room-schedule.query';

/** Confirmed bookings on one room for one UTC day, ordered by start. */
@Injectable()
export class ListRoomScheduleHandler {
  public constructor(
    @Inject(BOOKING_REPOSITORY) private readonly bookings: BookingRepository,
    @Inject(ROOM_REPOSITORY) private readonly rooms: RoomRepository,
  ) {}

  public async execute(query: ListRoomScheduleQuery): Promise<Booking[]> {
    if (!query.date || !/^\d{4}-\d{2}-\d{2}$/.test(query.date)) {
      throw new InvalidTimeRangeError('date must be YYYY-MM-DD');
    }

    const room = await this.rooms.findById(query.roomId);
    if (!room || room.tenantId !== query.principal.tenantId) {
      throw new RoomNotFoundError();
    }

    let from: Date;
    try {
      from = parseUtcDay(query.date);
    } catch {
      throw new InvalidTimeRangeError('date must be YYYY-MM-DD');
    }
    const to = endOfUtcDay(from);
    return this.bookings.findConfirmedByRoomInWindow(room.id, from, to);
  }
}
