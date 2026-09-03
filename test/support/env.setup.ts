/**
 * GIVEN. The environment the test suite boots with. Your configuration layer
 * must be satisfied by exactly these variables - and must refuse to boot if
 * one of them is missing.
 */
process.env.NODE_ENV = 'test';
process.env.PORT = '3000';
process.env.JWT_SECRET = 'test-secret-not-used-in-production';
process.env.MAX_ACTIVE_BOOKINGS_PER_USER = '3';
process.env.CANCELLATION_CUTOFF_MINUTES = '60';
