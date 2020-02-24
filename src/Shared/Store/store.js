import Vue from 'vue'
import Vuex from 'vuex'
import { userStore } from './user.store';
import { searchStore } from './search.store';
import { registerStore } from './register.store';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    userStore: userStore,
    searchStore: searchStore,
    registerStore: registerStore
  }
})
