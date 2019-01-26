import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { EntryEntity } from '../entry/entry.entity';
import { ILedgerRaw } from './interfaces/ledger-raw.interface';

@Injectable()
export class LedgerService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager
  ) {}

  public async getLedgers(userId: number): Promise<ILedgerRaw[]> {
    return this.entityManager.transaction(async (manager) => {
      const credit = new Set(await manager.createQueryBuilder(EntryEntity, 'entry')
        .select('entry.creditId', 'accountId')
        .addSelect('entry.amount * entry.currencyRatio', 'amount')
        .addSelect('factDate')
        .where('entry.userId = :userId', { userId })
        .getRawMany());

      const debit = new Set(await manager.createQueryBuilder(EntryEntity, 'entry')
        .select('entry.debitId', 'accountId')
        .addSelect('0.0 - (entry.amount * entry.currencyRatio)', 'amount')
        .addSelect('factDate')
        .where('entry.userId = :userId', { userId })
        .getRawMany());

      return Array.from(new Set([...credit, ...debit]));
    });
  }

  public async getLedgersOnDate(userId: number, created: Date): Promise<ILedgerRaw[]> {
    const ledgers = await this.getLedgers(userId);

    return ledgers.filter((entry) => {
      return entry.factDate <= created;
    });
  }
}
