import http from '../Mixin/http.mixin'

export const communityStore = {
  state: {
    statusGetCommunities: '',
    statusGetCommunity: '',
    statusJoinCommunity: '',
    statusLeaveCommunity: '',
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
    },

    join_community_request(state) {
      state.statusJoinCommunity = 'loading';
    },

    join_community_success(state) {
      state.statusJoinCommunity = 'success';
    },

    join_community_error(state) {
      state.statusJoinCommunity = 'error';
    },

    leave_community_request(state) {
      state.statusLeaveCommunity = 'loading';
    },

    leave_community_success(state) {
      state.statusLeaveCommunity = 'success';
    },

    leave_community_error(state) {
      state.statusLeaveCommunity = 'error';
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

    joinCommunity({commit}, payload) {
      commit('join_community_request');
      return new Promise((resolve, reject) => {
        http.post(`/community_users`, payload)
          .then(resp => {
            resolve(resp)
            commit('join_community_success');
          })
          .catch(err => {
            console.log('error');
            commit('join_community_error');
            reject(err)
          })
      })
    },

    leaveCommunity({commit}, payload) {
      commit('leave_community_request');
      return new Promise((resolve, reject) => {
        http.delete(`/community_users/${payload.cummunityUserId}`,)
          .then(resp => {
            resolve(resp)
            commit('leave_community_success');
          })
          .catch(err => {
            console.log('error');
            commit('leave_community_error');
            reject(err)
          })
      })
    },
  },
  getters : {
    communities: state => {
      return state.communities
    },

    statusGetCommunity: state => {
      return state.statusGetCommunity;
    },

    statusJoinCommunity: state => {
      return state.statusJoinCommunity;
    },

    statusLeaveCommunity: state => {
      return state.statusLeaveCommunity;
    }
  }
}

export default { communityStore };