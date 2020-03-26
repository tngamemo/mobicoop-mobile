<template>
  <div class="ion-page">
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="home"></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center">{{ this.$t("Solidarity.title") }}</h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="light" no-bounce class="mc-carpool-solidarity no-scroll">
       <iframe :src="link"  style="width:100%;height:100%" ></iframe>
    </ion-content>
  </div>
</template>

<style lang="scss">
</style>

<script>

export default {
  name: "carpool-solidarity",
  data() {
    return {
      link: process.env.VUE_APP_SOLIDARITY_LINK
    };
  },
  props: [],
  created() {},
  methods: {}
};
</script>
