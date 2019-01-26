import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

import { user } from './user';
import { account } from './account';
import { category } from './category';
import { entry } from './entry';
import { IRootState } from './types';

Vue.use(Vuex);

const store: StoreOptions<IRootState> = {
  state: {
    version: '1.0.0'
  },
  modules: {
    user,
    account,
    category,
    entry
  }
};

export default new Vuex.Store<IRootState>(store);
