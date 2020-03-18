import http from '../Mixin/http.mixin'

export const articleStore = {
  state: {
    statusArticle: '',

  },
  mutations: {
    article_request(state) {
      state.statusArticle = 'loading';
    },

    article_success(state) {
      state.statusArticle = 'success';
    },

    article_error(state) {
      state.statusArticle = 'error';
    }

  },
  actions: {
    // Register
    getArticle: ({commit}, id) => {
      commit('article_request');
      return new Promise((resolve, reject) => {
        http.get("/articles/" + id).then(resp => {
          if (resp) {
            commit('article_success');
            resolve(resp)
          }
        }).catch(err => {
          commit('article_error');
          reject(err)
        })
      })
    },
  },
  getters : {

  }
}

export default { articleStore };
