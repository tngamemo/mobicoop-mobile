import http from '../Mixin/http.mixin'

export const communityStore = {
  state: {
    statusGetCommunities: '',
    statusGetCommunity: '',
    statusJoinCommunity: '',
    statusLeaveCommunity: '',
    statusAdsCommunity: '',
    statusPostCommunity: '',
    communities: [],
    postCommunity: null
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
    },

    ads_community_request(state) {
      state.statusAdsCommunity = 'loading';
    },

    ads_community_success(state) {
      state.statusAdsCommunity = 'success';
    },

    ads_community_error(state) {
      state.statusAdsCommunity = 'error';
    },

    init_post_community(state) {
      state.postCommunity = {
        name: '',
        description: '',
        fullDescription: '',
        address: {},
        secured: false,
        user: '',
        communityUsers: ''
      };
    },

    post_community_request(state) {
      state.statusPostCommunity = 'loading';
    },

    post_community_success(state) {
      state.statusPostCommunity = 'success';
    },

    post_community_error(state) {
      state.statusPostCommunity = 'error';
    },

    updateCommunityAddress(state, payload) {
      delete payload.addressDTO['@id'];
      delete payload.addressDTO['id'];
      delete payload.addressDTO['@type'];
      delete payload.addressDTO['geoJson'];

      state.postCommunity.address = payload.addressDTO;
    },

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

    getAdsCommunity({commit}, communityId) {
      commit('ads_community_request');
      return new Promise((resolve, reject) => {
        http.get(`/communities/${communityId}/ads`)
          .then(resp => {
            resolve(resp)
            commit('ads_community_success');
          })
          .catch(err => {
            console.log('error');
            commit('ads_community_error');
            reject(err)
          })
      })
    },

    postCommunity({commit}, payload) {
      commit('post_community_request');
      return new Promise((resolve, reject) => {
        http.post(`/communities`, payload)
          .then(resp => {
            resolve(resp)
            commit('post_community_success');
          })
          .catch(err => {
            console.log('error');
            commit('post_community_error');
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
    },

    postCommunity: state => {
      return state.postCommunity;
    },

    statusPostCommunity: state => {
      return state.statusPostCommunity;
    }
  }
}

export default { communityStore };
