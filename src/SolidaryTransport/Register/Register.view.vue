<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start"> </ion-buttons>
        <ion-title text-center>{{ $t('solidaryTransport.register.title') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" class="is-scrollable">
      <div class="mc-st-container">
        <div class="mc-st-form">

          <div class="mc-st-form-content">
            <div class="mc-st-form-actions is-active">
              <ion-button class="mc-st-form-action" color="success" v-html="$t('solidaryTransport.register.form.actions.fill')" @click="$router.push({name:'solidaryTransport.register.subscribe'})"></ion-button>

              <div class="mc-st-form-other">{{$t('solidaryTransport.register.form.actions.or')}}</div>

              <ion-button class="mc-st-form-action" color="success" v-html="$t('solidaryTransport.register.form.actions.request')" @click="$router.push({name:'solidaryTransport.home.request'})"></ion-button>
            </div>
          </div>

          <div class="mc-st-form-controls">
            <ion-button class="mc-st-form-control as-back" color="light" v-html="$t('solidaryTransport.buttons.back')" @click="$router.back()"></ion-button>
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
    }
  },
  computed: {
    user: {
      get() {
        return this.$store.state.solidaryTransportStore.register.user;
      }
    }
  },
  methods: {},
  created: function () {}
}
</script>
