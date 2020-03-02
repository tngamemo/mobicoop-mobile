<template>
  <ion-page>
    <ion-header no-border>
        <ion-toolbar color="background">
          <ion-buttons slot="start">
            <ion-back-button text=""></ion-back-button>
          </ion-buttons>
          <ion-title class="mc-bar-title">{{$t('SolidaryTransport.Home.title')}}</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content color="background">
        <div>{{$t('SolidaryTransport.Home.title')}}</div>
      </ion-content>
  </ion-page>
</template>

<style lang="scss">
  
</style>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'solidary.home',
  components: {},
  data () {
    return {
      active: 0,
      sections: []
    }
  },
  computed: {},
  methods: {},
  created: function () {}
}
</script>