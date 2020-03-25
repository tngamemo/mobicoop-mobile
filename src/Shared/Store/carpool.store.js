import http from '../Mixin/http.mixin'

export const carpoolStore = {
  state: {
    statusCarpoolPost: '',
    statusDistanceCarpool: '',
    statusPriceCarpool: '',
    statusCarpoolAsk: '',
    statusCarpoolAskPost: '',
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

      state.statusCarpoolPost = '';
      state.statusDistanceCarpool = '';
      state.statusPriceCarpool = '';
      state.distanceCarpool = '';
      state.directPointsCarpool = '';
      state.priceCarpool = '';
      state.carpoolToPost = {
        role: !!process.env.VUE_APP_DEFAULT_CARPOOL_FREQUENCY ? process.env.VUE_APP_DEFAULT_CARPOOL_FREQUENCY : 1,
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

    carpoolPost_fromSearch(state, payload) {
      if (!!payload.origin) state.addressessUseToPost.origin = payload.origin;
      if (!!payload.destination) state.addressessUseToPost.destination = payload.destination;
      if (!!payload.frequency) state.carpoolToPost.frequency = payload.frequency;
      if (!!payload.outwardDate) state.carpoolToPost.outwardDate = payload.outwardDate;
    },

    carpoolPost_schedule_add(state) {
      const newSlot = {
        "mon": false,
        "tue": false,
        "wed": false,
        "thu": false,
        "fri": false,
        "sat": false,
        "sun": false,
        "outwardTime": "",
        "returnTime": "",
        "outwardDisabled": false,
        "returnDisabled": true,
        "maxTimeFromOutwardRegular": "08:00"
      }

      state.carpoolToPost.schedule.push(newSlot)
    },

    carpoolPost_schedule_delete_slot(state, payload) {
      state.carpoolToPost.schedule.splice(payload.index, 1);
    },

    carpoolPost_schedule_init(state) {
      state.carpoolToPost.schedule = [];
    },

    carpoolPost_schedule_delete(state) {
      delete state.carpoolToPost.schedule;
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
    },

    changeSelectDaySchedule(state, payload) {
      const copyCarpoolToPost = Object.assign({}, state.carpoolToPost);
      copyCarpoolToPost.schedule[payload.index][payload.prop] = !copyCarpoolToPost.schedule[payload.index][payload.prop];
      state.carpoolToPost = copyCarpoolToPost;
    },

    changeTimeSchedule(state, payload) {
      const copyCarpoolToPost = Object.assign({}, state.carpoolToPost);
      copyCarpoolToPost.schedule[payload.index][payload.prop] = payload.value;
      const propDisable = payload.prop.replace('Time', 'Disabled')
      copyCarpoolToPost.schedule[payload.index][propDisable] = false;
      state.carpoolToPost = copyCarpoolToPost;
    },

    carpool_ask_request(state) {
      state.statusCarpoolAsk = 'loading';
    },

    carpool_ask_success(state) {
      state.statusCarpoolAsk = 'success';
    },

    carpool_ask_error(state) {
      state.statusCarpoolAsk = 'error';
    },

    carpool_ask_post_request(state) {
      state.statusCarpoolAskPost = 'loading';
    },

    carpool_ask_post_success(state) {
      state.statusCarpoolAskPost = 'success';
    },

    carpool_ask_post_error(state) {
      state.statusCarpoolAskPost = 'error';
    }


  },
  actions: {

    /**
     * Fonction qui intervetit l'origine et la desitnation
     */
    swapPostDestinationAndOrigin({ state }) {
      const newOrigin = state.addressessUseToPost.destination;
      const newDestination = state.addressessUseToPost.origin;

      const copyAddresses = Object.assign({}, state.addressessUseToPost);
      copyAddresses.destination = newDestination;
      copyAddresses.origin = newOrigin;

      state.addressessUseToPost = copyAddresses;
    },

    treatementUpdateAddresses({ state, dispatch }) {
      if (state.addressessUseToPost.origin && state.addressessUseToPost.destination) {
        const arrayOfStep = state.addressessUseToPost.step.filter(value => Object.keys(value).length !== 0)
        const addresses = [state.addressessUseToPost.origin, ...arrayOfStep, state.addressessUseToPost.destination];

        state.carpoolToPost.outwardWaypoints = addresses;

        dispatch('getDistanceOfCarpool', { addresses });
      }
    },

    getDistanceOfCarpool({ commit, state, dispatch }, payload) {

      let query = '';
      payload.addresses.forEach((add, index, array) => {
        query += `points[${index}][longitude]=${add.longitude}&points[${index}][latitude]=${add.latitude}`;
        if (index !== array.length - 1) {
          query += '&';
        }
      });

      return new Promise((resolve, reject) => {
        commit('distance_request');
        return http.get(`/directions/search?${query}`)
          .then(resp => {

            // On commit et envoie le resultat
            commit('distance_success', { distance: resp.data['hydra:member'][0].distance })
            commit('carpool_gps', { directPoints: resp.data['hydra:member'][0].directPoints })

            dispatch('getPriceofCarpool', { priceKm: process.env.VUE_APP_PRICE_BY_KM }).then(resp => {
              // On commit et envoie le resultat
              commit('price_carpool_success', { price: resp.data.value })
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

    getPriceofCarpool({ commit, state }, payload) {
      const priceTmp = Math.round(state.distanceCarpool * payload.priceKm * 100) / 100 / 1000;

      return new Promise((resolve, reject) => {
        commit('price_carpool_request');
        return http.post(`/prices/round`, {
          value: priceTmp,
          frequency: state.carpoolToPost.frequency
        }
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

    postCarpool({ state, commit }) {
      return new Promise((resolve, reject) => {
        commit('carpoolPost_request');

        // On va supprimer toutes les données qui sont nulles ou vides
        const dataToSend = Object.assign({}, state.carpoolToPost);
        Object.keys(dataToSend).forEach((key) => (dataToSend[key] == null || dataToSend[key] == '') && delete dataToSend[key]);

        return http.post(`/carpools`, dataToSend)
          .then(resp => {
            commit('carpoolPost_success')
            resolve(resp)
          })
          .catch(err => {
            commit('carpoolPost_error')
            console.log(err)
            reject(err)
          })
      })
    },

    getCarpoolAsk({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        commit('carpool_ask_request');
        return http.get(`/carpools/ask/` + data.idAsk + "?userId=" + data.userId)
          .then(resp => {
            commit('carpool_ask_success');
            resolve(resp)
          })
          .catch(err => {
            commit('carpool_ask_error');
            reject(err)
          })
      })
    },
    changeOneWayRegular({ state, commit }) {
      const hasReturnTime = state.carpoolToPost.schedule.some(stepSchedule => !!stepSchedule.returnTime);
      state.carpoolToPost.oneWay = !hasReturnTime;
    },

    postAskCarpool({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit('carpool_ask_post_request');
        return http.post(`/carpools/ask`, data)
          .then(resp => {
            commit('carpool_ask_post_success');
            resolve(resp)
          })
          .catch(err => {
            commit('carpool_ask_post_error');
            reject(err)
          })
      })
    },

    updateAskCarpool({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit('carpool_ask_post_request');
        return http.put(`/carpools/ask/${payload.idAsk}?userId=${payload.userId}`, payload.data)
          .then(resp => {
            commit('carpool_ask_post_success');
            resolve(resp)
          })
          .catch(err => {
            commit('carpool_ask_post_error');
            reject(err)
          })
      })
    }

  },
  getters: {
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
