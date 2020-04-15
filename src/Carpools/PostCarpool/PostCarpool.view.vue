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
    <ion-content color="primary no-scroll" style="height: 100%">
      <div class="mc-white-container mc-relative" style="height: 100%">

        <div style="height: calc(100% - 44px); position: relative; overflow: scroll">
          <div class="mc-carpool-post-solidarity" v-if="!!solidarity">
            <div class="mc-carpool-post-solidarity-alert">{{ $t('PostCarpool.solidarityAlert')}}</div>
            <ion-item lines="none">
              <ion-label class="ion-text-wrap">{{$t('PostCarpool.solidarity')}}</ion-label>
              <ion-toggle
                :checked="carpoolToPost.solidaryExclusive"
                @ionChange="changeOptions('solidaryExclusive', $event.target.checked)"
              ></ion-toggle>
            </ion-item>
          </div>
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
  bottom: 20px;
  right: 20px;
  left: 0px;
  display: flex;
  justify-content: space-between;
}

.mc-carpool-post-solidarity {
  padding: 10px;
  border-radius: 20px;
  border: 2px solid rgba(var(--ion-color-primary-rgb), 0.4);
  .mc-carpool-post-solidarity-alert {
    padding: 10px;
    font-size: 0.8rem;
    border-radius: 20px;
    background: rgba(var(--ion-color-primary-rgb), 0.1);
  }
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
  props: ["solidarity"],
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

    if (!!this.$route.params.filters) {
      this.$store.getters.carpoolToPost.communities = this.$route.params.filters.communities;
    }

    if (!!this.solidarity) {
      this.$store.commit("changeOptionsCarpoolPost", {
        property: "solidaryExclusive",
        value: true
      });
    } else {
      this.$store.commit("changeOptionsCarpoolPost", {
        property: "solidaryExclusive",
        value: false
      });
    }
  },
  computed: {
    carpoolToPost() {
      return this.$store.getters.carpoolToPost;
    }
  },

  methods: {
    next() {
      if (this.$refs.slideOne.validate()) {
        this.$router.replace("/carpools/post-carpool-step");
      }
    },

    goBack($event) {
      $event.stopPropagation();
      this.$router.push("home");
    },

    changeOptions(property, value) {
      this.$store.commit("changeOptionsCarpoolPost", { property, value });
    }
  }
};
</script>
