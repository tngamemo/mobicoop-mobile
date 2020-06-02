<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>{{ $t('solidaryTransport.request.title') }} <sup>5/6</sup></ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content ref="request" color="primary" class="is-scrollable">
      <div class="mc-st-container">
        <div class="mc-st-form">

          <div class="mc-st-form-content">
            <div class="mc-st-form-header">
              <div class="mc-st-form-title">{{$t('solidaryTransport.request.steps.user')}}</div>
              <div class="mc-st-form-steps">
                <span class="mc-st-form-step is-validate"></span>
                <span class="mc-st-form-step is-validate"></span>
                <span class="mc-st-form-step is-validate"></span>
                <span class="mc-st-form-step is-validate"></span>
                <span class="mc-st-form-step is-active"></span>
                <span class="mc-st-form-step"></span>
              </div>
            </div>

            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.gender')}} *</ion-label>
              <ion-select 
                required
                :value="request.gender"
                @ionChange="request.gender = parseInt($event.target.value)"
                :cancel-text="$t('solidaryTransport.buttons.cancel')"
                :ok-text="$t('solidaryTransport.buttons.validate')"
              >
                <ion-select-option value="1">{{$t('solidaryTransport.commons.gender.female')}}</ion-select-option>
                <ion-select-option value="2">{{$t('solidaryTransport.commons.gender.male')}}</ion-select-option>
                <ion-select-option value="3">{{$t('solidaryTransport.commons.gender.nc')}}</ion-select-option>
              </ion-select>
            </ion-item>
            <div class="mc-st-form-details" v-if="$v.request.gender.$error">
              <span class="mc-st-form-error">{{$t('solidaryTransport.register.form.validators.required')}}</span>
            </div>

            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.firstname')}} *</ion-label>
              <ion-input 
                class="mc-st-form-input" 
                type="text" 
                :value="request.givenName" 
                @input="request.givenName = $event.target.value;"
              ></ion-input>
            </ion-item>
            <div class="mc-st-form-details">
              <span class="mc-st-form-note">{{$t('solidaryTransport.register.form.fields.visibility')}}</span>
              <span class="mc-st-form-error" v-if="$v.request.givenName.$error">{{$t('solidaryTransport.register.form.validators.required')}}</span>
            </div>

            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.lastname')}} *</ion-label>
              <ion-input 
                class="mc-st-form-input" 
                type="text" 
                :value="request.familyName" 
                @input="request.familyName = $event.target.value;"
              ></ion-input>
            </ion-item>
            <div class="mc-st-form-details" v-if="$v.request.familyName.$error">
              <span class="mc-st-form-error">{{$t('solidaryTransport.register.form.validators.required')}}</span>
            </div>

            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.birthdate')}} *</ion-label>
              <ion-datetime
                display-format="DD/MM/YYYY"
                picker-format="DD/MM/YYYY"
                :cancel-text="$t('solidaryTransport.buttons.cancel')"
                :done-text="$t('solidaryTransport.buttons.validate')"
                :value="request.birthDate"
                @ionChange="request.birthDate = $event.detail.value; $v.$reset('request.birthDate');"
              ></ion-datetime>
            </ion-item>
            <div class="mc-st-form-details" v-if="$v.request.birthDate.$error">
              <span class="mc-st-form-error" v-if="!$v.request.birthDate.required">{{$t('solidaryTransport.register.form.validators.required')}}</span>
              <span class="mc-st-form-error" v-else-if="!$v.request.birthDate.isMaxBirthDate">{{$t('solidaryTransport.register.form.validators.age', { value: minAge })}}</span>
            </div>

            <ion-item class="mc-st-form-item" v-on:click="displayGeoSearch()">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.address')}} *</ion-label>
              <ion-input
                type="text"
                :value="getAddressToDisplay(request.homeAddress)"
                readonly="true"
                class="no-clickable"
              ></ion-input>
            </ion-item>
            <div class="mc-st-form-details" v-if="$v.request.homeAddress.$error">
              <span class="mc-st-form-error" v-if="!$v.request.homeAddress.required">{{$t('solidaryTransport.register.form.validators.required')}}</span>
            </div>

            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.phone')}} *</ion-label>
              <ion-input
                class="mc-st-form-input" 
                type="text"
                :value="request.telephone"
                @input="request.telephone = $event.target.value;"
              ></ion-input>
            </ion-item>
            <div class="mc-st-form-details" v-if="$v.request.telephone.$error">
              <span class="mc-st-form-error" v-if="!$v.request.telephone.minLength">{{$t('solidaryTransport.register.form.validators.telephone')}}</span>
              <span class="mc-st-form-error" v-else-if="!$v.request.telephone.required">{{$t('solidaryTransport.register.form.validators.required')}}</span>
            </div>

            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.email')}} *</ion-label>
              <ion-input 
                class="mc-st-form-input" 
                type="email" 
                :value="request.email"
                @ionChange="request.email = $event.target.value"
              ></ion-input>
            </ion-item>
            <div class="mc-st-form-details" v-if="$v.request.email.$error">
              <span class="mc-st-form-error" v-if="!$v.request.email.email">{{$t('solidaryTransport.register.form.validators.email')}}</span>
              <span class="mc-st-form-error" v-else-if="!$v.request.email.required">{{$t('solidaryTransport.register.form.validators.required')}}</span>
            </div>
            
          </div>

          <div class="mc-st-form-controls with-multiple">
            <ion-button class="mc-st-form-control as-back" color="light" v-html="$t('solidaryTransport.buttons.back')" @click="$router.back()"></ion-button>

            <ion-button class="mc-st-form-control" color="success" @click="validate()">
              <span v-html="$t('solidaryTransport.buttons.next')"></span>
            </ion-button>
          </div>

        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="scss">
  
</style>

<script>
import _ from 'lodash'
import moment from 'moment'
import { mapGetters, mapState } from 'vuex'
import { required, between, email, sameAs, minLength, helpers } from 'vuelidate/lib/validators'

const oneUppercase = helpers.regex("oneUppercase", /[A-Z]/);
const oneDigit = helpers.regex("oneDigit", /\d/);
const hasAddress = (value) => !_.isNull(value[0])
const isMaxBirthDate = (value, vm) => {
  let n = new Date();
  n.setFullYear(n.getFullYear() - process.env.VUE_APP_REGISTER_MIN_AGE);
  return moment(value).isBefore(moment(n.toISOString()));
}

export default {
  name: 'solidaryTransport.request.user',
  components: {},
  data () {
    return {
      minAge: process.env.VUE_APP_REGISTER_MIN_AGE
    }
  },
  computed: {
    ...mapGetters([
      'getAddressToDisplay'
    ]),
    request: {
      get() {
        return this.$store.state.solidaryTransportStore.temporary.request;
      },
      set() {
        this.$store.commit("solidaryRequestUpdate", this.request);
      }
    }
  },
  validations: {
    request: {
      gender: {
        required,
        between: between(1, 3)
      },
      givenName: {
        required
      },
      familyName: {
        required
      },
      birthDate: {
        required,
        isMaxBirthDate
      },
      telephone: {
        required,
        minLength: minLength(10)
      },
      email: {
        required,
        email
      },
      homeAddress: {
        hasAddress
      }
    }
  },
  mounted: function () {
    _.each(this.eligibility, (item) => {
      this.$root.$set(item, 'checked', false)
    })
  },
  methods: {
    getMaxBirthDate() {
      let n = new Date();
      n.setFullYear(n.getFullYear() - process.env.VUE_APP_REGISTER_MIN_AGE);
      return n.toISOString();
    },
    displayGeoSearch: function () {
      this.$router.push({ name: "solidaryTransport.geoSearch", query: { action: 'solidaryTransport.search', type: 'request.home' }});
    },
    validate: function () {
      if (!this.processing) {
        this.$v.$reset();
        this.$v.$touch();
        if (this.$v.$invalid) {
          this.$refs.request.getScrollElement().then((parent) => {
            let child = document.getElementsByClassName('mc-st-form-error')[0]
            var childPos = child.offsetTop
            var parentPos = parent.offsetTop
            var top = childPos - parentPos - 30
            this.$refs.request.scrollToPoint(0, top, 0)
          })
        } else {
          this.$router.push({name: 'solidaryTransport.home.request.summary'})
        }
      }
    }
  },
  created: function () {
    if (this.$store.state.userStore.user) {
      let user = _.cloneDeep(this.$store.state.userStore.user)
      this.request.gender = user.gender
      this.request.givenName = user.givenName
      this.request.familyName = user.familyName
      this.request.birthDate = user.birthDate
      this.request.telephone = user.telephone
      this.request.email = user.email
      this.request.homeAddress = this.user.addresses[0]
    }
  }
}
</script>