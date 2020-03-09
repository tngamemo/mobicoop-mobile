export const appStore = {
  state: {
    redirectionUrl: '',
    seeSliderLoader: false
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
  },
  actions: {},
  getters: {
    redirectionUrl: state => {
      return state.redirectionUrl
    },

    getSliderLoader: state => {
      return state.seeSliderLoader;
    }
  }
}

export default { appStore };
