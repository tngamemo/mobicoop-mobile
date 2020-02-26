import http from '../Mixin/http.mixin'

export const carpoolStore = {
  state: {
    statusCarpoolPost: '',
    carpoolToPost: null,
    addressessUseToPost: {
      origin: '',
      destination: '',
      step: [],
    }
  },
  mutations: {
    carpoolPost_request(state) {
      state.statusCarpoolPost = 'loading';
    },

    carpoolPost_success(state) {
      state.statusCarpoolPost = 'success';
    },

    carpoolPost_error(state) {
      state.statusCarpoolPost = 'error';
    },

    carpoolPost_init(state) {
      state.statusCarpoolPost = '';
      state.carpoolToPost = {
        role: 1,
        oneWay: false,
        frequency: 1,
        outwardWaypoints: [],
        outwardDate: "",
        returnDate: "",
        outwardTime: "",
        returnTime: "",
        priceKm: "",
        outwardDriverPrice: "",
        seatsDriver: "",
        solidaryExclusive: false,
        userId: ""
      };
      state.addressessUseToPost = {
        origin: '',
        destination: '',
        step: [],
      }
    },

    addPostCarpoolOrigin(state, payload) {
      state.addressessUseToPost.origin = payload.addressDTO;
    },

    addPostCarpoolDestination(state, payload) {
      state.addressessUseToPost.destination = payload.addressDTO;
    },

    addPostCarpoolStep(state, payload) {
      state.addressessUseToPost.step.push(payload.addressDTO);
    }

  },
  actions: {

    /**
     * Fonction qui intervetit l'origine et la desitnation
     */
    swapPostDestinationAndOrigin({state}) {
      const newOrigin = state.addressessUseToPost.destination;
      const newDestination = state.addressessUseToPost.origin;

      state.addressessUseToPost.destination = newDestination;
      state.addressessUseToPost.origin = newOrigin;
    },
  },
  getters : {
    carpoolToPost: state => {
      return state.carpoolToPost;
    },

    addressessUseToPost: state => {
      return state.addressessUseToPost;
    }
  }
}

export default { carpoolStore };
