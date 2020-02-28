import http from '../Mixin/http.mixin'

export const messageStore = {
  state: {
    statusMessagesCarpool: '',
    messagesCarpool: [],
    statusMessagesDirect: '',
    messagesDirect: []
  },
  mutations: {
    message_carpool_request(state) {
      state.statusMessagesCarpool = 'loading';
    },

    message_carpool_success(state, messages) {
      state.statusMessagesCarpool = 'success';
      state.messagesCarpool = messages;
    },

    message_carpool_error(state) {
      state.statusMessagesCarpool = 'error';
    },

    message_direct_request(state) {
      state.statusMessagesDirect = 'loading';
    },

    message_direct_success(state, messages) {
      state.statusMessagesDirect = 'success';
      state.messagesDirect = messages;
    },

    message_direct_error(state) {
      state.statusMessagesDirect = 'error';
    },

  },
  actions: {

    /**
     * Fonction qui effectue la recherche
     */
    getAllMessagesCarpool({commit}, userId) {
      // return http.post("/carpools", data)
      commit('message_carpool_request');
      return new Promise((resolve, reject) => {

        http.get("/users/" + userId + "/threadsCarpoolMessages").then(resp => {
          if (resp) {
            commit('message_carpool_success', resp.data.threads);
            resolve(resp)
          }
        }).catch(err => {
          commit('message_carpool_error');
          reject(err)
        })
      })
    },
    getAllMessagesDirect({commit}, userId) {
      // return http.post("/carpools", data)
      commit('message_direct_request');
      return new Promise((resolve, reject) => {

        http.get("/users/" + userId + "/threadsDirectMessages").then(resp => {
          if (resp) {
            commit('message_direct_success', resp.data.threads);
            resolve(resp)
          }
        }).catch(err => {
          commit('message_direct_error');
          reject(err)
        })
      })
    },
    deleteThread({commit, dispatch}, messageId) {
      return new Promise((resolve, reject) => {

        http.delete("/messages/" + messageId).then(resp => {
          if (resp) {
            dispatch('getAllMessagesCarpool');
            dispatch('getAllMessagesDirect');
            resolve(resp)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },

  },


}

export default { messageStore };
