import http from '../Mixin/http.mixin'

export const carpoolStore = {
  state: {
    statusCarpoolPost: '',
    statusDistanceCarpool: '',
    statusPriceCarpool: '',
    directPointsCarpool: '',
    carpoolToPost: null,
    addressessUseToPost: {
      origin: '',
      destination: '',
      step: [],
    },
    distanceCarpool: '',
    priceCarpool: '',
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

      console.log('INIIIITTTTT')
      state.statusCarpoolPost = '';
      state.statusDistanceCarpool = '';
      state.statusPriceCarpool = '';
      state.distanceCarpool = '';
      state.directPointsCarpool = '';
      state.priceCarpool = '';
      state.carpoolToPost = {
        role: 1,
        oneWay: false,
        frequency: 1,
        outwardWaypoints: [],
        outwardDate: "",
        returnDate: "",
        outwardTime: "",
        returnTime: "",
        priceKm: process.env.VUE_APP_PRICE_BY_KM,
        outwardDriverPrice: "",
        seatsDriver: "",
        solidaryExclusive: false,
        userId: "",
        communities: "",
        luggage: false,
        bike: false,
        backSeats: false,
        comment: ''
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
      const copyAddresses = Object.assign({}, state.addressessUseToPost);
      copyAddresses.destination = payload.addressDTO;
      state.addressessUseToPost = copyAddresses;
    },

    addPostCarpoolStep(state, payload) {
      const copyAddresses = Object.assign({}, state.addressessUseToPost);
      copyAddresses.step[payload.index] = payload.addressDTO;
      state.addressessUseToPost = copyAddresses;
    },

    removeStepByIndex(state, payload) {
      const copyAddresses = Object.assign({}, state.addressessUseToPost);
      copyAddresses['step'].splice(payload.index, 1);
      state.addressessUseToPost = copyAddresses;
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

    distance_request(state) {
      state.statusDistanceCarpool = 'loading';
    },

    distance_success(state, payload) {
      state.statusDistanceCarpool = 'success';
      state.distanceCarpool = payload.distance;
    },

    distance_error(state) {
      state.statusDistanceCarpool = 'error';
    },

    price_carpool_request(state) {
      state.statusPriceCarpool = 'loading';
    },

    price_carpool_success(state, payload) {
      state.statusPriceCarpool = 'success';
      state.priceCarpool = payload.price;
      state.carpoolToPost.outwardDriverPrice = (payload.price).toString();
    },

    price_carpool_error(state) {
      state.statusPriceCarpool = 'error';
    },

    carpool_gps(state, payload) {
      state.directPointsCarpool = payload;
    },

    changeOptionsCarpoolPost(state, payload) {
      state.carpoolToPost[payload.property] = payload.value;
    }


  },
  actions: {

    /**
     * Fonction qui intervetit l'origine et la desitnation
     */
    swapPostDestinationAndOrigin({state}) {
      const newOrigin = state.addressessUseToPost.destination;
      const newDestination = state.addressessUseToPost.origin;

      const copyAddresses = Object.assign({}, state.addressessUseToPost);
      copyAddresses.destination = newDestination;
      copyAddresses.origin = newOrigin;

      state.addressessUseToPost = copyAddresses;
    },

    treatementUpdateAddresses({state, dispatch}) {
      if(state.addressessUseToPost.origin && state.addressessUseToPost.destination) {
        const arrayOfStep  = state.addressessUseToPost.step.filter(value => Object.keys(value).length !== 0)
        const addresses = [state.addressessUseToPost.origin, ...arrayOfStep, state.addressessUseToPost.destination];

        state.carpoolToPost.outwardWaypoints = addresses;

        dispatch('getDistanceOfCarpool', {addresses});
      }
    },

    getDistanceOfCarpool({commit, state, dispatch}, payload) {

      let query = '';
      payload.addresses.forEach((add, index, array) => {
        query += `points[${index}][longitude]=${add.longitude}&points[${index}][latitude]=${add.latitude}`;
        if (index !== array.length - 1){
          query += '&';
         }
      });

      return new Promise((resolve, reject) => {
        commit('distance_request');
        return http.get(`/directions/search?${query}`)
        .then(resp => {

          // On commit et envoie le resultat
          commit('distance_success', {distance: resp.data['hydra:member'][0].distance})
          commit('carpool_gps', {directPoints: resp.data['hydra:member'][0].directPoints})

          dispatch('getPriceofCarpool', {priceKm: process.env.VUE_APP_PRICE_BY_KM}).then(resp => {
            // On commit et envoie le resultat
            commit('price_carpool_success', {price: resp.data.value})
          })
          resolve(resp)
        })
        .catch(err => {
          commit('distance_error')
          console.log(err)
          reject(err)
        })
      })
    },

    getPriceofCarpool({commit, state}, payload) {
      const priceTmp = Math.round(state.distanceCarpool * payload.priceKm * 100) / 100 / 1000;

      return new Promise((resolve, reject) => {
        commit('price_carpool_request');
        return http.post(`/prices/round`, {
          value: priceTmp,
          frequency: state.carpoolToPost.frequency}
          )
        .then(resp => {
          resp.data.oldPrice = priceTmp;
          resolve(resp)
        })
        .catch(err => {
          commit('price_carpool_error')
          console.log(err)
          reject(err)
        })
      })
    },

    postCarpool({state, commit}){
      return new Promise((resolve, reject) => {
        commit('carpoolPost_request');

        // On va supprimer toutes les données qui sont nulles ou vides
        const dataToSend = Object.assign({}, state.carpoolToPost);
        Object.keys(dataToSend).forEach((key) => (dataToSend[key] == null || dataToSend[key] == '') && delete dataToSend[key]);

        console.log(dataToSend);
        return http.post(`/carpools`, dataToSend)
        .then(resp => {
          commit('carpoolPost_success')
          commit('carpoolPost_init')
          resolve(resp)
        })
        .catch(err => {
          commit('carpoolPost_error')
          console.log(err)
          reject(err)
        })
      })
    }
  },
  getters : {
    carpoolToPost: state => {
      return state.carpoolToPost;
    },

    addressessUseToPost: state => {
      return state.addressessUseToPost;
    },

    distanceCarpool: state => {
      return state.distanceCarpool
    },

    priceCarpool: state => {
      return state.priceCarpool
    },

    statusDistanceCarpool: state => {
      return state.statusDistanceCarpool
    },

    directPointsCarpool: state => {
      return state.directPointsCarpool
    },
  },
}

export default { carpoolStore };
