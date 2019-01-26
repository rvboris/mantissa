import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  UpdateDateColumn
} from 'typeorm';
import { CurrencyEntity } from '../currency/currency.entity';

@Entity('rates')
export class RateEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @OneToOne(() => CurrencyEntity, currency => currency.rates)
  @JoinColumn()
  public currency: Promise<CurrencyEntity>;

  @Column('numeric')
  public rate: number;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
