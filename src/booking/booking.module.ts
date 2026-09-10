import { Module } from '@nestjs/common';
import { CancelBookingHandler } from './application/cancel-booking/cancel-booking.handler';
import { CreateBookingHandler } from './application/create-booking/create-booking.handler';
import { GetBookingHandler } from './application/get-booking/get-booking.handler';
import { ListRoomScheduleHandler } from './application/list-room-schedule/list-room-schedule.handler';
import { BOOKING_REPOSITORY, ROOM_REPOSITORY } from './domain/booking.tokens';
import { InMemoryBookingRepository } from './infrastructure/in-memory-booking.repository';
import { InMemoryRoomRepository } from './infrastructure/in-memory-room.repository';
import { BookingController } from './presentation/booking.controller';
import { RoomController } from './presentation/room.controller';

/**
 * Wire the context: bind each port to its adapter by the token from
 * booking.tokens.ts, register the handlers, expose the controllers.
 *
 * Nothing outside this module should ever import an adapter class.
 */
@Module({
  controllers: [BookingController, RoomController],
  providers: [
    CreateBookingHandler,
    CancelBookingHandler,
    GetBookingHandler,
    ListRoomScheduleHandler,
    { provide: BOOKING_REPOSITORY, useClass: InMemoryBookingRepository },
    { provide: ROOM_REPOSITORY, useClass: InMemoryRoomRepository },
  ],
  exports: [BOOKING_REPOSITORY, ROOM_REPOSITORY],
})
export class BookingModule {}
