import { Injectable } from '@nestjs/common';
import { LedgerService } from '../ledger/ledger.service';
import Big from 'big.js';

@Injectable()
export class BalanceService {
  constructor(
    private readonly ledgerService: LedgerService
  ) {}

  public async getAccountsBalances(userId: number): Promise<Map<number, number>> {
    return this.getAccountsBalancesOnDate(userId, new Date());
  }

  public async getAccountsBalancesOnDate(userId: number, created: Date): Promise<Map<number, number>> {
    const ledgers = await this.ledgerService.getLedgersOnDate(userId, created);
    const balances = new Map<number, number>();

    for (const {amount, accountId} of ledgers) {
      const bAmount = new Big(amount);
      const bCurrentAmount = new Big(balances.get(accountId) || 0);

      balances.set(accountId, +bCurrentAmount.add(bAmount));
    }

    return balances;
  }
}
