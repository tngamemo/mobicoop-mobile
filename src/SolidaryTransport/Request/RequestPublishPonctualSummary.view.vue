<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>{{$t('solidaryTransport.request.publish.title')}} <sup>3/3</sup></ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary">
      <div class="mc-st-container">
        <div class="mc-st-form">

          <div class="mc-st-form-content">
            <div class="mc-st-form-header">
              <div class="mc-st-form-title">{{$t('solidaryTransport.request.publish.steps.summary')}}</div>
              <div class="mc-st-form-steps">
                <span class="mc-st-form-step"></span>
                <span class="mc-st-form-step"></span>
                <span class="mc-st-form-step is-active"></span>
              </div>
            </div>

            <div class="mc-st-form-item">
              <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.request.publish.form.fields.summary')}}</ion-label>
            </div>

            <div class="mc-st-form-summary">

              <div class="mc-st-form-summary-text">
                Je souhaite me déplacer pour <span class="answer">faire mes courses</span>.
              </div>

              <div class="mc-st-form-summary-card">
                <div class="mc-st-form-summary-card-header">12 juillet 2020</div>
                <div class="mc-st-form-summary-card-content">
                  <div class="times">
                    <div class="time as-from">9h00</div>
                    <div class="time as-to">9h10</div>
                  </div>
                  <div class="places">
                    <div class="place as-from">
                      <span class="city">Rennes</span>
                      <span class="address">Rue Hippolyte Vatar</span>
                    </div>
                    <div class="place as-to">
                      <span class="city">Rennes</span>
                      <span class="address">Ruelle aux Chapeliers</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mc-st-form-summary-card">
                <div class="mc-st-form-summary-card-header">12 juillet 2020</div>
                <div class="mc-st-form-summary-card-content">
                  <div class="times">
                    <div class="time as-from">10h30</div>
                    <div class="time as-to">10h40</div>
                  </div>
                  <div class="places">
                    <div class="place as-from">
                      <span class="city">Rennes</span>
                      <span class="address">Allée Verlaine</span>
                    </div>
                    <div class="place as-to">
                      <span class="city">Rennes</span>
                      <span class="address">Rue Yvonne Jean-Haffen</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          <div class="mc-st-form-controls in-summary">
            <ion-button class="mc-st-form-control as-back" color="light" v-html="$t('solidaryTransport.buttons.back')" @click="$router.back()"></ion-button>

            <ion-button class="mc-st-form-control" color="success" @click="validate()">
              <ion-icon slot="start" name="checkmark" size="small"></ion-icon>
              <span v-html="$t('solidaryTransport.buttons.sendRequest')"></span>
            </ion-button>
          </div>

        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="scss"></style>

<script>
import { mapState, mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  name: 'solidaryTransport.request.publish.ponctual.summary',
  components: {},
  data () {
    return {
      updating: false,
      departureDays: {
        other: '',
        selected: _.times(this.$t('solidaryTransport.request.publish.form.when.departure.days').length, _.constant(false)),
        properties: this.$t('solidaryTransport.request.publish.form.when.departure.days')
      },
      departureHours: {
        other: '',
        selected: this.$t('solidaryTransport.request.publish.form.when.departure.hours')[0].value,
        properties: this.$t('solidaryTransport.request.publish.form.when.departure.hours')
      },
      returnHours: {
        other: '',
        selected: this.$t('solidaryTransport.request.publish.form.when.return')[0].value,
        properties: this.$t('solidaryTransport.request.publish.form.when.return')
      }
    }
  },
  computed: {},
  methods: {
    validate: function () {
      console.log('Post request')
      this.$router.push({name: 'solidaryTransport.home'})
    }
  },
  created: function () {}
}
</script>