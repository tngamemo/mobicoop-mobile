<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>{{$t('solidaryTransport.volunteer.title')}} <sup>3/4</sup></ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content ref="volunteer" color="primary" class="is-scrollable">
      <div class="mc-st-container">
        <div class="mc-st-form">

          <div class="mc-st-form-content">
            <div class="mc-st-form-header">
              <div class="mc-st-form-title">{{$t('solidaryTransport.volunteer.steps.user')}}</div>
              <div class="mc-st-form-steps">
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
                :value="volunteer.gender"
                @ionChange="volunteer.gender = parseInt($event.target.value)"
                :cancel-text="$t('solidaryTransport.buttons.cancel')"
                :ok-text="$t('solidaryTransport.buttons.validate')"
              >
                <ion-select-option value="1">{{$t('solidaryTransport.commons.gender.female')}}</ion-select-option>
                <ion-select-option value="2">{{$t('solidaryTransport.commons.gender.male')}}</ion-select-option>
                <ion-select-option value="3">{{$t('solidaryTransport.commons.gender.nc')}}</ion-select-option>
              </ion-select>
            </ion-item>
            <div class="mc-st-form-details" v-if="$v.volunteer.gender.$error">
              <span class="mc-st-form-error">{{$t('solidaryTransport.register.form.validators.required')}}</span>
            </div>

            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.firstname')}} *</ion-label>
              <ion-input 
                class="mc-st-form-input" 
                type="text" 
                :value="volunteer.givenName" 
                @input="volunteer.givenName = $event.target.value;"
              ></ion-input>
            </ion-item>
            <div class="mc-st-form-details">
              <span class="mc-st-form-note">{{$t('solidaryTransport.register.form.fields.visibility')}}</span>
              <span class="mc-st-form-error" v-if="$v.volunteer.givenName.$error">{{$t('solidaryTransport.register.form.validators.required')}}</span>
            </div>

            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.lastname')}} *</ion-label>
              <ion-input 
                class="mc-st-form-input" 
                type="text" 
                :value="volunteer.familyName" 
                @input="volunteer.familyName = $event.target.value;"
              ></ion-input>
            </ion-item>
            <div class="mc-st-form-details" v-if="$v.volunteer.familyName.$error">
              <span class="mc-st-form-error">{{$t('solidaryTransport.register.form.validators.required')}}</span>
            </div>

            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.birthdate')}} *</ion-label>
              <ion-datetime
                display-format="DD/MM/YYYY"
                picker-format="DD/MM/YYYY"
                :cancel-text="$t('solidaryTransport.buttons.cancel')"
                :done-text="$t('solidaryTransport.buttons.validate')"
                :value="volunteer.birthDate"
                @ionChange="volunteer.birthDate = $event.detail.value; $v.$reset('volunteer.birthDate');"
              ></ion-datetime>
            </ion-item>
            <div class="mc-st-form-details" v-if="$v.volunteer.birthDate.$error">
              <span class="mc-st-form-error" v-if="!$v.volunteer.birthDate.required">{{$t('solidaryTransport.register.form.validators.required')}}</span>
              <span class="mc-st-form-error" v-else-if="!$v.volunteer.birthDate.isMaxBirthDate">{{$t('solidaryTransport.register.form.validators.age', { value: minAge })}}</span>
            </div>

            <ion-item class="mc-st-form-item" v-on:click="displayGeoSearch()">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.address')}} *</ion-label>
              <ion-input
                type="text"
                :value="getAddressToDisplay(volunteer.homeAddress)"
                readonly="true"
                class="no-clickable"
              ></ion-input>
            </ion-item>
            <div class="mc-st-form-details" v-if="$v.volunteer.homeAddress.$error">
              <span class="mc-st-form-error" v-if="!$v.volunteer.homeAddress.required">{{$t('solidaryTransport.register.form.validators.required')}}</span>
            </div>

            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.phone')}} *</ion-label>
              <ion-input
                class="mc-st-form-input" 
                type="text"
                :value="volunteer.telephone"
                @input="volunteer.telephone = $event.target.value;"
              ></ion-input>
            </ion-item>
            <div class="mc-st-form-details" v-if="$v.volunteer.telephone.$error">
              <span class="mc-st-form-error" v-if="!$v.volunteer.telephone.minLength">{{$t('solidaryTransport.register.form.validators.telephone')}}</span>
              <span class="mc-st-form-error" v-else-if="!$v.volunteer.telephone.required">{{$t('solidaryTransport.register.form.validators.required')}}</span>
            </div>

            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.email')}} *</ion-label>
              <ion-input 
                class="mc-st-form-input" 
                type="email" 
                :value="volunteer.email"
                @ionChange="volunteer.email = $event.target.value"
              ></ion-input>
            </ion-item>
            <div class="mc-st-form-details" v-if="$v.volunteer.email.$error">
              <span class="mc-st-form-error" v-if="!$v.volunteer.email.email">{{$t('solidaryTransport.register.form.validators.email')}}</span>
              <span class="mc-st-form-error" v-else-if="!$v.volunteer.email.required">{{$t('solidaryTransport.register.form.validators.required')}}</span>
            </div>

            <template v-if="!this.$store.state.userStore.user">
              <ion-item class="mc-st-form-item">
                <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.password')}} *</ion-label>
                <template v-if="showPassword">
                  <ion-input
                    class="mc-st-form-input" 
                    type="text"
                    :value="volunteer.password"
                    @input="volunteer.password = $event.target.value;"
                  ></ion-input>
                  <ion-icon class="mc-st-form-icon" slot="end" size="medium" name="eye-off" @click="togglePassword()"></ion-icon>
                </template>
                <template v-else>
                  <ion-input
                    class="mc-st-form-input" 
                    type="password"
                    :value="volunteer.password"
                    @input="volunteer.password = $event.target.value;"
                  ></ion-input>
                  <ion-icon class="mc-st-form-icon" slot="end" size="medium" name="eye" @click="togglePassword()"></ion-icon>
                </template>
              </ion-item>
              <div class="mc-st-form-details" v-if="$v.volunteer.password.$error">
                <span class="mc-st-form-error" v-if="!$v.volunteer.password.minLength">{{$t('solidaryTransport.register.form.validators.passwordMinLength')}}</span>
                <span class="mc-st-form-error" v-else-if="!$v.volunteer.password.oneUppercase">{{$t('solidaryTransport.register.form.validators.passwordOneUppercase')}}</span>
                <span class="mc-st-form-error" v-else-if="!$v.volunteer.password.passwordOneDigit">{{$t('solidaryTransport.register.form.validators.passwordOneDigit')}}</span>
                <span class="mc-st-form-error" v-else-if="!$v.volunteer.password.required">{{$t('solidaryTransport.register.form.validators.required')}}</span>
              </div>

              <ion-item class="mc-st-form-item">
                <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.confirmPassword')}} *</ion-label>
                <template v-if="showPassword">
                  <ion-input
                    class="mc-st-form-input" 
                    type="text"
                    :value="password"
                    @input="password = $event.target.value;"
                  ></ion-input>
                </template>
                <template v-else>
                  <ion-input
                    class="mc-st-form-input" 
                    type="password"
                    :value="password"
                    @input="password = $event.target.value;"
                  ></ion-input>
                </template>
              </ion-item>
              <div class="mc-st-form-details" v-if="$v.password.$error">
                <span class="mc-st-form-error" v-if="!$v.password.samePassword">{{$t('solidaryTransport.register.form.validators.passwordSamePassword')}}</span>
                <span class="mc-st-form-error" v-else-if="!$v.password.required">{{$t('solidaryTransport.register.form.validators.required')}}</span>
              </div>
            </template>
            
          </div>

          <div class="mc-st-form-controls with-multiple">
            <ion-button class="mc-st-form-control as-back" color="light" v-html="$t('solidaryTransport.buttons.back')" @click="$router.back()"></ion-button>

            <ion-button class="mc-st-form-control" color="success" v-html="$t('solidaryTransport.buttons.next')" @click="validate()"></ion-button>
          </div>

        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="scss"></style>

<script>
import _ from 'lodash'
import moment from 'moment'
import { mapState, mapGetters } from 'vuex'
import { required, between, email, sameAs, minLength, helpers } from 'vuelidate/lib/validators'

const oneUppercase = helpers.regex("oneUppercase", /[A-Z]/);
const oneDigit = helpers.regex("oneDigit", /\d/);
const hasAddress = (value) => {
  return !_.isUndefined(value)
}
const isMaxBirthDate = (value, vm) => {
  let n = new Date();
  n.setFullYear(n.getFullYear() - process.env.VUE_APP_REGISTER_MIN_AGE);
  return moment(value).isBefore(moment(n.toISOString()));
}

export default {
  name: 'solidaryTransport.volunteer.user',
  components: {},
  data () {
    return {
      password: undefined,
      showPassword: false,
      minAge: process.env.VUE_APP_REGISTER_MIN_AGE
    }
  },
  computed: {
    ...mapGetters([
      'getAddressToDisplay'
    ]),
    volunteer: {
      get() {
        return this.$store.state.solidaryTransportStore.temporary.volunteer;
      },
      set() {
        this.$store.commit("solidaryVolunteerUpdate", this.volunteer);
      }
    }
  },
  validations () {
    let validations = {
      volunteer: {
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
    }

    if (!this.$store.state.userStore.user) {
      validations.volunteer.password = {
        required,
        minLength: minLength(8),
        oneUppercase,
        oneDigit
      }
      validations.password = {
        required,
        sameAsPassword: sameAs(function() {
          return this.volunteer.password
        })
      }
    }

    return validations
  },
  mounted: function () {},
  methods: {
    togglePassword () {
      this.showPassword = !this.showPassword
    },
    getMaxBirthDate() {
      let n = new Date();
      n.setFullYear(n.getFullYear() - process.env.VUE_APP_REGISTER_MIN_AGE);
      return n.toISOString();
    },
    displayGeoSearch: function () {
      this.$router.push({ name: "solidaryTransport.geoSearch", query: { action: 'solidaryTransport.search', type: 'volunteer.home' }});
    },
    validate: function () {
      this.$v.$reset();
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$refs.volunteer.getScrollElement().then((parent) => {
          let child = document.getElementsByClassName('mc-st-form-error')[0]
          var childPos = child.offsetTop
          var parentPos = parent.offsetTop
          var top = childPos - parentPos - 30
          this.$refs.volunteer.scrollToPoint(0, top, 0)
        })
      } else {
        this.$router.push({name: 'solidaryTransport.home.volunteer.details'})
      }
    }
  },
  created: function () {
    if (this.$store.state.userStore.user) {
      let user = _.cloneDeep(this.$store.state.userStore.user)
      this.volunteer.gender = user.gender
      this.volunteer.givenName = user.givenName
      this.volunteer.familyName = user.familyName
      this.volunteer.birthDate = user.birthDate
      this.volunteer.telephone = user.telephone
      this.volunteer.email = user.email
      this.volunteer.homeAddress = user.addresses[0]
    }
  }
}
</script>