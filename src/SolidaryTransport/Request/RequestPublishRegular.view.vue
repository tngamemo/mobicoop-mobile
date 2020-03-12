<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>{{$t('solidaryTransport.request.publish.title')}} <sup>2/3</sup></ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary">
      <div class="mc-st-container">
        <div class="mc-st-form">

          <div class="mc-st-form-content">
            <div class="mc-st-form-header">
              <div class="mc-st-form-title">{{$t('solidaryTransport.request.publish.steps.regular')}}</div>
              <div class="mc-st-form-steps">
                <span class="mc-st-form-step"></span>
                <span class="mc-st-form-step is-active"></span>
                <span class="mc-st-form-step"></span>
              </div>
            </div>

            <div class="mc-st-form-item">
              <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.request.publish.form.fields.when.departure.day')}}</ion-label>

              <div class="mc-st-form-days-wrapper">
                <ion-button class="mc-st-form-day" color="primary" :class="{'is-active': departureDays.selected[index]}" v-for="(item, index) in departureDays.properties" :key="index" @click="updateDay(index)">
                  <span class="label">{{item.label}}</span>
                </ion-button>
              </div>
            </div>

            <div class="mc-st-form-item">
              <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.request.publish.form.fields.when.departure.hour')}}</ion-label>

              <div class="mc-st-form-checkbox-wrapper">
                <ion-item class="mc-st-form-item">
                  <ion-checkbox class="mc-st-form-checkbox" slot="start" :checked="true" color="success"></ion-checkbox>
                  <ion-input class="mc-st-form-input" type="text" :placeholder="$t('solidaryTransport.request.publish.form.fields.when.departure.specificHour')"></ion-input>
                </ion-item>
                <ion-item class="mc-st-form-item" lines="none" v-for="(item, index) in departureHours.properties" :key="index">
                  <ion-checkbox class="mc-st-form-checkbox" :name="item.value" :value="item.checked" color="success" slot="start" @ionChange="item.checked = $event.target.checked"
                  ></ion-checkbox>
                  <ion-label class="mc-st-form-label no-white-space" color="primary">{{ item.label }}</ion-label>
                </ion-item>
              </div>
            </div>

            <div class="mc-st-form-item">
              <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.request.publish.form.fields.when.return')}}</ion-label>

              <div class="mc-st-form-checkbox-wrapper">
                <ion-item class="mc-st-form-item">
                  <ion-checkbox class="mc-st-form-checkbox" slot="start" :checked="true" color="success"></ion-checkbox>
                  <ion-input class="mc-st-form-input" type="text" :placeholder="$t('solidaryTransport.request.publish.form.fields.when.specificReturn')"></ion-input>
                </ion-item>
                <ion-item class="mc-st-form-item" lines="none" v-for="(item, index) in returnHours.properties" :key="index">
                  <ion-checkbox class="mc-st-form-checkbox" :name="item.value" :value="item.checked" color="success" slot="start" @ionChange="item.checked = $event.target.checked"
                  ></ion-checkbox>
                  <ion-label class="mc-st-form-label no-white-space" color="primary">{{ item.label }}</ion-label>
                </ion-item>
              </div>
            </div>
            
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

<style lang="scss"></style>

<script>
import { mapState, mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  name: 'solidaryTransport.request.publish.regular',
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
      },
    }
  },
  computed: {},
  methods: {
    displayGeoSearch: function (type, action) {
      console.log('Call GeoSearch')
    },
    updateType: function ($event) {
      console.log($event.detail)
    },
    frequencyChange: function ($event) {
      if (!this.updating) {
        this.updating = true
        this.frequency.selected = $event.target.value

        setTimeout(() => {
          this.updating = false
        }, 100)
      }
    }
  },
  created: function () {}
}
</script>