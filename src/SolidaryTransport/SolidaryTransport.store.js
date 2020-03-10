import http from '../Shared/Mixin/http.mixin'

export const solidaryTransportStore = {
  state: {
    help: {
      sections: undefined,
      status: ''
    }
  },
  mutations: {
    help_request(state) {
      state.help.status = 'loading';
    },

    help_success(state, article){
      state.help.status = 'success';
      state.help.sections = article.sections
    },

    help_error(state){
      state.help.status = 'error';
    }

  },
  actions: {
    /**
     * Function that request the api to get "Help" information
     * from /articles/{id}
     */
    getSectionsForHelp({commit, state}, params){
      if (state.help.status === 'success') {
        return new Promise((resolve, reject) => {
          resolve(state.help.sections)
        })
      } else {
        commit('help_request')
        return new Promise((resolve, reject) => {
          http.get("/articles/5")
          .then(response => {
            if (response) {
              commit('help_success', response.data)
              resolve(state.help.sections)
            }
          })
          .catch(err => {
            commit('help_error')
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
    getUserAge: () => (user) => {
      if (user) {
        const dateString = user.birthDate
        if (dateString !== '') {
          let birthday = +new Date(dateString)
          return ~~ ((Date.now() - birthday) / (31557600000))
        }
      }
      return 
    }
  }
}

export default {solidaryTransportStore};
