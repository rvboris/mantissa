import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { IRootState, ICategoryState } from '../types';

export const state: ICategoryState = {
  categories: undefined
};

const namespaced: boolean = true;

export const category: Module<ICategoryState, IRootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
