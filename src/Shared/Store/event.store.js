import http from '../Mixin/http.mixin'
import moment from 'moment'

export const eventStore = {
  state: {
    statusGetEvents: '',
    statusGetEvent: '',
    statusSignalEvent: '',
    statusPostEvent: '',
    statusAdsEvent: '',
    currentEvents: null,
    file: null,
    page: 1,
    total: 0,
    type: 'after', // after || stricly_before
    events: []
  },
  mutations: {
    events_request(state) {
      state.statusGetEvents = 'loading';
    },

    events_success(state, events) {
      state.statusGetEvents = 'success';
      if(state.page == 1) {
        state.events = events;
      } else {
        state.events.push(...events);
      }
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
      state.file = null
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

    ads_event_request(state) {
      state.statusAdsEvent = 'loading';
    },

    ads_event_success(state) {
      state.statusAdsEvent = 'success';
    },

    ads_event_error(state) {
      state.statusAdsEvent = 'error';
    },

  },
  actions: {

    getAllEvents({ commit, state }) {
      commit('events_request');
      return new Promise((resolve, reject) => {
        http.get(`/events?toDate[` + state.type + `]=` + moment().format('YYYY-MM-DD') + `&order[fromDate]=asc&perPage=30&page=` + state.page).then(resp => {
            const allEvents = resp.data['hydra:member'];
            state.total = resp.data['hydra:totalItems'];
            commit('events_success', allEvents);
            resolve(resp)
          }).catch(err => {
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

    getAdsEvent({commit}, eventId) {
      commit('ads_event_request');
      return new Promise((resolve, reject) => {
        http.get(`/events/${eventId}/ads`)
          .then(resp => {
            resolve(resp)
            commit('ads_event_success');
          })
          .catch(err => {
            console.log('error');
            commit('ads_event_error');
            reject(err)
          })
      })
    },

    updateEventPicture({commit}, params) {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('eventFile', params.eventFile);
        formData.append('eventId', Number(params.eventId));

        http.post(`/images`, formData)
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
  },
  getters: {
    currentEvents: state => {
      return state.currentEvents
    },

    pastEvents: state => {
      return state.pastEvents
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
