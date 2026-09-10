import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { DomainError } from '../errors/domain.error';

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
    const response = host.switchToHttp().getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const body = exception.getResponse();
      response.status(status).json(typeof body === 'string' ? { message: body } : body);
      return;
    }

    if (exception instanceof DomainError) {
      const status = DomainExceptionFilter.statusFor(exception.code);
      response.status(status).json({ code: exception.code, message: exception.message });
      return;
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred.',
    });
  }

  private static statusFor(code: string): number {
    switch (code) {
      case 'TIME_SLOT_UNAVAILABLE':
      case 'CANCELLATION_WINDOW_CLOSED':
        return HttpStatus.CONFLICT;
      case 'ROOM_NOT_FOUND':
      case 'BOOKING_NOT_FOUND':
        return HttpStatus.NOT_FOUND;
      case 'BOOKING_ACTION_FORBIDDEN':
        return HttpStatus.FORBIDDEN;
      case 'INVALID_TIME_RANGE':
      case 'OUTSIDE_BUSINESS_HOURS':
      case 'CAPACITY_EXCEEDED':
      case 'BOOKING_QUOTA_EXCEEDED':
      case 'BOOKING_IN_PAST':
      case 'ROOM_INACTIVE':
        return HttpStatus.BAD_REQUEST;
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
