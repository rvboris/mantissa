import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthenticationError } from 'apollo-server';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { ErrorCode } from '@mantissa/error-codes';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  public getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  public handleRequest(err, user, info) {
    if (err || !user) {
      throw err || info || new AuthenticationError(ErrorCode[ErrorCode.UNAUTHORIZED]);
    }

    return user;
  }
}
