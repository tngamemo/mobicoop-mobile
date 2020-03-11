<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>{{$t('solidaryTransport.profile.preferences.title')}}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary">
      <div class="mc-st-container"><span style="color: black;">preferences</span></div>
    </ion-content>
  </ion-page>
</template>

<style lang="scss"></style>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'solidaryTransport.profile.preferences',
  components: {},
  data () {
    return {}
  },
  computed: {},
  methods: {},
  created: function () {}
}
</script>