import get from 'lodash/get';
import { ActionTree } from 'vuex';
import { IUserState, IRootState } from '../types';
import { getApolloClient, onSignIn, onSignOut } from '../../plugins/vue-apollo';
import { ErrorCode } from '@mantissa/error-codes';
import { IUser } from '@mantissa/gql-types';
import { gqlRunner } from '../../graphql/helpers/gql-runner';
import GqlUserRegister from '../../graphql/user/register.gql';
import GqlUserSignIn from '../../graphql/user/sign-in.gql';
import GqlUserSignOut from '../../graphql/user/sign-out.gql';
import GqlUserInfo from '../../graphql/user/info.gql';

export const actions: ActionTree<IUserState, IRootState> = {
  async register({ commit }, { email, password }: { email: string, password: string}): Promise<string> {
    const apolloClient = getApolloClient();

    return gqlRunner<Promise<string>>(async (): Promise<string> => {
      const result = await apolloClient.mutate({
        mutation: GqlUserRegister,
        variables: {
          email,
          password
        }
      });

      const accessToken: string = get(result, 'data.register');

      if (!accessToken) {
        return Promise.reject(ErrorCode[ErrorCode.UNKNOWN]);
      }

      commit('setAccessToken', accessToken);
      onSignIn(apolloClient, accessToken);

      return accessToken;
    });
  },

  async signIn({ commit }, { email, password }: { email: string, password: string}): Promise<string> {
    const apolloClient = getApolloClient();

    return gqlRunner<Promise<string>>(async (): Promise<string> => {
      const result = await apolloClient.query({
        query: GqlUserSignIn,
        variables: {
          email,
          password
        }
      });

      const accessToken: string = get(result, 'data.signIn');

      if (!accessToken) {
        return Promise.reject(ErrorCode[ErrorCode.UNKNOWN]);
      }

      commit('setAccessToken', accessToken);
      onSignIn(apolloClient, accessToken);

      return accessToken;
    });
  },

  async signOut({ commit }): Promise<void> {
    const apolloClient = getApolloClient();

    return gqlRunner<Promise<void>>(async (): Promise<void> => {
      await apolloClient.mutate({ mutation: GqlUserSignOut });
      onSignOut(apolloClient);
      commit('setAccessToken', '');
    });
  },

  async getInfo({ commit }): Promise<void> {
    const apolloClient = getApolloClient();

    return gqlRunner<Promise<void>>(async (): Promise<void> => {
      const result = await apolloClient.query({
        query: GqlUserInfo
      });

      const info: IUser = get(result, 'data.user');

      if (!info) {
        return Promise.reject(ErrorCode[ErrorCode.UNKNOWN]);
      }

      commit('setInfo', info);
    });
  }
};
