import http from '../Shared/Mixin/http.mixin'
import {isPlatform} from "@ionic/core"
import _ from 'lodash'
import moment from 'moment'

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
      },
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
        marginDuration: 9000, // 2h30 before and after covered
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
        },
        when: {
          departure: {
            specificDate: undefined,
            marginDate: undefined,
            specificHour: undefined,
            marginHour: undefined
          },
          return: {
            specificDate: undefined,
            marginDate: undefined,
            specificHour: undefined,
            marginHour: undefined
          }
        }
      },
      volunteer: {
        telephone: undefined,
        givenName: undefined,
        password: undefined,
        familyName: undefined,
        email: undefined,
        birthDate: undefined,
        gender: 0,
        homeAddress: undefined,
        structure: undefined,
        mMinTime: undefined,
        mMaxTime: undefined,
        aMinTime: undefined,
        aMaxTime: undefined,
        eMinTime: undefined,
        eMaxTime: undefined,
        mMon: false,
        aMon: false,
        eMon: false,
        mTue: false,
        aTue: false,
        eTue: false,
        mWed: false,
        aWed: false,
        eWed: false,
        mThu: false,
        aThu: false,
        eThu: false,
        mFri: false,
        aFri: false,
        eFri: false,
        mSat: false,
        aSat: false,
        eSat: false,
        mSun: false,
        aSun: false,
        eSun: false
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
        marginDuration: 9000, // 2h30 before and after covered
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
        },
        when: {
          departure: {
            specificDate: undefined,
            marginDate: undefined,
            specificHour: undefined,
            marginHour: undefined
          },
          return: {
            specificDate: undefined,
            marginDate: undefined,
            specificHour: undefined,
            marginHour: undefined
          }
        }
      },
      volunteer: {
        telephone: undefined,
        givenName: undefined,
        password: undefined,
        familyName: undefined,
        email: undefined,
        birthDate: undefined,
        gender: 0,
        homeAddress: undefined,
        structure: undefined,
        hasStructure: false,
        mMinTime: undefined,
        mMaxTime: undefined,
        aMinTime: undefined,
        aMaxTime: undefined,
        eMinTime: undefined,
        eMaxTime: undefined,
        mMon: false,
        aMon: false,
        eMon: false,
        mTue: false,
        aTue: false,
        eTue: false,
        mWed: false,
        aWed: false,
        eWed: false,
        mThu: false,
        aThu: false,
        eThu: false,
        mFri: false,
        aFri: false,
        eFri: false,
        mSat: false,
        aSat: false,
        eSat: false,
        mSun: false,
        aSun: false,
        eSun: false
      }
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
    postSolidaryResourceSuccess: (state) => {
      state.temporary.request = _.cloneDeep(state.default.request)
    },

    solidaryRequestFrequencyChange(state){
      state.temporary.request.when = _.cloneDeep(state.default.request.when)
      state.temporary.request.days = _.cloneDeep(state.default.request.days)
    },

    solidaryStructuresRequest(state) {
      state.structures.status = 'loading';
    },

    solidaryStructuresSuccess(state, structures){
      state.structures.status = 'success';
      state.structures.objects = structures
    },

    solidaryStructuresError(state){
      state.structures.status = 'error';
    },

    solidaryStructureUpdate(state, structure) {
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
    getSolidaryStructures({commit, state}){
      if (state.structures.status === 'success') {
        return new Promise((resolve, reject) => {
          resolve(state.structures.objects)
        })
      } else {
        commit('solidaryStructuresRequest')
        return new Promise((resolve, reject) => {
          http.get(`/structures`)
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
          reject(err)
        })
      })
    },
    postSolidaryResource: ({commit, state}) => {
      let solidary = _.cloneDeep(state.temporary.request)
      let structure = solidary.structure

      // The user is connected during the request
      if (_.isUndefined(solidary.password)) {
        delete solidary['password']
      }

      // Normalize Solidary Ressource before Post request
      solidary.subject = _.find(structure.subjects, {id: solidary.subject})['@id']
      solidary.structure = structure['@id']

      // Normalize Proofs
      let proofs = _.toArray(_.merge(solidary.proofs.mandatory, solidary.proofs.optional))
      let proofsToUpload = []
      solidary.proofs = []
      _.each(proofs, (proof) => {
        if (proof.type === 'file') {
          if (!_.isUndefined(proof.file)) {
            proofsToUpload.push({
              structureProof: _.find(structure.structureProofs, {id: proof.id})['@id'],
              file: proof.file
            })
          }
        } else {
          if (proof.value) {
            solidary.proofs.push({
              id: _.find(structure.structureProofs, {id: proof.id})['@id'],
              value: proof.value
            })
          }
        }
      })
      
      // Normalize Needs
      let needs = solidary.needs
      solidary.needs = []
      _.each(needs, (need) => {
        if (need.value) {
          solidary.needs.push(_.find(structure.needs, {id: need.id})['@id'])
        }
      })

      // Normalize Dates
      let when = solidary.when
      let format = 'YYYY-MM-DDTHH:mm:ssZ'
      delete solidary['when']

      // Punctual request
      if (solidary.frequency === 1) {
        delete solidary['days']

        // Outward at a specific date
        if (when.departure.specificDate) {
          delete solidary['outwardDeadlineDatetime']
          delete solidary['returnDeadlineDatetime']

          solidary.outwardDatetime = moment(when.departure.specificDate)
            .set({hour: 0, minute: 0, second: 0})
            .format(format)

          // At a specific hour
          if (when.departure.specificHour) {
            let specificHour = moment(when.departure.specificHour)
            solidary.outwardDatetime = moment(solidary.outwardDatetime)
              .set({hour: specificHour.hour(), minute: specificHour.minute(), second: 0})
              .format(format)

            delete solidary['marginDuration']
          }

          // At a margin hour
          if (when.departure.marginHour) {
            let marginHour = when.departure.marginHour
            if (marginHour === 'morning') {
              marginHour = 8
            }
            if (marginHour === 'afternoon') {
              marginHour = 13
            }
            if (marginHour === 'evening') {
              marginHour = 18
            }

            solidary.outwardDatetime = moment(solidary.outwardDatetime)
              .set({hour: marginHour})
              .add(solidary.marginDuration, 'seconds')
              .format(format)
          }

          // And return at a specific hour
          if (when.return.specificHour) {
            let specificHour = moment(when.return.specificHour)
            solidary.returnDatetime = moment(solidary.outwardDatetime)
              .set({hour: specificHour.hour(), minute: specificHour.minute(), second: 0})
              .format(format)
          }

          // And return n hours after
          if (when.return.marginHour) {
            let marginHour = when.return.marginHour
            if (marginHour === 'hour-later') {
              marginHour = 1
            }
            if (marginHour === 'two-hours-later') {
              marginHour = 2
            }
            if (marginHour === 'three-hours-later') {
              marginHour = 3
            }
            if (marginHour === 'no-need') {
              delete solidary['returnDatetime']
              marginHour = undefined
            }
            if (!_.isUndefined(marginHour)) {
              solidary.returnDatetime = moment(solidary.outwardDatetime)
                .add(marginHour, 'hours')
                .format(format)
            }            
          }
        }

        // Outward at a range date
        if (when.departure.marginDate) {
          solidary.outwardDatetime = moment()
            .set({hour: 0, minute: 0, second: 0})
            .format(format)

          let marginDate = when.departure.marginDate
          if (marginDate === 'this-week') {
            solidary.outwardDeadlineDatetime = moment(solidary.outwardDatetime)
              .add(1, 'weeks')
              .format(format)
          }
          if (marginDate === 'in-two-weeks') {
            solidary.outwardDeadlineDatetime = moment(solidary.outwardDatetime)
              .add(2, 'weeks')
              .format(format)
          }
          if (marginDate === 'in-month') {
            solidary.outwardDeadlineDatetime = moment(solidary.outwardDatetime)
              .add(1, 'months')
              .format(format)
          }

          // At a specific hour
          if (when.departure.specificHour) {
            let specificHour = moment(when.departure.specificHour)
            solidary.outwardDatetime = moment(solidary.outwardDatetime)
              .set({hour: specificHour.hour(), minute: specificHour.minute(), second: 0})
              .format(format)
            solidary.outwardDeadlineDatetime = moment(solidary.outwardDeadlineDatetime)
              .set({hour: specificHour.hour(), minute: specificHour.minute(), second: 0})
              .format(format)

            delete solidary['marginDuration']
          }

          // At a margin hour
          if (when.departure.marginHour) {
            let marginHour = when.departure.marginHour
            if (marginHour === 'morning') {
              marginHour = 8
            }
            if (marginHour === 'afternoon') {
              marginHour = 13
            }
            if (marginHour === 'evening') {
              marginHour = 18
            }

            solidary.outwardDatetime = moment(solidary.outwardDatetime)
              .set({hour: marginHour})
              .add(solidary.marginDuration, 'seconds')
              .format(format)
              solidary.outwardDeadlineDatetime = moment(solidary.outwardDeadlineDatetime)
              .set({hour: marginHour})
              .add(solidary.marginDuration, 'seconds')
              .format(format)
          }

          // And return at a specific hour
          if (when.return.specificHour) {
            let specificHour = moment(when.return.specificHour)
            solidary.returnDatetime = moment(solidary.outwardDatetime)
              .set({hour: specificHour.hour(), minute: specificHour.minute(), second: 0})
              .format(format)
            solidary.returnDeadlineDatetime = moment(solidary.outwardDeadlineDatetime)
              .set({hour: specificHour.hour(), minute: specificHour.minute(), second: 0})
              .format(format)
          }

          // And return n hours after
          if (when.return.marginHour) {
            let marginHour = when.return.marginHour
            if (marginHour === 'hour-later') {
              marginHour = 1
            }
            if (marginHour === 'two-hours-later') {
              marginHour = 2
            }
            if (marginHour === 'three-hours-later') {
              marginHour = 3
            }
            if (marginHour === 'no-need') {
              delete solidary['returnDatetime']
              marginHour = undefined
            }
            if (!_.isUndefined(marginHour)) {
              solidary.returnDatetime = moment(solidary.outwardDatetime)
                .add(marginHour, 'hours')
                .format(format)
              solidary.returnDeadlineDatetime = moment(solidary.outwardDeadlineDatetime)
                .add(marginHour, 'hours')
                .format(format)
            }            
          }
        }

      }

      // Regular Request
      if (solidary.frequency === 2) {
        solidary.outwardDatetime = moment(when.departure.specificDate)
            .set({hour: 0, minute: 0, second: 0})
            .format(format)

        solidary.outwardDeadlineDatetime = moment(when.return.specificDate)
            .set({hour: 0, minute: 0, second: 0})
            .format(format)

        // Departure at a specific hour
        if (when.departure.specificHour) {
          let specificHour = moment(when.departure.specificHour)
          solidary.outwardDatetime = moment(solidary.outwardDatetime)
            .set({hour: specificHour.hour(), minute: specificHour.minute(), second: 0})
            .format(format)
          solidary.outwardDeadlineDatetime = moment(solidary.outwardDeadlineDatetime)
            .set({hour: specificHour.hour(), minute: specificHour.minute(), second: 0})
            .format(format)

          delete solidary['marginDuration']
        }

        // Departure at a margin hour
        if (when.departure.marginHour) {
          let marginHour = when.departure.marginHour
          if (marginHour === 'morning') {
            marginHour = 8
          }
          if (marginHour === 'afternoon') {
            marginHour = 13
          }
          if (marginHour === 'evening') {
            marginHour = 18
          }

          solidary.outwardDatetime = moment(solidary.outwardDatetime)
            .set({hour: marginHour})
            .add(solidary.marginDuration, 'seconds')
            .format(format)
            solidary.outwardDeadlineDatetime = moment(solidary.outwardDeadlineDatetime)
            .set({hour: marginHour})
            .add(solidary.marginDuration, 'seconds')
            .format(format)
        }

        // And return at a specific hour
        if (when.return.specificHour) {
          let specificHour = moment(when.return.specificHour)
          solidary.returnDatetime = moment(solidary.outwardDatetime)
            .set({hour: specificHour.hour(), minute: specificHour.minute(), second: 0})
            .format(format)
          solidary.returnDeadlineDatetime = moment(solidary.outwardDeadlineDatetime)
            .set({hour: specificHour.hour(), minute: specificHour.minute(), second: 0})
            .format(format)
        }

        // And return n hours after
        if (when.return.marginHour) {
          let marginHour = when.return.marginHour
          if (marginHour === 'hour-later') {
            marginHour = 1
          }
          if (marginHour === 'two-hours-later') {
            marginHour = 2
          }
          if (marginHour === 'three-hours-later') {
            marginHour = 3
          }
          if (marginHour === 'no-need') {
            delete solidary['returnDatetime']
            marginHour = undefined
          }
          if (!_.isUndefined(marginHour)) {
            solidary.returnDatetime = moment(solidary.outwardDatetime)
              .add(marginHour, 'hours')
              .format(format)
            solidary.returnDeadlineDatetime = moment(solidary.outwardDeadlineDatetime)
              .add(marginHour, 'hours')
              .format(format)
          }            
        }
      }

      // console.log('days', solidary.days)
      // console.log('outwardDatetime', solidary.outwardDatetime)
      // console.log('outwardDeadlineDatetime', solidary.outwardDeadlineDatetime)
      // console.log('returnDatetime', solidary.returnDatetime)
      // console.log('returnDeadlineDatetime', solidary.returnDeadlineDatetime)
      // console.log('marginDuration', solidary.marginDuration)

      // Post Solidary
      return new Promise((resolve, reject) => {
        http.post("/solidaries", solidary)
          .then(resp => {
            return resp.data
          })
          .then((resp) => {
            let solidary = resp
            let promises = []
            _.each(proofsToUpload, (proof) => {
              let formData = new FormData()
              formData.append('file', proof.file)
              formData.append('structureProof', proof.structureProof)
              formData.append('solidary', solidary['@id'])
              promises.push(http.post(`/proofs`, formData))
            })

            return Promise.all(promises)
          })
          .then((response) => {
            commit('postSolidaryResourceSuccess')
            resolve()
          })
          .catch(err => {
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
    getRequestSubjectToDisplay: () => (request) => {
      if (!_.isUndefined(request)) {
        if (!_.isUndefined(request.subject) && !_.isUndefined(request.structure)) {
          return _.find(request.structure.subjects, {'id': request.subject}).label.toLowerCase()
        }
      }
      return
    },
    getLabelForKeyToDisplay: () => (values, key) => {
      if (!_.isUndefined(values) && !_.isUndefined(key)) {
        return _.find(values, {'value': key}).label.toLowerCase()
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
