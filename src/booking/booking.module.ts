import { Module } from '@nestjs/common';

/**
 * Wire the context: bind each port to its adapter by the token from
 * booking.tokens.ts, register the handlers, expose the controllers.
 *
 * Nothing outside this module should ever import an adapter class.
 */
@Module({})
export class BookingModule {}
