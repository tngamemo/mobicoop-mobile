export const appStore = {
  state: {
    redirectionUrl: '',
  },
  mutations: {
    redirectionUrl_reset(state) {
      state.redirectionUrl = '';
    },

    redirectionUrl_change(state, redirectionUrl) {
      state.redirectionUrl = redirectionUrl;
    },
  },
  actions: {},
  getters: {
    redirectionUrl: state => {
      return state.redirectionUrl
    }
  }
}

export default { appStore };
