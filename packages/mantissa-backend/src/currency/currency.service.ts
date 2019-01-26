import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CurrencyEntity } from './currency.entity';
import { currencyFixture } from './fixtures/currency';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    @InjectRepository(CurrencyEntity)
    private readonly currencyRepository: Repository<CurrencyEntity>
  ) {}

  public async loadFixtures(): Promise<void> {
    return this.entityManager.transaction(async (manager) => {
      const isCurrencyEmpty = await manager.count(CurrencyEntity) === 0;

      if (isCurrencyEmpty) {
        for (const fixture of currencyFixture) {
          const currency = new CurrencyEntity();

          currency.symbol = fixture.symbol;
          currency.decimalDigits = fixture.decimalDigits;
          currency.rounding = fixture.rounding;
          currency.code = fixture.code;

          await manager.save(currency);
        }
      }
    });
  }

  public async findCurrencyByCode(currencyCode: string): Promise<CurrencyEntity|undefined> {
    return this.currencyRepository.findOne({
      code: currencyCode
    });
  }
}
