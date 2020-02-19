import http from '../Mixin/http.mixin'

export const registerStore = {
  state: {
    statusRegister: '',
    userToRegister: null
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

    register_update (state, value) {
      state.userToRegister = value;
    },

    register_reset(state) {
      state.userToRegister = {
        status: 1,
          gender: '',
          telephone: "",
          multiTransportMode: true,
          userAgreementAccepted: false,
          phoneDisplay: 1,
          birthDate: new Date(),
          maxDeviationTime:600,
          maxDeviationDistance:10000,
          anyRouteAsPassenger:false,
          newsSubscription:true,
          language: "fr_FR",
          addresses: ""
      }
    }

  },
  actions: {
    // Register
    register: ({commit, state}) => {
      commit('register_request');
      return new Promise((resolve, reject) => {
        http.post("/users", state.userToRegister).then(resp => {
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
  },
  getters : {

  }
}

export default { registerStore };
