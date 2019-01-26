import { Auth } from '@mantissa/auth';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { ProfileEntity } from '../profile/profile.entity';
import { IRegisterInput } from '@mantissa/gql-types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  public async findById(id: number): Promise<UserEntity|undefined> {
    return this.userRepository.findOne(id);
  }

  public async findByEmail(email: string): Promise<UserEntity|undefined> {
    return this.userRepository.findOne({ email });
  }

  public async countByEmail(email: string): Promise<number> {
    return this.userRepository.count({ email });
  }

  public async register(input: IRegisterInput, profile: ProfileEntity): Promise<UserEntity> {
    const user = new UserEntity();

    user.email = input.email;
    user.password = await Auth.hash(input.password);
    user.profile = Promise.resolve(profile);

    return user.save();
  }
}
