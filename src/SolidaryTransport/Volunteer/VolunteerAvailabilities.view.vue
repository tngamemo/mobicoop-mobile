<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>{{$t('solidaryTransport.volunteer.title')}} <sup>2/4</sup></ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content ref="volunteer" color="primary" class="is-scrollable">
      <div class="mc-st-container">
        <div class="mc-st-form">

          <div class="mc-st-form-content">
            <div class="mc-st-form-header">
              <div class="mc-st-form-title">{{$t('solidaryTransport.volunteer.steps.availabilities')}}</div>
              <div class="mc-st-form-steps">
                <span class="mc-st-form-step is-validate"></span>
                <span class="mc-st-form-step is-active"></span>
                <span class="mc-st-form-step"></span>
                <span class="mc-st-form-step"></span>
              </div>
            </div>

            <div class="mc-st-form-item">
              <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.volunteer.form.fields.availabilities.ranges.title')}}</ion-label>
            </div>

            <div class="mc-st-form-item">
              <ion-label class="mc-st-form-label as-intro no-white-space" color="primary">{{$t('solidaryTransport.volunteer.form.fields.availabilities.ranges.morning')}}</ion-label>

              <div class="mc-st-form-range-wrapper">
                <ion-range 
                  ref="morning-range"
                  class="mc-st-form-range"
                  :min="volunteer.mMin"
                  :max="volunteer.mMax"
                  dual-knobs="true"
                  pin="true"
                  snaps="true"
                  ticks="false"
                  color="primary"
                  debounce="200"
                  @ionChange="changeRange($event, 'm')"
                >
                  <ion-label color="primary" slot="start">{{volunteer.mMin}}h</ion-label>
                  <ion-label color="primary" slot="end">{{volunteer.mMax}}h</ion-label>
                </ion-range>
              </div>
            </div>

            <div class="mc-st-form-item">
              <ion-label class="mc-st-form-label as-intro no-white-space" color="primary">{{$t('solidaryTransport.volunteer.form.fields.availabilities.ranges.afternoon')}}</ion-label>

              <div class="mc-st-form-range-wrapper">
                <ion-range 
                  ref="afternoon-range"
                  class="mc-st-form-range"
                  :min="volunteer.aMin"
                  :max="volunteer.aMax"
                  dual-knobs="true"
                  pin="true"
                  snaps="true"
                  ticks="false"
                  color="primary"
                  debounce="200"
                  @ionChange="changeRange($event, 'a')"
                >
                  <ion-label color="primary" slot="start">{{volunteer.aMin}}h</ion-label>
                  <ion-label color="primary" slot="end">{{volunteer.aMax}}h</ion-label>
                </ion-range>
              </div>
            </div>

            <div class="mc-st-form-item">
              <ion-label class="mc-st-form-label as-intro no-white-space" color="primary">{{$t('solidaryTransport.volunteer.form.fields.availabilities.ranges.evening')}}</ion-label>

              <div class="mc-st-form-range-wrapper">
                <ion-range 
                  ref="evening-range"
                  class="mc-st-form-range"
                  :min="volunteer.eMin"
                  :max="volunteer.eMax"
                  dual-knobs="true"
                  pin="true"
                  snaps="true"
                  ticks="false"
                  color="primary"
                  debounce="200"
                  @ionChange="changeRange($event, 'e')"
                >
                  <ion-label color="primary" slot="start">{{volunteer.eMin}}h</ion-label>
                  <ion-label color="primary" slot="end">{{volunteer.eMax}}h</ion-label>
                </ion-range>
              </div>
            </div>

            <div class="mc-st-form-item">
              <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.volunteer.form.fields.availabilities.days.title')}}</ion-label>
            </div>

            <div class="mc-st-form-item">
              <ion-label class="mc-st-form-label as-intro no-white-space" color="primary">{{$t('solidaryTransport.volunteer.form.fields.availabilities.days.morning')}}</ion-label>

              <div class="mc-st-form-days-wrapper">
                <ion-button class="mc-st-form-day" :color="volunteer[`m${day.value}`] ? 'primary' : 'light'" v-for="(day, index) in availabilitiesDays" :key="day.value" @click="updateDay(`m${day.value}`)">
                  <span class="label">{{day.label}}</span>
                </ion-button>
              </div>
            </div>

            <div class="mc-st-form-item">
              <ion-label class="mc-st-form-label as-intro no-white-space" color="primary">{{$t('solidaryTransport.volunteer.form.fields.availabilities.days.afternoon')}}</ion-label>

              <div class="mc-st-form-days-wrapper">
                <ion-button class="mc-st-form-day" :color="volunteer[`a${day.value}`] ? 'primary' : 'light'" v-for="(day, index) in availabilitiesDays" :key="day.value" @click="updateDay(`a${day.value}`)">
                  <span class="label">{{day.label}}</span>
                </ion-button>
              </div>
            </div>

            <div class="mc-st-form-item">
              <ion-label class="mc-st-form-label as-intro no-white-space" color="primary">{{$t('solidaryTransport.volunteer.form.fields.availabilities.days.evening')}}</ion-label>

              <div class="mc-st-form-days-wrapper">
                <ion-button class="mc-st-form-day" :color="volunteer[`e${day.value}`] ? 'primary' : 'light'" v-for="(day, index) in availabilitiesDays" :key="day.value" @click="updateDay(`e${day.value}`)">
                  <span class="label">{{day.label}}</span>
                </ion-button>
              </div>
            </div>

            
          </div>

          <div class="mc-st-form-controls with-multiple">
            <ion-button class="mc-st-form-control as-back" color="light" v-html="$t('solidaryTransport.buttons.back')" @click="$router.back()"></ion-button>

            <ion-button class="mc-st-form-control" color="success" v-html="$t('solidaryTransport.buttons.next')" @click="validate()"></ion-button>
          </div>

        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="scss"></style>

<script>
import _ from 'lodash'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'solidaryTransport.volunteer.availabilites',
  components: {},
  data () {
    return {
      availabilitiesDays: this.$t('solidaryTransport.volunteer.form.fields.days')
    }
  },
  computed: {
    ...mapGetters([]),
    volunteer: {
      get() {
        return this.$store.state.solidaryTransportStore.temporary.volunteer;
      },
      set() {
        this.$store.commit("solidaryVolunteerUpdate", this.volunteer);
      }
    }
  },
  methods: {
    changeRange: function($event, key) {
      let value = $event.target.value
      this.volunteer[`${key}MinTime`] = value.lower
      this.volunteer[`${key}MaxTime`] = value.upper
    },
    updateDay: function(key) {
      this.volunteer[key] = !this.volunteer[key]
    },
    validate: function () {
      this.$router.push({name: 'solidaryTransport.home.volunteer.user'})
    }
  },
  mounted: function () {
    this.$refs['morning-range'].value = { lower: this.volunteer.mMinTime || this.volunteer.mMin, upper: this.volunteer.mMaxTime || this.volunteer.mMax }
    this.$refs['afternoon-range'].value = { lower: this.volunteer.aMinTime ||this.volunteer.aMin, upper: this.volunteer.aMaxTime ||this.volunteer.aMax }
    this.$refs['evening-range'].value = { lower: this.volunteer.eMinTime ||this.volunteer.eMin, upper: this.volunteer.eMaxTime ||this.volunteer.eMax }
  },
  created: function () {}
}
</script>