import Vue from 'vue';
import { MutationTree } from 'vuex';
import { IAccountState } from '../types';

export const mutations: MutationTree<IAccountState> = {
  setAccounts(state, accounts) {
    Vue.set(state, 'accounts', accounts);
  }
};
