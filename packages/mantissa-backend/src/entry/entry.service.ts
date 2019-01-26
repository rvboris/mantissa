import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { EntryEntity } from './entry.entity';
import { UserEntity } from '../user/user.entity';
import { AccountService } from '../account/account.service';
import { CategoryService } from '../category/category.service';
import { AccountType } from '@mantissa/shared-types';
import { IDebitInput, ICreditInput, ITransferInput, IListInput } from '@mantissa/gql-types';

@Injectable()
export class EntryService {
  constructor(
    @InjectRepository(EntryEntity)
    private readonly entryRepository: Repository<EntryEntity>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly accountService: AccountService,
    private readonly categoryService: CategoryService
  ) {}

  public async entries(user: UserEntity, input: IListInput): Promise<EntryEntity[]> {
    return this.entryRepository.find({
      where: { user },
      skip: input.offset,
      take: input.limit
    });
  }

  public async createDebitOperation(user: UserEntity, input: IDebitInput): Promise<EntryEntity> {
    return this.entityManager.transaction(async (manager) => {
      const debitAccount = await this.accountService.findAccountById(user, input.accountId);

      if (!debitAccount) {
        throw new Error(`account id ${input.accountId} not found`);
      }

      const category = await this.categoryService.findCategoryById(user, input.categoryId);

      if (!category) {
        throw new Error(`category id ${input.accountId} not found`);
      }

      const creditAccount = await this.accountService.createSystemAccount(user, {
        manager,
        type: AccountType.SystemCredit,
        currency: await debitAccount.currency
      });

      const entry = new EntryEntity();

      entry.user = Promise.resolve(user);
      entry.description = input.description || '';
      entry.amount = input.amount;
      entry.credit = Promise.resolve(creditAccount);
      entry.debit = Promise.resolve(debitAccount);
      entry.category = Promise.resolve(category);
      entry.factDate = input.factDate;

      return manager.save(entry);
    });
  }

  public async updateDebitOperation(user: UserEntity, entryId: number, input: IDebitInput): Promise<EntryEntity> {
    return new EntryEntity();
  }

  public async createCreditOperation(user: UserEntity, input: ICreditInput): Promise<EntryEntity> {
    return this.entityManager.transaction(async (manager) => {
      const creditAccount = await this.accountService.findAccountById(user, input.accountId);

      if (!creditAccount) {
        throw new Error(`account id ${input.accountId} not found`);
      }

      const category = await this.categoryService.findCategoryById(user, input.categoryId);

      if (!category) {
        throw new Error(`category id ${input.accountId} not found`);
      }

      const debitAccount = await this.accountService.createSystemAccount(user, {
        manager,
        type: AccountType.SystemDebit,
        currency: await creditAccount.currency
      });

      const entry = new EntryEntity();

      entry.user = Promise.resolve(user);
      entry.description = input.description || '';
      entry.amount = input.amount;
      entry.credit = Promise.resolve(creditAccount);
      entry.debit = Promise.resolve(debitAccount);
      entry.category = Promise.resolve(category);
      entry.factDate = input.factDate;

      return manager.save(entry);
    });
  }

  public async updateCreditOperation(user: UserEntity, entryId: number, input: ICreditInput): Promise<EntryEntity> {
    return new EntryEntity();
  }

  public async createTransferOperation(user: UserEntity, input: ITransferInput): Promise<EntryEntity> {
    return new EntryEntity();
  }

  public async updateTransferOperation(user: UserEntity, entryId: number, input: ITransferInput): Promise<EntryEntity> {
    return new EntryEntity();
  }

  public async deleteOperation(user: UserEntity, entryId: number): Promise<EntryEntity> {
    return new EntryEntity();
  }
}
