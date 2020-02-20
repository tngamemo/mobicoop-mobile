import Vue from 'vue'
import Vuex from 'vuex'
import { userStore } from './user.store'
import { searchStore } from './search.store'
import { solidaryTransportStore } from '../SolidaryTransport/SolidaryTransport.store'

Vue.use(Vuex)

let config = {
  modules: {
    userStore: userStore,
    searchStore: searchStore,
    solidaryTransportStore: solidaryTransportStore
  }
}

export default new Vuex.Store(config)
