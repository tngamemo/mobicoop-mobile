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

    <ion-content ref="request" color="primary">
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
                <ion-item class="mc-st-form-item">
                  <ion-checkbox class="mc-st-form-checkbox" slot="start" :checked="true" color="success"></ion-checkbox>
                  <ion-input class="mc-st-form-input" type="text" :placeholder="$t('solidaryTransport.request.form.fields.when.departure.specificDate')"></ion-input>
                </ion-item>
                <ion-item class="mc-st-form-item" lines="none" v-for="(item, index) in departureDates.properties" :key="index">
                  <ion-checkbox class="mc-st-form-checkbox" :name="item.value" :value="item.checked" color="success" slot="start" @ionChange="item.checked = $event.target.checked"
                  ></ion-checkbox>
                  <ion-label class="mc-st-form-label no-white-space" color="primary">{{ item.label }}</ion-label>
                </ion-item>
              </div>
            </div>

            <div class="mc-st-form-item">
              <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.request.form.fields.when.departure.hour')}}</ion-label>

              <div class="mc-st-form-checkbox-wrapper">
                <ion-item class="mc-st-form-item">
                  <ion-checkbox class="mc-st-form-checkbox" slot="start" :checked="true" color="success"></ion-checkbox>
                  <ion-input class="mc-st-form-input" type="text" :placeholder="$t('solidaryTransport.request.form.fields.when.departure.specificHour')"></ion-input>
                </ion-item>
                <ion-item class="mc-st-form-item" lines="none" v-for="(item, index) in departureHours.properties" :key="index">
                  <ion-checkbox class="mc-st-form-checkbox" :name="item.value" :value="item.checked" color="success" slot="start" @ionChange="item.checked = $event.target.checked"
                  ></ion-checkbox>
                  <ion-label class="mc-st-form-label no-white-space" color="primary">{{ item.label }}</ion-label>
                </ion-item>
              </div>
            </div>

            <div class="mc-st-form-item">
              <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.request.form.fields.when.return.hour')}}</ion-label>

              <div class="mc-st-form-checkbox-wrapper">
                <ion-item class="mc-st-form-item">
                  <ion-checkbox class="mc-st-form-checkbox" slot="start" :checked="true" color="success"></ion-checkbox>
                  <ion-input class="mc-st-form-input" type="text" :placeholder="$t('solidaryTransport.request.form.fields.when.specificReturn')"></ion-input>
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
      departureDates: {
        other: '',
        selected: this.$t('solidaryTransport.request.form.fields.when.departure.dates')[0].value,
        properties: this.$t('solidaryTransport.request.form.fields.when.departure.dates')
      },
      departureHours: {
        other: '',
        selected: this.$t('solidaryTransport.request.form.fields.when.departure.hours')[0].value,
        properties: this.$t('solidaryTransport.request.form.fields.when.departure.hours')
      },
      returnHours: {
        other: '',
        selected: this.$t('solidaryTransport.request.form.fields.when.return.hours')[0].value,
        properties: this.$t('solidaryTransport.request.form.fields.when.return.hours')
      }
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
        if (!this.regular) {
          this.$router.push({name: 'solidaryTransport.home.request.punctual'})
        } else {
          this.$router.push({name: 'solidaryTransport.home.request.regular'})
        }
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