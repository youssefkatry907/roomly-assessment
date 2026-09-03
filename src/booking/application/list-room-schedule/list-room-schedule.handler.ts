import { Injectable } from '@nestjs/common';
import { Booking } from '../../domain/entities/booking.entity';
import { ListRoomScheduleQuery } from './list-room-schedule.query';

/** Confirmed bookings on one room for one UTC day, ordered by start. */
@Injectable()
export class ListRoomScheduleHandler {
  public constructor() {
    // TODO(candidate)
  }

  public async execute(query: ListRoomScheduleQuery): Promise<Booking[]> {
    // TODO(candidate)
    throw new Error('ListRoomScheduleHandler.execute is not implemented');
  }
}
