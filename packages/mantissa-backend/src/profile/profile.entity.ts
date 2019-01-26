
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  Column
} from 'typeorm';
import { CurrencyEntity } from '../currency/currency.entity';
import { UserEntity } from '../user/user.entity';
import { IResolvableEntity } from '../common/interfaces/resolver.interface';
import { IProfile } from '@mantissa/gql-types';

@Entity('profiles')
export class ProfileEntity extends BaseEntity implements IResolvableEntity<Promise<IProfile>> {
  @PrimaryGeneratedColumn()
  public id: number;

  @OneToOne(() => UserEntity, user => user.profile)
  public user: Promise<UserEntity>;

  @ManyToOne(() => CurrencyEntity)
  public baseCurrency: Promise<CurrencyEntity>

  @Column('varchar', { length: 10 })
  public locale: string;

  @Column('smallint')
  public timezoneOffset: number;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  public async toGqlObject(): Promise<IProfile> {
    const profile: IProfile = {
      id: this.id,
      baseCurrency: (await this.baseCurrency).toGqlObject(),
      locale: this.locale,
      timeZoneOffset: this.timezoneOffset
    };

    return profile;
  }
}
