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
      <div class="mc-st-container">
        <div class="mc-st-form">

          <div class="mc-st-form-content">
            <div class="mc-st-form-actions is-active">
              <ion-button class="mc-st-form-action" color="success" v-html="$t('solidaryTransport.register.form.actions.login')" @click="$router.push({name:'solidaryTransport.login', query: {redirect: 'solidaryTransport.register.subscribe.details'}})"></ion-button>

              <div class="mc-st-form-other" v-html="$t('solidaryTransport.register.form.actions.complete')"></div>
            </div>

            <div class="mc-st-form-item">
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

            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.firstname')}} *</ion-label>
              <ion-input class="mc-st-form-input" type="text"></ion-input>
            </ion-item>
            <template v-if="true">
              <div class="mc-st-form-details">
                <span class="mc-st-form-note" v-if="true">{{$t('solidaryTransport.register.form.fields.visibility')}}</span>
                <span class="mc-st-form-error" v-if="true">{{$t('solidaryTransport.register.form.fields.required')}}</span>
              </div>
            </template>

            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.lastname')}} *</ion-label>
              <ion-input class="mc-st-form-input" type="text"></ion-input>
            </ion-item>
            <template v-if="true">
              <div class="mc-st-form-details">
                <span class="mc-st-form-error" v-if="true">{{$t('solidaryTransport.register.form.fields.required')}}</span>
              </div>
            </template>

            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.birthdate')}} *</ion-label>
              <ion-datetime
                display-format="DD/MM/YYYY"
                picker-format="DD/MM/YYYY"
                :cancel-text="$t('Commons.cancel')"
                :done-text="$t('Commons.validate')"
              ></ion-datetime>
            </ion-item>
            <template v-if="true">
              <div class="mc-st-form-details">
                <span class="mc-st-form-error" v-if="true">{{$t('solidaryTransport.register.form.fields.required')}}</span>
              </div>
            </template>

            <ion-item class="mc-st-form-item" v-on:click="displayGeoSearch('register_address', 'search')">
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
              <ion-input class="mc-st-form-input" type="email"></ion-input>
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
            
          </div>

          <div class="mc-st-form-controls with-multiple">
            <ion-button class="mc-st-form-control as-back" color="light" v-html="$t('solidaryTransport.buttons.back')" @click="$router.back()"></ion-button>

            <ion-button class="mc-st-form-control" color="success" v-html="$t('solidaryTransport.buttons.next')" @click="$router.push({name:'solidaryTransport.register.subscribe.details', query: {type: type}})"></ion-button>
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
  name: 'solidaryTransport.register.suscribe',
  components: {},
  data () {
    return {
      updating: false,
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
      return isValid
    }
  },
  created: function () {}
}
</script>