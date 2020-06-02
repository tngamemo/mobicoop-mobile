import http from '../Shared/Mixin/http.mixin'
import {isPlatform} from "@ionic/core"
import _ from 'lodash'

export const solidaryTransportStore = {
  state: {
    messages: {
      home: {
        display: true
      }
    },
    help: {
      article: undefined,
      status: '' // loading | success | error
    },
    structures: {
      objects: undefined,
      status: ''
    },
    register: {
      status: ''
    },
    default: {
      user: {
        status: 1,
        givenName: undefined,
        familyName: undefined,
        email: undefined,
        gender: 0,
        birthDate: undefined,
        telephone: undefined,
        password: undefined,
        phoneDisplay: 1,
        mobile: true,
        language: "fr_FR",
        addresses: [undefined],
        mobileRegistration: 1,
        userAgreementAccepted: false
      }
    },
    temporary: {
      user: {
        status: 1,
        givenName: undefined,
        familyName: undefined,
        email: undefined,
        gender: 0,
        birthDate: undefined,
        telephone: undefined,
        password: undefined,
        phoneDisplay: 1,
        mobile: true,
        language: "fr_FR",
        addresses: [undefined],
        mobileRegistration: 1,
        userAgreementAccepted: false
      },
      address: {},
      request: {
        telephone: undefined,
        givenName: undefined,
        password: undefined,
        familyName: undefined,
        email: undefined,
        birthDate: undefined,
        gender: 0,
        homeAddress: undefined,
        subject: undefined,
        structure: undefined,
        status: 0,
        proofs: {
          mandatory: {},
          optional: {}
        },
        needs: [],
        outwardDeadlineDatetime: undefined,
        outwardDatetime: undefined,
        returnDeadlineDatetime: undefined,
        returnDatetime: undefined,
        origin: undefined,
        destination: undefined,
        frequency: 1,
        days: {
          mon: 0,
          tue: 0,
          wed: 0,
          thu: 0,
          fri: 0,
          sat: 0,
          sun: 0
        }
      },
      ad: {}
    }
  },
  mutations: {
    solidaryUpdateMessageDisplayOnHome (state, display) {
      state.messages.home.display = display
    },

    // Help Mutations below
    solidaryHelpRequest(state) {
      state.help.status = 'loading';
    },

    solidaryHelpSuccess(state, article){
      state.help.status = 'success';
      state.help.article = article
    },

    solidaryHelpError(state){
      state.help.status = 'error';
    },

    // Register Mutations below
    solidaryRegisterUserRequest(state) {
      state.register.status = 'loading';
    },

    solidaryRegisterUserSuccess(state, user){
      state.register.status = 'success';
      state.temporary.user = _.cloneDeep(state.default.user)
    },

    solidaryRegisterUserError(state){
      state.register.status = 'error';
    },

    solidaryUserUpdate(state, user) {
      state.temporary.user = user
    },
    solidaryAddressUpdate(state, address) {
      state.temporary.address = address
    },
    solidaryUserAddressUpdate(state, address) {
      address = _.cloneDeep(address)
      // Remove useless elements
      delete address['@id']
      delete address['@type']
      delete address['id']
      delete address['geoJson']
      state.temporary.user.addresses.splice(0, 1, address)
    },

    // Request Mutations below
    solidaryStructuresRequest(state) {
      state.structures.status = 'loading';
    },

    solidaryStructuresSuccess(state, structures){
      state.structures.status = 'success';

      _.each(structures, (structure, index) => {
        if (!_.hasIn(structure, 'structureProofs')) {
          structure.structureProofs = [
            {
              "id": 1,
              "label": "J'habite une commune du Parc",
              "type": 1,
              "position": 1,
              "checkbox": true,
              "input": null,
              "selectbox": null,
              "radio": null,
              "options": null,
              "acceptedValues": null,
              "file": null,
              "mandatory": true,
            },
            {
              "id": 2,
              "label": "Je suis",
              "type": 1,
              "position": 2,
              "checkbox": null,
              "input": null,
              "selectbox": true,
              "radio": null,
              "options": "jeune sans emploi (<25ans);mère célibataire;personne âgée(>60ans)",
              "acceptedValues": "jeune_chomeur;mere_celibataire;personne_agee",
              "file": null,
              "mandatory": true,
            },
            {
              "id": 3,
              "label": "Justificatif de domicile",
              "type": 1,
              "position": 3,
              "checkbox": null,
              "input": null,
              "selectbox": null,
              "radio": null,
              "options": null,
              "acceptedValues": null,
              "file": true,
              "mandatory": true,
            },
            {
              "id": 4,
              "label": "Je test un radio",
              "type": 1,
              "position": 4,
              "checkbox": null,
              "input": null,
              "selectbox": null,
              "radio": true,
              "options": "jeune sans emploi (<25ans);mère célibataire;personne âgée(>60ans)",
              "acceptedValues": "jeune_chomeur;mere_celibataire;personne_agee",
              "file": null,
              "mandatory": null,
            },
            {
              "id": 5,
              "label": "Je test un champ",
              "type": 1,
              "position": 0,
              "checkbox": null,
              "input": true,
              "selectbox": null,
              "radio": null,
              "options": null,
              "acceptedValues": null,
              "file": null,
              "mandatory": null,
            }
          ]
        }
        if (!_.hasIn(structure, 'subjects')) {
          structure.subjects = [
            {
              "id": 1,
              "label": "Faire mes courses"
            },
            {
              "id": 2,
              "label": "Aller à un RDV médical"
            },
            {
              "id": 3,
              "label": "Aller à un RDV administratif"
            },
            {
              "id": 4,
              "label": "Faire une sortie culturelle"
            },
            {
              "id": 5,
              "label": "Autre motif"
            }
          ]
        }
      })

      state.structures.objects = structures
    },

    solidaryStructuresError(state){
      state.structures.status = 'error';
    },

    solidaryStructureUpdate(state, structure) {
      console.log('solidaryStructureUpdate')
      state.temporary.request.structure = structure
      
      // Proofs
      state.temporary.request.proofs = {}
      let mandatory = {}
      let optional = {}
      _.each(structure.structureProofs, (proof) => {
        let structureProof = {
          id: proof.id,
          value: undefined,
        }

        if (proof.checkbox) {
          structureProof.type = "checkbox"
        }
        if (proof.input) {
          structureProof.type = "input"
        }
        if (proof.selectbox) {
          structureProof.type = "selectbox"
          structureProof.options = {}

          let keys = _.split(proof.acceptedValues, ';')
          let values = _.split(proof.options, ';')

          _.each(keys, (key, index) => {
            structureProof.options[key] = values[index]
          })
        }
        if (proof.radio) {
          structureProof.type = "radio"
          structureProof.options = {}

          let keys = _.split(proof.acceptedValues, ';')
          let values = _.split(proof.options, ';')

          _.each(keys, (key, index) => {
            structureProof.options[key] = values[index]
          })
        }
        if (proof.file) {
          structureProof.type = "file"
          structureProof.file = undefined
          structureProof.upload = false
        }

        if (proof.mandatory) {
          mandatory[proof.id] = structureProof
        } else {
          optional[proof.id] = structureProof
        }
      })
      state.temporary.request.proofs.mandatory = mandatory
      state.temporary.request.proofs.optional = optional

      // Needs
      state.temporary.request.needs = []
      _.each(structure.needs, (need) => {
        let structureNeed = {
          id: need.id,
          value: undefined,
        }
        state.temporary.request.needs.push(structureNeed)
      })

      // Subjects
      if (structure.needs.length !== 0) {
        state.temporary.request.subject = structure.needs[0].id
      }

      console.log('solidaryStructureUpdateEnd', state.temporary.request.proofs)
    },
    solidaryRequestHomeAddressUpdate(state, address) {
      address = _.cloneDeep(address)
      // Remove useless elements
      delete address['@id']
      delete address['@type']
      delete address['id']
      delete address['geoJson']
      state.temporary.request.homeAddress = address
    },
    solidaryRequestOriginAddressUpdate(state, address) {
      address = _.cloneDeep(address)
      // Remove useless elements
      delete address['@id']
      delete address['@type']
      delete address['id']
      delete address['geoJson']
      state.temporary.request.origin = address
    },
    solidaryRequestDestinationAddressUpdate(state, address) {
      address = _.cloneDeep(address)
      // Remove useless elements
      delete address['@id']
      delete address['@type']
      delete address['id']
      delete address['geoJson']
      state.temporary.request.destination = address
    }
  },
  actions: {
    getSolidaryArticle({commit, state}, id){
      if (state.help.status === 'success') {
        return new Promise((resolve, reject) => {
          resolve(state.help.article)
        })
      } else {
        commit('solidaryHelpRequest')
        return new Promise((resolve, reject) => {
          http.get("/articles/" + id)
          .then(response => {
            if (response) {
              commit('solidaryHelpSuccess', response.data)
              resolve(state.help.article)
            }
          })
          .catch(err => {
            commit('solidaryHelpError')
            reject(err)
          })
        })
      }
    },
    getSolidaryStructuresByGeolocation({commit, state}, {lat, lng}){
      if (state.structures.status === 'success') {
        return new Promise((resolve, reject) => {
          resolve(state.structures.objects)
        })
      } else {
        commit('solidaryStructuresRequest')
        return new Promise((resolve, reject) => {
          http.get(`/structures/geolocation?lat=${lat}&lon=${lng}`)
          .then(response => {
            if (response) {
              commit('solidaryStructuresSuccess', response.data['hydra:member'])
              resolve(state.structures.objects)
            }
          })
          .catch(err => {
            commit('solidaryStructuresError')
            reject(err)
          })
        })
      }
    },
    registerStandardUser: ({commit, state}) => {
      let user = _.cloneDeep(state.temporary.user)
      commit('solidaryRegisterUserRequest')

      // Check Platform type for Marketing information
      if (isPlatform(window.document.defaultView, "ios")) {
        user.mobileRegistration = 2;
      }
      if (isPlatform(window.document.defaultView, "android")) {
        user.mobileRegistration = 3;
      }
      // Register user
      return new Promise((resolve, reject) => {
        http.post("/users/register", user).then(resp => {
          if (resp) {
            commit('solidaryRegisterUserSuccess', resp.data);
            resolve(resp.data)
          }
        }).catch(err => {
          commit('solidaryRegisterUserError');
          reject(err)
        })
      })
    },
    validateStandardUser: ({commit, state}, params) => {
      let mobile = '';
      if (isPlatform(window.document.defaultView, "ios")) {
        mobile = '?mobile=1'
      }
      if (isPlatform(window.document.defaultView, "android")) {
        mobile = '?mobile=2'
      }

      return new Promise((resolve, reject) => {
        http.post("/login-token" + mobile, params).then(resp => {
          if (resp) {
            const tokenUser = resp.data.token;
            localStorage.setItem('tokenUser', tokenUser);
            commit('auth_success', tokenUser);
            resolve(resp)
          }
        }).catch(err => {
          console.log('error')
          reject(err)
        })
      })
    }
  },
  getters: {
    getParameters: () => (string, separator) => {
      return _.split(string, separator)
    },
    getOrderedProofs: () => (proofs) => {
      return _.orderBy(proofs, ['position'], ['asc'])
    },
    getMandatoryProofs: (state, getters) => (proofs) => {
      return getters.getOrderedProofs(_.filter(proofs, (proof) => {
        return proof.mandatory
      }))
    },
    getOptionalProofs: (state, getters) => (proofs) => {
      return getters.getOrderedProofs(_.filter(proofs, (proof) => {
        return !proof.mandatory
      }))
    },
    getAddressToDisplay: () => (address) => {
      if (address) {
        return `${address.addressLocality}, ${address.addressCountry}`
      }
      return
    },
    getUserAvatar: () => (user) => {
      if (user) {
        if (user.avatars.length !== 0) {
          return process.env.VUE_APP_API_URL + user.avatars[0]
        }
      }
      return
    },
    getUserAddress: () => (user) => {
      if (user) {
        if (user.addresses.length !== 0) {
          return user.addresses[0]
        }
      }
      return
    },
    getUserAge: () => (user) => {
      if (user) {
        const dateString = user.birthDate
        if (dateString !== '') {
          let birthday = +new Date(dateString)
          return ~~ ((Date.now() - birthday) / (31557600000))
        }
      }
      return 
    },
    getUserCar: () => (user) => {
      if (user) {
        if (user.cars.length !== 0) {
          return user.cars[0]
        }
      }
    }
  }
}

export default {solidaryTransportStore};
