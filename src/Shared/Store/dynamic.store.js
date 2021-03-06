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

export const dynamicStore = {
  state: {
    status: '',
    statusActive: '',
    statusAsk: '',
    statusProof: '',
    state: 1,
    destination: null,
    myPosition: {latitude: '', longitude: ''},
    currentDynamic : {},
    currentAsk : {},
    currentProof: {},
    asksLength: 0,
    updatePositionInterval: null
  },
  mutations: {
    dynamic_request(state) {
      state.status = 'loading';
    },

    dynamic_active_request(state) {
      state.statusActive = 'loading';
    },

    dynamic_ask_request(state) {
      state.statusAsk = 'loading';
    },

    dynamic_proof_request(state) {
      state.statusProof = 'loading';
    },

    dynamic_success(state) {
      state.status= 'success';
    },

    dynamic_ask_success(state) {
      state.statusAsk = 'success';
    },

    get_active_dynamic_success(state, res) {
      state.statusActive = 'success';
      console.log(res.data);
      if(res.data['hydra:member'].length > 0) {
        state.state = 2;
        state.currentDynamic = res.data['hydra:member'][0];
      }
    },

    post_dynamic_success(state, res) {
      state.status = 'success';
      state.state = 2;
      state.currentDynamic = res.data;
      if(!state.currentDynamic.asks) {
        state.currentDynamic.asks = []
      }
    },

    post_dynamic_ask_success(state, res) {
      state.statusAsk = 'success';
      state.currentAsk = res.data
    },

    post_dynamic_proof_success(state, res) {
      state.statusProof = 'success';
      state.currentProof = res.data
    },

    dynamic_error(state) {
      state.status = 'error';
    },

    active_dynamic_error(state) {
      state.statusActive = 'error';
    },

    dynamic_ask_error(state) {
      state.statusAsk = 'error';
    },

    dynamic_proof_error(state) {
      state.statusProof = 'error';
    },

    reset_current_dynamic(state) {
      state.status = '';
      state.state = 1;
      state.destination = null;
      state.myPosition = {latitude: '', longitude: ''};
      state.currentDynamic = {
        role: 1,
        priceKm: process.env.VUE_APP_PRICE_BY_KM,
        waypoints:[
          {
            latitude:"48.670788",
            longitude:"6.203443"
          },
          {
            latitude:"48.741958",
            longitude:"7.086686"

          }
        ],
        comment: ''
      },
        state.currentAsk = {};
        state.currentProof = {};
        state.asksLength = 0;
    },

    set_dynamic_destination(state, res) {
      state.destination = res;
    },

    set_dynamic_my_position(state, res) {
      state.myPosition = res;
    },

    set_asks_length(state, res) {
      state.asksLength = res;
    },

    update_position(state, res) {
      console.log(res);
      state.status = 'success';
      res.data.role = state.currentDynamic.role;
      state.currentDynamic = res.data;
        const a =  res.data.asks.find(item => item.id === state.currentAsk.id);
        if (a) {
          state.currentAsk = a;
        }
    }

  },
  actions: {
    // Register
    launchDynamics: ({commit, state}) => {
      commit('dynamic_request');
      return new Promise((resolve, reject) => {
        http.post("/dynamics", state.currentDynamic ).then(resp => {
          if (resp) {
            commit('post_dynamic_success', resp);
            resolve(resp)
          }
        }).catch(err => {
          commit('dynamic_error');
          reject(err)
        })
      })
    },
    getActiveDynamic: ({commit, state}, params) => {
      commit('dynamic_active_request');
      return new Promise((resolve, reject) => {
        http.get("/dynamics/active").then(resp => {
          if (resp) {
            commit('get_active_dynamic_success', resp);
            resolve(resp)
          }
        }).catch(err => {
          commit('active_dynamic_error');
          reject(err)
        })
      })
    },
    putDynamics: ({commit, state}, params) => {
      commit('dynamic_request');
      return new Promise((resolve, reject) => {
        http.put("/dynamics/" + params.id, params.body ).then(resp => {
          if (resp) {
            console.log(resp);
            // Envoi d'une notification
            // passager
            if ( state.currentDynamic.role == 2 && state.currentAsk && state.currentAsk.status == 1 && resp.data.asks.find(item => item.id === state.currentAsk.id).status == 2) {
              console.log('notif passager');
              resp.data.notification = true
            }
            // conducteur
            if( state.currentDynamic.role == 1 && resp.data.asks.length > state.asksLength) {
              console.log('notif conducteur');
              commit('set_asks_length', resp.data.asks.length);
              resp.data.notification = true
            }
            commit(params.result, resp);
            resolve(resp)
          }
        }).catch(err => {
          commit('dynamic_error');
          reject(err)
        })
      })
    },
    postDynamicAsks: ({commit, state}, params) => {
      commit('dynamic_ask_request');
      return new Promise((resolve, reject) => {
        http.post("/dynamic_asks", params ).then(resp => {
          if (resp) {
            commit('post_dynamic_ask_success', resp);
            resolve(resp)
          }
        }).catch(err => {
          commit('dynamic_ask_error');
          reject(err)
        })
      })
    },
    putDynamicAsks: ({commit, state}, params) => {
      commit('dynamic_ask_request');
      return new Promise((resolve, reject) => {
        http.put("/dynamic_asks/" + params.askId, params ).then(resp => {
          if (resp) {
            commit('post_dynamic_ask_success', resp);
            resolve(resp)
          }
        }).catch(err => {
          commit('dynamic_ask_error');
          reject(err)
        })
      })
    },
    postDynamicProofs: ({commit, state}, params) => {
      commit('dynamic_proof_request');
      return new Promise((resolve, reject) => {
        http.post("/dynamic_proofs", params ).then(resp => {
          if (resp) {
            commit('post_dynamic_proof_success', resp);
            resolve(resp)
          }
        }).catch(err => {
          commit('dynamic_proof_error');
          reject(err)
        })
      })
    },
    putDynamicProofs: ({commit, state}, params) => {
      commit('dynamic_proof_request');
      return new Promise((resolve, reject) => {
        http.put("/dynamic_proofs/" + params.proofId, params ).then(resp => {
          if (resp) {
            commit('post_dynamic_proof_success', resp);
            if (state.currentDynamic.role == 2) {
              commit('reset_current_dynamic')
            }
            resolve(resp)
          }
        }).catch(err => {
          commit('dynamic_proof_error');
          reject(err)
        })
      })
    },
  },
  getters : {

  }
}

export default { dynamicStore };
