import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { ProfileEntity } from '../profile/profile.entity';
import { CategoryEntity } from '../category/category.entity';
import { EntryEntity } from '../entry/entry.entity';
import { AccountEntity } from '../account/account.entity';
import { IResolvableEntity } from '../common/interfaces/resolver.interface';
import { SessionEntity } from '../auth/session.entity';
import { IUser } from '@mantissa/gql-types';

@Entity('users')
export class UserEntity extends BaseEntity implements IResolvableEntity<Promise<IUser>> {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({unique: true})
  public email: string;

  @Column()
  public password: string;

  @OneToMany(() => SessionEntity, session => session.user)
  public sessions: Promise<SessionEntity[]>

  @OneToOne(() => ProfileEntity, profile => profile.user)
  @JoinColumn()
  public profile: Promise<ProfileEntity>;

  @OneToMany(() => CategoryEntity, category => category.user)
  public categories: Promise<CategoryEntity[]>

  @OneToMany(() => EntryEntity, entry => entry.user)
  public entries: Promise<EntryEntity[]>;

  @OneToMany(() => AccountEntity, account => account.user)
  public accounts: Promise<AccountEntity[]>;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  public async toGqlObject(): Promise<IUser> {
    const user: IUser = {
      email: this.email,
      profile: await (await this.profile).toGqlObject()
    };

    return user;
  }
}
