import * as Joi from 'joi';

/**
 * Boot-time validation of the environment.
 *
 * Requirements: every variable in .env.example is REQUIRED, there are NO
 * defaults, numbers arrive as numbers, and an invalid or missing variable
 * stops the process rather than being papered over.
 */
export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string().required(),
  PORT: Joi.number().integer().required(),
  JWT_SECRET: Joi.string().min(1).required(),
  MAX_ACTIVE_BOOKINGS_PER_USER: Joi.number().integer().min(1).required(),
  CANCELLATION_CUTOFF_MINUTES: Joi.number().integer().min(0).required(),
}).unknown(true);
