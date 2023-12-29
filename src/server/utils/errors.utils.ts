import { TRPCError } from '@trpc/server';
import { Utils } from 'src/utils';

export class BadRequest400Exception extends TRPCError {
  constructor(message?: string | string[]) {
    super({
      code: 'BAD_REQUEST',
      message: Utils.errors.encodeErrors(message),
    });
  }
}

export class Unauthorized401Exception extends TRPCError {
  constructor(message?: string | string[]) {
    super({
      code: 'UNAUTHORIZED',
      message: Utils.errors.encodeErrors(message),
    });
  }
}

export class Forbidden403Exception extends TRPCError {
  constructor(message?: string | string[]) {
    super({
      code: 'FORBIDDEN',
      message: Utils.errors.encodeErrors(message),
    });
  }
}

export class InternalServerError500Exception extends TRPCError {
  constructor(message?: string | string[]) {
    super({
      code: 'INTERNAL_SERVER_ERROR',
      message: Utils.errors.encodeErrors(message),
    });
  }
}
