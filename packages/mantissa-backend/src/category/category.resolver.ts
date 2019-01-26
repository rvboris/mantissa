import { Resolver, Query, Context } from '@nestjs/graphql';
import { UseGuards, Inject } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SessionEntity } from '../auth/session.entity';
import { AppLogger } from '../common/providers/app-logger.provider';
import { CategoryService } from './category.service';
import { ICategory } from '@mantissa/gql-types';

@Resolver('Category')
export class CategoryResolver {
  constructor(
    private readonly categoryService: CategoryService,
    @Inject('Logger') private readonly logger: AppLogger
  ) {}

  @Query()
  @UseGuards(new GqlAuthGuard())
  public async categories(@Context('req') { user: session }: { user: SessionEntity }): Promise<ICategory|null> {
    const user = await session.user;
    const categories = await this.categoryService.getCategoriesTree(user);

    if (!categories) {
      return null;
    }

    const gqlCategories = categories.toGqlObject();

    return gqlCategories;
  }
}
