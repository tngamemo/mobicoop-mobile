import http from '../Mixin/http.mixin'

export const dynamicStore = {
  state: {
    status: '',
    statusAsk: '',
    state: 1,
    currentDynamic : {},
    currentAsk : {}

  },
  mutations: {
    dynamic_request(state) {
      state.status = 'loading';
    },

    dynamic_ask_request(state) {
      state.statusAsk = 'loading';
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

    dynamic_error(state) {
      state.status = 'error';
    },

    dynamic_ask_error(state) {
      state.statusAsk = 'error';
    },

    reset_current_dynamic(state) {
      state.status = '';
      state.state = 1;
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
      }
    },

    update_position(state, res) {
      console.log("CURRENT");
      console.log( state.currentDynamic);
      console.log("UPDATE");
      console.log(res);
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
        http.put("/dynamic_asks", params ).then(resp => {
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
  },
  getters : {

  }
}

export default { dynamicStore };
