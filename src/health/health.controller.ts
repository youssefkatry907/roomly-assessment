import { Controller, Get } from '@nestjs/common';
import { Public } from '../auth/public.decorator';

/** GIVEN. The only unauthenticated route in the service. */
@Controller('health')
export class HealthController {
  @Public()
  @Get()
  public check(): { status: string } {
    return { status: 'ok' };
  }
}
