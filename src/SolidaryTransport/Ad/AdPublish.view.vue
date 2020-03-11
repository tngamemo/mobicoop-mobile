<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>{{$t('solidaryTransport.ad.publish.title')}}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary">
      <div class="mc-st-container"><span style="color: black;">Publier une annonce</span></div>
    </ion-content>
  </ion-page>
</template>

<style lang="scss"></style>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'solidaryTransport.ad.publish',
  components: {},
  data () {
    return {}
  },
  computed: {},
  methods: {},
  created: function () {}
}
</script>