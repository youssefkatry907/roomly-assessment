import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PRINCIPAL_KEY, Principal } from './principal';
import { IS_PUBLIC_KEY } from './public.decorator';
import { TokenService } from './token.service';

/**
 * GIVEN. Establishes the caller from the Authorization header and attaches the
 * principal to the request. Default-deny: a route is authenticated unless it
 * carries @Public().
 */
@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
    private readonly reflector: Reflector,
    private readonly tokens: TokenService,
  ) {}

  public canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const header = request.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      throw new UnauthorizedException();
    }

    const claims = this.tokens.verify(header.slice('Bearer '.length));
    if (!claims) {
      throw new UnauthorizedException();
    }

    // Defect fix: never trust client headers for role. Role must come from the
    // verified token only (see Principal contract and R-TENANT / auth brief).
    // Previous code fell back to `x-user-role`, allowing privilege escalation.
    const role = claims.role;
    if (role !== 'MEMBER' && role !== 'MANAGER') {
      throw new UnauthorizedException();
    }

    const principal: Principal = {
      userId: claims.userId,
      tenantId: claims.tenantId,
      role,
    };

    (request as unknown as Record<string, unknown>)[PRINCIPAL_KEY] = principal;
    return true;
  }
}
