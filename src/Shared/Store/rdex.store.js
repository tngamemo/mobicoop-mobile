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

export const rdexStore = {
  state: {
    statusRdex: '',
    resultRdex: []
  },
  mutations: {
    rdex_search_request(state) {
      state.statusRdex = 'loading';
      state.resultRdex = [];
    },

    rdex_search_success(state, resultSearch) {
      state.statusRdex = 'success';
      state.resultRdex = resultSearch;
    },

    rdex_search_error(state) {
      state.statusRdex = 'error';
      state.resultRdex = [];
    },

  },
  actions: {

    /**
     * Fonction qui effectue la recherche
     */
    searchRdex({ commit, rootState }) {
      commit('rdex_search_request');
      return new Promise((resolve, reject) => {

        // date: moment(rootState.searchStore.searchObject.outwardDate).format('YYYY-MM-DDTHH:mm:ssZ'),
        const data = {
          driver: (rootState.searchStore.searchObject.role == 1 || rootState.searchStore.searchObject.role == 3)? 1 : 0,
          passenger: (rootState.searchStore.searchObject.role == 2 || rootState.searchStore.searchObject.role == 3)? 1 : 0,
          from_latitude : rootState.searchStore.searchObject.outwardWaypoints[0].latitude,
          from_longitude : rootState.searchStore.searchObject.outwardWaypoints[0].longitude,
          to_latitude : rootState.searchStore.searchObject.outwardWaypoints[1].latitude,
          to_longitude : rootState.searchStore.searchObject.outwardWaypoints[1].longitude,
        };

        http.get("/external_journeys", {params: data}).then(resp => {
            if (resp) {
              commit('rdex_search_success', resp.data["hydra:member"]);
              resolve(resp)
            }
        }).catch(err => {
            commit('rdex_search_error');
            reject(err)
        })

      })
    },

  },
  getters: {

  }
};

export default { rdexStore };
