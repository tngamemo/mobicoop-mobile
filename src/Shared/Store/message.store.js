import http from '../Mixin/http.mixin'

export const messageStore = {
  state: {
    statusMessage: '',
    messages: []
  },
  mutations: {
    message_request(state) {
      state.statusMessage = 'loading';
    },

    message_success(state, messages) {
      state.statusMessage = 'success';
      state.messages = messages;
    },

    message_error(state) {
      state.statusMessage = 'error';
      state.messages = [];
    },

  },
  actions: {

    /**
     * Fonction qui effectue la recherche
     */
    getAllMessagesCarpool({commit}, userId) {
      // return http.post("/carpools", data)
      commit('message_request');
      return new Promise((resolve, reject) => {

        http.get("/users/" + userId + "/threadsCarpoolMessages").then(resp => {
          if (resp) {
            commit('message_success', resp.data.threads);
            resolve(resp)
          }
        }).catch(err => {
          commit('message_error');
          reject(err)
        })
      })
    },
  },


}

export default { messageStore };
