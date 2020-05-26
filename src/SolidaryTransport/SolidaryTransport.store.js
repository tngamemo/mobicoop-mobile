import http from '../Shared/Mixin/http.mixin'
import {isPlatform} from "@ionic/core";

export const solidaryTransportStore = {
  state: {
    help: {
      article: undefined,
      status: '' // loading | success | error
    },
    register: {
      status: undefined,
      defaultUser: {
        status: 1,
        givenName: undefined,
        familyName: undefined,
        email: undefined,
        gender: 0,
        birthDate: undefined,
        telephone: undefined,
        phoneDisplay: 1,
        smoke: 0,
        mobile: true,
        language: "fr_FR",
        addresses: [''],
        mobileRegistration: 1,
        userAgreementAccepted: false
      }
    },
    temporary: {
      user: {
        status: 1,
        givenName: undefined,
        familyName: undefined,
        email: undefined,
        gender: 0,
        birthDate: undefined,
        telephone: undefined,
        phoneDisplay: 1,
        smoke: 0,
        mobile: true,
        language: "fr_FR",
        addresses: [''],
        mobileRegistration: 1,
        userAgreementAccepted: false
      },
      address: {
        object: {},
        display: ''
      },
      request: {

      },
      ad: {

      }
    }
  },
  mutations: {
    // Help Mutations below
    solidaryHelpRequest(state) {
      state.help.status = 'loading';
    },

    solidaryHelpSuccess(state, article){
      state.help.status = 'success';
      state.help.article = article
    },

    solidaryHelpError(state){
      state.help.status = 'error';
    },

    // Register Mutations below
    solidaryRegisterUserRequest(state) {
      state.register.status = 'loading';
    },

    solidaryRegisterUserSuccess(state, user){
      state.register.status = 'success';
      state.register.article = article
    },

    solidaryRegisterUserError(state){
      state.register.status = 'error';
    },

    // Temporary Objects mutation below
    solidaryUserUpdate(state, user) {
      console.log('solidaryUserUpdate')
      state.temporary.user = user
    },
    solidaryAddressUpdate(state, address) {
      console.log('solidaryAddressUpdate')
      state.temporary.address.object = address
      state.temporary.address.display = `${address.addressLocality}, ${address.addressCountry}`
    },
    solidaryUserAddressUpdate(state, address) {
      console.log('solidaryUserAddressUpdate')
      state.temporary.user.addresses[0] = address
    }
  },
  actions: {
    getSolidaryArticle({commit, state}, id){
      if (state.help.status === 'success') {
        return new Promise((resolve, reject) => {
          resolve(state.help.article)
        })
      } else {
        commit('solidaryHelpRequest')
        return new Promise((resolve, reject) => {
          http.get("/articles/" + id)
          .then(response => {
            if (response) {
              console.log(response.data)
              commit('solidaryHelpSuccess', response.data)
              resolve(state.help.article)
            }
          })
          .catch(err => {
            commit('solidaryHelpError')
            reject(err)
          })
        })
      }
    },
    registerStandardUser: ({commit, state}) => {
      let user = _.cloneDeep(state.temporary.user)
      commit('solidaryRegisterUserRequest')

      // Check Platform type for Marketing information
      if (isPlatform(window.document.defaultView, "ios")) {
        user.mobileRegistration = 2;
      }
      if (isPlatform(window.document.defaultView, "android")) {
        user.mobileRegistration = 3;
      }
      // Register user
      return new Promise((resolve, reject) => {
        http.post("/users/register", user).then(resp => {
          if (resp) {
            commit('solidaryRegisterUserSuccess');
            resolve(resp)
          }
        }).catch(err => {
          commit('solidaryRegisterUserError');
          reject(err)
        })
      })
    },
  },
  getters: {
    getUserAvatar: () => (user) => {
      if (user) {
        if (user.avatars.length !== 0) {
          return process.env.VUE_APP_API_URL + user.avatars[0]
        }
      }
      return
    },
    getUserAddress: () => (user) => {
      if (user) {
        if (user.addresses.length !== 0) {
          return user.addresses[0]
        }
      }
      return
    },
    getUserAge: () => (user) => {
      if (user) {
        const dateString = user.birthDate
        if (dateString !== '') {
          let birthday = +new Date(dateString)
          return ~~ ((Date.now() - birthday) / (31557600000))
        }
      }
      return 
    },
    getUserCar: () => (user) => {
      if (user) {
        if (user.cars.length !== 0) {
          return user.cars[0]
        }
      }
    }
  }
}

export default {solidaryTransportStore};
