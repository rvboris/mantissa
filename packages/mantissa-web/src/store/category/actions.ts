import get from 'lodash/get';
import { ActionTree } from 'vuex';
import { IRootState, ICategoryState } from '../types';
import { getApolloClient } from '../../plugins/vue-apollo';
import { ErrorCode } from '@mantissa/error-codes';
import { gqlRunner } from '../../graphql/helpers/gql-runner';
import { ICategory } from '@mantissa/gql-types';
import GqlCategories from '../../graphql/category/categories.gql';

export const actions: ActionTree<ICategoryState, IRootState> = {
  async getCategories({ commit }): Promise<void> {
    const apolloClient = getApolloClient();

    return gqlRunner<void>(async () => {
      const result = await apolloClient.query({
        query: GqlCategories
      });

      const categories: ICategory = get(result, 'data.categories');

      if (!categories) {
        return Promise.reject(ErrorCode[ErrorCode.UNKNOWN]);
      }

      commit('setCategories', categories);
    });
  }
};
