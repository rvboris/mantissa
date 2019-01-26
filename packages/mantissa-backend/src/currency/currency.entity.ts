import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne
} from 'typeorm';
import { RateEntity } from '../rate/rate.entity';
import { IResolvableEntity } from '../common/interfaces/resolver.interface';
import { ICurrency } from '@mantissa/gql-types';

@Entity('currency')
export class CurrencyEntity extends BaseEntity implements IResolvableEntity<ICurrency> {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('varchar', { length: 10 })
  public symbol: string;

  @Column('smallint')
  public decimalDigits: number;

  @Column('numeric')
  public rounding: number;

  @Column('varchar', { length: 5, unique: true })
  public code: string;

  @OneToOne(() => RateEntity, rates => rates.currency)
  public rates: Promise<RateEntity>;

  public toGqlObject(): ICurrency {
    const currency: ICurrency = {
      id: this.id,
      symbol: this.symbol,
      decimalDigits: this.decimalDigits,
      rounding: this.rounding,
      code: this.code
    }

    return currency;
  }
}
