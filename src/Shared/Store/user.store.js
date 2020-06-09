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
import { isPlatform } from "@ionic/core";

export const userStore = {
  state: {
    status: '',
    tokenUser: localStorage.getItem('tokenUser') || '',
    tokenAnonymousUser: localStorage.getItem('tokenAnonymousUser') || '',
    user: null,
    userToUpdate: null,
    statusAlerts: '',
    statusUpdateAlert: '',
    alerts: [],
    statusMyCarpools: '',
    myCarpools: [],
    statusAcceptedCarpools: '',
    acceptedCarpools: [],
    statusUserCommunities: '',
    userCommunities: null,
    resetPasswordStatus: '',
    statusDeleteUser: '',
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },

    auth_success(state, tokenUser) {
      state.tokenUser = tokenUser;
    },

    auth_error(state) {
      state.status = 'error';
    },

    auth_anonymous_success(state, tokenAnonymousUser) {
      state.tokenAnonymousUser = tokenAnonymousUser;
    },

    user_request_success(state, user) {
      state.status = 'success';
      state.user = user;
    },

    user_alerts_request(state) {
      state.statusAlerts = 'loading';
    },

    user_alerts_error(state) {
      state.statusAlerts = 'error';
    },

    user_update_alerts_request(state) {
      state.statusUpdateAlert = 'loading';
    },

    user_update_alerts_error(state) {
      state.statusUpdateAlert = 'error';
    },

    user_alerts_request_success(state, data) {
      state.statusAlerts = 'success';
      state.statusUpdateAlert = 'success';
      state.alerts = data.alerts;
    },

    user_my_carpools_request(state) {
      state.statusMyCarpools = 'loading';
    },

    user_my_carpools_error(state) {
      state.statusMyCarpools = 'error';
    },

    user_my_carpools_request_success(state, data) {
      state.statusMyCarpools = 'success';
      state.myCarpools = data['hydra:member'].reverse();
    },

    user_accepted_carpools_request(state) {
      state.statusAcceptedCarpools = 'loading';
    },

    user_accepted_carpools_error(state) {
      state.statusAcceptedCarpools = 'error';
    },

    user_accepted_carpools_request_success(state, data) {
      state.statusAcceptedCarpools = 'success';
      state.acceptedCarpools = data['hydra:member'].reverse();
    },


    logout(state) {
      state.status = '';
      state.tokenUser = '';
      state.user = null;
      state.statusUserCommunities = '',
      state.userCommunities = null;
    },

    user_communities_request(state) {
      state.statusUserCommunities = 'loading';
    },

    user_communities_success(state, userCommunities){
      state.statusUserCommunities = 'success';
      state.userCommunities = userCommunities;
    },

    user_communities_error(state){
      state.statusUserCommunities = 'error';
    },

    updateUserAddress(state, payload) {
      state.userToUpdate.addresses = [payload.addressDTO];
    },

    reset_password_request(state) {
      state.resetPasswordStatus = 'loading';
    },

    reset_password_success(state){
      state.resetPasswordStatus = 'success';
    },

    reset_password_error(state){
      state.resetPasswordStatus = 'error';
    },

    delete_user_request(state) {
      state.statusDeleteUser = 'loading';
    },

    delete_user_success(state){
      state.statusDeleteUser = 'success';
    },

    delete_user_error(state){
      state.statusDeleteUser = 'error';
    },

  },
  actions: {
    login({commit}, params) {
      commit('auth_request')
      let mobile = '';
      if (isPlatform(window.document.defaultView, "ios")) {
        mobile = '?mobile=1'
      }
      if (isPlatform(window.document.defaultView, "android")) {
        mobile = '?mobile=2'
      }

      return new Promise((resolve, reject) => {
        http.post("/login" + mobile, {"username": params.username, "password": params.password})
          .then(resp => {
            if (resp) {
              const tokenUser = resp.data.token
              localStorage.setItem('tokenUser', tokenUser)
              commit('auth_success', tokenUser)
              resolve(resp)
            }
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('tokenUser')
            reject(err)
          })
      })
    },

    /**
     * Fonction qui permet d'autentifier un utilisateur de maniére anonyme.
     * Pour pouvoir accéder au fonctionnalité de base en mode déco.
     */

    authAnonymousUser({commit, dispatch}){
      dispatch('logout');
      return new Promise((resolve, reject) => {
        http.post("/auth", {"username": process.env.VUE_APP_API_USERNAME, "password": process.env.VUE_APP_API_PASSWORD})
          .then(resp => {

            const tokenAnonymousUser = resp.data.token
            localStorage.setItem('tokenAnonymousUser', tokenAnonymousUser)

            // On commit et envoie le resultat
            commit('auth_anonymous_success', tokenAnonymousUser)
            resolve(resp)
          })
          .catch(err => {
            localStorage.removeItem('tokenAnonymousUser')
            reject(err)
          })
      })
    },

    /**
     * Fonction pour récupérer les informations d'un utilisateur
     */
    getUser({commit}, params) {
      return new Promise((resolve, reject) => {
        http.get(`/users/${params.idUser}`)
          .then(resp => {

            // On commit et envoie le resultat
            commit('user_request_success', resp.data)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            console.log(err)
            reject(err)
          })
      })
    },

    updateUser({commit}, params) {
      commit('auth_request');
      return new Promise((resolve, reject) => {
        delete params.addresses[0].id;
        delete params.addresses[0].geoJson;
        delete params.images;
        delete params.proEmail;
        http.put(`/users/${params.id}`, params)
          .then(resp => {

            // On commit et envoie le resultat
            commit('user_request_success', resp.data);
            resolve(resp)
          })
          .catch(err => {
            console.log(err);
            reject(err)
          })
      })
    },

    updateUserPicture({commit}, params) {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('userFile', params.file);
        formData.append('userId', Number(params.userId));

        http.post(`/images`, formData)
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    deleteImage({commit}, id) {
      return new Promise((resolve, reject) => {
        http.delete(`/images/` + id)
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    logout({commit}) {
      return new Promise((resolve, reject) => {
        commit('logout');
        localStorage.removeItem('tokenUser');
        resolve()
      })
    },

    getMyCarpools({commit}, userId) {
      commit('user_my_carpools_request');
      return new Promise((resolve, reject) => {
        http.get(`/carpools`)
          .then(resp => {
            commit('user_my_carpools_request_success', resp.data);
            resolve(resp)
          })
          .catch(err => {
            commit('user_my_carpools_error');
            reject(err)
          })
      })
    },

    getAcceptedCarpools({commit}, userId) {
      commit('user_accepted_carpools_request');
      return new Promise((resolve, reject) => {
        http.get(`/carpools/accepted`)
          .then(resp => {
            commit('user_accepted_carpools_request_success', resp.data);
            resolve(resp)
          })
          .catch(err => {
            commit('user_accepted_carpools_error');
            reject(err)
          })
      })
    },

    deleteCarpool({commit, state, dispatch}, carpoolId) {
      commit('user_my_carpools_request');
      return new Promise((resolve, reject) => {
        http.delete(`/carpools/${carpoolId}`)
          .then(resp => {
            dispatch('getMyCarpools', state.user.id);
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    /**
     * Fonction pour récupérer les informations d'un utilisateur
     */
    getUserCommunities({commit, getters}, params){
      return new Promise((resolve, reject) => {
        commit('user_communities_request');
        http.get(`/communities/ismember`)
        .then(resp => {
          // On commit et envoie le resultat
          commit('user_communities_success', resp.data['hydra:member'])
          resolve(resp)
        })
        .catch(err => {
          commit('user_communities_error');
          console.log(err);
          reject(err)
        })
      })
    },

    getAlerts({commit}, userId) {
      commit('user_alerts_request');
      return new Promise((resolve, reject) => {
        http.get(`/users/${userId}/alerts`)
          .then(resp => {
            commit('user_alerts_request_success', resp.data);
            resolve(resp)
          })
          .catch(err => {
            commit('user_alerts_request');
            reject(err)
          })
      })
    },

    updateAlert({commit}, params) {
      commit('user_update_alerts_request');
      const alert = {
        alerts: {[params.alertId]: params.alertValue},
      };
      return new Promise((resolve, reject) => {
        http.put(`/users/${params.userId}/alerts`, alert)
          .then(resp => {
            commit('user_alerts_request_success', resp.data);
            resolve(resp)
          })
          .catch(err => {
            commit('user_update_alerts_error');
            reject(err)
          })
      })
    },

  generatePhoneToken({commit}, id) {
    return new Promise((resolve, reject) => {
      http.get(`/users/${id}/generate_phone_token`)
        .then(resp => {
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  checkPhoneTokenPost({commit}, params) {
    return new Promise((resolve, reject) => {
      http.post(`/users/checkPhoneToken`, params)
        .then(resp => {
          commit('user_request_success', resp.data);
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
    resetPassword({commit}, params) {
      return new Promise((resolve, reject) => {
        commit('reset_password_request');
        http.post(`/users/password_update_request`, params)
          .then(resp => {
            commit('reset_password_success');
            resolve(resp)
          })
          .catch(err => {
            commit('reset_password_error');
            reject(err)
          })
      })
    },
    deleteUser({commit, state}) {
      return new Promise((resolve, reject) => {
        commit('delete_user_request');
        http.delete(`/users/` + state.user.id)
          .then(resp => {
            commit('delete_user_success');
            resolve(resp)
          })
          .catch(err => {
            commit('delete_user_error');
            reject(err)
          })
      })
    },
    /**
     * Fonction pour récupérer les informations d'un utilisateur
     */
    postPushToken({commit}, params) {
      let mobile = 0;
      if (isPlatform(window.document.defaultView, "ios")) {
        mobile = 1
      }
      if (isPlatform(window.document.defaultView, "android")) {
        mobile = 2
      }
      return new Promise((resolve, reject) => {
        http.post(`/push_token`, { token: params, type: mobile })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

  },
  getters : {

    userId: state => {
      return !! state.user && state.user.id
    },

    user: state => {
      return !! state.user && state.user
    },

    tokenUser: state => {
      return !! state.tokenUser && state.tokenUser
    },

    userCommunities: state => {
      return state.userCommunities
    },

    statusUserCommunities: state => {
      return state.statusUserCommunities
    }
  }
}

export default {userStore};
