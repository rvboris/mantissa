import Vue from 'vue';
import { MutationTree } from 'vuex';
import { IEntryState } from '../types';

export const mutations: MutationTree<IEntryState> = {
  setEntries(state, entries) {
    Vue.set(state, 'entries', entries);
  }
};
