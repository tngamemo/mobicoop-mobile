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

export const reviewStore = {
  state: {
    statusReviews: '',
    resultReviews: null
  },
  mutations: {
    review_search_request(state) {
      state.statusReviews = 'loading';
      state.resultReviews = null;
    },

    review_search_success(state, resultSearch) {
      state.statusReviews = 'success';
      state.resultReviews = resultSearch;
    },

    review_search_error(state) {
      state.statusReviews = 'error';
      state.resultReviews = null;
    },

  },
  actions: {

    /**
     * Fonction qui récupère les reviews
     */
    getReviews({ commit }) {
      commit('review_search_request');
      return new Promise((resolve, reject) => {
        http.get("/review_dashboards" ).then(resp => {
            if (resp) {
              commit('review_search_success', resp.data);
              resolve(resp)
            }
        }).catch(err => {
            commit('review_search_error');
            reject(err)
        })
      })
    },
    sendReview({ commit }, review) {
      commit('review_search_request');

      delete review.id;
      delete review.send;
      delete review.left;
      delete review.date;
      delete review['@id'];
      delete review['@type'];
      review.reviewed = review.reviewed["@id"];
      review.reviewer = review.reviewer["@id"];

      return new Promise((resolve, reject) => {
        http.post("/reviews", review ).then(resp => {
          if (resp) {
            resolve(resp)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },

  },
  getters: {

  }
};

export default { reviewStore };
