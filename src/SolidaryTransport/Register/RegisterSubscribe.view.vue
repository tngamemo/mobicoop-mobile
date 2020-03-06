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

    <ion-content color="primary">
      <div class="mc-register-container">
        <div class="mc-register-form">

          <div class="mc-register-form-content">
            <div class="mc-register-form-actions is-active">
              <ion-button class="mc-register-form-action" color="success" v-html="$t('solidaryTransport.register.form.actions.login')" @click="$router.push({name:'solidaryTransport.login'})"></ion-button>

              <div class="mc-register-form-other" v-html="$t('solidaryTransport.register.form.actions.complete')"></div>
            </div>

            <div class="mc-register-form-item">
              <ion-label>{{$t('solidaryTransport.register.form.fields.firstname')}} *</ion-label>
              <ion-segment value="other">
                <ion-segment-button value="female">
                  <ion-label>Female</ion-label>
                </ion-segment-button>
                <ion-segment-button value="other">
                  <ion-label>Other</ion-label>
                </ion-segment-button>
                <ion-segment-button value="male">
                  <ion-label>Male</ion-label>
                </ion-segment-button>
              </ion-segment>
              </ion-item>
              <template v-if="true">
                <div class="mc-register-form-details">
                  <span class="mc-register-form-note" v-if="true">{{$t('solidaryTransport.register.form.fields.visibility')}}</span>
                  <span class="mc-register-form-error" v-if="true">{{$t('solidaryTransport.register.form.fields.required')}}</span>
                </div>
              </template>
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
            </ion-item>

            <ion-item class="mc-register-form-item">
                <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.email')}} *</ion-label>
                <ion-input class="mc-register-form-input" type="email"></ion-input>
              </ion-item>
              <template v-if="true">
                <div class="mc-register-form-details">
                  <span class="mc-register-form-error" v-if="true">{{$t('Validation.required')}}</span>
                </div>
              </template>
            </ion-item>

            <ion-item class="mc-register-form-item">
                <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.password')}} *</ion-label>
                <ion-input class="mc-register-form-input" type="text"></ion-input>
              </ion-item>
              <template v-if="true">
                <div class="mc-register-form-details">
                  <span class="mc-register-form-error" v-if="true">{{$t('Validation.required')}}</span>
                </div>
              </template>
            </ion-item>
            
          </div>

          <div class="mc-register-form-controls">
            <ion-button class="mc-register-form-control as-back" color="light" v-html="$t('solidaryTransport.buttons.back')" @click="$router.back()"></ion-button>
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
  computed: {},
  methods: {
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