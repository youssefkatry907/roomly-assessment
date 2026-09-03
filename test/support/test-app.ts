import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { CLOCK } from '../../src/shared/clock/clock.port';
import { ROOM_REPOSITORY } from '../../src/booking/domain/booking.tokens';
import { InMemoryRoomRepository } from '../../src/booking/infrastructure/in-memory-room.repository';
import { TokenService } from '../../src/auth/token.service';
import { Principal } from '../../src/auth/principal';
import { FakeClock } from './fake.clock';
import { ALL_ROOMS } from './fixtures';

/**
 * GIVEN. Boots the real application graph with the clock replaced.
 *
 * This is why CLOCK and ROOM_REPOSITORY must be bound as tokens: the suite
 * reaches for them by token and by nothing else.
 */
export interface TestApp {
  readonly app: INestApplication;
  readonly clock: FakeClock;
  readonly tokens: TokenService;
  bearer(principal: Principal): string;
  close(): Promise<void>;
}

export async function createTestApp(nowIso = '2026-04-14T08:00:00.000Z'): Promise<TestApp> {
  const clock = new FakeClock(nowIso);

  const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
    .overrideProvider(CLOCK)
    .useValue(clock)
    .compile();

  const app = moduleRef.createNestApplication();
  await app.init();

  const rooms = app.get<InMemoryRoomRepository>(ROOM_REPOSITORY);
  rooms.seed(ALL_ROOMS);

  const tokens = app.get(TokenService);

  return {
    app,
    clock,
    tokens,
    bearer: (principal: Principal) => `Bearer ${tokens.sign(principal)}`,
    close: () => app.close(),
  };
}
