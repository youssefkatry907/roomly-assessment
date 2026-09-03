/** GIVEN. Restricts a route to the listed roles. */
import { SetMetadata } from '@nestjs/common';
import { Role } from './principal';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]): MethodDecorator & ClassDecorator =>
  SetMetadata(ROLES_KEY, roles);
