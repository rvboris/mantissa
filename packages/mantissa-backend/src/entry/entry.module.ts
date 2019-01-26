import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntryEntity } from './entry.entity';
import { EntryService } from './entry.service';
import { AccountModule } from '../account/account.module';
import { CategoryModule } from '../category/category.module';
import { EntryResolver } from './entry.resolver';

@Module({
  imports: [AccountModule, CategoryModule, TypeOrmModule.forFeature([EntryEntity])],
  providers: [EntryService, EntryResolver],
  exports: [EntryService]
})
export class EntryModule {}
