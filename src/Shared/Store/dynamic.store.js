import http from '../Mixin/http.mixin'

export const dynamicStore = {
  state: {
    status: '',
    statusAsk: '',
    statusProof: '',
    state: 1,
    destination: null,
    myPosition: {latitude: '', longitude: ''},
    currentDynamic : {},
    currentAsk : {},
    currentProof: {},
    asksLength: 0

  },
  mutations: {
    dynamic_request(state) {
      state.status = 'loading';
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


    post_dynamic_success(state, res) {
      state.status = 'success';
      state.state = 2;
      state.currentDynamic = res.data
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
    putDynamics: ({commit, state}, params) => {
      commit('dynamic_request');
      return new Promise((resolve, reject) => {
        http.put("/dynamics/" + params.id, params.body ).then(resp => {
          if (resp) {
            // Envoi d'une notification
            if ( state.currentDynamic.role == 2 && state.currentAsk && state.currentAsk.status == 1 && resp.data.status == 2) {
              resp.notification = true
            }
            if( state.currentDynamic.role == 1 && resp.data.asks.length > state.asksLength) {
              commit('set_asks_length', state.currentDynamic.asks.length);
              resp.notification = true
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
        http.post("/dynamic_proofs/" + params.proofId, params ).then(resp => {
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
  },
  getters : {

  }
}

export default { dynamicStore };
