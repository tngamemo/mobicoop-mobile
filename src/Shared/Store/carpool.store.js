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
        userId: "",
        communities: ""
      };
      state.addressessUseToPost = {
        origin: '',
        destination: '',
        step: [],
      }
    },

    addPostCarpoolOrigin(state, payload) {
      const copyAddresses = Object.assign({}, state.addressessUseToPost);
      copyAddresses.origin = payload.addressDTO;

      state.addressessUseToPost = copyAddresses;

    },

    addPostCarpoolDestination(state, payload) {
      state.addressessUseToPost.destination = payload.addressDTO;
    },

    addPostCarpoolStep(state, payload) {
      state.addressessUseToPost.step[payload.index] = payload.addressDTO;
    },

    removeStepByIndex(state, payload) {
      state.addressessUseToPost['step'].splice(payload.index, 1);
    },

    changeDateOutwardCarpool(state, payload) {
      state.carpoolToPost.outwardDate = payload.outwardDate;
    },

    changeTimeOutwardCarpool(state, payload) {
      state.carpoolToPost.outwardTime = payload.outwardTime;
    },

    changeDateReturnCarpool(state, payload) {
      state.carpoolToPost.returnDate = payload.returnDate;
    },

    changeTimeReturnCarpool(state, payload) {
      state.carpoolToPost.returnTime = payload.returnTime;
    },

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

    getDistanceOfCarpool({state}) {
      // console.log(state.addressessUseToPost.origin);
      // console.log(state.addressessUseToPost.step);
      // console.log(state.addressessUseToPost.destination);
      // const array = [state.addressessUseToPost.origin, ...state.addressessUseToPost.step, state.addressessUseToPost.destination];

      // console.log(array);
      // return new Promise((resolve, reject) => {
      //   commit('distance_request');
      //   return http.get(`/directions/search?points[0][longitude]=${origin.longitude}&points[0][latitude]=${origin.latitude}&points[1][longitude]=${destination.longitude}&points[1][latitude]=${destination.latitude}`)
      //   .then(resp => {
      //     console.log(resp.data)
      //     // On commit et envoie le resultat
      //     commit('distance_success', resp)
      //     resolve(resp)
      //   })
      //   .catch(err => {
      //     commit('distance_error')
      //     console.log(err)
      //     reject(err)
      //   })
      // })
    }
  },
  getters : {
    carpoolToPost: state => {
      return state.carpoolToPost;
    },

    addressessUseToPost: state => {
      return state.addressessUseToPost;
    }
  },
}

export default { carpoolStore };
