import { Auth } from '@mantissa/auth';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { SessionEntity } from './session.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>
  ) {}

  public async findByKey(key: string): Promise<SessionEntity|undefined> {
    return this.sessionRepository.findOne({ key });
  }

  public async create(user: UserEntity): Promise<SessionEntity> {
    const sessionKey = await Auth.generateSessionKey(user.id.toString());
    const session = new SessionEntity();

    session.user = Promise.resolve(user);
    session.key = sessionKey;

    return session.save();
  }
}
