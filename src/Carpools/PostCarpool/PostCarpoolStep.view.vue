<template>
  <div class="ion-page">
    <ion-header no-border>
      <ion-toolbar color="background">
        <h1 class="ion-text-center">{{ $t('PostCarpool.title')}}</h1>
      </ion-toolbar>
    </ion-header>
    <!--  -->
    <ion-content color="background" no-bounce>
      <div class="mc-white-container" style="height: 100%">
        <Slider v-bind:slides="slides" v-on:save="postCarpool()" :previous="previous"></Slider>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
</style>

<script>
import Slider from "../../Shared/View/Slider.view";
import { toast } from "../../Shared/Mixin/toast.mixin";
import PostCarpoolStep2 from "./PostCarpoolStep2.view";
import PostCarpoolStep3 from "./PostCarpoolStep3.view";
import PostCarpoolStep4 from "./PostCarpoolStep4.view";
import PostCarpoolStep5 from "./PostCarpoolStep5.view";
import PostCarpoolStep6 from "./PostCarpoolStep6.view";
import PostCarpoolStep7 from "./PostCarpoolStep7.view";

export default {
  name: "post-carpool",
  mixins: [toast],
  components: {
    Slider
  },
  data() {
    return {
      previous: "post-carpool"
    };
  },
  created() {},
  computed: {
    slides() {
      let result;
      if (this.$store.getters.carpoolToPost.role == 2) {
        result = [
          { title: "Planification", component: PostCarpoolStep2 },
          { title: "Trajet", component: PostCarpoolStep3 },
          { title: "Message", component: PostCarpoolStep6 },
          { title: "Récap", component: PostCarpoolStep7 }
        ];
      } else {
        result = [
          { title: "Planification", component: PostCarpoolStep2 },
          { title: "Trajet", component: PostCarpoolStep3 },
          { title: "Passagers", component: PostCarpoolStep4 },
          { title: "Participation", component: PostCarpoolStep5 },
          { title: "Message", component: PostCarpoolStep6 },
          { title: "Récap", component: PostCarpoolStep7 }
        ];
      }
      return result;
    }
  },

  methods: {
    postCarpool: function() {
      this.$store.dispatch("postCarpool").then(resp => {
        this.presentToast("La publication est un succès", "success");
        this.$router.push("home");
        setTimeout(() => {
          this.$store.commit("carpoolPost_init");
        }, 2000);
      });
    }
  }
};
</script>
