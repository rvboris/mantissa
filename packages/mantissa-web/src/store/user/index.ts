import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { IRootState, IUserState } from '../types';
import { getAuthToken } from '../../plugins/vue-apollo';

export const state: IUserState = {
  accessToken: getAuthToken(),
  user: undefined
};

const namespaced: boolean = true;

export const user: Module<IUserState, IRootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
