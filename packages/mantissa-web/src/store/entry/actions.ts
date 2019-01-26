import get from 'lodash/get';
import { ActionTree } from 'vuex';
import { IRootState, IEntryState } from '../types';
import { getApolloClient } from '../../plugins/vue-apollo';
import { ErrorCode } from '@mantissa/error-codes';
import { gqlRunner } from '../../graphql/helpers/gql-runner';
import { IEntry, ICreditInput, IListInput } from '@mantissa/gql-types';
import GqlCreateCreditOperation from '../../graphql/entry/create-credit-operation.gql';
import GqlEntries from '../../graphql/entry/entries.gql';

export const actions: ActionTree<IEntryState, IRootState> = {
  async getEntries({ commit }, input: IListInput): Promise<void> {
    const apolloClient = getApolloClient();

    const defaultVariables = {
      offset: 0,
      limit: 100,
      period: {
        from: new Date(),
        to: new Date()
      }
    };

    return gqlRunner<void>(async () => {
      const result = await apolloClient.query({
        query: GqlEntries,
        variables: {...defaultVariables, ...input}
      });

      const entries: IEntry[] = get(result, 'data.entries', []);

      commit('setEntries', entries);
    });
  },

  async createCreditOperation({ commit }, input: ICreditInput): Promise<void> {
    const apolloClient = getApolloClient();

    return gqlRunner<void>(async () => {
      const result = await apolloClient.mutate({
        mutation: GqlCreateCreditOperation,
        variables: input
      });

      const entry: IEntry = get(result, 'data.createCreditOperation');

      if (!entry) {
        return Promise.reject(ErrorCode[ErrorCode.UNKNOWN]);
      }
    });
  }
};
