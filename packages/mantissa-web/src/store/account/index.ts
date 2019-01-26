import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { IRootState, IAccountState } from '../types';

export const state: IAccountState = {
  accounts: []
};

const namespaced: boolean = true;

export const account: Module<IAccountState, IRootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
