import http from '../Mixin/http.mixin'

export const sliderStore = {
  state: {
    sliderCurrentComponent: '',
    messages: []
  },
  mutations: {
    slider_init(state) {
      state.sliderCurrentComponent = '';
    },

    slider_change(state, slider) {
      state.sliderCurrentComponent = slider;
    },
  },
  actions: {},
  getters: {
    currentSlider: state => {
      return state.sliderCurrentComponent
    }
  }


}

export default { sliderStore };
