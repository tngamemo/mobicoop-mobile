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

export const articleStore = {
  state: {
    statusArticle: '',

  },
  mutations: {
    article_request(state) {
      state.statusArticle = 'loading';
    },

    article_success(state) {
      state.statusArticle = 'success';
    },

    article_error(state) {
      state.statusArticle = 'error';
    }

  },
  actions: {
    // Register
    getArticle: ({commit}, id) => {
      commit('article_request');
      return new Promise((resolve, reject) => {
        http.get("/articles/" + id).then(resp => {
          if (resp) {
            commit('article_success');
            resolve(resp)
          }
        }).catch(err => {
          commit('article_error');
          reject(err)
        })
      })
    },
  },
  getters : {

  }
}

export default { articleStore };
