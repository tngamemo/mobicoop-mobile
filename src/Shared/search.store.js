import http from './http.mixin'

export const searchStore = {
  state: {
    statusSearch: '',
    statusGeo: '',
    resultsSearch: [],
    resultsGeo: [],
    display: {
      origin: '',
      destination: ''
    },
    searchObject: {
      search: true,
      role: 3,
      frequency: 1,
      outwardWaypoints: [],
      outwardDate: null,
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

  },
  actions: {
    // Search Long/Lat of a city
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
  },
  getters : {

  }
}

export default { searchStore };
