import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { ratesFixture } from './fixtures/rates';
import { RateEntity } from './rate.entity';
import { CurrencyEntity } from '../currency/currency.entity';

@Injectable()
export class RateService {
  constructor(
    @InjectEntityManager()
    private readonly ratesEntityManager: EntityManager,
    @InjectRepository(CurrencyEntity)
    private readonly currencyRepository: Repository<CurrencyEntity>
  ) {}

  public async loadFixtures(): Promise<void> {
    const currencyList = await this.currencyRepository.find();

    return this.ratesEntityManager.transaction(async (manager) => {
      const isRatesEmpty = await manager.count(RateEntity) === 0;

      if (isRatesEmpty) {
        for (const fixture of ratesFixture) {
          const currencyForRate = currencyList.find((currency) => currency.code === fixture.code);

          if (!currencyForRate) {
            continue;
          }

          const rate = new RateEntity();

          rate.rate = fixture.rate;
          rate.currency = Promise.resolve(currencyForRate);

          await manager.save(rate);
        }
      }
    });
  }
}
