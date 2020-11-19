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
import {isPlatform} from "@ionic/core";

export const registerStore = {
  state: {
    statusRegister: '',
    statusValidateToken: '',
    statusCheckEmail: '',
    displayAddress : '',
    addresses: [],
    userToRegister: null,
    checkEmailErrorMessage: null,
  },
  mutations: {
    register_request(state) {
      state.statusRegister = 'loading';
    },

    register_success(state) {
      state.statusRegister = 'success';
    },

    register_error(state) {
      state.statusRegister = 'error';
    },

    validate_token_request(state) {
      state.statusValidateToken = 'loading';
    },

    validate_token_success(state) {
      state.statusValidateToken = 'success';
    },

    validate_token_error(state) {
      state.statusValidateToken = 'error';
    },

    check_email_request(state) {
      state.statusCheckEmail = 'loading';
    },

    check_email_success(state, err) {
      state.checkEmailErrorMessage = null
      state.statusCheckEmail = 'success';
    },


    check_email_error(state, err) {
      if (err.response && err.response.data) {
        state.checkEmailErrorMessage = err.response.data["hydra:description"];
      }
      state.statusCheckEmail = 'error';
    },

    register_update (state, value) {
      state.userToRegister = value;
    },

    changeRegisterAddress(state, payload) {
      state.userToRegister.addresses = [payload.addressDTO];
      state.displayAddress = payload.displayGeo;
    },

    register_reset(state) {
      let n = new Date();
      n.setFullYear(n.getFullYear() - process.env.VUE_APP_REGISTER_MIN_AGE);

      state.userToRegister = {
        status: 1,
          givenName: '',
          familyName: '',
          gender: '',
          telephone: '',
          email: '',
          password: '',
          confirmPassword: '',
          communityId: null,
          multiTransportMode: true,
          userAgreementAccepted: false,
          phoneDisplay: 1,
          birthDate: JSON.parse(process.env.VUE_APP_REQUIRED_BIRTHDATE) ? n.toISOString() : null,
          maxDeviationTime:600,
          maxDeviationDistance:10000,
          anyRouteAsPassenger:false,
          newsSubscription:true,
          mobileRegistration: 1,
          language: "fr_FR",
          addresses: '',
      };
      state.displayAddress = '';
    }

  },
  actions: {
    // Register
    register: ({commit, state}) => {
      commit('register_request');
      const u = Object.assign({}, state.userToRegister);
      delete u.registerFromMobile;
      delete u.confirmPassword;
      delete u.addresses[0].id;
      delete u.addresses[0].geoJson;
      u.mobileRegistration = 1;
      if (isPlatform(window.document.defaultView, "ios")) {
        u.mobileRegistration = 2;
      }
      if (isPlatform(window.document.defaultView, "android")) {
        u.mobileRegistration = 3;
      }
      if(u.communityId) {
        u.communityId = Number(u.communityId)
      }
      if(!u.gender) {
        u.gender = 3
      }

      return new Promise((resolve, reject) => {
        http.post("/users/register", u).then(resp => {
          if (resp) {
            commit('register_success');
            resolve(resp)
          }
        }).catch(err => {
          commit('register_error');
          reject(err)
        })
      })
    },
    validateToken: ({commit, state}, params) => {
      commit('validate_token_request');
      let mobile = '';
      if (isPlatform(window.document.defaultView, "ios")) {
        mobile = '?mobile=1'
      }
      if (isPlatform(window.document.defaultView, "android")) {
        mobile = '?mobile=2'
      }

      return new Promise((resolve, reject) => {
        http.post("/login-token" + mobile, params).then(resp => {
          if (resp) {
            const tokenUser = resp.data.token;
            localStorage.setItem('tokenUser', tokenUser);
            commit('auth_success', tokenUser);

            commit('validate_token_success');
            resolve(resp)
          }
        }).catch(err => {
          commit('validate_token_error');
          reject(err)
        })
      })
    },
    checkEmail: ({commit, state}, params) => {
      commit('check_email_request');
      return new Promise((resolve, reject) => {
        http.get("/users/checkEmail?email=" + params).then(resp => {
          if (resp.data && resp.data.error) {
            commit('check_email_error', err);
            reject(false)
          } else {
            commit('check_email_success');
            resolve(true)
          }
        }).catch(err => {
          commit('check_email_error', err);
          reject(false)
        })
      })
    },
  },
  getters : {

  }
}

export default { registerStore };
