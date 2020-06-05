<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>{{$t('solidaryTransport.profile.requests.title')}}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary">
      <div class="mc-st-container">

        <div class="mc-st-form">

          <div class="mc-st-form-controls with-multiple on-top">
            <ion-button 
              class="mc-st-form-control as-back"
              fill="solid"
              :color="!toggle ? 'primary' : 'light'"
              v-html="$t('solidaryTransport.profile.actions.requests')"
              @click="toggleDisplay()"
            ></ion-button>

            <ion-button
              class="mc-st-form-control as-back"
              fill="solid"
              :color="toggle ? 'primary' : 'light'"
              v-html="$t('solidaryTransport.profile.actions.journeys')"
              @click="toggleDisplay()"
            ></ion-button>
          </div>

          <div class="mc-st-form-content">

            <!-- Solidaries -->
            <template v-if="!toggle">
              <div style="color: black;">Missing elements in API </div>
              <div class="mc-st-summary" v-if="solidaries">
                <template v-for="(solidary, index) in solidaries">
                  <div class="mc-st-summary-card" :key="index" @click="$router.push({name:'solidaryTransport.profile.requests.request', query: {id: solidary.id}})">
                    <div class="mc-st-summary-card-header">
                      <span>{{$moment(solidary.outwardDatetime).format('D MMMM YYYY')}}</span>
                      <!-- <span v-if="request.when.departure.marginHour">, {{getLabelForKeyToDisplay(departureHours,request.when.departure.marginHour)}}</span> -->
                    </div>
                    <div class="mc-st-summary-card-content">
                      <div class="times">
                        <div class="time as-from"><!-- {{$moment(request.when.departure.specificHour).format('HH[h]mm')}} --></div>
                        <div class="time as-to"><!-- {{$moment(request.when.departure.specificHour).format('HH[h]mm')}} --></div>
                      </div>
                      <div class="places">
                        <div class="place as-from" v-if="solidary.origin">
                          <span class="city">{{solidary.origin.county}}</span>
                          <span class="address">{{solidary.origin.streetAddress}}</span>
                        </div>
                        <div class="place as-to">
                          <template v-if="solidary.destination">
                            <span class="city">{{solidary.destination.county}}</span>
                            <span class="address">{{solidary.destination.streetAddress}}</span>
                          </template>
                          <template v-else>
                            <span class="city">A définir ultérieurement</span>
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style="color: red;">
                    <span>outwardDatetime : {{solidary.outwardDatetime}}</span>
                    <span>outwardDealineDatetime :{{solidary.outwardDealineDatetime}}</span>
                    <span>returnDatetime: {{solidary.returnDatetime}}</span>
                    <span>returnDealineDatetime: {{solidary.returnDealineDatetime}}</span>
                    <span>marginDuration: {{solidary.marginDuration}}</span>
                    <span>frequency: {{solidary.frequency}}</span>
                    <span>days: {{solidary.days}}</span>
                    <span>regularDetail: {{solidary.regularDetail}}</span>
                  </div>
                </template>
              </div>
            </template>

            <!-- Journeys -->
            <template v-else>
              <div style="color: black;">Trajets ? </div>
            </template>

          </div>

          <div class="mc-st-form-controls in-summary" v-if="solidaries">
            <ion-button class="mc-st-form-control" 
              color="success"
              v-html="$t('solidaryTransport.profile.actions.newRequest')"
              @click="$router.push({name:'solidaryTransport.home.request'})"
            ></ion-button>
          </div>

          <div class="mc-st-loading" v-else>
            <ion-spinner name="crescent" class="mc-st-loading-spinner"></ion-spinner>
            <p class="mc-st-loading-message">{{$t('solidaryTransport.commons.loading')}}</p>
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
  name: 'solidaryTransport.profile.requests',
  components: {},
  data () {
    return {
      toggle: false,
      solidaries: undefined
    }
  },
  computed: {},
  methods: {
    toggleDisplay: function () {
      this.toggle = !this.toggle
    }
  },
  created: function () {
    this.$store.dispatch('getMySolidaries')
      .then((solidaries) => {
        this.solidaries = solidaries
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
</script>