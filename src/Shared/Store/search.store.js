import http from '../Mixin/http.mixin'

export const searchStore = {
  state: {
    statusSearch: '',
    statusGeo: '',
    resultsSearch: [],
    resultsGeo: [],
    display: {
      origin: '',
      destination: '',
      outwardDate: ''
    },
    searchObject: {
      search: true,
      role: 3,
      frequency: 1,
      outwardWaypoints: [],
      outwardDate: new Date(),
      userId: null,
    },

  },
  mutations: {
    geo_request(state) {
      state.statusGeo = 'loading';
    },

    geo_succes(state, resultGeo) {
      state.statusGeo = 'success';
      state.resultsGeo = resultGeo;
    },

    geo_error(state) {
      state.statusGeo = 'error';
      state.resultGeo = [];
    },

    search_request(state) {
      state.statusSearch = 'loading';
      state.resultSearch = [];
    },

    search_succes(state, resultSearch) {
      state.statusSearch = 'success';
      state.resultSearch = resultSearch;
    },

    search_error(state) {
      state.statusSearch = 'error';
      state.resultSearch = [];
    },

    changeUserIdOfSearch(state, userId) {
      state.searchObject.userId = userId
    },

    changeOrigin(state, payload) {
      state.searchObject.outwardWaypoints[0] = payload.addressDTO;
      state.display.origin = payload.displayGeo;
    },

    changeDestination(state, payload) {
      state.searchObject.outwardWaypoints[1] = payload.addressDTO;
      state.display.destination = payload.displayGeo;
    }

  },
  actions: {

    /**
     * Fonction qui retourne des addresses en fonction d'un string
     */
    geoSearch: ({commit}, params) => {
      commit('geo_request')
      return new Promise((resolve, reject) => {
        http.get("/addresses/search?q=" + params.searchQuery).then(resp => {
          if (resp) {
            commit('geo_succes', resp.data["hydra:member"])
            resolve(resp)
          }
        }).catch(err => {
          commit('geo_error')
          reject(err)
        })
      })
    },

    /**
     * Fonction qui intervetit l'origine et la desitnation
     */
    swapDestinationAndOrigin({commit, state}) {
      state.searchObject.outwardWaypoints.reverse();
      const newOrigin = state.display.destination;
      const newDestination = state.display.origin;

      state.display.destination = newDestination;
      state.display.origin = newOrigin;
    },

    /**
     * Fonction qui effectue la recherche
     */
    searchCarpools({commit, getters}) {
      commit('search_request')
      return new Promise((resolve, reject) => {

        const data = Object.assign({}, getters.searchObject);
        if (data.frequency == 2) {
          delete data.outwardDate;
        }

        http.post("/carpools", data).then(resp => {
          if (resp) {
            commit('search_succes', resp.data["results"])
            resolve(resp)
          }
        }).catch(err => {
          commit('search_error')
          reject(err)
        })
      })
    },
  },

  getters : {
    searchOrigin: state => {
      return state.searchObject.outwardWaypoints[0];
    },

    searchDestination: state => {
      return state.searchObject.outwardWaypoints[1];
    },

    displayOrigin: state => {
      return state.display.origin;
    },

    displayDestination: state => {
      return state.display.destination;
    },

    searchObject: state => {
      return state.searchObject;
    },

    resultSearch: state => {
      return state.resultSearch;
    },

    statusSearch: state => {
      return state.statusSearch;
    },
  }
}

export default { searchStore };
