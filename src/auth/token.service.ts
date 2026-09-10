import { Injectable } from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { Principal, Role } from './principal';

/**
 * GIVEN - a deliberately small stand-in for a real identity provider. Tokens
 * are `base64url(payload).base64url(hmac)`. You should not need to change how
 * this signs or verifies.
 */
@Injectable()
export class TokenService {
  private readonly secret: string;

  public constructor() {
    // Defect fix: no default value. A missing JWT_SECRET must fail
    // (previous `?? 'dev-secret-change-me'` would mint forgeable tokens in
    // production if the env var was omitted).
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is required and must not be empty.');
    }
    this.secret = secret;
  }

  public sign(principal: Principal): string {
    const payload = Buffer.from(JSON.stringify(principal)).toString('base64url');
    return `${payload}.${this.hmac(payload)}`;
  }

  public verify(token: string): Principal | null {
    const [payload, signature] = token.split('.');
    if (!payload || !signature) {
      return null;
    }

    const expected = Buffer.from(this.hmac(payload));
    const actual = Buffer.from(signature);
    if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
      return null;
    }

    try {
      const claims = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as Partial<Principal>;
      if (typeof claims.userId !== 'string' || typeof claims.tenantId !== 'string') {
        return null;
      }
      return {
        userId: claims.userId,
        tenantId: claims.tenantId,
        role: claims.role as Role,
      };
    } catch {
      return null;
    }
  }

  private hmac(payload: string): string {
    return createHmac('sha256', this.secret).update(payload).digest('base64url');
  }
}
