import http from '../Mixin/http.mixin'

export const userStore = {
  state: {
    status: '',
    tokenUser: localStorage.getItem('tokenUser') || '',
    tokenAnonymousUser: localStorage.getItem('tokenAnonymousUser') || '',
    user: null,
    alerts: [],
    myCarpools: [],
    statusUserCommunities: '',
    userCommunities: null
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },

    auth_success(state, tokenUser) {
      state.tokenUser = tokenUser;
    },

    auth_error(state) {
      state.status = 'error';
    },

    auth_anonymous_success(state, tokenAnonymousUser) {
      state.tokenAnonymousUser = tokenAnonymousUser
    },

    user_request_success(state, user) {
      state.status = 'success';
      state.user = user;
    },

    user_alerts_request_success(state, data) {
      state.alerts = data.alerts;
    },

    user_my_carpools_request_success(state, data) {
      state.myCarpools = data['hydra:member'];
    },


    logout(state) {
      state.status = '';
      state.tokenUser = '';
      state.user = null;
      state.statusUserCommunities = '',
      state.userCommunities = null;
    },

    user_communities_request(state) {
      state.statusUserCommunities = 'loading';
    },

    user_communities_success(state, userCommunities){
      state.statusUserCommunities = 'success';
      state.userCommunities = userCommunities;
    },

    user_communities_error(state){
      state.statusUserCommunities = 'error';
    },

  },
  actions: {
    login({commit}, params) {
      commit('auth_request')
      return new Promise((resolve, reject) => {
        http.post("/login", {"username": params.username, "password": params.password})
          .then(resp => {
            if (resp) {
              const tokenUser = resp.data.token
              localStorage.setItem('tokenUser', tokenUser)
              commit('auth_success', tokenUser)
              resolve(resp)
            }
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('tokenUser')
            reject(err)
          })
      })
    },

    /**
     * Fonction qui permet d'autentifier un utilisateur de maniére anonyme.
     * Pour pouvoir accéder au fonctionnalité de base en mode déco.
     */

    authAnonymousUser({commit}){
      commit('logout');
      return new Promise((resolve, reject) => {
        http.post("/auth", {"username": 'mobile', "password": 'mobile'})
          .then(resp => {

            const tokenAnonymousUser = resp.data.token
            localStorage.setItem('tokenAnonymousUser', tokenAnonymousUser)

            // On commit et envoie le resultat
            commit('auth_anonymous_success', tokenAnonymousUser)
            resolve(resp)
          })
          .catch(err => {
            localStorage.removeItem('tokenAnonymousUser')
            reject(err)
          })
      })
    },

    /**
     * Fonction pour récupérer les informations d'un utilisateur
     */
    getUser({commit}, params) {
      return new Promise((resolve, reject) => {
        http.get(`/users/${params.idUser}`)
          .then(resp => {

            // On commit et envoie le resultat
            commit('user_request_success', resp.data)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            console.log(err)
            reject(err)
          })
      })
    },

    updateUser({commit}, params) {
      return new Promise((resolve, reject) => {
        delete params.addresses[0].id;
        delete params.images;
        http.put(`/users/${params.id}`, params)
          .then(resp => {

            // On commit et envoie le resultat
            commit('user_request_success', resp.data);
            resolve(resp)
          })
          .catch(err => {
            console.log(err);
            reject(err)
          })
      })
    },

    updateUserPicture({commit}, params) {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('userFile', params.file);
        formData.append('userId', Number(params.userId));

        http.post(`/images`, formData)
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    logout({commit}) {
      return new Promise((resolve, reject) => {
        commit('logout');
        localStorage.removeItem('tokenUser');
        resolve()
      })
    },

    getMyCarpools({commit}, userId) {
      return new Promise((resolve, reject) => {
        http.get(`/carpools?userId=${userId}`)
          .then(resp => {
            commit('user_my_carpools_request_success', resp.data);
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    /**
     * Fonction pour récupérer les informations d'un utilisateur
     */
    getUserCommunities({commit, getters}, params){
      return new Promise((resolve, reject) => {
        commit('user_communities_request');
        http.get(`/communities?communityUsers.user.id=${getters.userId}`)
        .then(resp => {
          // On commit et envoie le resultat
          commit('user_communities_success', resp.data['hydra:member'])
          resolve(resp)
        })
        .catch(err => {
          commit('user_communities_error')
          console.log(err)
          reject(err)
        })
      })
    },

    getAlerts({commit}, userId) {
      return new Promise((resolve, reject) => {
        http.get(`/users/${userId}/alerts`)
          .then(resp => {
            commit('user_alerts_request_success', resp.data);
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    updateAlert({commit}, params) {
      const alert = {
        alerts: {[params.alertId]: params.alertValue},
      };
      return new Promise((resolve, reject) => {
        http.put(`/users/${params.userId}/alerts`, alert)
          .then(resp => {
            commit('user_alerts_request_success', resp.data);
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

  generatePhoneToken({commit}, id) {
    return new Promise((resolve, reject) => {
      http.get(`/users/${id}/generate_phone_token`)
        .then(resp => {
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  checkPhoneTokenPost({commit}, params) {
    return new Promise((resolve, reject) => {
      http.post(`/users/checkPhoneToken`, params)
        .then(resp => {
          commit('user_request_success', resp.data);
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  },
  getters : {

    userId: state => {
      return !! state.user && state.user.id
    },

    tokenUser: state => {
      return !! state.tokenUser && state.tokenUser
    },

    userCommunities: state => {
      return state.userCommunities
    },

    statusUserCommunities: state => {
      return state.statusUserCommunities
    }
  }
}

export default {userStore};
