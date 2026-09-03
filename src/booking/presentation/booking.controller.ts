import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Principal } from '../../auth/principal';
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
  public constructor() {
    // TODO(candidate)
  }

  @Post()
  public async create(@Body() dto: CreateBookingDto): Promise<unknown> {
    // TODO(candidate)
    throw new Error('BookingController.create is not implemented');
  }

  @Post(':id/cancel')
  public async cancel(@Param('id') id: string): Promise<unknown> {
    // TODO(candidate)
    throw new Error('BookingController.cancel is not implemented');
  }

  @Get(':id')
  public async getOne(@Param('id') id: string): Promise<unknown> {
    // TODO(candidate)
    throw new Error('BookingController.getOne is not implemented');
  }
}
