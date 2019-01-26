import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { LedgerModule } from '../ledger/ledger.module';

@Module({
  imports: [LedgerModule],
  providers: [BalanceService],
  exports: [BalanceService]
})
export class BalanceModule {}
