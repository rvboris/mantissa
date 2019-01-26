import { MutationTree } from 'vuex';
import { IUserState } from '../types';
import { IUser } from '@mantissa/gql-types';

export const mutations: MutationTree<IUserState> = {
  setAccessToken(state, token: string) {
    state.accessToken = token;
  },

  setInfo(state, userInfo: IUser) {
    state.user = userInfo;
  }
};
