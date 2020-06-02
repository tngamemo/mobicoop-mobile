<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>{{$t('solidaryTransport.request.title')}} <sup>1/6</sup></ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content ref="request" color="primary" class="is-scrollable">
      <div class="mc-st-container">
        <div class="mc-st-form">

          <div class="mc-st-form-content">
            <div class="mc-st-form-header">
              <div class="mc-st-form-title">{{$t('solidaryTransport.request.steps.intro')}}</div>
              <div class="mc-st-form-steps">
                <span class="mc-st-form-step is-active"></span>
                <span class="mc-st-form-step"></span>
                <span class="mc-st-form-step"></span>
                <span class="mc-st-form-step"></span>
                <span class="mc-st-form-step"></span>
                <span class="mc-st-form-step"></span>
              </div>
            </div>

            <ion-item class="mc-st-form-item" v-on:click="displayGeoSearch()">
              <ion-label position="floating">{{$t('solidaryTransport.request.form.fields.address')}} *</ion-label>
              <ion-input
                type="text"
                name="address"
                :value="getAddressToDisplay(request.homeAddress)"
                readonly="true"
                class="no-clickable"
              ></ion-input>
            </ion-item>
            <div class="mc-st-form-details" v-if="$v.request.homeAddress.$error">
              <span class="mc-st-form-error" v-if="!$v.request.homeAddress.required">{{$t('solidaryTransport.register.form.validators.required')}}</span>
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

export default {
  name: 'solidaryTransport.request',
  components: {},
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'getAddressToDisplay'
    ]),
    user: {
      get() {
        return this.$store.state.userStore.user;
      }
    },
    request: {
      get() {
        return this.$store.state.solidaryTransportStore.temporary.request;
      },
      set() {
        this.$store.commit("solidaryRequestUpdate", this.request);
      }
    }
  },
  validations: {
    request: {
      homeAddress: {
        required
      }
    },
  },
  methods: {
    displayGeoSearch: function () {
      this.$router.push({ name: "solidaryTransport.geoSearch", query: { action: 'solidaryTransport.search', type: 'request.home' }});
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
        this.$router.push({name: 'solidaryTransport.home.request.check'})
      }
    }
  },
  created: function () {
    if (this.user) {
      if (!this.request.homeAddress) {
        this.$store.commit("solidaryRequestHomeAddressUpdate", this.user.addresses[0])
      }
    }
  }
}
</script>