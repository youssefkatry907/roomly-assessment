import { Controller, Get, Param, Query } from '@nestjs/common';

/**
 * Frozen route: GET /rooms/:id/schedule?date=YYYY-MM-DD -> 200.
 * A malformed or missing `date` is a 400, not a 500.
 */
@Controller('rooms')
export class RoomController {
  public constructor() {
    // TODO(candidate)
  }

  @Get(':id/schedule')
  public async schedule(@Param('id') id: string, @Query('date') date: string): Promise<unknown> {
    // TODO(candidate)
    throw new Error('RoomController.schedule is not implemented');
  }
}
