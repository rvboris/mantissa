import { GetterTree } from 'vuex';
import { IRootState, IUserState } from '../types';

export const getters: GetterTree<IUserState, IRootState> = {
  isLoggedIn(state): boolean {
    return !!state.accessToken;
  },

  emailName(state): string {
    if (!state.user) {
      return '';
    }

    return state.user.email.substring(0, state.user.email.lastIndexOf('@'));
  }
};
