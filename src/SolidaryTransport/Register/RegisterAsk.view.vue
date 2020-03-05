<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>{{ $t('solidaryTransport.register.ask.title') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary">
      <div class="mc-register-container">
        <div class="mc-register-form">

          <div class="mc-register-form-content">
            <ion-item class="mc-register-form-item" lines="none" v-for="(item, index) in eligibility" :key="index">
              <ion-checkbox
                class="mc-register-form-checkbox"
                :name="item.value"
                :value="item.checked"
                color="success"
                slot="start"
                @ionChange="updateType($event)"
                @input="item.checked = $event.target.value"
              ></ion-checkbox>
              <ion-label class="no-white-space">{{ item.label }} {{item.checked}}</ion-label>
            </ion-item>

            <!-- <div class="mc-register-form-actions" :class="{'is-active': buttons.fill.active}">
              <ion-button class="mc-register-form-action as-fill" color="success" v-html="$t('solidaryTransport.register.form.test')" @click="$router.push({name:'solidaryTransport.register.ask', query: {}})"></ion-button>

              <ion-button class="mc-register-form-action as-fill" color="success" v-html="$t('solidaryTransport.register.form.fill')" @click="$router.push({name:'solidaryTransport.register.give', query: {}})"></ion-button> -->
            </div>
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
import _ from 'lodash'

export default {
  name: 'solidaryTransport.register.ask',
  components: {},
  data () {
    return {
      updating: false,
      eligibility: this.$t('solidaryTransport.register.form.eligibility'),
      buttons: {
        fill: {
          active: false
        }
      }
    }
  },
  mounted: function () {
    _.each(this.eligibility, (item, index) => {
      let copy = 
      this.$root.$set(this.eligibility, index, item)
    })
  },
  computed: {},
  methods: {
    updateType: function ($event) {
      console.log(this.eligibility)
      if (!this.updating) {
        this.updating = true
        this.buttons.fill.active = false

        // let detail = $event.detail
        // if (detail.checked) {
        //   if (detail.value !== this.type) {
        //     setTimeout(() => {
        //       this.$router.replace({query: {type: detail.value}})
        //     }, 100)
        //   }
        //   setTimeout(() => {
        //     this.buttons.fill.active = true
        //   }, 300)
        // } else {
        //   setTimeout(() => {
        //     this.$router.replace({query: {type: undefined}})
        //   }, 100)
        //   setTimeout(() => {
        //     this.buttons.fill.active = false
        //   }, 300)
        // }

        // setTimeout(() => {
        //   this.updating = false
        // }, 100)
      }
      
    }
  },
  created: function () {}
}
</script>