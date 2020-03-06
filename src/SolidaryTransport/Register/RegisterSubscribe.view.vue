<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>{{ $t('solidaryTransport.register.subscribe.title') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" class="is-scrollable">
      <div class="mc-register-container">
        <div class="mc-register-form">

          <div class="mc-register-form-content">
            <div class="mc-register-form-actions is-active">
              <ion-button class="mc-register-form-action" color="success" v-html="$t('solidaryTransport.register.form.actions.login')" @click="$router.push({name:'solidaryTransport.login'})"></ion-button>

              <div class="mc-register-form-other" v-html="$t('solidaryTransport.register.form.actions.complete')"></div>
            </div>

            <div class="mc-register-form-item">
              <ion-segment value="other">
                <ion-segment-button value="other">
                  <ion-label>Autre</ion-label>
                </ion-segment-button>
                <ion-segment-button value="female">
                  <ion-label>Madame</ion-label>
                </ion-segment-button>
                <ion-segment-button value="male">
                  <ion-label>Monsieur</ion-label>
                </ion-segment-button>
              </ion-segment>
            </div>

            <ion-item class="mc-register-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.firstname')}} *</ion-label>
              <ion-input class="mc-register-form-input" type="text"></ion-input>
            </ion-item>
            <template v-if="true">
              <div class="mc-register-form-details">
                <span class="mc-register-form-note" v-if="true">{{$t('solidaryTransport.register.form.fields.visibility')}}</span>
                <span class="mc-register-form-error" v-if="true">{{$t('solidaryTransport.register.form.fields.required')}}</span>
              </div>
            </template>

            <ion-item class="mc-register-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.lastname')}} *</ion-label>
              <ion-input class="mc-register-form-input" type="text"></ion-input>
            </ion-item>
            <template v-if="true">
              <div class="mc-register-form-details">
                <span class="mc-register-form-error" v-if="true">{{$t('solidaryTransport.register.form.fields.required')}}</span>
              </div>
            </template>

            <ion-item class="mc-register-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.birthdate')}} *</ion-label>
              <ion-datetime
                display-format="DD/MM/YYYY"
                picker-format="DD/MM/YYYY"
                :cancel-text="$t('Commons.cancel')"
                :done-text="$t('Commons.validate')"
              ></ion-datetime>
            </ion-item>
            <template v-if="true">
              <div class="mc-register-form-details">
                <span class="mc-register-form-error" v-if="true">{{$t('solidaryTransport.register.form.fields.required')}}</span>
              </div>
            </template>

            <ion-item class="mc-register-form-item" v-on:click="displayGeoSearch('register_address', 'search')">
              <ion-label position="floating">{{$t('Register.address')}} *</ion-label>
              <ion-input
                type="text"
                name="address"
                :value="address"
                readonly="true"
                class="no-clickable"
              ></ion-input>
            </ion-item>
            <template v-if="true">
              <div class="mc-register-form-details">
                <span class="mc-register-form-error" v-if="true">{{$t('solidaryTransport.register.form.fields.required')}}</span>
              </div>
            </template>

            <ion-item class="mc-register-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.phone')}} *</ion-label>
              <ion-input class="mc-register-form-input" type="email"></ion-input>
            </ion-item>
            <template v-if="true">
              <div class="mc-register-form-details">
                <span class="mc-register-form-error" v-if="true">{{$t('Validation.required')}}</span>
              </div>
            </template>

            <ion-item class="mc-register-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.email')}} *</ion-label>
              <ion-input class="mc-register-form-input" type="email"></ion-input>
            </ion-item>
            <template v-if="true">
              <div class="mc-register-form-details">
                <span class="mc-register-form-error" v-if="true">{{$t('Validation.required')}}</span>
              </div>
            </template>

            <ion-item class="mc-register-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.password')}} *</ion-label>
              <ion-input class="mc-register-form-input" type="text"></ion-input>
            </ion-item>
            <template v-if="true">
              <div class="mc-register-form-details">
                <span class="mc-register-form-error" v-if="true">{{$t('Validation.required')}}</span>
              </div>
            </template>

            <ion-item class="mc-register-form-item as-agreement" lines="none" >
              <ion-checkbox
                class="mc-register-form-checkbox"
                color="success"
                slot="start"
              ></ion-checkbox>
              <ion-label class="mc-register-form-label no-white-space" color="primary">{{ $t('solidaryTransport.register.form.fields.agreement') }}</ion-label>
            </ion-item>
            
          </div>

          <div class="mc-register-form-controls with-multiple">
            <ion-button class="mc-register-form-control as-back" color="light" v-html="$t('solidaryTransport.buttons.back')" @click="$router.back()"></ion-button>

            <template v-if="type === 'applicant'">
              <ion-button class="mc-register-form-control" color="success" v-html="$t('solidaryTransport.buttons.register')"></ion-button>
            </template>
            <template v-else>
              <ion-button class="mc-register-form-control" color="success" v-html="$t('solidaryTransport.buttons.next')"></ion-button>
            </template>
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

export default {
  name: 'solidaryTransport.register.ask',
  components: {},
  data () {
    return {
      updating: false,
      eligibility: this.$t('solidaryTransport.register.form.eligibility'),
      buttons: {
        fill: {
          active: true
        }
      }
    }
  },
  mounted: function () {
    _.each(this.eligibility, (item) => {
      this.$root.$set(item, 'checked', false)
    })
  },
  computed: {
    type: function () {
      return this.$route.query.type
    },
    address : {
      get() {
        return this.$store.state.registerStore.displayAddress
      }
    }
  },
  methods: {
    displayGeoSearch(type, action) {
      this.$router.push({ name: "geoSearch", query: { type, action }});
    },
    validate: function () {
      let isValid = true
      _.each(this.eligibility, (item) => {
        isValid = isValid && item.checked
      })
      return isValid
    }
  },
  created: function () {}
}
</script>