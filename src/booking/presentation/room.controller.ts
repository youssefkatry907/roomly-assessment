import { Controller, Get, Param, Query } from '@nestjs/common';
import { CurrentUser } from '../../auth/current-user.decorator';
import { Principal } from '../../auth/principal';
import { ListRoomScheduleHandler } from '../application/list-room-schedule/list-room-schedule.handler';
import { BookingResponse } from './dto/booking.response';

/**
 * Frozen route: GET /rooms/:id/schedule?date=YYYY-MM-DD -> 200.
 * A malformed or missing `date` is a 400, not a 500.
 */
@Controller('rooms')
export class RoomController {
  public constructor(private readonly listSchedule: ListRoomScheduleHandler) {}

  @Get(':id/schedule')
  public async schedule(
    @CurrentUser() principal: Principal,
    @Param('id') id: string,
    @Query('date') date: string,
  ): Promise<BookingResponse[]> {
    const bookings = await this.listSchedule.execute({
      principal,
      roomId: id,
      date,
    });
    return bookings.map((booking) => BookingResponse.from(booking, principal, true));
  }
}
