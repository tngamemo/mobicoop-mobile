import http from '../Mixin/http.mixin'

export const messageStore = {
  state: {
    statusMessagesCarpool: '',
    messagesCarpool: [],
    statusMessagesDirect: '',
    messagesDirect: [],
    statusCompleteThread: '',
    completeThread: null,
    statusPostMessage: '',
    askFromMessage: null,
    tempDirectThread: null
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

    complete_thread_request(state) {
      state.statusCompleteThread = 'loading';
      state.completeThread = null;
    },

    complete_thread_reset(state) {
      state.completeThread = null;
    },

    complete_thread_success(state, result) {
      state.statusCompleteThread = 'success';
      state.completeThread = result;
    },

    complete_thread_error(state) {
      state.statusCompleteThread = 'error';
    },

    post_message_request(state) {
      state.statusPostMessage = 'loading';
    },


    post_message_success(state, result) {
      state.statusPostMessage = 'success';
    },

    post_message_error(state) {
      state.statusPostMessage = 'error';
    },

    set_temp_direct_thread(state, user) {
      let n = {};
      n.idRecipient = user.id;
      n.givenName = user.givenName;
      n.shortFamilyName = user.shortFamilyName;
      n.avatarsRecipient = user.avatars[0];
      n.date = new Date();
      state.tempDirectThread = n;
    },

    reset_temp_direct_thread(state) {
      state.tempDirectThread = null;
    }

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
    getCompleteThread({commit}, messageId) {
      // return http.post("/carpools", data)
      commit('complete_thread_request');
      return new Promise((resolve, reject) => {

        http.get("/messages/completeThread?idMessage=" + messageId).then(resp => {
          if (resp) {
            commit('complete_thread_success', resp.data.threads);
            resolve(resp)
          }
        }).catch(err => {
          commit('complete_thread_error');
          reject(err)
        })
      })
    },
    postMessage({commit}, message) {
      commit('post_message_request');
      return new Promise((resolve, reject) => {

        http.post("/messages", message).then(resp => {
          if (resp) {
            commit('post_message_success', resp.data);
            resolve(resp)
          }
        }).catch(err => {
          commit('post_message_error');
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
  getters: {
    askFromMessage: state => {
      return state.askFromMessage;
    }
  }


}

export default { messageStore };
