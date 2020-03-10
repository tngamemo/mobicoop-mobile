<template>
  <div class="ion-page">
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button v-on:click="goBack($event)"></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center">{{ $t('PostCarpool.title')}}</h1>
      </ion-toolbar>
    </ion-header>
    <!--  -->
    <ion-content color="primary" no-bounce>
      <div class="mc-white-container mc-relative">
        <div style="height: calc(100% - 44px); position: relative;">
          <PostCarpoolStep1 ref="slideOne" />
        </div>
        <div class="mc-nextpost-buttons justify-end">
          <ion-button class="mc-small-button" color="success" @click="next()">Suivant</ion-button>
        </div>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
.mc-relative {
  position: relative;
}
.mc-nextpost-buttons {
  position: absolute;
  bottom: 0px;
  right: 0px;
  left: 0px;
  display: flex;
  justify-content: space-between;
}
</style>

<script>
import Slider from "../../Shared/View/Slider.view";
import { toast } from "../../Shared/Mixin/toast.mixin";
import PostCarpoolStep1 from "./PostCarpoolStep1.view";

export default {
  name: "post-carpool",
  mixins: [toast],
  components: {
    PostCarpoolStep1
  },
  data() {
    return {};
  },
  created() {
    if (this.$store.getters.carpoolToPost == null) {
      this.$store.commit("carpoolPost_init");
    }

    this.$store.commit("changeOptionsCarpoolPost", {
      property: "userId",
      value: this.$store.getters.userId
    });

    if (this.$store.getters.userId) {
      this.$store.dispatch("getUserCommunities").then();
    }
  },
  computed: {},

  methods: {
    next() {
      if (this.$refs.slideOne.validate()) {
        this.$router.push("/carpools/post-carpool-step");
      }
    },

    goBack($event) {
      $event.stopPropagation();
      this.$router.push("home");
    }
  }
};
</script>
