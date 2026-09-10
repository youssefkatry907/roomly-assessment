import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { CurrentUser } from '../../auth/current-user.decorator';
import { Principal } from '../../auth/principal';
import { CancelBookingHandler } from '../application/cancel-booking/cancel-booking.handler';
import { CreateBookingHandler } from '../application/create-booking/create-booking.handler';
import { GetBookingHandler } from '../application/get-booking/get-booking.handler';
import { BookingResponse } from './dto/booking.response';
import { CreateBookingDto } from './dto/create-booking.dto';

/**
 * HTTP only. Parse, delegate, shape the response. No business rule, no
 * repository, no `new Date()`.
 *
 * The ROUTES are a frozen contract - the test suite calls exactly these paths
 * and expects exactly these status codes:
 *   POST /bookings            -> 201
 *   POST /bookings/:id/cancel -> 200
 *   GET  /bookings/:id        -> 200
 */
@Controller('bookings')
export class BookingController {
  public constructor(
    private readonly createBooking: CreateBookingHandler,
    private readonly cancelBooking: CancelBookingHandler,
    private readonly getBooking: GetBookingHandler,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @CurrentUser() principal: Principal,
    @Body() dto: CreateBookingDto,
  ): Promise<BookingResponse> {
    const booking = await this.createBooking.execute({
      principal,
      roomId: dto.roomId,
      startsAt: dto.startsAt,
      endsAt: dto.endsAt,
      attendeeCount: dto.attendeeCount,
    });
    return BookingResponse.from(booking, principal);
  }

  @Post(':id/cancel')
  @HttpCode(HttpStatus.OK)
  public async cancel(
    @CurrentUser() principal: Principal,
    @Param('id') id: string,
  ): Promise<BookingResponse> {
    const booking = await this.cancelBooking.execute({ principal, bookingId: id });
    return BookingResponse.from(booking, principal);
  }

  @Get(':id')
  public async getOne(
    @CurrentUser() principal: Principal,
    @Param('id') id: string,
  ): Promise<BookingResponse> {
    const booking = await this.getBooking.execute({ principal, bookingId: id });
    return BookingResponse.from(booking, principal);
  }
}
