import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PRINCIPAL_KEY, Principal, Role } from './principal';
import { ROLES_KEY } from './roles.decorator';

/**
 * Enforces @Roles(). Runs after AuthGuard - think about what that ordering
 * means for how you register the two, and what must happen on a route that
 * carries @Roles() but was never authenticated.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  public constructor(private readonly reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[] | undefined>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Record<string, unknown>>();
    const principal = request[PRINCIPAL_KEY] as Principal | undefined;
    if (!principal || !requiredRoles.includes(principal.role)) {
      throw new ForbiddenException();
    }
    return true;
  }
}
