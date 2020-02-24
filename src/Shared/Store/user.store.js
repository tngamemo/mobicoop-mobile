import http from '../Mixin/http.mixin'

export const userStore = {
  state: {
    status: '',
    tokenUser: localStorage.getItem('tokenUser') || '',
    tokenAnonymousUser: localStorage.getItem('tokenAnonymousUser') || '',
    user : null
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },

    auth_success(state, tokenUser){
      state.tokenUser = tokenUser;
    },

    auth_error(state){
      state.status = 'error';
    },

    auth_anonymous_success(state, tokenAnonymousUser){
      state.tokenAnonymousUser = tokenAnonymousUser
    },

    user_request_success(state, user) {
      state.status = 'success';
      state.user = user;
    },

    logout(state){
      state.status = '';
      state.tokenUser = '';
      state.user = null;
    },

  },
  actions: {
    login({commit}, params){
      commit('auth_request')
      return new Promise((resolve, reject) => {
        http.post("/login", { "username": params.username, "password": params.password })
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

      return new Promise((resolve, reject) => {
        http.post("/auth", { "username": 'mobile', "password": 'mobile' })
        .then(resp => {

          const tokenAnonymousUser = resp.data.token
          localStorage.setItem('tokenAnonymousUser', tokenAnonymousUser)

          // On commit et envoie le resultat
          commit('auth_anonymous_success', tokenAnonymousUser)
          resolve(resp)
        })
        .catch(err => {
          console.log(err)
          localStorage.removeItem('tokenAnonymousUser')
          reject(err)
        })
      })
    },

    /**
     * Fonction pour récupérer les informations d'un utilisateur
     */
    getUser({commit}, params){
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

    logout({commit}){
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('tokenUser')
        resolve()
      })
    }


  },
  getters : {

    userId: state => {
      return !! state.user && state.user.id
    },
  }
}

export default {userStore};
