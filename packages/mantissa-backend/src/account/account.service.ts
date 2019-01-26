import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { AccountEntity } from './account.entity';
import { UserEntity } from '../user/user.entity';
import { CurrencyService } from '../currency/currency.service';
import { AccountType } from '@mantissa/shared-types';
import { accountsFixtures } from './fixtures';
import { CurrencyEntity } from '../currency/currency.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly currencyService: CurrencyService
  ) {}

  public async createAccounts(user: UserEntity, locale: string):Promise<AccountEntity[]> {
    const accountFixtures = accountsFixtures[locale];

    return this.entityManager.transaction(async (manager) => {
      return Promise.all<AccountEntity>(accountFixtures.map(async (accountFixture) => {
        const currency = await this.currencyService.findCurrencyByCode(accountFixture.currencyCode);

        if (!currency) {
          throw new Error(`currency code "${accountFixture.currencyCode}" not found`);
        }

        const account = new AccountEntity();

        account.name = accountFixture.name;
        account.currency = Promise.resolve(currency);
        account.type = AccountType.Personal;
        account.user = Promise.resolve(user);

        return manager.save(account);
      }));
    });
  }

  public async findAccountById(user: UserEntity, id: number): Promise<AccountEntity|undefined> {
    return this.accountRepository.findOne(id, { where: { user }});
  }

  public async createSystemAccount(user: UserEntity, options: { manager?: EntityManager, type: AccountType, currency: CurrencyEntity }): Promise<AccountEntity> {
    const account = new AccountEntity();

    account.name = '';
    account.currency = Promise.resolve(options.currency);
    account.type = options.type;
    account.user = Promise.resolve(user);

    return options.manager ? options.manager.save(account) : account.save();
  }

  public async findAccounts(user: UserEntity, accountType: AccountType): Promise<AccountEntity[]> {
    return this.accountRepository.find({ where: { user }}).then((accounts) => {
      return accounts.filter((account) => account.type & accountType);
    });
  }
}
