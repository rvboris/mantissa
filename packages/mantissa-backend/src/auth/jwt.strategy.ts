import { Inject, Injectable } from '@nestjs/common';
import { AuthenticationError } from 'apollo-server';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ErrorCode } from '@mantissa/error-codes';
import { Env } from '../common/providers/env.provider';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { SessionService } from './session.service';
import { SessionEntity } from './session.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('Env') env: Env,
    private readonly sessionService: SessionService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.getJWTPublicKey()
    });
  }

  public async validate({ key }: IJwtPayload):Promise<SessionEntity> {
    if (!key) {
      throw new AuthenticationError(ErrorCode[ErrorCode.UNAUTHORIZED]);
    }

    const session = await this.sessionService.findByKey(key);

    if (!session) {
      throw new AuthenticationError(ErrorCode[ErrorCode.UNAUTHORIZED]);
    }

    return session;
  }
}
