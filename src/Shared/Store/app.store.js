import http from '../Mixin/http.mixin'

export const appStore = {
  state: {
    redirectionUrl: '',
    seeSliderLoader: false,
    statusContact: '',
    userCookies: false
  },
  mutations: {
    redirectionUrl_reset(state) {
      state.redirectionUrl = '';
    },

    redirectionUrl_change(state, redirectionUrl) {
      state.redirectionUrl = redirectionUrl;
    },

    init_sliderloader_visibility(state) {
      state.seeSliderLoader = false;
    },

    change_sliderloader_visibility(state) {
      state.seeSliderLoader = !state.seeSliderLoader;
    },

    contact_request(state) {
      state.statusContact = 'loading'
    },

    contact_success(state) {
      state.statusContact = 'success'
    },

    contact_error(state) {
      state.statusContact = 'error'
    },

    changeUserCookies(state, value) {
      state.userCookies = value
    }
  },
  actions: {
    sendContact({commit}, payload) {
      return new Promise((resolve, reject) => {
        commit('contact_request');
        http.post(`/contacts`, payload)
          .then(resp => {
            commit('contact_success');
            resolve(resp)
          })
          .catch(err => {
            commit('contact_error');
            reject(err)
          })
      })
    },
  },
  getters: {
    redirectionUrl: state => {
      return state.redirectionUrl
    },

    getSliderLoader: state => {
      return state.seeSliderLoader;
    },

    statusContact: state => {
      return state.statusContact;
    },

    userCookies: state => {
      return state.userCookies;
    }
  }
}

export default { appStore };
