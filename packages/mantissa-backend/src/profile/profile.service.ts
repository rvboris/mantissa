import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { CurrencyEntity } from '../currency/currency.entity';

interface ICreateProfileArgs {
  baseCurrency: CurrencyEntity,
  locale: string,
  timezoneOffset: number
}

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>
  ) {}

  public async createProfile({baseCurrency, locale, timezoneOffset}: ICreateProfileArgs): Promise<ProfileEntity> {
    const profile = new ProfileEntity();

    profile.baseCurrency = Promise.resolve(baseCurrency);
    profile.locale = locale;
    profile.timezoneOffset = timezoneOffset;

    return profile.save();
  }
}
