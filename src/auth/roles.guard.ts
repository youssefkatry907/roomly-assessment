import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

/**
 * Enforces @Roles(). Runs after AuthGuard - think about what that ordering
 * means for how you register the two, and what must happen on a route that
 * carries @Roles() but was never authenticated.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  public constructor(private readonly reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    // TODO(candidate)
    throw new Error('RolesGuard.canActivate is not implemented');
  }
}
