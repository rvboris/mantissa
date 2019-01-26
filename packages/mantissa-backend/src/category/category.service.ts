import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { categoriesFixture } from './fixtures';
import { UserEntity } from '../user/user.entity';
import { IFixtureCategoryNode } from './interfaces/fixture-category-node.interface';
import { ICategoryBaseNode } from './interfaces/category-base-node.interface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>
  ) {}

  public async findCategoryById(user: UserEntity, id: number) {
    return this.categoryRepository.findOne(id, { where: { user }});
  }

  public async createCategories(user: UserEntity, locale: string): Promise<void> {
    return this.entityManager.transaction(async (manager) => {
      const categoriesTreeFixture: IFixtureCategoryNode = categoriesFixture[locale];

      await this.walkTree<CategoryEntity>(categoriesTreeFixture, undefined, async ({node, parent}):Promise<CategoryEntity> => {
        const category = new CategoryEntity();
        category.name = node.name;
        category.props = node.props;

        if (parent) {
          category.parent = parent;
        }

        category.user = Promise.resolve(user);

        return manager.save(category);
      })
    });
  }

  public async walkTree<T>(node: ICategoryBaseNode, parent: T|undefined, callback: (entityData: { node: ICategoryBaseNode, parent: T|undefined }) => Promise<T>) {
    const category = await callback({
      node,
      parent
    });

    if (node.children) {
        for (const child of node.children) {
            await this.walkTree(child, category, callback);
        }
    }
  }

  public async getCategoriesTree(user: UserEntity): Promise<CategoryEntity | undefined> {
    const rootCategory = await this.categoryRepository
      .createQueryBuilder('categories')
      .where('categories."parentId" is null and categories."userId" = :userId', { userId: user.id })
      .getOne();

    if (!rootCategory) {
      return;
    }

    return this.entityManager
      .getTreeRepository(CategoryEntity)
      .findDescendantsTree(rootCategory);
  }
}
