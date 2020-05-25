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

    <ion-content ref="register" color="primary" class="is-scrollable">
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
              <span class="mc-st-form-error">{{$t('solidaryTransport.register.form.fields.required')}}</span>
            </div>

            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.firstname')}} *</ion-label>
              <ion-input class="mc-st-form-input" type="text" :value="user.givenName" @input="user.givenName = $event.target.value;"></ion-input>
            </ion-item>
            <div class="mc-st-form-details">
              <span class="mc-st-form-note">{{$t('solidaryTransport.register.form.fields.visibility')}}</span>
              <span class="mc-st-form-error" v-if="$v.user.givenName.$error">{{$t('solidaryTransport.register.form.fields.required')}}</span>
            </div>

            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.lastname')}} *</ion-label>
              <ion-input class="mc-st-form-input" type="text" :value="user.familyName" @input="user.familyName = $event.target.value;"></ion-input>
            </ion-item>
            <div class="mc-st-form-details" v-if="$v.user.familyName.$error">
              <span class="mc-st-form-error">{{$t('solidaryTransport.register.form.fields.required')}}</span>
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
              <span class="mc-st-form-error" v-if="!$v.user.birthDate.required">{{$t('solidaryTransport.register.form.fields.required')}}</span>
              <span class="mc-st-form-error" v-else-if="!$v.user.birthDate.isMaxBirthDate">{{$t('solidaryTransport.register.form.fields.age', { value: minAge })}}</span>
            </div>

            <ion-item class="mc-st-form-item" v-on:click="displayGeoSearch('register_address', 'search')">
              <ion-label position="floating">{{$t('Register.address')}} *</ion-label>
              <ion-input
                type="text"
                name="address"
                :value="user.addresses[0]"
                readonly="true"
                class="no-clickable"
              ></ion-input>
            </ion-item>
            <template v-if="true">
              <div class="mc-st-form-details">
                <span class="mc-st-form-error" v-if="true">{{$t('solidaryTransport.register.form.fields.required')}}</span>
              </div>
            </template>

            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.phone')}} *</ion-label>
              <ion-input class="mc-st-form-input" type="email"></ion-input>
            </ion-item>
            <template v-if="true">
              <div class="mc-st-form-details">
                <span class="mc-st-form-error" v-if="true">{{$t('Validation.required')}}</span>
              </div>
            </template>

            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.email')}} *</ion-label>
              <ion-input class="mc-st-form-input" type="email" @ionChange="checkMail()" @input="user.email = $event.target.value"></ion-input>
              <ion-icon class="mc-st-form-icon rotating" slot="end" size="large" color="primary" name="sync"></ion-icon>
            </ion-item>
            <template v-if="true">
              <div class="mc-st-form-details">
                <span class="mc-st-form-error" v-if="true">{{$t('Validation.required')}}</span>
              </div>
            </template>

            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.password')}} *</ion-label>
              <ion-input class="mc-st-form-input" type="text"></ion-input>
            </ion-item>
            <template v-if="true">
              <div class="mc-st-form-details">
                <span class="mc-st-form-error" v-if="true">{{$t('Validation.required')}}</span>
              </div>
            </template>

            <ion-item class="mc-st-form-item as-agreement" lines="none">
              <ion-checkbox
                class="mc-st-form-checkbox"
                color="success"
                slot="start"
              ></ion-checkbox>
              <ion-label class="mc-st-form-label no-white-space" color="primary">{{ $t('solidaryTransport.register.form.fields.agreement.accept') }}</ion-label>
            </ion-item>
            <div class="mc-st-form-details">
              <span class="mc-st-form-note" @click="displayCGU()">{{$t('solidaryTransport.register.form.fields.agreement.read')}}</span>
            </div>
            
          </div>

          <div class="mc-st-form-controls with-multiple">
            <ion-button class="mc-st-form-control as-back" color="light" v-html="$t('solidaryTransport.buttons.back')" @click="$router.back()"></ion-button>

            <ion-button class="mc-st-form-control" color="success" v-html="$t('solidaryTransport.buttons.register')" @click="validate()"></ion-button>
          </div>

        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="scss">
  
</style>

<script>
import { mapState, mapGetters } from 'vuex'
import _ from 'lodash'
import moment from 'moment'
import { required, between, email, sameAs, minLength, helpers } from 'vuelidate/lib/validators'

const oneUppercase = helpers.regex("oneUppercase", /[A-Z]/);
const oneDigit = helpers.regex("oneDigit", /\d/);
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
      updating: false,
      buttons: {
        fill: {
          active: true
        }
      },
      debounced: undefined,
      password: undefined,
      minAge: process.env.VUE_APP_REGISTER_MIN_AGE
    }
  },
  computed: {
    user: {
      get() {
        return this.$store.state.solidaryTransportStore.temporary.user;
      },
      set() {
        this.$store.commit("solidaryUserUpdate", this.user);
      }
    },
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
      email: {
        required,
        email,
        check(email) {
          console.log('check from vuelidator')
          return true
        }
      },
      // password: {
      //   required,
      //   minLength: minLength(8),
      //   oneUppercase,
      //   oneDigit
      // },
    },
    // password: {
    //   required,
    //   sameAsPassword: sameAs('user.password')
    // }
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
    displayGeoSearch: function (type, action) {
      this.$router.push({ name: "geoSearch", query: { type, action }});
    },
    displayCGU: function () {
      console.log(process.env.VUE_APP_SOLIDARY_CGU_ARTICLE_ID)
      console.log('DisplayModalArticle for id : ' + process.env.VUE_APP_SOLIDARY_CGU_ARTICLE_ID)
    },
    validate: function () {
      this.$v.$reset();
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$refs.register.getScrollElement().then((parent) => {
          let child = document.getElementsByClassName('mc-st-form-error')[0]
          var childPos = child.offsetTop
          var parentPos = parent.offsetTop
          var top = childPos - parentPos - 30
          this.$refs.register.scrollToPoint(0, top, 0)
        })

        return false;
      } else {
        console.log('valid')
        return true;
      }
    },
    checkMail: _.debounce(function() {
      console.log('checkMail', this.user.email)
      this.$store.dispatch('checkEmail', this.user.email).then(res => {
        console.log(res)
      })
    }, 250),
  },
  created: function () {}
}
</script>