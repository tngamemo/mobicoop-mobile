import Vue from 'vue'
import Vuex from 'vuex'
import { userStore } from './user.store';
import { searchStore } from './search.store';
import { registerStore } from './register.store';
import { carpoolStore } from './carpool.store';
import { messageStore } from "./message.store";
import { sliderStore } from './slider.store';
import { articleStore } from './article.store';
import { appStore } from './app.store';
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    userStore: userStore,
    searchStore: searchStore,
    registerStore: registerStore,
    carpoolStore: carpoolStore,
    messageStore: messageStore,
    sliderStore: sliderStore,
    appStore: appStore,
    articleStore: articleStore
  }
})
