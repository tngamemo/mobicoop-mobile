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
    solidaries: {
      objects: undefined
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
        userAgreementAccepted: false,
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
        userAgreementAccepted: false,
        languages: [],
        needs: [],
        comment: undefined,
        vehicle: true,
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
        mMin: 8,
        mMinTime: 8,
        mMax: 13,
        mMaxTime: 13,
        aMin: 13,
        aMinTime: 13,
        aMax: 18,
        aMaxTime: 18,
        eMin: 18,
        eMinTime: 18,
        eMax: 21,
        eMaxTime: 21,
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
        eSun: false,
        minDeviationDistance: 5,
        maxDeviationDistance: 50,
        maxDistance: 5
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
        userAgreementAccepted: false,
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
        userAgreementAccepted: false,
        languages: [],
        needs: [],
        comment: undefined,
        vehicle: true,
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
        mMin: 8,
        mMinTime: 8,
        mMax: 13,
        mMaxTime: 13,
        aMin: 13,
        aMinTime: 13,
        aMax: 18,
        aMaxTime: 18,
        eMin: 18,
        eMinTime: 18,
        eMax: 21,
        eMaxTime: 21,
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
        eSun: false,
        minDeviationDistance: 5,
        maxDeviationDistance: 50,
        maxDistance: 5
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

    mySolidariesSuccess(state, solidaries){
      state.solidaries.objects = solidaries
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
      if (structure.subjects.length !== 0) {
        state.temporary.request.subject = structure.subjects[0].id
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
    },

    resetSolidaryVolunteer: (state) => {
      state.temporary.volunteer = _.cloneDeep(state.default.volunteer)
    },


    // Volunteer
    postSolidaryVolunteerSuccess: (state, res) => {
      state.default.volunteer = res;
      state.temporary.volunteer = _.cloneDeep(state.default.volunteer)
    },

    getSolidaryUserSuccess: (state, res)=> {
      state.default.volunteer = res;
      state.temporary.volunteer = _.cloneDeep(state.default.volunteer)
    },

    putSolidaryVolunteerSuccess: (state, res) => {
      state.default.volunteer = res;
      state.temporary.volunteer = _.cloneDeep(state.default.volunteer)
    },

    solidaryVolunteerHomeAddressUpdate(state, address) {
      address = _.cloneDeep(address)
      // Remove useless elements
      delete address['@id']
      delete address['@type']
      delete address['id']
      delete address['geoJson']
      state.temporary.volunteer.homeAddress = address
    },
    solidaryVolunteerStructureUpdate(state, structure) {
      state.temporary.volunteer.structure = structure

      // Needs
      state.temporary.volunteer.needs = []
      if (structure) {
        _.each(structure.needs, (need) => {
          let structureNeed = {
            id: need.id,
            value: undefined,
          }
          state.temporary.volunteer.needs.push(structureNeed)
        })
      }
    },
  },
  actions: {
    getSolidaryArticle({commit, state}, id){
      return new Promise((resolve, reject) => {
        http.get("/articles/" + id)
        .then(response => {
          resolve(response.data)
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    getSolidaryStructuresByGeolocation({commit, state}, {lat, lng}){
      // if (state.structures.status === 'success') {
      //   return new Promise((resolve, reject) => {
      //     resolve(state.structures.objects)
      //   })
      // } else {
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
      //}
    },
    getSolidaryStructures({commit, state}){
      // if (state.structures.status === 'success') {
      //   return new Promise((resolve, reject) => {
      //     resolve(state.structures.objects)
      //   })
      // } else {
        commit('solidaryStructuresRequest')
        return new Promise((resolve, reject) => {
          http.get(`/structures`) // quick fix below
          //http.get(`/structures/geolocation?lat=48.858612&lon=2.339162`)
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
      //}
    },
    getMySolidaries({commit, state}){
      return new Promise((resolve, reject) => {
        http.get(`/solidaries/mySolidaries`)
        .then(response => {
          if (response) {
            commit('mySolidariesSuccess', response.data['hydra:member'])
            resolve(state.solidaries.objects)
          }
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    getSolidary({commit, state}, id){
      return new Promise((resolve, reject) => {
        let solidary = _.find(state.solidaries.objects, {id: parseInt(id)})
        if (!_.isUndefined(solidary)) {
          resolve(solidary)
        } else {
          reject('Solidary not found')
        }
      })
    },
    getVolunteerDetails({commit, state}, id){
      return new Promise((resolve, reject) => {
        http.get(`/solidary_volunteers/` + id)
          .then(response => {
            if (response) {
              const data = response.data;
              commit('getSolidaryUserSuccess', data);
              resolve(data)
            }
          })
          .catch(err => {
            reject(err)
          })
      })
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
    postSolidaryResource: ({commit, state}, type) => {
      let solidary = _.cloneDeep(state.temporary.request)
      let structure = solidary.structure

      // The user is connected during the request
      if (_.isUndefined(solidary.password)) {
        delete solidary['password']
      }

      // Normalize Solidary Ressource before Post request
      if (structure.subjects.length !== 0) {
        solidary.subject = _.find(structure.subjects, {id: solidary.subject})['@id']
      }
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

          let outwardTimes = {};
          Object.entries(solidary.days).forEach(item => {
            if(item[1] == 1) {
              outwardTimes[item[0]] = specificHour.format('hh:mm')
            } else if (item[1] == 0) {
              outwardTimes[item[0]] = null
            }
          });
          solidary.outwardTimes = outwardTimes;

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

          let outwardTimes = {};
          Object.entries(solidary.days).forEach(item => {
            if(item[1] == 1) {
              outwardTimes[item[0]] = moment().set({hour: marginHour, minute: 0}).format('hh:mm')
            } else if (item[1] == 0) {
              outwardTimes[item[0]] = null
            }
          });
          solidary.outwardTimes = outwardTimes;
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

          let returnTimes = {};
          Object.entries(solidary.days).forEach(item => {
            if(item[1] == 1) {
              returnTimes[item[0]] = specificHour.format('hh:mm')
            } else if (item[1] == 0) {
              returnTimes[item[0]] = null
            }
          });
          solidary.returnTimes = returnTimes;
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

            let returnTimes = {};
            Object.entries(solidary.days).forEach(item => {
              if(item[1] == 1) {
                returnTimes[item[0]] = moment().set({hour: marginHour, minute: 0}).format('hh:mm')
              } else if (item[1] == 0) {
                returnTimes[item[0]] = null
              }
            });
            solidary.returnTimes = returnTimes;
          }
        }
      }

      // console.log('days', solidary.days)
      // console.log('outwardDatetime', solidary.outwardDatetime)
      // console.log('outwardDeadlineDatetime', solidary.outwardDeadlineDatetime)
      // console.log('returnDatetime', solidary.returnDatetime)
      // console.log('returnDeadlineDatetime', solidary.returnDeadlineDatetime)
      // console.log('marginDuration', solidary.marginDuration)
      //Usual
      if(type === 'usual') {
        solidary.driver = true;
      }

      if(solidary.email === "") {
        delete solidary['email']
      }
      if(solidary.telephone === "") {
        delete solidary['telephone']
      }

      // Post Solidary
      const endpoint = type === 'usual' ? '/solidaries/postUl' : '/solidaries';

      return new Promise((resolve, reject) => {
        http.post(endpoint, solidary)
          .then(resp => {
            return resp.data
          })
          .then((resp) => {
            let solidary = resp
            let promises = []
            if (type !== 'usual') {
              _.each(proofsToUpload, (proof) => {
                let formData = new FormData()
                formData.append('file', proof.file)
                formData.append('structureProof', proof.structureProof)
                formData.append('solidary', solidary['@id'])
                promises.push(http.post(`/proofs`, formData))
              })
            }

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
    },
    postSolidaryVolunteer: ({commit, state, rootState}) => {
      let volunteer = _.cloneDeep(state.temporary.volunteer);
      if (rootState.userStore.user) {
        volunteer.email = rootState.userStore.user.email;
      }
      let structure = volunteer.structure;

      // The user is connected during the request
      if (_.isUndefined(volunteer.password)) {
        delete volunteer['password']
      }

      // No structure selected
      if (!volunteer.hasStructure) {
        delete volunteer['structure']
        volunteer.needs = []
      } else {
        volunteer.structure = structure['@id']

        // Normalize Needs
        let needs = volunteer.needs
        volunteer.needs = []
        _.each(needs, (need) => {
          if (need.value) {
            volunteer.needs.push(_.find(structure.needs, {id: need.id})['@id'])
          }
        })
      }

      let format = 'YYYY-MM-DDTHH:mm:ssZ'
      // Normalize Range
      volunteer.mMinTime = moment().set({hour: volunteer.mMinTime, minute: 0, second: 0}).format(format)
      volunteer.mMaxTime = moment().set({hour: volunteer.mMaxTime, minute: 0, second: 0}).format(format)
      volunteer.aMinTime = moment().set({hour: volunteer.aMinTime, minute: 0, second: 0}).format(format)
      volunteer.aMaxTime = moment().set({hour: volunteer.aMaxTime, minute: 0, second: 0}).format(format)
      volunteer.eMinTime = moment().set({hour: volunteer.eMinTime, minute: 0, second: 0}).format(format)
      volunteer.eMaxTime = moment().set({hour: volunteer.eMaxTime, minute: 0, second: 0}).format(format)

      delete(volunteer['mMin'])
      delete(volunteer['mMax'])
      delete(volunteer['aMin'])
      delete(volunteer['aMax'])
      delete(volunteer['eMin'])
      delete(volunteer['eMax'])

      // console.log(volunteer.mMinTime)
      // console.log(volunteer.mMaxTime)
      // console.log(volunteer.aMinTime)
      // console.log(volunteer.aMaxTime)
      // console.log(volunteer.eMinTime)
      // console.log(volunteer.eMaxTime)

      // Normalize maxDistance to meters
      // volunteer.maxDistance = volunteer.maxDistance * 1000
      // console.log(volunteer.maxDistance)

      // Post Solidary
      return new Promise((resolve, reject) => {
        http.post("/solidary_volunteers", volunteer)
          .then(resp => {
            return resp.data
          })
          .then((response) => {
            commit('postSolidaryVolunteerSuccess')
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    putSolidaryVolunteer: ({commit, state}) => {
      let volunteer = _.cloneDeep(state.temporary.volunteer);
      delete volunteer.user;
      delete volunteer.needs;
      delete volunteer.solidaries;
      delete volunteer.diaries;
      delete volunteer.validatedCandidate;
      delete volunteer.updatedDate;
      delete volunteer.newsSubscription;

      let format = 'YYYY-MM-DDTHH:mm:ssZ'
      // Normalize Range
      volunteer.mMinTime = moment().set({hour: volunteer.mMinTime, minute: 0, second: 0}).format(format)
      volunteer.mMaxTime = moment().set({hour: volunteer.mMaxTime, minute: 0, second: 0}).format(format)
      volunteer.aMinTime = moment().set({hour: volunteer.aMinTime, minute: 0, second: 0}).format(format)
      volunteer.aMaxTime = moment().set({hour: volunteer.aMaxTime, minute: 0, second: 0}).format(format)
      volunteer.eMinTime = moment().set({hour: volunteer.eMinTime, minute: 0, second: 0}).format(format)
      volunteer.eMaxTime = moment().set({hour: volunteer.eMaxTime, minute: 0, second: 0}).format(format)

      delete(volunteer['mMin'])
      delete(volunteer['mMax'])
      delete(volunteer['aMin'])
      delete(volunteer['aMax'])
      delete(volunteer['eMin'])
      delete(volunteer['eMax'])

      // Put Solidary
      return new Promise((resolve, reject) => {
        http.put("/solidary_volunteers/" + volunteer.id, volunteer)
          .then(resp => {
            return resp.data
          })
          .then((response) => {
            commit('putSolidaryVolunteerSuccess', response);
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
        let displayGeo = '';
        if (address.addressLocality) {
          displayGeo += `${address.addressLocality}`;
        }
        if(address.streetAddress) {
          displayGeo += `, ${address.streetAddress}`
        }
        if(address.postalCode) {
          displayGeo += `, ${address.postalCode}`
        }
        if (address.addressCountry) {
          displayGeo += `, ${address.addressCountry}`;
        }
        return displayGeo;
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
        const f = _.find(values, {'value': key})
        if (f) {
          return f.label.toLowerCase()
        }
      }
      return
    },
    getHourForKeyToDisplay: () => (values, key) => {
      if (!_.isUndefined(values) && !_.isUndefined(key)) {
        const f = _.find(values, {'value': key})
        if (f) {
          return 'entre ' + moment(f.min_time).utc().format('HH') + 'h et ' + moment( f.max_time).utc().format('HH') +'h'
        }
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
