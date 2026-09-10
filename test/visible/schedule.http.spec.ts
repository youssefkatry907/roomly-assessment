import request from 'supertest';
import { createTestApp, TestApp } from '../support/test-app';
import { ALICE, ROOM_ATRIUM, DAY } from '../support/fixtures';

describe('GET /rooms/:id/schedule', () => {
  let ctx: TestApp;

  beforeEach(async () => {
    ctx = await createTestApp();
  });

  afterEach(async () => {
    await ctx.close();
  });

  it('returns the confirmed bookings for the day, ordered by start', async () => {
    const server = ctx.app.getHttpServer();
    const create = (from: string, to: string) =>
      request(server)
        .post('/bookings')
        .set('Authorization', ctx.bearer(ALICE))
        .send({
          roomId: ROOM_ATRIUM.id,
          startsAt: `${DAY}T${from}:00.000Z`,
          endsAt: `${DAY}T${to}:00.000Z`,
          attendeeCount: 2,
        })
        .expect(201);

    await create('14:00', '15:00');
    await create('10:00', '11:00');

    const response = await request(server)
      .get(`/rooms/${ROOM_ATRIUM.id}/schedule`)
      .query({ date: DAY })
      .set('Authorization', ctx.bearer(ALICE))
      .expect(200);

    expect(response.body).toHaveLength(2);
    expect(new Date(response.body[0].startsAt).getUTCHours()).toBe(10);
    expect(new Date(response.body[1].startsAt).getUTCHours()).toBe(14);
  });

  it('answers 400 for a malformed date', async () => {
    await request(ctx.app.getHttpServer())
      .get(`/rooms/${ROOM_ATRIUM.id}/schedule`)
      .query({ date: 'last-tuesday' })
      .set('Authorization', ctx.bearer(ALICE))
      .expect(400);
  });

  it('answers 400 for an impossible calendar day', async () => {
    await request(ctx.app.getHttpServer())
      .get(`/rooms/${ROOM_ATRIUM.id}/schedule`)
      .query({ date: '2026-02-31' })
      .set('Authorization', ctx.bearer(ALICE))
      .expect(400);
  });
});
