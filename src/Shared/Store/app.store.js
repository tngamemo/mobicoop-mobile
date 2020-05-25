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

export const appStore = {
  state: {
    redirectionUrl: '',
    seeSliderLoader: false,
    statusContact: '',
    userCookies: false
  },
  mutations: {
    redirectionUrl_reset(state) {
      state.redirectionUrl = '';
    },

    redirectionUrl_change(state, redirectionUrl) {
      state.redirectionUrl = redirectionUrl;
    },

    init_sliderloader_visibility(state) {
      state.seeSliderLoader = false;
    },

    change_sliderloader_visibility(state) {
      state.seeSliderLoader = !state.seeSliderLoader;
    },

    contact_request(state) {
      state.statusContact = 'loading'
    },

    contact_success(state) {
      state.statusContact = 'success'
    },

    contact_error(state) {
      state.statusContact = 'error'
    },

    changeUserCookies(state, value) {
      state.userCookies = value
    }
  },
  actions: {
    sendContact({commit}, payload) {
      return new Promise((resolve, reject) => {
        commit('contact_request');
        http.post(`/contacts`, payload)
          .then(resp => {
            commit('contact_success');
            resolve(resp)
          })
          .catch(err => {
            commit('contact_error');
            reject(err)
          })
      })
    },
  },
  getters: {
    redirectionUrl: state => {
      return state.redirectionUrl
    },

    getSliderLoader: state => {
      return state.seeSliderLoader;
    },

    statusContact: state => {
      return state.statusContact;
    },

    userCookies: state => {
      return state.userCookies;
    }
  }
}

export default { appStore };
