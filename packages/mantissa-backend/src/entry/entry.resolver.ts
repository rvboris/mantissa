import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EntryService } from './entry.service';
import { SessionEntity } from '../auth/session.entity';
import { IEntry, IDebitInput, ICreditInput, ITransferInput, IListInput } from '@mantissa/gql-types';

@Resolver('Entry')
export class EntryResolver {
  constructor(
    private readonly entryService: EntryService
  ) {}

  @Query()
  @UseGuards(new GqlAuthGuard())
  public async entries(@Context('req') { user: session }: { user: SessionEntity }, @Args('input') input: IListInput): Promise<IEntry[]> {
    const entries = await this.entryService.entries(await session.user, input);
    const gqlEntries = entries.map(async (entry) => entry.toGqlObject());

    return Promise.all(gqlEntries);
  }

  @Mutation()
  @UseGuards(new GqlAuthGuard())
  public async createDebitOperation(@Context('req') { user: session }: { user: SessionEntity }, @Args('input') input: IDebitInput): Promise<IEntry> {
    return (await this.entryService.createDebitOperation(await session.user, input)).toGqlObject();
  }

  @Mutation()
  @UseGuards(new GqlAuthGuard())
  public async updateDebitOperation(@Context('req') { user: session }: { user: SessionEntity }, @Args('entryid') entryId: number, @Args('input') input: IDebitInput): Promise<IEntry> {
    return (await this.entryService.updateDebitOperation(await session.user, entryId, input)).toGqlObject();
  }

  @Mutation()
  @UseGuards(new GqlAuthGuard())
  public async createCreditOperation(@Context('req') { user: session }: { user: SessionEntity }, @Args('input') input: ICreditInput): Promise<IEntry> {
    return (await this.entryService.createCreditOperation(await session.user, input)).toGqlObject();
  }

  @Mutation()
  @UseGuards(new GqlAuthGuard())
  public async updateCreditOperation(@Context('req') { user: session }: { user: SessionEntity }, @Args('entryid') entryId: number, @Args('input') input: ICreditInput): Promise<IEntry> {
    return (await this.entryService.updateCreditOperation(await session.user, entryId, input)).toGqlObject();
  }

  @Mutation()
  @UseGuards(new GqlAuthGuard())
  public async createTransferOperation(@Context('req') { user: session }: { user: SessionEntity }, @Args('input') input: ITransferInput): Promise<IEntry> {
    return (await this.entryService.createTransferOperation(await session.user, input)).toGqlObject();
  }

  @Mutation()
  @UseGuards(new GqlAuthGuard())
  public async updateTransferOperation(@Context('req') { user: session }: { user: SessionEntity }, @Args('entryid') entryId: number, @Args('input') input: ITransferInput): Promise<IEntry> {
    return (await this.entryService.updateTransferOperation(await session.user, entryId, input)).toGqlObject();
  }

  @Mutation()
  @UseGuards(new GqlAuthGuard())
  public async deleteOperation(@Context('req') { user: session }: { user: SessionEntity }, @Args('entryid') entryId: number): Promise<IEntry> {
    return (await this.entryService.deleteOperation(await session.user, entryId)).toGqlObject();
  }
}
