/**

 Copyright (c) 2018, MOBICOOP. All rights reserved.
 This project is dual licensed under AGPL and proprietary licence.

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 GNU Affero General Public License for more details.
 You should have received a copy of the GNU Affero General Public License
 along with this program. If not, see <gnu.org/licenses>.

 Licence MOBICOOP described in the file
 LICENSE
 **************************/

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
    file: null,
    page: 1,
    total: 0,
    postCommunity: null
  },
  mutations: {
    communities_request(state) {
      state.statusGetCommunities = 'loading';
    },

    communities_success(state, communities) {
      state.statusGetCommunities = 'success';
      if(state.page == 1) {
        state.communities = communities;
      } else {
        state.communities.push(...communities);
      }
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
      state.file = null;
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

    getAllCommunities({commit, state}) {
      commit('communities_request');
      return new Promise((resolve, reject) => {
        http.get(`/communities?page=`+ state.page + '&perPage=30')
          .then(resp => {
            resolve(resp)
            state.total = resp.data['hydra:totalItems'];
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
    updateCommunityPicture({commit}, params) {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('communityFile', params.communityFile);
        formData.append('communityId', Number(params.communityId));

        http.post(`/images`, formData)
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getCommunityImages({commit}, communityId) {
      return new Promise((resolve, reject) => {
        http.get(`/communities/${communityId}/images`)
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            console.log('error');
            reject(err)
          })
      })
    },
  },
  getters : {
    communities: state => {
      return state.communities
    },

    statusGetCommunities: state => {
      return state.statusGetCommunities;
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
