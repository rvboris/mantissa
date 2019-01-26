import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Env } from '../common/providers/env.provider';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { SessionService } from './session.service';
import { SessionEntity } from './session.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([SessionEntity])
  ],
  providers: [AuthService, JwtStrategy, SessionService],
  exports: [AuthService, SessionService]
})
export class AuthModule {
  public static forRoot(env: Env): DynamicModule {
    return {
      imports: [
        JwtModule.register({
          secretOrPrivateKey: env.getJWTPrivateKey(),
          signOptions: {
            algorithm: 'ES512',
            expiresIn: env.getJWTExpires()
          },
        })
      ],
      module: AuthModule,
    };
  }
}
