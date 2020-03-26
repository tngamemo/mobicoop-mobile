import http from '../Mixin/http.mixin'

export const registerStore = {
  state: {
    statusRegister: '',
    statusValidateToken: '',
    statusCheckEmail: '',
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

    check_email_success(state) {
      state.statusCheckEmail = 'success';
    },

    check_email_error(state) {
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
      delete u.addresses[0].geoJson;
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
      return new Promise((resolve, reject) => {
        http.post("/users/checkSignUpValidationToken", params).then(resp => {
          if (resp) {
            /*
            const tokenUser = resp.data.token
            localStorage.setItem('tokenUser', tokenUser)
            commit('auth_success', tokenUser)
             */
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
          if (resp) {
            commit('check_email_success');
            resolve(true)
          }
        }).catch(err => {
          commit('check_email_success');
          reject(false)
        })
      })
    },
  },
  getters : {

  }
}

export default { registerStore };
