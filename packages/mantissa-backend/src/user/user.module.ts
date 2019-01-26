import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Env } from '../common/providers/env.provider';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { CategoryModule } from '../category/category.module';
import { ProfileModule } from '../profile/profile.module';
import { CurrencyModule } from '../currency/currency.module';
import { EntryModule } from '../entry/entry.module';
import { AccountModule } from '../account/account.module';
import { LedgerModule } from '../ledger/ledger.module';
import { BalanceModule } from '../balance/balance.module';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    CategoryModule,
    ProfileModule,
    CurrencyModule,
    EntryModule,
    AccountModule,
    LedgerModule,
    BalanceModule,
    AuthModule.forRoot(Env.getInstance()),
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [UserService, UserResolver],
  exports: [UserService]
})
export class UserModule {}
