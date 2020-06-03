<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>{{$t('solidaryTransport.request.title')}} <sup>4/6</sup></ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content ref="request" color="primary" class="is-scrollable">
      <div class="mc-st-container">
        <div class="mc-st-form">

          <div class="mc-st-form-content">
            <div class="mc-st-form-header">
              <div class="mc-st-form-title">{{$t('solidaryTransport.request.steps.punctual')}}</div>
              <div class="mc-st-form-steps">
                <span class="mc-st-form-step is-validate"></span>
                <span class="mc-st-form-step is-validate"></span>
                <span class="mc-st-form-step is-validate"></span>
                <span class="mc-st-form-step is-active"></span>
                <span class="mc-st-form-step"></span>
                <span class="mc-st-form-step"></span>
              </div>
            </div>

            <div class="mc-st-form-item">
              <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.request.form.fields.when.departure.date')}}</ion-label>

              <div class="mc-st-form-checkbox-wrapper">
                <ion-item class="mc-st-form-item" @click="$refs['departure-date'].click()">
                  <ion-checkbox class="mc-st-form-checkbox no-clickable" slot="start" :checked="request.when.departure.specificDate !== undefined || (request.when.departure.specificDate === undefined && request.when.departure.marginDate === undefined)" color="success"></ion-checkbox>
                  <ion-datetime
                    ref="departure-date"
                    class="mc-st-form-input no-clickable"
                    display-format="DD/MM/YY"
                    picker-format="DD/MM/YY"
                    :min="$moment().format('YYYY-MM-DD')"
                    :cancel-text="$t('solidaryTransport.buttons.cancel')"
                    :done-text="$t('solidaryTransport.buttons.validate')"
                    :placeholder="$t('solidaryTransport.request.form.fields.when.departure.specificDate')"
                    :value="request.when.departure.specificDate"
                    @ionChange="changeDepartureSpecificDate($event.target.value)"
                    @ionFocus="changeDepartureSpecificDate($event.target.value)"
                  ></ion-datetime>
                </ion-item>
                <ion-item class="mc-st-form-item" lines="none" v-for="(item, index) in departureDates" :key="index">
                  <ion-checkbox class="mc-st-form-checkbox" :value="request.when.departure.marginDate" :checked="request.when.departure.marginDate === item.value" color="success" slot="start" @ionChange="changeDepartureMarginDate(item.value)"
                  ></ion-checkbox>
                  <ion-label class="mc-st-form-label no-white-space" color="primary">{{ item.label }}</ion-label>
                </ion-item>
              </div>
            </div>

            <div class="mc-st-form-item">
              <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.request.form.fields.when.departure.hour')}}</ion-label>

              <div class="mc-st-form-checkbox-wrapper">
                <ion-item class="mc-st-form-item" @click="$refs['departure-hour'].click()">
                  <ion-checkbox class="mc-st-form-checkbox no-clickable" slot="start" :checked="request.when.departure.specificHour !== undefined || (request.when.departure.specificHour === undefined && request.when.departure.marginHour === undefined)" color="success"></ion-checkbox>
                  <ion-datetime
                    ref="departure-hour"
                    class="mc-st-form-input no-clickable"
                    display-format="HH:mm"
                    picker-format="HH:mm"
                    :cancel-text="$t('solidaryTransport.buttons.cancel')"
                    :done-text="$t('solidaryTransport.buttons.validate')"
                    :placeholder="$t('solidaryTransport.request.form.fields.when.departure.specificHour')"
                    :value="request.when.departure.specificHour"
                    @ionChange="changeDepartureSpecificHour($event.target.value)"
                    @ionFocus="changeDepartureSpecificHour($event.target.value)"
                  ></ion-datetime>
                </ion-item>
                <ion-item class="mc-st-form-item" lines="none" v-for="(item, index) in departureHours" :key="index">
                  <ion-checkbox class="mc-st-form-checkbox" :value="request.when.departure.marginHour" :checked="request.when.departure.marginHour === item.value" color="success" slot="start" @ionChange="changeDepartureMarginHour(item.value)"
                  ></ion-checkbox>
                  <ion-label class="mc-st-form-label no-white-space" color="primary">{{ item.label }}</ion-label>
                </ion-item>
              </div>
            </div>

            <div class="mc-st-form-item">
              <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.request.form.fields.when.return.hour')}}</ion-label>

              <div class="mc-st-form-checkbox-wrapper">
                <ion-item class="mc-st-form-item" @click="$refs['return-hour'].click()">
                  <ion-checkbox class="mc-st-form-checkbox no-clickable" slot="start" :checked="request.when.return.specificHour !== undefined || (request.when.return.specificHour === undefined && request.when.return.marginHour === undefined)" color="success"></ion-checkbox>
                  <ion-datetime
                    ref="return-hour"
                    class="mc-st-form-input no-clickable"
                    display-format="HH:mm"
                    picker-format="HH:mm"
                    :cancel-text="$t('solidaryTransport.buttons.cancel')"
                    :done-text="$t('solidaryTransport.buttons.validate')"
                    :placeholder="$t('solidaryTransport.request.form.fields.when.return.specificHour')"
                    :value="request.when.return.specificHour"
                    @ionChange="changeReturnSpecificHour($event.target.value)"
                    @ionFocus="changeReturnSpecificHour($event.target.value)"
                  ></ion-datetime>
                </ion-item>
                <ion-item class="mc-st-form-item" lines="none" v-for="(item, index) in returnHours" :key="index">
                  <ion-checkbox class="mc-st-form-checkbox" :value="request.when.return.marginHour" :checked="request.when.return.marginHour === item.value" color="success" slot="start" @ionChange="changeReturnMarginHour(item.value)"
                  ></ion-checkbox>
                  <ion-label class="mc-st-form-label no-white-space" color="primary">{{ item.label }}</ion-label>
                </ion-item>
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
import { required } from 'vuelidate/lib/validators'
import { toast } from '../../Shared/Mixin/toast.mixin'

export default {
  name: 'solidaryTransport.request.punctual',
  components: {},
  data () {
    return {
      updating: false,
      departureDates: this.$t('solidaryTransport.request.form.fields.when.departure.dates'),
      departureHours: this.$t('solidaryTransport.request.form.fields.when.departure.hours'),
      returnHours: this.$t('solidaryTransport.request.form.fields.when.return.hours')
    }
  },
  computed: {
    ...mapGetters([
      'getAddressToDisplay'
    ]),
    request: {
      get() {
        return this.$store.state.solidaryTransportStore.temporary.request;
      },
      set() {
        this.$store.commit("solidaryRequestUpdate", this.request);
      }
    }
  },
  mixins: [toast],
  validations: {
    request: {
      origin: {
        required
      }
    }
  },
  methods: {
    changeDepartureMarginDate: function (value) {
      if (!this.updating) {
        this.updating = true
        this.request.when.departure.specificDate = undefined
        this.request.when.departure.marginDate = value

        setTimeout(() => {
          this.updating = false
        }, 100)
      }  
    },
    changeDepartureSpecificDate: function (value) {
      if (!this.updating) {
        this.updating = true
        this.request.when.departure.marginDate = undefined
        this.request.when.departure.specificDate = value

        setTimeout(() => {
          this.updating = false
        }, 100)
      }  
    },
    changeDepartureMarginHour: function (value) {
      if (!this.updating) {
        this.updating = true
        this.request.when.departure.specificHour = undefined
        this.request.when.departure.marginHour = value

        setTimeout(() => {
          this.updating = false
        }, 100)
      }  
    },
    changeDepartureSpecificHour: function (value) {
      if (!this.updating) {
        this.updating = true
        this.request.when.departure.marginHour = undefined
        this.request.when.departure.specificHour = value

        setTimeout(() => {
          this.updating = false
        }, 100)
      }  
    },
    changeReturnMarginHour: function (value) {
      if (!this.updating) {
        this.updating = true
        this.request.when.return.specificHour = undefined
        this.request.when.return.marginHour = value

        setTimeout(() => {
          this.updating = false
        }, 100)
      }  
    },
    changeReturnSpecificHour: function (value) {
      if (!this.updating) {
        this.updating = true
        this.request.when.return.marginHour = undefined
        this.request.when.return.specificHour = value

        setTimeout(() => {
          this.updating = false
        }, 100)
      }  
    },
    displayGeoSearchForOrigin: function () {
      this.$router.push({ name: "solidaryTransport.geoSearch", query: { action: 'solidaryTransport.search', type: 'request.origin' }});
    },
    displayGeoSearchForDestination: function () {
      this.$router.push({ name: "solidaryTransport.geoSearch", query: { action: 'solidaryTransport.search', type: 'request.destination' }});
    },
    validate: function () {
      this.$v.$reset();
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$refs.request.getScrollElement().then((parent) => {
          let child = document.getElementsByClassName('mc-st-form-error')[0]
          var childPos = child.offsetTop
          var parentPos = parent.offsetTop
          var top = childPos - parentPos - 30
          this.$refs.request.scrollToPoint(0, top, 0)
        })
      } else {
        this.$router.push({name: 'solidaryTransport.home.request.user'})
      }
    }
  },
  created: function () {
    if (_.isEmpty(this.request.origin)) {
      this.request.origin = _.cloneDeep(this.request.homeAddress)
    }
  }
}
</script>