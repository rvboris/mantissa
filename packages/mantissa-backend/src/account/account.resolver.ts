import { Resolver, Query, Context } from '@nestjs/graphql';
import { UseGuards, Inject } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SessionEntity } from '../auth/session.entity';
import { AccountService } from './account.service';
import { AppLogger } from '../common/providers/app-logger.provider';
import { IAccount } from '@mantissa/gql-types';
import { AccountType } from '@mantissa/shared-types';

@Resolver('Account')
export class AccountResolver {
  constructor(
    private readonly accountService: AccountService,
    @Inject('Logger') private readonly logger: AppLogger
  ) {}

  @Query()
  @UseGuards(new GqlAuthGuard())
  public async accounts(@Context('req') { user: session }: { user: SessionEntity }): Promise<IAccount[]> {
    const user = await session.user;
    const accounts = await this.accountService.findAccounts(user, AccountType.Personal);
    const gqlAccounts = accounts.map(async (account) => account.toGqlObject());

    return Promise.all(gqlAccounts);
  }
}
