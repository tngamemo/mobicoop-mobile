<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>{{ $t('solidaryTransport.register.title') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content ref="register" color="primary" class="is-scrollable" v-if="!registered">
      <div class="mc-st-container">
        <div class="mc-st-form">

          <div class="mc-st-form-content">
            <div class="mc-st-form-actions is-active">
              <ion-button class="mc-st-form-action" color="success" v-html="$t('solidaryTransport.register.form.actions.login')" @click="$router.push({name:'solidaryTransport.login', query: {redirect: 'solidaryTransport.register.subscribe.details'}})"></ion-button>

              <div class="mc-st-form-other" v-html="$t('solidaryTransport.register.form.actions.complete')"></div>
            </div>

            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.gender')}} *</ion-label>
              <ion-select 
                required
                :value="user.gender"
                @ionChange="user.gender = parseInt($event.target.value)"
                :cancel-text="$t('solidaryTransport.buttons.cancel')"
                :ok-text="$t('solidaryTransport.buttons.validate')"
              >
                <ion-select-option value="1">{{$t('solidaryTransport.commons.gender.female')}}</ion-select-option>
                <ion-select-option value="2">{{$t('solidaryTransport.commons.gender.male')}}</ion-select-option>
                <ion-select-option value="3">{{$t('solidaryTransport.commons.gender.nc')}}</ion-select-option>
              </ion-select>
            </ion-item>
            <div class="mc-st-form-details" v-if="$v.user.gender.$error">
              <span class="mc-st-form-error">{{$t('solidaryTransport.register.form.validators.required')}}</span>
            </div>

            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.firstname')}} *</ion-label>
              <ion-input 
                class="mc-st-form-input" 
                type="text" 
                :value="user.givenName" 
                @input="user.givenName = $event.target.value;"
              ></ion-input>
            </ion-item>
            <div class="mc-st-form-details">
              <span class="mc-st-form-note">{{$t('solidaryTransport.register.form.fields.visibility')}}</span>
              <span class="mc-st-form-error" v-if="$v.user.givenName.$error">{{$t('solidaryTransport.register.form.validators.required')}}</span>
            </div>

            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.lastname')}} *</ion-label>
              <ion-input 
                class="mc-st-form-input" 
                type="text" 
                :value="user.familyName" 
                @input="user.familyName = $event.target.value;"
              ></ion-input>
            </ion-item>
            <div class="mc-st-form-details" v-if="$v.user.familyName.$error">
              <span class="mc-st-form-error">{{$t('solidaryTransport.register.form.validators.required')}}</span>
            </div>

            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.birthdate')}} *</ion-label>
              <ion-datetime
                display-format="DD/MM/YYYY"
                picker-format="DD/MM/YYYY"
                :cancel-text="$t('solidaryTransport.buttons.cancel')"
                :done-text="$t('solidaryTransport.buttons.validate')"
                :value="user.birthDate"
                @ionChange="user.birthDate = $event.detail.value; $v.$reset('user.birthDate');"
              ></ion-datetime>
            </ion-item>
            <div class="mc-st-form-details" v-if="$v.user.birthDate.$error">
              <span class="mc-st-form-error" v-if="!$v.user.birthDate.required">{{$t('solidaryTransport.register.form.validators.required')}}</span>
              <span class="mc-st-form-error" v-else-if="!$v.user.birthDate.isMaxBirthDate">{{$t('solidaryTransport.register.form.validators.age', { value: minAge })}}</span>
            </div>

            <ion-item class="mc-st-form-item" v-on:click="displayGeoSearch()">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.address')}} *</ion-label>
              <ion-input
                type="text"
                :value="getAddressToDisplay(user.addresses[0])"
                readonly="true"
                class="no-clickable"
              ></ion-input>
            </ion-item>
            <div class="mc-st-form-details" v-if="$v.user.addresses.$error">
              <span class="mc-st-form-error" v-if="!$v.user.addresses.required">{{$t('solidaryTransport.register.form.validators.required')}}</span>
            </div>

            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.phone')}} *</ion-label>
              <ion-input
                class="mc-st-form-input" 
                type="text"
                :value="user.telephone"
                @input="user.telephone = $event.target.value;"
              ></ion-input>
            </ion-item>
            <div class="mc-st-form-details" v-if="$v.user.telephone.$error">
              <span class="mc-st-form-error" v-if="!$v.user.telephone.minLength">{{$t('solidaryTransport.register.form.validators.telephone')}}</span>
              <span class="mc-st-form-error" v-else-if="!$v.user.telephone.required">{{$t('solidaryTransport.register.form.validators.required')}}</span>
            </div>

            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.email')}} *</ion-label>
              <ion-input 
                class="mc-st-form-input" 
                type="email" 
                @ionChange="checkMail()" 
                @input="user.email = $event.target.value"
              ></ion-input>
              <ion-icon class="mc-st-form-icon rotating" v-show="checking" slot="end" size="medium" color="primary" name="sync"></ion-icon>
            </ion-item>
            <div class="mc-st-form-details" v-if="!$v.user.email.error">
              <span class="mc-st-form-error" v-if="!$v.user.email.mailAvailable">{{$t('solidaryTransport.register.form.validators.emailAvailable')}}</span>
              <span class="mc-st-form-error" v-else-if="!$v.user.email.email">{{$t('solidaryTransport.register.form.validators.email')}}</span>
              <span class="mc-st-form-error" v-else-if="!$v.user.email.required">{{$t('solidaryTransport.register.form.validators.required')}}</span>
            </div>

            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.password')}} *</ion-label>
              <template v-if="showPassword">
                <ion-input
                  class="mc-st-form-input" 
                  type="text"
                  :value="user.password"
                  @input="user.password = $event.target.value;"
                ></ion-input>
                <ion-icon class="mc-st-form-icon" slot="end" size="medium" name="eye-off" @click="togglePassword()"></ion-icon>
              </template>
              <template v-else>
                <ion-input
                  class="mc-st-form-input" 
                  type="password"
                  :value="user.password"
                  @input="user.password = $event.target.value;"
                ></ion-input>
                <ion-icon class="mc-st-form-icon" slot="end" size="medium" name="eye" @click="togglePassword()"></ion-icon>
              </template>
            </ion-item>
            <div class="mc-st-form-details" v-if="$v.user.password.$error">
              <span class="mc-st-form-error" v-if="!$v.user.password.minLength">{{$t('solidaryTransport.register.form.validators.passwordMinLength')}}</span>
              <span class="mc-st-form-error" v-else-if="!$v.user.password.oneUppercase">{{$t('solidaryTransport.register.form.validators.passwordOneUppercase')}}</span>
              <span class="mc-st-form-error" v-else-if="!$v.user.password.passwordOneDigit">{{$t('solidaryTransport.register.form.validators.passwordOneDigit')}}</span>
              <span class="mc-st-form-error" v-else-if="!$v.user.password.required">{{$t('solidaryTransport.register.form.validators.required')}}</span>
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
                :value="user.userAgreementAccepted"
                @ionChange="user.userAgreementAccepted = $event.target.checked"
              ></ion-checkbox>
              <ion-label class="mc-st-form-label no-white-space" color="primary">{{ $t('solidaryTransport.register.form.fields.agreement.accept') }}</ion-label>
            </ion-item>
            <div class="mc-st-form-details">
              <span class="mc-st-form-note" @click="displayCGU()" v-html="$t('solidaryTransport.register.form.fields.agreement.read')"></span>

              <template v-if="$v.user.userAgreementAccepted.$error">
                <div class="mc-st-form-error"  v-if="!$v.user.userAgreementAccepted.checked">{{$t('solidaryTransport.register.form.validators.checked')}}</div>
                <div class="mc-st-form-error"  v-else-if="!$v.user.userAgreementAccepted.required">{{$t('solidaryTransport.register.form.validators.required')}}</div>
              </template>
            </div>
            
          </div>

          <div class="mc-st-form-controls with-multiple" :class="{'is-loading': processing}">
            <ion-button class="mc-st-form-control as-back" color="light" v-html="$t('solidaryTransport.buttons.back')" @click="$router.back()"></ion-button>

            <ion-button class="mc-st-form-control as-loader" color="success" @click="validate()">
              <ion-icon slot="start" name="sync" size="large"></ion-icon>
              <span v-html="$t('solidaryTransport.buttons.register')"></span>
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
  name: 'solidaryTransport.register.suscribe',
  components: {},
  data () {
    return {
      checking: false,
      processing: false,
      registered: false,
      mailAvailable: true,
      debounced: undefined,
      password: undefined,
      showPassword: false,
      minAge: process.env.VUE_APP_REGISTER_MIN_AGE
    }
  },
  computed: {
    ...mapGetters([
      'getAddressToDisplay'
    ]),
    user: {
      get() {
        return this.$store.state.solidaryTransportStore.temporary.user;
      },
      set() {
        this.$store.commit("solidaryUserUpdate", this.user);
      }
    }
  },
  validations: {
    user: {
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
        email,
        mailAvailable(value) {
          return this.mailAvailable
        }
      },
      password: {
        required,
        minLength: minLength(8),
        oneUppercase,
        oneDigit
      },
      userAgreementAccepted: {
        required,
        checked: sameAs( () => true )
      },
      addresses: {
        hasAddress
      }
    },
    password: {
      required,
      sameAsPassword: sameAs(function() {
        return this.user.password
      })
    }
  },
  mounted: function () {
    _.each(this.eligibility, (item) => {
      this.$root.$set(item, 'checked', false)
    })
  },
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
      this.$router.push({ name: "solidaryTransport.geoSearch", query: { action: 'solidaryTransport.search', type: 'register' }});
    },
    displayCGU: function () {
      console.log(process.env.VUE_APP_SOLIDARY_CGU_ARTICLE_ID)
      console.log('DisplayModalArticle for id : ' + process.env.VUE_APP_SOLIDARY_CGU_ARTICLE_ID)
    },
    checkMail: _.debounce(function() {
      if (!this.registered) {
        if (!this.checking && this.$v.user.email.email) {
          this.checking = true

          this.$store.dispatch('checkEmail', this.user.email)
          .then(res => {
            this.checking = false
            this.mailAvailable = true
          })
          .catch(err => {
            this.checking = false
            this.mailAvailable = false
          })
        }
      }
    }, 250),
    validate: function () {
      if (!this.processing) {
        this.$v.$reset();
        this.$v.$touch();
        this.showPassword = false
        if (this.$v.$invalid) {
          this.$refs.register.getScrollElement().then((parent) => {
            let child = document.getElementsByClassName('mc-st-form-error')[0]
            var childPos = child.offsetTop
            var parentPos = parent.offsetTop
            var top = childPos - parentPos - 30
            this.$refs.register.scrollToPoint(0, top, 0)
          })
        } else {
          this.processing = true
          this.$store.dispatch('registerStandardUser')
          .then((user) => {
            this.registered = true
            this.$router.push({name:'solidaryTransport.register.success', query: { email: user.email }})
          })
          .catch((error) => {
            console.error(error)
          })
          .finally(() => {
            this.processing = false
          })
        }
      }
    }
  },
  created: function () {}
}
</script>