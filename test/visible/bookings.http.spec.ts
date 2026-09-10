import request from 'supertest';
import { createTestApp, TestApp } from '../support/test-app';
import { ALICE, BOB, ROOM_ATRIUM, DAY } from '../support/fixtures';

describe('POST /bookings', () => {
  let ctx: TestApp;

  beforeEach(async () => {
    ctx = await createTestApp();
  });

  afterEach(async () => {
    await ctx.close();
  });

  const body = {
    roomId: ROOM_ATRIUM.id,
    startsAt: `${DAY}T10:00:00.000Z`,
    endsAt: `${DAY}T11:00:00.000Z`,
    attendeeCount: 4,
  };

  it('rejects an unauthenticated request', async () => {
    await request(ctx.app.getHttpServer()).post('/bookings').send(body).expect(401);
  });

  it('creates a booking for the authenticated caller', async () => {
    const response = await request(ctx.app.getHttpServer())
      .post('/bookings')
      .set('Authorization', ctx.bearer(ALICE))
      .send(body)
      .expect(201);

    expect(response.body).toMatchObject({
      roomId: ROOM_ATRIUM.id,
      status: 'CONFIRMED',
      attendeeCount: 4,
    });
    expect(response.body.id).toEqual(expect.any(String));
  });

  it('refuses a second booking on the same slot with 409', async () => {
    await request(ctx.app.getHttpServer())
      .post('/bookings')
      .set('Authorization', ctx.bearer(ALICE))
      .send(body)
      .expect(201);

    await request(ctx.app.getHttpServer())
      .post('/bookings')
      .set('Authorization', ctx.bearer(ALICE))
      .send(body)
      .expect(409);
  });

  it('answers 400 when the body is malformed', async () => {
    await request(ctx.app.getHttpServer())
      .post('/bookings')
      .set('Authorization', ctx.bearer(ALICE))
      .send({ ...body, attendeeCount: 'four' })
      .expect(400);
  });

  it('answers 400 when timestamps lack a timezone', async () => {
    await request(ctx.app.getHttpServer())
      .post('/bookings')
      .set('Authorization', ctx.bearer(ALICE))
      .send({
        ...body,
        startsAt: `${DAY}T10:00:00.000`,
        endsAt: `${DAY}T11:00:00.000`,
      })
      .expect(400);
  });

  it('leaves /health public', async () => {
    await request(ctx.app.getHttpServer()).get('/health').expect(200, { status: 'ok' });
  });
});

describe('POST /bookings/:id/cancel', () => {
  let ctx: TestApp;

  beforeEach(async () => {
    ctx = await createTestApp();
  });

  afterEach(async () => {
    await ctx.close();
  });

  it('answers 404 when a member cancels another member booking', async () => {
    const created = await request(ctx.app.getHttpServer())
      .post('/bookings')
      .set('Authorization', ctx.bearer(ALICE))
      .send({
        roomId: ROOM_ATRIUM.id,
        startsAt: `${DAY}T10:00:00.000Z`,
        endsAt: `${DAY}T11:00:00.000Z`,
        attendeeCount: 2,
      })
      .expect(201);

    await request(ctx.app.getHttpServer())
      .post(`/bookings/${created.body.id}/cancel`)
      .set('Authorization', ctx.bearer(BOB))
      .expect(404);
  });
});
