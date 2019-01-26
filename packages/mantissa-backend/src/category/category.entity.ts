import {
  BaseEntity,
  Column,
  Entity,
  Tree,
  TreeParent,
  TreeChildren,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { ICategory } from '@mantissa/gql-types';

@Entity('categories')
@Tree('closure-table')
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => UserEntity, user => user.categories)
  public user: Promise<UserEntity>;

  @Column({type: 'integer' })
  public props: number;

  @Column('varchar', { length: 30 })
  public name: string;

  @TreeParent()
  public parent: CategoryEntity;

  @TreeChildren()
  public children: CategoryEntity[];

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  public toGqlObject(): ICategory {
    const category: ICategory = {
      id: this.id,
      name: this.name,
      props: this.props,
      children: this.children.map((cat) => cat.toGqlObject())
    };

    return category;
  }
}
