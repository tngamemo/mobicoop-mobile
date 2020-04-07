<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>{{ $t('solidaryTransport.register.ask.title') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" class="is-scrollable">
      <div class="mc-st-container">
        <div class="mc-st-form">

          <div class="mc-st-form-content">
            <ion-item class="mc-st-form-item" lines="none" v-for="(item, index) in eligibility" :key="index">
              <ion-checkbox
                class="mc-st-form-checkbox"
                :name="item.value"
                :value="item.checked"
                color="success"
                slot="start"
                @ionChange="item.checked = $event.target.checked"
              ></ion-checkbox>
              <ion-label class="mc-st-form-label no-white-space" color="primary">{{ item.label }}</ion-label>
            </ion-item>

            <div class="mc-st-form-actions" :class="{'is-active': validate()}">
              <ion-button class="mc-st-form-action" color="success" v-html="$t('solidaryTransport.register.form.fill')" @click="$router.push({name:'solidaryTransport.register.subscribe', query: {type: 'applicant'}})"></ion-button>

              <div class="mc-st-form-other" v-html="$t('solidaryTransport.register.form.actions.or')"></div>

              <ion-button class="mc-st-form-action" :href="'tel:' + $t('solidaryTransport.support.phone')" color="success">
                <ion-icon name="call"></ion-icon>
                <span v-html="$t('solidaryTransport.register.form.call')"></span>
              </ion-button>
            </div>
          </div>

          <div class="mc-st-form-controls">
            <ion-button class="mc-st-form-control as-back" color="light" v-html="$t('solidaryTransport.buttons.back')" @click="$router.back()"></ion-button>
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