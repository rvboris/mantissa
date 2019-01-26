import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './account.entity';
import { AccountService } from './account.service';
import { CurrencyModule } from '../currency/currency.module';
import { AccountResolver } from './account.resolver';

@Module({
  imports: [CurrencyModule, TypeOrmModule.forFeature([AccountEntity])],
  providers: [AccountService, AccountResolver],
  exports: [AccountService]
})
export class AccountModule {}
