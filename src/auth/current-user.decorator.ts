import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Principal } from './principal';

/**
 * Hands a controller the verified principal. This is the ONLY way a controller
 * may learn who is calling.
 *
 * SIGNATURE FROZEN - `@CurrentUser() principal: Principal`.
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): Principal => {
    // TODO(candidate)
    throw new Error('CurrentUser is not implemented');
  },
);
