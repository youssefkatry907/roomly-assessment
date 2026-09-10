import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PRINCIPAL_KEY, Principal } from './principal';

/**
 * Hands a controller the verified principal. This is the ONLY way a controller
 * may learn who is calling.
 *
 * SIGNATURE FROZEN - `@CurrentUser() principal: Principal`.
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): Principal => {
    const request = context.switchToHttp().getRequest<Record<string, unknown>>();
    return request[PRINCIPAL_KEY] as Principal;
  },
);
