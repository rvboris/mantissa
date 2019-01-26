import get from 'lodash/get';
import { ActionTree } from 'vuex';
import { IRootState, IAccountState } from '../types';
import { getApolloClient } from '../../plugins/vue-apollo';
import { ErrorCode } from '@mantissa/error-codes';
import { gqlRunner } from '../../graphql/helpers/gql-runner';
import { IAccount } from '@mantissa/gql-types';
import GqlAccounts from '../../graphql/account/accounts.gql';

export const actions: ActionTree<IAccountState, IRootState> = {
  async getAccounts({ commit }): Promise<void> {
    const apolloClient = getApolloClient();

    return gqlRunner<void>(async () => {
      const result = await apolloClient.query({
        query: GqlAccounts
      });

      const accounts: IAccount[] = get(result, 'data.accounts');

      if (!accounts) {
        return Promise.reject(ErrorCode[ErrorCode.UNKNOWN]);
      }

      commit('setAccounts', accounts);
    });
  }
};
