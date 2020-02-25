<template>
  <div class="ion-page">
    <ion-header no-border>
      <ion-toolbar color="background">
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center"> {{ $t('Messages.title') }} </h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="background" no-bounce>
      <div class="mc-white-container" style="height: 100%">

      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">

</style>

<script>
  export default {
    name: 'communities',
    data () {
      return {

      }
    },
    methods: {
    }
  }
</script>
