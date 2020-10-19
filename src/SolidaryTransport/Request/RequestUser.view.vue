<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>{{ $t('solidaryTransport.' + type + '.title') }} <sup>5/6</sup></ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content ref="request" color="primary" class="is-scrollable">
      <div class="mc-st-container">
        <div class="mc-st-form">

          <div class="mc-st-form-content">
            <div class="mc-st-form-header">
              <div class="mc-st-form-title">{{$t('solidaryTransport.' + type + '.steps.user')}}</div>
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
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.phone')}}</ion-label>
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
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.email')}}</ion-label>
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

            <template v-if="!this.$store.state.userStore.user">
              <ion-item class="mc-st-form-item">
                <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.password')}} *</ion-label>
                <template v-if="showPassword">
                  <ion-input
                    class="mc-st-form-input"
                    type="text"
                    :value="request.password"
                    @input="request.password = $event.target.value;"
                  ></ion-input>
                  <ion-icon class="mc-st-form-icon" slot="end" size="medium" name="eye-off" @click="togglePassword()"></ion-icon>
                </template>
                <template v-else>
                  <ion-input
                    class="mc-st-form-input"
                    type="password"
                    :value="request.password"
                    @input="request.password = $event.target.value;"
                  ></ion-input>
                  <ion-icon class="mc-st-form-icon" slot="end" size="medium" name="eye" @click="togglePassword()"></ion-icon>
                </template>
              </ion-item>
              <div class="mc-st-form-details" v-if="$v.request.password.$error">
                <span class="mc-st-form-error" v-if="!$v.request.password.minLength">{{$t('solidaryTransport.register.form.validators.passwordMinLength')}}</span>
                <span class="mc-st-form-error" v-else-if="!$v.request.password.oneUppercase">{{$t('solidaryTransport.register.form.validators.passwordOneUppercase')}}</span>
                <span class="mc-st-form-error" v-else-if="!$v.request.password.passwordOneDigit">{{$t('solidaryTransport.register.form.validators.passwordOneDigit')}}</span>
                <span class="mc-st-form-error" v-else-if="!$v.request.password.required">{{$t('solidaryTransport.register.form.validators.required')}}</span>
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

              <ion-item class="mc-st-form-item as-agreement" lines="none">
                <ion-checkbox
                  class="mc-st-form-checkbox"
                  color="success"
                  slot="start"
                  :value="request.userAgreementAccepted"
                  @ionChange="request.userAgreementAccepted = $event.target.checked"
                ></ion-checkbox>
                <ion-label class="mc-st-form-label no-white-space" color="primary">{{ $t('solidaryTransport.register.form.fields.agreement.accept', {'brand': brand}) }}</ion-label>
              </ion-item>
              <div class="mc-st-form-details">
                <span class="mc-st-form-note" @click="displayCGU()" v-html="$t('solidaryTransport.register.form.fields.agreement.read')"></span>

                <template v-if="$v.request.userAgreementAccepted.$error">
                  <div class="mc-st-form-error"  v-if="!$v.request.userAgreementAccepted.checked">{{$t('solidaryTransport.register.form.validators.checked')}}</div>
                  <div class="mc-st-form-error"  v-else-if="!$v.request.userAgreementAccepted.required">{{$t('solidaryTransport.register.form.validators.required')}}</div>
                </template>
              </div>
            </template>

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
import { required, between, email, sameAs, minLength, helpers, requiredIf } from 'vuelidate/lib/validators'

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
  name: 'solidaryTransport.request.user',
  components: {},
  data () {
    return {
      password: undefined,
      showPassword: false,
      minAge: process.env.VUE_APP_REGISTER_MIN_AGE,
      type: this.$route.meta.type,
      brand: process.env.VUE_APP_NAME
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
  validations () {
    let validations = {
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
          required: requiredIf(function(model) {
            return (model.email == undefined || model.email == "") ;
          }),
          minLength: minLength(10)
        },
        email: {
          email,
          required: requiredIf(function(model) {
            return (model.telephone == undefined || model.telephone == "") ;
          })
        },
        homeAddress: {
          hasAddress
        }
      }
    }

    if (!this.$store.state.userStore.user) {
      validations.request.password = {
        required,
        minLength: minLength(8),
        oneUppercase,
        oneDigit
      }
      validations.password = {
        required,
        sameAsPassword: sameAs(function() {
          return this.request.password
        })
      }
      validations.request.userAgreementAccepted = {
        required
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
      this.$router.push({ name: "solidaryTransport.geoSearch", query: { action: 'solidaryTransport.search', type: 'request.home' }});
    },
    displayCGU: function () {
      this.$router.push({ name: "solidaryTransport.article", query: { id: process.env.VUE_APP_SOLIDARY_CGU_ARTICLE_ID, title: this.$t('solidaryTransport.commons.cgu')}});
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
          this.$router.push({name: (this.$route.name.includes('carpool') ? 'carpool.solidary' : 'solidaryTransport') + '.home.' + this.type + '.summary'})
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
      this.request.homeAddress = user.addresses[0]
    }
  }
}
</script>
