<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start"></ion-buttons>
        <ion-title text-center>{{ $t('solidaryTransport.register.title') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary">
      <div class="mc-register-container">
        <div class="mc-register-form">

          <div class="mc-register-form-content">
            <ion-item class="mc-register-form-item" lines="none">
              <ion-checkbox
                class="mc-register-form-checkbox"
                name="registerType"
                value="ask"
                color="success"
                slot="start"
                @ionChange="updateType($event)"
                :checked="type === 'ask'"
              ></ion-checkbox>
              <ion-label class="mc-register-form-label no-white-space" color="primary">{{ $t('solidaryTransport.register.form.actions.ask') }}</ion-label>
            </ion-item>

            <ion-item class="mc-register-form-item" lines="none">
              <ion-checkbox
                class="mc-register-form-checkbox"
                name="registerType"
                value="give"
                color="success"
                slot="start"
                @ionChange="updateType($event)"
                :checked="type === 'give'"
              ></ion-checkbox>
              <ion-label class="mc-register-form-label no-white-space" color="primary">{{ $t('solidaryTransport.register.form.actions.give') }}</ion-label>
            </ion-item>

            <div class="mc-register-form-actions" :class="{'is-active': buttons.fill.active}">
              <ion-button class="mc-register-form-action" v-if="type === 'ask'" color="success" v-html="$t('solidaryTransport.register.form.check')" @click="$router.push({name:'solidaryTransport.register.ask'})"></ion-button>

              <ion-button class="mc-register-form-action" v-if="type === 'give'" color="success" v-html="$t('solidaryTransport.register.form.fill')" @click="$router.push({name:'solidaryTransport.register.subscribe'})"></ion-button>
            </div>
          </div>

          <div class="mc-register-form-controls">
            <ion-button class="mc-register-form-control as-back" color="light" v-html="$t('solidaryTransport.buttons.back')" @click="$router.back()"></ion-button>
          </div>

        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="scss">
  
</style>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'solidaryTransport.register',
  components: {},
  data () {
    return {
      updating: false,
      buttons: {
        fill: {
          active: this.$route.query.type !== undefined
        }
      }
      // slider: {
      //   reference: undefined,
      //   options: {
      //     initialSlide: 1,
      //     speed: 400,
      //     allowTouchMove: false
      //   }
      // }
    }
  },
  // mounted() {
  //   console.log(this.slider.options)

  //   if (_.has(this.$refs, 'solidaryTransportRegisterSlider')) {
  //     this.slider.reference = this.$refs.solidaryTransportRegisterSlider
  //   }
  // },
  computed: {
    type: function () {
      return this.$route.query.type
    }
  },
  methods: {
    updateType: function ($event) {
      if (!this.updating) {
        this.updating = true
        this.buttons.fill.active = false

        let detail = $event.detail
        if (detail.checked) {
          if (detail.value !== this.type) {
            setTimeout(() => {
              this.$router.replace({query: {type: detail.value}})
            }, 100)
          }
          setTimeout(() => {
            this.buttons.fill.active = true
          }, 300)
        } else {
          setTimeout(() => {
            this.$router.replace({query: {type: undefined}})
          }, 100)
          setTimeout(() => {
            this.buttons.fill.active = false
          }, 300)
        }

        setTimeout(() => {
          this.updating = false
        }, 100)
      }
      
    }
  },
  created: function () {

  }
}
</script>