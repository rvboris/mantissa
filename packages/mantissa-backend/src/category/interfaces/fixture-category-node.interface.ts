import { ICategoryBaseNode } from './category-base-node.interface';
import { CategoryEntity } from '../category.entity';

export interface IFixtureCategoryNode extends ICategoryBaseNode {
  name: string,
  props: number,
  children?: IFixtureCategoryNode[],
  parent: CategoryEntity
}
