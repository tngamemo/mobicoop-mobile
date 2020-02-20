import http from '../Shared/http.mixin'

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
}

export default {solidaryTransportStore};
