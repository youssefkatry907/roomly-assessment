import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

/**
 * The single place a DomainError becomes an HTTP response.
 *
 * Two things to get right. First, the mapping: not every failure is a 400, and
 * R-TENANT constrains what some of them may be. Second, what leaks: a response
 * body must never carry a stack, an internal class name or a message that tells
 * an attacker something they could not otherwise learn.
 *
 * Register it globally. Handlers must never throw an HttpException themselves.
 */
@Catch()
export class DomainExceptionFilter implements ExceptionFilter {
  public catch(exception: unknown, host: ArgumentsHost): void {
    // TODO(candidate)
    throw new Error('DomainExceptionFilter.catch is not implemented');
  }
}
