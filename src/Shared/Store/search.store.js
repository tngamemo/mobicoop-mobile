/**

 Copyright (c) 2018, MOBICOOP. All rights reserved.
 This project is dual licensed under AGPL and proprietary licence.

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 GNU Affero General Public License for more details.
 You should have received a copy of the GNU Affero General Public License
 along with this program. If not, see <gnu.org/licenses>.

 Licence MOBICOOP described in the file
 LICENSE
 **************************/

import http from '../Mixin/http.mixin'
import moment from 'moment'

export const searchStore = {
  state: {
    statusSearch: '',
    statusGeo: '',
    statusCoordinate: '',
    resultSearch: [],
    resultsGeo: [],
    previousSearch: [],
    display: {
      origin: '',
      destination: '',
      outwardDate: ''
    },
    searchObject: {
      search: true,
      role: 3,
      frequency: !!process.env.VUE_APP_DEFAULT_CARPOOL_FREQUENCY ? parseInt(process.env.VUE_APP_DEFAULT_CARPOOL_FREQUENCY) : 1,
      outwardWaypoints: [],
      outwardDate: new Date(),
      userId: null,
      adId: null
    },

  },
  mutations: {
    geo_request(state) {
      state.statusGeo = 'loading';
    },

    geo_coordinate_request(state) {
      state.statusCoordinate = 'loading';
    },

    geo_succes(state, resultGeo) {
      state.statusGeo = 'success';
      state.resultsGeo = resultGeo;
    },

    geo_coordinate_success(state, resultGeo) {
      state.statusCoordinnate = 'success';
    },

    geo_error(state) {
      state.statusGeo = 'error';
      state.resultGeo = [];
    },

    geo_coordinate_error(state) {
      state.statusCoordinate = 'error';
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
    },

    changePreviousSearch(state, previousSearch) {
      state.previousSearch = previousSearch;
    },

    reset_search_object(state) {
      state.searchObject.adId = null
    }

  },
  actions: {

    /**
     * Fonction qui retourne des addresses en fonction d'un string
     */
    geoSearch: ({ commit }, params) => {
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
     * Fonction qui retourne des addresses en fonction d'une latitude, longitude
     */
    getAddressesByCoordinate: ({ commit }, params) => {
      commit('geo_coordinate_request');
      return new Promise((resolve, reject) => {
        http.get("/addresses/reverse?latitude=" +  params.latitude + "&longitude=" + params.longitude).then(resp => {
          if (resp) {
            commit('geo_coordinate_success', resp.data["hydra:member"]);
            resolve(resp)
          }
        }).catch(err => {
          commit('geo_coordinate_error');
          reject(err)
        })
      })
    },

    /**
     * Fonction qui intervetit l'origine et la desitnation
     */
    swapDestinationAndOrigin({ commit, state }) {
      state.searchObject.outwardWaypoints.reverse();
      const newOrigin = state.display.destination;
      const newDestination = state.display.origin;

      state.display.destination = newDestination;
      state.display.origin = newOrigin;
    },

    /**
     * Fonction qui effectue la recherche
     */
    searchCarpools({ commit, getters }, filters) {
      commit('search_request')
      return new Promise((resolve, reject) => {

        const data = Object.assign({}, getters.searchObject);
        if (data.frequency == 2) {
          delete data.outwardDate;
        }

        if (!!filters && !!filters.communities) {
          data.communities = filters.communities
        }

        if (data.adId) {
          http.get("/carpools/" + data.adId, data).then(resp => {
            if (resp) {
              commit('search_succes', resp.data["results"])
              resolve(resp)
            }
          }).catch(err => {
            commit('search_error')
            reject(err)
          })
        } else {
          http.post( "/carpools", data).then(resp => {
            if (resp) {
              commit('search_succes', resp.data["results"])
              resolve(resp)
            }
          }).catch(err => {
            commit('search_error')
            reject(err)
          })
        }

      })
    },

    getDirectPointSearch({ }, payload) {

      let query = '';
      payload.addresses.forEach((add, index, array) => {
        query += `points[${index}][longitude]=${add.longitude}&points[${index}][latitude]=${add.latitude}`;
        if (index !== array.length - 1) {
          query += '&';
        }
      });

      return new Promise((resolve, reject) => {
        return http.get(`/directions/search?${query}`)
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },

    setPreviousSearch({ commit, getters }, address) {
      let previousSearch = getters.previousSearch;

      previousSearch = previousSearch.filter(item => item.county !== address.county);
      previousSearch.unshift(address);

      previousSearch = previousSearch.slice(0, 3)

      // previousSearch.push(address);
      commit('changePreviousSearch', previousSearch)
    },

    checkOutWardDate({commit, state}) {
      let date = moment(state.searchObject.outwardDate);
      const todayDate = moment();
      if (date.isBefore(todayDate)) {
        state.searchObject.outwardDate = new Date();
      }
    }
  },

  getters: {
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

    previousSearch: state => {
      return state.previousSearch;
    }
  }
}

export default { searchStore };
