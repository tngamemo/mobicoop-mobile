import http from '../Mixin/http.mixin'

export const eventStore = {
  state: {
    statusGetEvents: '',
    statusGetEvent: '',
    statusSignalEvent: '',
    statusPostEvent: '',
    events: null,
    postEvent: null
  },
  mutations: {
    events_request(state) {
      state.statusGetEvents = 'loading';
    },

    events_success(state, events) {
      state.statusGetEvents = 'success';
      state.events = events;
    },

    events_error(state) {
      state.statusGetEvents = 'error';
    },

    event_request(state) {
      state.statusGetEvent = 'loading';
    },

    event_success(state) {
      state.statusGetEvent = 'success';
    },

    event_error(state) {
      state.statusGetEvent = 'error';
    },

    signal_event_request(state) {
      state.statusSignalEvent = 'loading';
    },

    signal_event_success(state) {
      state.statusSignalEvent = 'success';
    },

    signal_event_error(state) {
      state.statusSignalEvent = 'error';
    },

    init_post_event(state) {
      state.postEvent = {
        name: '',
        description: '',
        fullDescription: '',
        address: {},
        fromDate: '',
        toDate: '',
        status: 1,
        useTime: false,
        url: '',
        user: ''
      };
    },

    post_event_request(state) {
      state.statusPostEvent = 'loading';
    },

    post_event_success(state) {
      state.statusPostEvent = 'success';
    },

    post_event_error(state) {
      state.statusPostEvent = 'error';
    },

    updateEventAddress(state, payload) {
      delete payload.addressDTO['@id'];
      delete payload.addressDTO['id'];
      delete payload.addressDTO['@type'];
      delete payload.addressDTO['geoJson'];

      state.postEvent.address = payload.addressDTO;
    },

  },
  actions: {

    getAllEvents({ commit }) {
      commit('events_request');
      return new Promise((resolve, reject) => {
        http.get(`/events`)
          .then(resp => {
            resolve(resp)
            commit('events_success', resp.data['hydra:member']);
          })
          .catch(err => {
            console.log('error');
            commit('events_error');
            reject(err)
          })
      })
    },

    getSpecificEvent({ commit }, eventId) {
      commit('event_request');
      return new Promise((resolve, reject) => {
        http.get(`/events/${eventId}`)
          .then(resp => {
            resolve(resp)
            commit('event_success');
          })
          .catch(err => {
            console.log('error');
            commit('event_error');
            reject(err)
          })
      })
    },

    signalEvent({ commit }, payload) {
      commit('signal_event_request');
      return new Promise((resolve, reject) => {
        http.post(`/events/${payload.eventId}/report`, payload.data)
          .then(resp => {
            resolve(resp)
            commit('signal_event_success');
          })
          .catch(err => {
            console.log('error');
            commit('signal_event_error');
            reject(err)
          })
      })
    },

    postEvent({commit}, payload) {
      commit('post_event_request');
      return new Promise((resolve, reject) => {
        http.post(`/events`, payload)
          .then(resp => {
            resolve(resp)
            commit('post_event_success');
          })
          .catch(err => {
            console.log('error');
            commit('post_event_error');
            reject(err)
          })
      })
    },
  },
  getters: {
    events: state => {
      return state.events
    },

    statusGetEvents: state => {
      return state.statusGetEvents;
    },

    statusGetEvent: state => {
      return state.statusGetEvent;
    },

    statusSignalEvent: state => {
      return state.statusSignalEvent;
    },

    postEvent: state => {
      return state.postEvent;
    },

    statusPostEvent: state => {
      return state.statusPostEvent;
    }
  }
}

export default { eventStore };
