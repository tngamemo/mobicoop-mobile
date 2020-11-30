<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>{{$t('solidaryTransport.' + type + '.title')}} <sup>4/6</sup></ion-title>
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
              <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.' + this.$route.meta.type + '.form.fields.when.departure.date')}}</ion-label>
              <div class="mc-st-form-details" v-if="$v.request.when.departure.$error">
                <span class="mc-st-form-error is-left" v-if="!$v.request.when.departure.hasDate">{{$t('solidaryTransport.' + this.$route.meta.type + '.form.validators.required')}}</span>
              </div>

              <div class="mc-st-form-checkbox-wrapper">
                <ion-radio-group>
                <ion-item class="mc-st-form-item" @click="$refs['departure-date'].click()">
                  <!--<ion-radio class="mc-st-form-checkbox no-clickable" slot="start" :value="undefined" :checked="request.when.departure.specificDate !== undefined || (request.when.departure.specificDate === undefined && request.when.departure.marginDate === undefined)" color="success"></ion-radio>-->
                  <ion-datetime
                    ref="departure-date"
                    class="mc-st-form-input no-clickable"
                    display-format="DD/MM/YYYY"
                    picker-format="DD/MM/YYYY"
                    :min="$moment().format('YYYY-MM-DD')"
                    :max="$moment().add(5, 'years').format('YYYY-MM-DD')"
                    :cancel-text="$t('solidaryTransport.buttons.cancel')"
                    :done-text="$t('solidaryTransport.buttons.validate')"
                    :placeholder="$t('solidaryTransport.request.form.fields.when.departure.specificDate')"
                    :value="request.when.departure.specificDate"
                    @ionChange="changeDepartureSpecificDate($event.target.value)"
                    @ionFocus="changeDepartureSpecificDate($event.target.value)"
                  ></ion-datetime>
                </ion-item>
                  <!--
                <ion-item class="mc-st-form-item" lines="none" v-for="(item, index) in departureDates" :key="index">
                  <ion-radio class="mc-st-form-checkbox" :value="item.value" :checked="request.when.departure.marginDate === item.value" color="success" slot="start" @ionSelect="changeDepartureMarginDate(item.value)"
                  ></ion-radio>
                  <ion-label class="mc-st-form-label no-white-space" color="primary">{{ item.label }}</ion-label>
                </ion-item>
                  -->
                </ion-radio-group>
              </div>
            </div>

            <div class="mc-st-form-item">
              <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.' + this.$route.meta.type + '.form.fields.when.departure.hour')}}</ion-label>
              <div class="mc-st-form-details" v-if="$v.request.when.departure.$error">
                <span class="mc-st-form-error is-left" v-if="!$v.request.when.departure.hasHour">{{$t('solidaryTransport.' + this.$route.meta.type + '.form.validators.required')}}</span>
              </div>

              <div class="mc-st-form-checkbox-wrapper">
                <ion-radio-group>
                <ion-item class="mc-st-form-item" @click="$refs['departure-hour'].click()">
                  <ion-radio class="mc-st-form-checkbox no-clickable" slot="start" :value="undefined" :checked="request.when.departure.specificHour !== undefined || (request.when.departure.specificHour === undefined && request.when.departure.marginHour === undefined)" color="success"></ion-radio>
                  <ion-datetime
                    ref="departure-hour"
                    class="mc-st-form-input no-clickable"
                    display-format="HH:mm"
                    picker-format="HH:mm"
                    minute-values="0,5,10,15,20,25,30,35,40,45,50,55"
                    :cancel-text="$t('solidaryTransport.buttons.cancel')"
                    :done-text="$t('solidaryTransport.buttons.validate')"
                    :placeholder="$t('solidaryTransport.request.form.fields.when.departure.specificHour')"
                    :value="request.when.departure.specificHour"
                    @ionChange="changeDepartureSpecificHour($event.target.value)"
                    @ionFocus="changeDepartureSpecificHour($event.target.value)"
                  ></ion-datetime>
                </ion-item>
                <ion-item class="mc-st-form-item" lines="none" v-for="(item, index) in departureHours" :key="index">
                  <ion-radio class="mc-st-form-checkbox" :value="item.value" :checked="request.when.departure.marginHour === item.value" color="success" slot="start" @ionSelect="changeDepartureMarginHour(item.value)"
                  ></ion-radio>
                  <ion-label class="mc-st-form-label no-white-space" color="primary">Entre {{ item.min_time | moment('utc', 'HH') }}h et {{ item.max_time | moment('utc', 'HH')}}h</ion-label>
                </ion-item>
                </ion-radio-group>
              </div>
            </div>

            <div class="mc-st-form-item">
              <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.' + this.$route.meta.type + '.form.fields.when.return.hour')}}</ion-label>
              <div class="mc-st-form-details" v-if="$v.request.when.return.$error">
                <span class="mc-st-form-error is-left" v-if="!$v.request.when.return.hasHour">{{$t('solidaryTransport.' + this.$route.meta.type + '.form.validators.required')}}</span>
              </div>

              <div class="mc-st-form-checkbox-wrapper">
                <ion-radio-group>
                <ion-item class="mc-st-form-item" @click="$refs['return-hour'].click()">
                  <ion-radio class="mc-st-form-checkbox no-clickable" slot="start" :value="undefined" :checked="request.when.return.specificHour !== undefined" color="success"></ion-radio>
                  <ion-datetime
                    ref="return-hour"
                    class="mc-st-form-input no-clickable"
                    display-format="HH:mm"
                    picker-format="HH:mm"
                    minute-values="0,5,10,15,20,25,30,35,40,45,50,55"
                    :cancel-text="$t('solidaryTransport.buttons.cancel')"
                    :done-text="$t('solidaryTransport.buttons.validate')"
                    :placeholder="$t('solidaryTransport.request.form.fields.when.return.specificHour')"
                    :value="request.when.return.specificHour"
                    @ionChange="changeReturnSpecificHour($event.target.value)"
                    @ionFocus="changeReturnSpecificHour($event.target.value)"
                  ></ion-datetime>
                </ion-item>
                <ion-item class="mc-st-form-item" lines="none" v-for="(item, index) in returnHours" :key="index">
                  <ion-radio class="mc-st-form-checkbox" :value="item.value" :checked="request.when.return.marginHour === item.value" color="success" slot="start" @ionSelect="changeReturnMarginHour(item.value)"
                  ></ion-radio>
                  <ion-label class="mc-st-form-label no-white-space" color="primary">Entre {{ item.min_time | moment('utc', 'HH') }}h et {{ item.max_time | moment('utc', 'HH') }}h</ion-label>
                </ion-item>
                  <ion-item class="mc-st-form-item" lines="none" v-if="type == 'request'">
                    <ion-radio class="mc-st-form-checkbox" :value="undefined" :checked="request.when.return.marginHour === undefined && request.when.return.specificHour === undefined" color="success" slot="start" @ionSelect="noHour()"
                    ></ion-radio>
                    <ion-label class="mc-st-form-label no-white-space" color="primary">{{$t('solidaryTransport.' + this.$route.meta.type + '.form.fields.when.return.noHour')}}</ion-label>
                  </ion-item>
                </ion-radio-group>
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

const hasDate = (value) => {
  return !_.isEmpty(value.specificDate) || !_.isEmpty(value.marginDate)
}
const hasHour = (value) => {
    return !_.isEmpty(value.specificHour) || !_.isEmpty(value.marginHour)
}

export default {
  name: 'solidaryTransport.request.punctual',
  components: {},
  data () {
    return {
      updating: false,
      type: this.$route.meta.type,
      departureDates: this.$t('solidaryTransport.' + this.$route.meta.type + '.form.fields.when.departure.dates'),
      departureHours: [],
      returnHours: [],
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
      when: {
        departure: {
          hasDate,
          hasHour
        },
        return: {
          hasHour : function () {
            if (this.type == 'request') {
              return true;
            } else {
              return hasHour;
            }
          }
        }
      }
    }
  },
  methods: {
    noHour() {
      if (!this.updating) {
        this.updating = true
        this.request.when.return.marginHour = undefined;
        this.request.when.return.specificHour = undefined

        setTimeout(() => {
          this.updating = false
        }, 100)
      }
    },
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
      this.$router.push({ name: (this.$route.name.includes('carpool') ? '' : 'solidaryTransport.') + 'geoSearch', query: { action: 'solidaryTransport.search', type: 'request.origin' }});
    },
    displayGeoSearchForDestination: function () {
      this.$router.push({ name:(this.$route.name.includes('carpool') ? '' : 'solidaryTransport.') + 'geoSearch', query: { action: 'solidaryTransport.search', type: 'request.destination' }});
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
        this.$router.push({name: (this.$route.name.includes('carpool') ? 'carpool.solidary' : 'solidaryTransport') + '.home.' + this.type + '.user'})
      }
    }
  },
  created: function () {
    this.departureHours.push({'value': 'morning', 'min_time': this.request.structure.mMinTime, 'max_time': this.request.structure.mMaxTime});
    this.departureHours.push({'value': 'afternoon', 'min_time': this.request.structure.aMinTime, 'max_time': this.request.structure.aMaxTime});
    this.departureHours.push({'value': 'evening', 'min_time': this.request.structure.eMinTime, 'max_time': this.request.structure.eMaxTime});
    this.returnHours.push({'value': 'morning','min_time': this.request.structure.mMinTime, 'max_time': this.request.structure.mMaxTime});
    this.returnHours.push({'value': 'afternoon', 'min_time': this.request.structure.aMinTime, 'max_time': this.request.structure.aMaxTime});
    this.returnHours.push({'value': 'evening', 'min_time': this.request.structure.eMinTime, 'max_time': this.request.structure.eMaxTime});
  }
}
</script>
