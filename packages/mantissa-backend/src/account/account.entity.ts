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
import { CurrencyEntity } from '../currency/currency.entity';
import { IResolvableEntity } from '../common/interfaces/resolver.interface';
import { IAccount } from '@mantissa/gql-types';

@Entity('accounts')
export class AccountEntity extends BaseEntity implements IResolvableEntity<Promise<IAccount>> {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @ManyToOne(() => UserEntity, user => user.accounts)
  public user: Promise<UserEntity>;

  @ManyToOne(() => CurrencyEntity, { eager: true })
  public currency: Promise<CurrencyEntity>;

  @Column({type: 'integer' })
  public type: number;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  public async toGqlObject(): Promise<IAccount> {
    const account: IAccount = {
      id: this.id,
      name: this.name,
      currency: (await this.currency).toGqlObject(),
      type: this.type
    };

    return account;
  }
}
