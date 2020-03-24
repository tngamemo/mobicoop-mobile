import http from '../Mixin/http.mixin'

export const eventStore = {
  state: {
    statusGetEvents: '',
    statusGetEvent: '',
    statusSignalEvent: '',
    events: null,
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
    }

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
    }
  }
}

export default { eventStore };
