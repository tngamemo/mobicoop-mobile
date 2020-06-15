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

export const publicTransportStore = {
  state: {
    statusSearchPT: '',
    resultSearchPT: []
  },
  mutations: {
    pt_search_request(state) {
      state.statusSearchPT = 'loading';
      state.resultSearchPT = [];
    },

    pt_search_success(state, resultSearch) {
      state.statusSearchPT = 'success';
      state.resultSearchPT = resultSearch;
    },

    pt_search_error(state) {
      state.statusSearchPT = 'error';
      state.resultSearchPT = [];
    },

  },
  actions: {

    /**
     * Fonction qui effectue la recherche
     */
    searchPublicTransports({ commit, rootState }) {
      commit('pt_search_request');
      return new Promise((resolve, reject) => {

        const data = {
          provider: process.env.VUE_APP_PT_PROVIDER,
          apikey: process.env.VUE_APP_PT_APIKEY,
          origin_latitude : rootState.searchStore.searchObject.outwardWaypoints[0].latitude,
          origin_longitude : rootState.searchStore.searchObject.outwardWaypoints[0].longitude,
          destination_latitude : rootState.searchStore.searchObject.outwardWaypoints[1].latitude,
          destination_longitude : rootState.searchStore.searchObject.outwardWaypoints[1].longitude,
          date: moment(rootState.searchStore.searchObject.outwardDate).format('YYYY-MM-DDThh:mm:ssZ'),
          dateType: "departure",
          algorithm: "fastest",
          modes: "PT"
        };

        http.get("/public_transport/journeys", {params: data}).then(resp => {
            if (resp) {
              commit('pt_search_success', resp.data["hydra:member"]);
              resolve(resp)
            }
        }).catch(err => {
            commit('pt_search_error');
            reject(err)
        })

      })
    },

  },
  getters: {

  }
};

export default { publicTransportStore };
