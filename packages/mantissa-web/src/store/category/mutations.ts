import Vue from 'vue';
import { MutationTree } from 'vuex';
import { ICategoryState } from '../types';

export const mutations: MutationTree<ICategoryState> = {
  setCategories(state, categories) {
    Vue.set(state, 'categories', categories);
  }
};
