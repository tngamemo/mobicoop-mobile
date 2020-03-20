import http from '../Mixin/http.mixin'

export const communityStore = {
  state: {
    statusGetCommunities: '',
    statusGetCommunity: '',
    communities: null,
  },
  mutations: {
    communities_request(state) {
      state.statusGetCommunities = 'loading';
    },

    communities_success(state, communities) {
      state.statusGetCommunities = 'success';
      state.communities = communities;
    },

    communities_error(state) {
      state.statusGetCommunities = 'error';
    },

    community_request(state) {
      state.statusGetCommunity = 'loading';
    },

    community_success(state, community) {
      state.statusGetCommunity = 'success';
      state.community = community;
    },

    community_error(state) {
      state.statusGetCommunity = 'error';
    }

  },
  actions: {

    getAllCommunities({commit}) {
      commit('communities_request');
      return new Promise((resolve, reject) => {
        http.get(`/communities`)
          .then(resp => {
            resolve(resp)
            commit('communities_success', resp.data['hydra:member']);
          })
          .catch(err => {
            console.log('error');
            commit('communities_error');
            reject(err)
          })
      })
    },

    getSpecificCommunity({commit}, communityId) {
      commit('community_request');
      return new Promise((resolve, reject) => {
        http.get(`/communities/${communityId}`)
          .then(resp => {
            resolve(resp)
            commit('community_success');
          })
          .catch(err => {
            console.log('error');
            commit('community_error');
            reject(err)
          })
      })
    },
  },
  getters : {
    communities: state => {
      return state.communities
    }
  }
}

export default { communityStore };
