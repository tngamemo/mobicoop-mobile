<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>{{ $t('solidaryTransport.register.subscribe.details.title') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" class="is-scrollable">
      <div class="mc-st-container">
        <div class="mc-st-form">

          <div class="mc-st-form-content">

            <ion-item class="mc-st-form-item" lines="none">
              <ion-checkbox
                class="mc-st-form-checkbox"
                color="success"
                slot="start"
              ></ion-checkbox>
              <ion-label class="mc-st-form-label no-white-space" color="primary">{{ $t('solidaryTransport.register.form.fields.driver') }}</ion-label>
            </ion-item>

            <div class="mc-st-form-item as-language">
              <ion-label class="mc-st-form-label no-white-space" color="primary">{{$t('solidaryTransport.register.form.fields.languages')}}</ion-label>

              <div class="mc-st-form-checkbox-wrapper">
                <ion-item class="mc-st-form-item" lines="none" v-for="(item, index) in languages.properties" :key="index">
                  <ion-checkbox class="mc-st-form-checkbox" :name="item.value" :value="item.checked" color="success" slot="start" @ionChange="item.checked = $event.target.checked"
                  ></ion-checkbox>
                  <ion-label class="mc-st-form-label no-white-space" color="primary">{{ item.label }}</ion-label>
                </ion-item>
                <ion-item class="mc-st-form-item as-other">
                  <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.otherLanguages')}}</ion-label>
                  <ion-input class="mc-st-form-input" type="text"></ion-input>
                </ion-item>
              </div>
            </div>

            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.supporting')}}</ion-label>
              <ion-select :value="supporting.selected" ok-text="Valider" cancel-text="Fermer" selected-text="" @ionChange="supporting.selected = $event.target.value">
                <ion-select-option :value="item.value" v-for="(item, index) in supporting.properties" :key="index">{{item.label}}</ion-select-option>
              </ion-select>
            </ion-item>

            <div class="mc-st-form-actions is-active">
              <ion-button class="mc-st-form-action as-light" color="light" @click="$refs.proof.click()">
                <ion-icon name="copy"></ion-icon>
                <span v-html="$t('solidaryTransport.register.form.sendProof')"></span>
              </ion-button>
              <input ref="proof" style="display: none" type="file" @change="changePicture($event)"/>
            </div>

            <ion-item class="mc-st-form-item as-agreement" lines="none">
              <ion-checkbox
                class="mc-st-form-checkbox"
                color="success"
                slot="start"
              ></ion-checkbox>
              <ion-label class="mc-st-form-label no-white-space" color="primary">{{ $t('solidaryTransport.register.form.fields.agreement') }}</ion-label>
            </ion-item>
            
          </div>

          <div class="mc-st-form-controls with-multiple">
            <ion-button class="mc-st-form-control as-back" color="light" v-html="$t('solidaryTransport.buttons.back')" @click="$router.back()"></ion-button>

            <ion-button class="mc-st-form-control" color="success" v-html="$t('solidaryTransport.buttons.register')"></ion-button>
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
  name: 'solidaryTransport.register.subscribe.details',
  components: {},
  data () {
    return {
      updating: false,
      supporting: {
        selected: this.$t('solidaryTransport.register.form.supporting')[0].value,
        properties: this.$t('solidaryTransport.register.form.supporting')
      },
      languages: {
        other: '',
        properties: this.$t('solidaryTransport.register.form.languages')
      },
      buttons: {
        fill: {
          active: true
        }
      }
    }
  },
  mounted: function () {
    _.each(this.languages.properties, (item) => {
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
    change: function ($event) {
      console.log($event)
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