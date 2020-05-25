import http from '../Shared/Mixin/http.mixin'

export const solidaryTransportStore = {
  state: {
    help: {
      article: undefined,
      status: '' // loading | success | error
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
        mobileRegistration: 1
      },
      request: {

      },
      ad: {

      }
    }
  },
  mutations: {
    // Help Mutations below
    helpRequest(state) {
      state.help.status = 'loading';
    },

    helpSuccess(state, article){
      state.help.status = 'success';
      state.help.article = article
    },

    helpError(state){
      state.help.status = 'error';
    },

    // Temporary Objects mutation below
    solidaryUserUpdate(state, user) {
      console.log('solidaryUserUpdate')
      state.temporary.user = user
    }
  },
  actions: {
    /**
     * Function that request the api to get "Help" information
     * from /articles/{id}
     */
    getArticleForHelp({commit, state}, id){
      if (state.help.status === 'success') {
        return new Promise((resolve, reject) => {
          resolve(state.help.article)
        })
      } else {
        commit('helpRequest')
        return new Promise((resolve, reject) => {
          http.get("/articles/" + id)
          .then(response => {
            if (response) {
              console.log(response.data)
              commit('helpSuccess', response.data)
              resolve(state.help.article)
            }
          })
          .catch(err => {
            commit('helpError')
            reject(err)
          })
        })
      }
    }
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
