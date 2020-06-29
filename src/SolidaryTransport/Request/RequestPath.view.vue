<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>{{$t('solidaryTransport.' + type + '.title')}} <sup>3/6</sup></ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content ref="request" color="primary" class="is-scrollable">
      <div class="mc-st-container">
        <div class="mc-st-form">

          <div class="mc-st-form-content">
            <div class="mc-st-form-header">
              <div class="mc-st-form-title">{{$t('solidaryTransport.' + type + '.steps.path')}}</div>
              <div class="mc-st-form-steps">
                <span class="mc-st-form-step is-validate"></span>
                <span class="mc-st-form-step is-validate"></span>
                <span class="mc-st-form-step is-active"></span>
                <span class="mc-st-form-step"></span>
                <span class="mc-st-form-step"></span>
                <span class="mc-st-form-step"></span>
              </div>
            </div>

            <ion-list class="mc-st-form-item">
              <ion-radio-group class="mc-st-form-radios">
                <ion-list-header class="mc-st-form-radios-header">
                  <ion-label class="mc-st-form-label as-title" color="primary">{{$t('solidaryTransport.' + type + '.form.fields.subjects')}}</ion-label>
                </ion-list-header>

                <ion-item lines="none" class="mc-st-form-radios-item" v-for="(subject, index) in request.structure.subjects" :key="index">
                  <ion-label class="ion-text-wrap">{{subject.label}}</ion-label>
                  <ion-radio slot="start" :value="subject.id" :checked="request.subject === subject.id" @ionSelect="request.subject = subject.id"></ion-radio>
                </ion-item>
              </ion-radio-group>
            </ion-list>

            <ion-item class="mc-st-form-item" v-on:click="displayGeoSearchForOrigin()">
              <ion-label position="floating">{{$t('solidaryTransport.' + type + '.form.fields.origin')}} *</ion-label>
              <ion-input
                type="text"
                name="address"
                :value="getAddressToDisplay(request.origin)"
                readonly="true"
                class="no-clickable"
              ></ion-input>
            </ion-item>
            <div class="mc-st-form-details" v-if="$v.request.origin.$error">
              <span class="mc-st-form-error" v-if="!$v.request.origin.required">{{$t('solidaryTransport.register.form.validators.required')}}</span>
            </div>

            <ion-item class="mc-st-form-item" v-on:click="displayGeoSearchForDestination()">
              <ion-label position="floating">{{$t('solidaryTransport.' + type + '.form.fields.destination')}}</ion-label>
              <ion-input
                type="text"
                name="address"
                :value="getAddressToDisplay(request.destination)"
                readonly="true"
                class="no-clickable"
              ></ion-input>
            </ion-item>
            <div class="mc-st-form-details" v-if="$v.request.destination.$error">
              <span class="mc-st-form-error" v-if="!$v.request.destination.required">{{$t('solidaryTransport.register.form.validators.required')}}</span>
            </div>

            <ion-list class="mc-st-form-item">
              <ion-radio-group class="mc-st-form-radios">
                <ion-list-header class="mc-st-form-radios-header">
                  <ion-label class="mc-st-form-label as-title" color="primary">{{$t('solidaryTransport.' + type + '.form.fields.regular')}}</ion-label>
                </ion-list-header>

                <ion-item lines="none" class="mc-st-form-radios-item">
                  <ion-label class="ion-text-wrap">{{$t('solidaryTransport.' + type + '.form.fields.isPunctual')}}</ion-label>
                  <ion-radio slot="start" :value="1" :checked="request.frequency === 1" @ionSelect="request.frequency = parseInt($event.target.value); changeFrequency()"></ion-radio>
                </ion-item>
                <ion-item lines="none" class="mc-st-form-radios-item">
                  <ion-label class="ion-text-wrap">{{$t('solidaryTransport.' + type + '.form.fields.isRegular')}}</ion-label>
                  <ion-radio slot="start" :value="2" :checked="request.frequency === 2" @ionSelect="request.frequency = parseInt($event.target.value);changeFrequency()"></ion-radio>
                </ion-item>
              </ion-radio-group>
            </ion-list>

            <div class="mc-st-form-item" v-if="request.structure.needs.length !== 0">
              <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.' + type + '.form.fields.needs')}}</ion-label>

              <div class="mc-st-form-checkbox-wrapper">
                <ion-item class="mc-st-form-item" lines="none" v-for="(need, index) in request.structure.needs" :key="index">
                  <ion-checkbox
                    class="mc-st-form-checkbox"
                    color="success"
                    slot="start"
                    :value="request.needs[index].value"
                    :checked="request.needs[index].value === true"
                    @ionChange="request.needs[index].value = $event.target.checked;"
                  ></ion-checkbox>
                  <ion-label class="mc-st-form-label no-white-space" color="primary">{{ need.label }}</ion-label>
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
import { required, requiredIf } from 'vuelidate/lib/validators'
import { toast } from '../../Shared/Mixin/toast.mixin'

export default {
  name: 'solidaryTransport.request.path',
  components: {},
  data () {
    return {
      type: this.$route.meta.type
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
      },
      destination: {
        required: requiredIf(function(value) {
          return this.type === 'usual';
        })
      }
    }
  },
  methods: {
    changeFrequency: function() {
      this.$store.commit('solidaryRequestFrequencyChange')
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
        if (this.request.frequency === 1) {
          this.$router.push({name: 'solidaryTransport.home.' + this.type + '.punctual'})
        } else {
          this.$router.push({name: 'solidaryTransport.home.' + this.type + '.regular'})
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
