import Vue from 'vue'
import Vuex from 'vuex'
import { userStore } from './user.store';
import { searchStore } from './search.store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userStore: userStore,
    searchStore: searchStore
  }
})
