import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { IRootState, IEntryState } from '../types';

export const state: IEntryState = {
  entries: []
};

const namespaced: boolean = true;

export const entry: Module<IEntryState, IRootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
