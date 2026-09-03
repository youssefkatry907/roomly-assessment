/**
 * FROZEN CONTRACT - do not modify.
 *
 * The authenticated caller, as established by AuthGuard from a verified token.
 * This - and only this - is the source of the caller's identity, tenant and
 * role. Nothing equivalent arriving in a request body, query string or header
 * may be trusted.
 */
export type Role = 'MEMBER' | 'MANAGER';

export interface Principal {
  readonly userId: string;
  readonly tenantId: string;
  readonly role: Role;
}

/** The key under which AuthGuard attaches the principal to the request. */
export const PRINCIPAL_KEY = 'principal';
