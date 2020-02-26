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
        <Slider v-bind:slides="slides" v-on:save="postCarpool()"></Slider>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
</style>

<script>
  import Slider from "../../Shared/View/Slider.view";
  import { toast } from "../../Shared/Mixin/toast.mixin";
  import PostCarpoolStep1 from "./PostCarpoolStep1.view";

  export default {
    name: "post-carpool",
    mixins: [toast],
    components: {
      Slider
    },
    data() {
      return {
        slides: [
          {title: "", component: PostCarpoolStep1},
          // {title: "", component: "RegisterStep2"}
        ]
      };
    },
    created() {
      if (this.$store.getters.carpoolToPost == null) {
        this.$store.commit('carpoolPost_init');
      }
    },
    computed: {},

    methods: {
      postCarpool: function() {
        console.log('yolo')
      }
    }
  };
</script>
