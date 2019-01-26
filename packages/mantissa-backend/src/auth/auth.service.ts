import { Auth } from '@mantissa/auth';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public createToken({key}: IJwtPayload): string {
    return this.jwtService.sign({key});
  }

  public async validateUser(passwordHash: string, password: string): Promise<boolean> {
    return Auth.validate(passwordHash, password);
  }
}
