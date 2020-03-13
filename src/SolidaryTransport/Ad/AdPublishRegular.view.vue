<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>{{$t('solidaryTransport.ad.publish.title')}} <sup>2/3</sup></ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary">
      <div class="mc-st-container">
        <div class="mc-st-form">

          <div class="mc-st-form-content">
            <div class="mc-st-form-header">
              <div class="mc-st-form-title">{{$t('solidaryTransport.ad.publish.steps.regular')}}</div>
              <div class="mc-st-form-steps">
                <span class="mc-st-form-step"></span>
                <span class="mc-st-form-step is-active"></span>
                <span class="mc-st-form-step"></span>
              </div>
            </div>

            <div class="mc-st-form-item">
              <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.ad.publish.form.fields.trip')}}</ion-label>

              <div class="mc-st-form-checkbox-wrapper">
                <ion-item class="mc-st-form-item" lines="none" v-for="(item, index) in trip.properties" :key="index">
                  <ion-checkbox class="mc-st-form-checkbox" :name="item.value" :value="item.value" :checked="trip.selected === item.value" color="success" slot="start" @ionChange="tripChange($event)"
                  ></ion-checkbox>
                  <ion-label class="mc-st-form-label no-white-space" color="primary">{{ item.label }}</ion-label>
                </ion-item>
              </div>
            </div>

            <div class="mc-st-form-item as-trip">
              <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.ad.publish.form.fields.when.departure.hour')}}</ion-label>

              <div class="mc-st-form-checkbox-wrapper">
                <ion-item class="mc-st-form-item">
                  <ion-checkbox class="mc-st-form-checkbox" slot="start" :checked="true" color="success"></ion-checkbox>
                  <ion-input class="mc-st-form-input" type="text" :placeholder="$t('solidaryTransport.ad.publish.form.fields.when.departure.specificHour')"></ion-input>
                </ion-item>
                <ion-item class="mc-st-form-item" lines="none" v-for="(item, index) in departureHours.properties" :key="index">
                  <ion-checkbox class="mc-st-form-checkbox" :name="item.value" :value="item.checked" color="success" slot="start" @ionChange="item.checked = $event.target.checked"
                  ></ion-checkbox>
                  <ion-label class="mc-st-form-label no-white-space" color="primary">{{ item.label }}</ion-label>
                </ion-item>
              </div>
            </div>
            
          </div>

          <div class="mc-st-form-controls with-multiple">
            <ion-button class="mc-st-form-control as-back" color="light" v-html="$t('solidaryTransport.buttons.back')" @click="$router.back()"></ion-button>

            <ion-button class="mc-st-form-control" color="success" v-html="$t('solidaryTransport.buttons.next')" @click="$router.push({name:'solidaryTransport.home.ad.regular.summary', query: {type: type}})"></ion-button>
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
  name: 'solidaryTransport.ad.publish.regular',
  components: {},
  data () {
    return {
      updating: false,
      trip: {
        selected: this.$t('solidaryTransport.ad.publish.form.trip')[0].value,
        properties: this.$t('solidaryTransport.ad.publish.form.trip')
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
      },
    }
  },
  computed: {},
  methods: {
    updateDay: function(index) {
      this.$set(this.departureDays.selected, index, !this.departureDays.selected[index])
    },
    tripChange: function ($event) {
      if (!this.updating) {
        this.updating = true
        this.trip.selected = $event.target.value

        setTimeout(() => {
          this.updating = false
        }, 100)
      }
    }
  },
  created: function () {}
}
</script>