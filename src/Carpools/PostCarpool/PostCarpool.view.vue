<template>
  <div class="ion-page">
    <ion-header no-border>
      <ion-toolbar color="background">
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center">{{ $t('PostCarpool.title')}}</h1>
      </ion-toolbar>
    </ion-header>
    <!--  -->
    <ion-content color="background" no-bounce>
      <div class="mc-white-container" style="height: 100%">
        <Slider v-bind:slides="slides" v-on:save="register()"></Slider>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
</style>

<script>
  import Slider from "../../Shared/View/Slider.view";
  import { toast } from "../../Shared/Mixin/toast.mixin";

  export default {
    name: "post-carpool",
    mixins: [toast],
    components: {
      Slider
    },
    data() {
      return {
        slides: [
          // {title: "", component: "RegisterStep1"},
          // {title: "", component: "RegisterStep2"}
        ]
      };
    },
    created() {},
    computed: {},

    methods: {}
  };
</script>
