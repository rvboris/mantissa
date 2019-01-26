import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { AccountEntity } from '../account/account.entity';
import { CategoryEntity } from '../category/category.entity';
import { IResolvableEntity } from '../common/interfaces/resolver.interface';
import { IEntry } from '@mantissa/gql-types';

@Entity('entries')
export class EntryEntity extends BaseEntity implements IResolvableEntity<Promise<IEntry>> {
  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne(() => UserEntity, user => user.entries)
  public user!: Promise<UserEntity>;

  @Column('character', { length: 1024 })
  public description!: string;

  @Column('numeric')
  public amount!: number;

  @ManyToOne(() => AccountEntity)
  public credit!: Promise<AccountEntity>;

  @ManyToOne(() => AccountEntity)
  public debit!: Promise<AccountEntity>;

  @ManyToOne(() => CategoryEntity)
  public category!: Promise<CategoryEntity>;

  @Column('numeric', { default: 1 })
  public currencyRatio!: number;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  public factDate!: Date;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  public async toGqlObject(): Promise<IEntry> {
    const entry: IEntry = {
      id: this.id,
      amount: this.amount,
      debit: await (await this.debit).toGqlObject(),
      credit: await (await this.credit).toGqlObject(),
      factDate: this.factDate,
      description: this.description
    };

    return entry;
  }
}
