<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>{{$t('solidaryTransport.request.publish.title')}} <sup>1/3</sup></ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary">
      <div class="mc-st-container">
        <div class="mc-st-form">

          <div class="mc-st-form-content">
            <div class="mc-st-form-header">
              <div class="mc-st-form-title">{{$t('solidaryTransport.request.publish.steps.init')}}</div>
              <div class="mc-st-form-steps">
                <span class="mc-st-form-step is-active"></span>
                <span class="mc-st-form-step"></span>
                <span class="mc-st-form-step"></span>
              </div>
            </div>

            <ion-item class="mc-st-form-item" v-on:click="displayGeoSearch('register_address', 'search')">
              <ion-label position="floating">{{$t('solidaryTransport.ad.publish.form.fields.destination.from')}} *</ion-label>
              <ion-input
                type="text"
                name="address"
                :value="addresses.departure"
                readonly="true"
                class="-no-clickable"
              ></ion-input>
            </ion-item>
            <template v-if="true">
              <div class="mc-st-form-details">
                <span class="mc-st-form-error" v-if="true">{{$t('solidaryTransport.register.form.fields.required')}}</span>
              </div>
            </template>

            <ion-item class="mc-st-form-item" v-on:click="displayGeoSearch('register_address', 'search')">
              <ion-label position="floating">{{$t('solidaryTransport.ad.publish.form.fields.destination.to')}}</ion-label>
              <ion-input
                type="text"
                name="address"
                :value="addresses.arrival"
                readonly="true"
                class="-no-clickable"
              ></ion-input>
            </ion-item>

            <div class="mc-st-form-item as-transport">
              <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.request.publish.form.fields.transports')}}</ion-label>

              <div class="mc-st-form-checkbox-wrapper">
                <ion-item class="mc-st-form-item" lines="none" v-for="(item, index) in transports.properties" :key="index">
                  <ion-checkbox class="mc-st-form-checkbox" :name="item.value" :value="item.checked" color="success" slot="start" @ionChange="item.checked = $event.target.checked"
                  ></ion-checkbox>
                  <ion-label class="mc-st-form-label no-white-space" color="primary">{{ item.label }}</ion-label>
                </ion-item>
                <ion-item class="mc-st-form-item as-other">
                  <ion-label position="floating">{{$t('solidaryTransport.request.publish.form.fields.otherTransports')}}</ion-label>
                  <ion-input class="mc-st-form-input" type="text"></ion-input>
                </ion-item>
              </div>
            </div>

            <div class="mc-st-form-item as-transport">
              <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.request.publish.form.fields.transportsDetails')}}</ion-label>

              <div class="mc-st-form-checkbox-wrapper">
                <ion-item class="mc-st-form-item" lines="none" v-for="(item, index) in transportsDetails.properties" :key="index">
                  <ion-checkbox class="mc-st-form-checkbox" :name="item.value" :value="item.checked" color="success" slot="start" @ionChange="item.checked = $event.target.checked"
                  ></ion-checkbox>
                  <ion-label class="mc-st-form-label no-white-space" color="primary">{{ item.label }}</ion-label>
                </ion-item>
                <ion-item class="mc-st-form-item as-other">
                  <ion-label position="floating">{{$t('solidaryTransport.request.publish.form.fields.otherTransportsDetails')}}</ion-label>
                  <ion-input class="mc-st-form-input" type="text"></ion-input>
                </ion-item>
              </div>
            </div>

            <div class="mc-st-form-item as-supporting">
              <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.request.publish.form.fields.supporting')}}</ion-label>

              <ion-item class="mc-st-form-item">
                <ion-select :value="supporting.selected" ok-text="Valider" cancel-text="Fermer" selected-text="" @ionChange="supporting.selected = $event.target.value">
                  <ion-select-option :value="item.value" v-for="(item, index) in supporting.properties" :key="index">{{item.label}}</ion-select-option>
                </ion-select>
              </ion-item>
            </div>

            <div class="mc-st-form-item as-transport">
              <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.request.publish.form.fields.frequency')}}</ion-label>

              <div class="mc-st-form-checkbox-wrapper">
                <ion-item class="mc-st-form-item" lines="none" v-for="(item, index) in frequency.properties" :key="index">
                  <ion-checkbox class="mc-st-form-checkbox" :name="item.value" :value="item.value" color="success" slot="start" :checked="frequency.selected === item.value" @ionChange="frequencyChange($event)"
                  ></ion-checkbox>
                  <ion-label class="mc-st-form-label no-white-space" color="primary">{{ item.label }}</ion-label>
                </ion-item>
              </div>
            </div>
            
          </div>

          <div class="mc-st-form-controls with-multiple">
            <ion-button class="mc-st-form-control as-back" color="light" v-html="$t('solidaryTransport.buttons.back')" @click="$router.back()"></ion-button>

            <template v-if="frequency.selected === 'ponctual'">
              <ion-button class="mc-st-form-control" color="success" v-html="$t('solidaryTransport.buttons.next')" @click="$router.push({name:'solidaryTransport.home.request.ponctual'})"></ion-button>
            </template>
            <template v-if="frequency.selected === 'regular'">
              <ion-button class="mc-st-form-control" color="success" v-html="$t('solidaryTransport.buttons.next')" @click="$router.push({name:'solidaryTransport.home.request.regular'})"></ion-button>
            </template>
          </div>

        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="scss"></style>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'solidaryTransport.request.publish',
  components: {},
  data () {
    return {
      updating: false,
      transports: {
        other: '',
        properties: this.$t('solidaryTransport.request.publish.form.transports')
      },
      transportsDetails: {
        other: '',
        properties: this.$t('solidaryTransport.request.publish.form.transportsDetails')
      },
      supporting: {
        selected: this.$t('solidaryTransport.request.publish.form.supporting')[0].value,
        properties: this.$t('solidaryTransport.request.publish.form.supporting')
      },
      addresses: {
        departure: undefined,
        arrival: undefined
      },
      frequency: {
        selected: this.$t('solidaryTransport.request.publish.form.frequency')[0].value,
        properties: this.$t('solidaryTransport.request.publish.form.frequency')
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