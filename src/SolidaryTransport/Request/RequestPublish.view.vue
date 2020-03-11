<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>{{$t('solidaryTransport.request.publish.title')}}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary">
      <div class="mc-st-container">
        <div class="mc-st-form">

          <div class="mc-st-form-content">
            <div class="mc-st-form-header">
              <div class="mc-st-form-title">{{$t('solidaryTransport.request.publish.step')}}</div>
              <div class="mc-st-form-steps">
                <span class="mc-st-form-step is-active"></span>
                <span class="mc-st-form-step"></span>
                <span class="mc-st-form-step"></span>
              </div>
            </div>

            <ion-item class="mc-st-form-item" v-on:click="displayGeoSearch('register_address', 'search')">
              <ion-label position="floating">Lieu de départ *</ion-label>
              <ion-input
                type="text"
                name="address"
                :value="address"
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
              <ion-label position="floating">Lieu de destination (facultatif)</ion-label>
              <ion-input
                type="text"
                name="address"
                :value="address"
                readonly="true"
                class="-no-clickable"
              ></ion-input>
            </ion-item>
            <template v-if="true">
              <div class="mc-st-form-details">
                <span class="mc-st-form-error" v-if="true">{{$t('solidaryTransport.register.form.fields.required')}}</span>
              </div>
            </template>

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

export default {
  name: 'solidaryTransport.request.publish',
  components: {},
  data () {
    return {
      transports: {
        other: '',
        properties: this.$t('solidaryTransport.request.publish.form.transports')
      },
      address: undefined
    }
  },
  computed: {},
  methods: {
    displayGeoSearch(type, action) {
      console.log('Call GeoSearch')
    },
  },
  created: function () {}
}
</script>