/**

Copyright (c) 2018, MOBICOOP. All rights reserved.
This project is dual licensed under AGPL and proprietary licence.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <gnu.org/licenses>.

Licence MOBICOOP described in the file
LICENSE
**************************/

<template>
  <div class="ion-page">
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/carpools/home"></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center">{{ $t('PostCarpool.title')}}</h1>
      </ion-toolbar>
    </ion-header>
    <!--  -->
    <ion-content color="primary" no-bounce class="no-scroll">
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
  created() {
    this.$store.commit('init_sliderloader_visibility');

    if (!!!this.$store.getters.carpoolToPost) {
      this.$router.push("post-carpool");
    }

    if (
      !!this.$store.getters.carpoolToPost &&
      this.$store.getters.carpoolToPost.schedule == null &&
      this.$store.getters.carpoolToPost.frequency == 2
    ) {
      this.$store.commit("carpoolPost_schedule_init");
      this.$store.commit("carpoolPost_schedule_add");
    }

    if (
      !!this.$store.getters.carpoolToPost &&
      this.$store.getters.carpoolToPost.schedule &&
      this.$store.getters.carpoolToPost.frequency == 1
    ) {
      this.$store.commit("carpoolPost_schedule_delete");
    }
  },
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
      this.$store.commit('change_sliderloader_visibility');
      if (this.$store.getters.carpoolToPost.id) {
        this.$store
          .dispatch("updateCarpool")
          .then(resp => {
            this.$store.commit('change_sliderloader_visibility');
            this.presentToast("L'annonce a bien été modifiée", "success");
            this.$router.push("home");
            setTimeout(() => {
              this.$store.commit("carpoolPost_init");
            }, 2000);
          })
          .catch(err => {
            this.presentToast(this.$t("Commons.error"), 'danger');
            this.$store.commit('change_sliderloader_visibility');
          });
      } else {
        this.$store
          .dispatch("postCarpool")
          .then(resp => {
            this.$store.commit('change_sliderloader_visibility');
            this.presentToast("La publication est un succès", "success");
            this.$router.push("home");
            setTimeout(() => {
              this.$store.commit("carpoolPost_init");

            }, 2000);
          })
          .catch(err => {
            this.presentToast(this.$t("Commons.error"), 'danger');
            this.$store.commit('change_sliderloader_visibility');
          });
      }
    }
  }
};
</script>
