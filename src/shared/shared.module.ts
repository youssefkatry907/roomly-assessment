import { Global, Module } from '@nestjs/common';
import { AppConfig } from '../config/app.config';
import { CLOCK } from '../shared/clock/clock.port';
import { SystemClock } from '../shared/clock/system.clock';
import { TokenService } from '../auth/token.service';

/** Shared infrastructure visible to feature modules (clock, typed config, tokens). */
@Global()
@Module({
  providers: [
    AppConfig,
    TokenService,
    { provide: CLOCK, useClass: SystemClock },
  ],
  exports: [AppConfig, TokenService, CLOCK],
})
export class SharedModule {}
