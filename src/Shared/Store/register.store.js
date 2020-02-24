import http from '../Mixin/http.mixin'

export const registerStore = {
  state: {
    statusRegister: '',
    displayAddress : '',
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

    changeRegisterAddress(state, payload) {
      state.userToRegister.addresses = [payload.addressDTO];
      state.displayAddress = payload.displayGeo;
    },

    register_reset(state) {
      state.userToRegister = {
        status: 1,
          givenName: '',
          familyName: '',
          gender: '',
          telephone: '',
          email: '',
          password: '',
          confirmPassword: '',
          multiTransportMode: true,
          userAgreementAccepted: false,
          phoneDisplay: 1,
          birthDate: new Date().toISOString(),
          maxDeviationTime:600,
          maxDeviationDistance:10000,
          anyRouteAsPassenger:false,
          newsSubscription:true,
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
      delete u.confirmPassword;
      delete u.addresses[0].id;
      return new Promise((resolve, reject) => {
        http.post("/users", u).then(resp => {
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
