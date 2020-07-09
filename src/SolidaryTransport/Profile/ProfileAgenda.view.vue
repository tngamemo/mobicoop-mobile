<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>{{$t('solidaryTransport.profile.agenda.title')}}</ion-title>
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
              v-html="$t('solidaryTransport.profile.actions.availabilities')"
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

            <br>
            <!-- Solidaries -->
            <template v-if="!toggle">
              <div class="mc-st-form-item">
                <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.volunteer.form.fields.perimeter')}}</ion-label>

                <div class="mc-st-form-range-wrapper">
                  <ion-range
                    ref="max-distance"
                    class="mc-st-form-range"
                    :min="minDeviationDistance"
                    :max="maxDeviationDistance"
                    pin="true"
                    snaps="true"
                    ticks="false"
                    color="primary"
                    debounce="200"
                    @ionChange="changeMaxDistance($event)"
                  >
                    <ion-label color="primary" slot="start">{{minDeviationDistance}}km</ion-label>
                    <ion-label color="primary" slot="end">{{maxDeviationDistance}}km</ion-label>
                  </ion-range>
                </div>
              </div>

              <div class="mc-st-summary">
                <div class="mc-st-summary-text is-centered">
                  Je suis prêt à me déplacer à <br><span class="answer">{{volunteer.maxDistance}}km de chez moi</span>.
                </div>
              </div>

              <template v-if="volunteer.structure">
                <div class="mc-st-form-item" v-if="volunteer.structure.needs.length !== 0">
                  <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.volunteer.form.fields.needs')}}</ion-label>

                  <div class="mc-st-form-checkbox-wrapper">
                    <ion-item class="mc-st-form-item" lines="none" v-for="(need, index) in volunteer.structure.needs" :key="index">
                      <ion-checkbox
                        class="mc-st-form-checkbox"
                        color="success"
                        slot="start"
                        :value="volunteer.needs[index].value"
                        :checked="volunteer.needs[index].value === true"
                        @ionChange="volunteer.needs[index].value = $event.target.checked;"
                      ></ion-checkbox>
                      <ion-label class="mc-st-form-label no-white-space" color="primary">{{ need.label }}</ion-label>
                    </ion-item>
                  </div>
                </div>
              </template>

              <ion-item lines="none" class="mc-st-form-item">
                <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.volunteer.form.fields.vehicle')}}</ion-label>
                <ion-toggle
                  :checked="volunteer.vehicle === true"
                  @ionChange="changeVehicle($event)">
                </ion-toggle>
              </ion-item>

              <div class="mc-st-form-item" v-if="volunteer.structure && volunteer.structure.needs.length !== 0">
                <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.volunteer.form.fields.language')}}</ion-label>

                <div class="mc-st-form-checkbox-wrapper">
                  <ion-item class="mc-st-form-item" lines="none" v-for="(language, index) in languages" :key="index">
                    <ion-checkbox
                      class="mc-st-form-checkbox"
                      color="success"
                      slot="start"
                      :value="language.value"
                      :checked="volunteer.languages.indexOf(language.value) !== -1"
                      @ionChange="changeLanguages($event)"
                    ></ion-checkbox>
                    <ion-label class="mc-st-form-label no-white-space" color="primary">{{ language.label }}</ion-label>
                  </ion-item>
                </div>
              </div>

              <div class="mc-st-form-item as-comment">
                <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.volunteer.form.fields.comment')}}</ion-label>

                <ion-item class="mc-st-form-item as-textarea" lines="none">
                  <ion-textarea :value="volunteer.comment" @ionChange="volunteer.comment = $event.target.value" :placeholder="$t('solidaryTransport.volunteer.form.fields.commentSample')" :auto-grow="true"></ion-textarea>
                </ion-item>
              </div>
            </template>

            <!-- Journeys -->
            <template v-else>
              <div class="mc-st-summary" v-if="solidaries">
              <div v-for="(solidary, index) in solidaries">
                <div class="mc-st-summary-card" :key="index" @click="$router.push({name:'solidaryTransport.profile.requests.request', query: {id: solidary.id}})">
                  <div class="mc-st-summary-card-header">
                    <span>{{$moment(solidary.outwardDatetime).format('D MMMM YYYY')}}</span>
                    <!-- <span v-if="request.when.departure.marginHour">, {{getLabelForKeyToDisplay(departureHours,request.when.departure.marginHour)}}</span> -->
                  </div>
                  <div class="mc-st-summary-card-content">
                    <div class="times">
                      <div class="time as-from">{{$moment(solidary.outwardDatetime).format('HH[h]mm')}}</div>
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
              </div>
              </div>
            </template>

          </div>

          <template v-if="!toggle">
            <div class="mc-st-form-controls with-multiple">
              <ion-button class="mc-st-form-control as-back" color="light" v-html="$t('solidaryTransport.buttons.back')" @click="$router.back()"></ion-button>

              <ion-button class="mc-st-form-control" color="success" v-html="$t('solidaryTransport.buttons.save')" @click="validate()"></ion-button>
            </div>
          </template>

          <!-- <div class="mc-st-form-controls in-summary" v-if="details">
            <ion-button class="mc-st-form-control"
              color="success"
              v-html="$t('solidaryTransport.profile.actions.newRequest')"
              @click="$router.push({name:'solidaryTransport.home.request'})"
            ></ion-button>
          </div>

          <div class="mc-st-loading" v-else>
            <ion-spinner name="crescent" class="mc-st-loading-spinner"></ion-spinner>
            <p class="mc-st-loading-message">{{$t('solidaryTransport.commons.loading')}}</p>
          </div> -->

        </div>

      </div>

    </ion-content>
  </ion-page>
</template>

<style lang="scss"></style>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'solidaryTransport.profile.agenda',
  components: {},
  data () {
    return {
      minDeviationDistance: 5,
      maxDeviationDistance: 50,
      toggle: false,
      details: undefined,
      languages: this.$t('solidaryTransport.volunteer.form.fields.languages'),
      solidaries: []
    }
  },
  computed: {
    volunteer: {
      get() {
        return this.$store.state.solidaryTransportStore.temporary.volunteer;
      },
      set() {
        //this.$store.commit("solidaryVolunteerUpdate", this.volunteer);
      }
    }
  },
  methods: {
    toggleDisplay: function () {
      this.toggle = !this.toggle
    },
    changeLanguages: function ($event) {
      this.volunteer.languages.push($event.target.value);
      this.volunteer.languages = _.uniq(this.volunteer.languages)
    },
    changeVehicle: function ($event) {
      this.volunteer.vehicle = $event.target.checked
    },
    changeMaxDistance: function ($event) {
      this.volunteer.maxDistance = $event.target.value
    },
    getVolunteer: function () {
      this.$store.dispatch('getVolunteerDetails', this.$store.state.userStore.user.solidaryUser.id)
        .then((details) => {

        })
        .catch((error) => {
          console.error(error)
        })
    },
    validate: function () {
      if (this.volunteer.id) {
        this.$store.dispatch('putSolidaryVolunteer').then(() => {

        }).catch( (error) => {
          console.error(error)
        })
      } else {
        this.$store.dispatch('postSolidaryVolunteer').then(() => {

        }).catch( (error) => {
          console.error(error)
        })
      }

    },
    getSolidaries: function() {
      this.$store.dispatch('getMySolidaries')
        .then((solidaries) => {
          // Only My Ride driver = true
          this.solidaries = solidaries.filter(item => item.driver == true);
        })
        .catch((error) => {
          console.error(error)
        })
    }
  },
  mounted: function () {
    this.$refs['max-distance'].value = this.volunteer.maxDistance
  },
  created: function () {
    this.getVolunteer();
    this.getSolidaries();
  }
}
</script>
