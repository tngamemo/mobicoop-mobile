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
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center">{{ $t('Register.title')}}</h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" no-bounce class="no-scroll">
      <div class="mc-white-container" style="height: 100%">
        <Slider :key="refresh" v-bind:slides="slides" v-on:save="register()"></Slider>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
</style>

<script>
import Slider from "../../Shared/View/Slider.view";
import { toast } from "../../Shared/Mixin/toast.mixin";
import RegisterStep1 from "../../Carpools/Register/RegisterStep1.view";
import RegisterStep2 from "../../Carpools/Register/RegisterStep2.view";

export default {
  name: "register",
  mixins: [toast],
  components: {
    Slider
  },
  data() {
    return {
      slides: [
        { title: "", component: RegisterStep1 },
        { title: "", component: RegisterStep2 }
      ],
      refresh: 0
    };
  },
  created() {
    this.$store.commit("init_sliderloader_visibility");
    if (!this.user) {
      this.$store.commit("register_reset");
    }
  },
  computed: {
    user: {
      get() {
        return this.$store.state.registerStore.userToRegister;
      },
      set() {
        this.$store.commit("register_update", this.user);
      }
    }
  },

  methods: {
    register() {
      const email = this.$store.state.registerStore.userToRegister.email;
      this.$store.commit("change_sliderloader_visibility");
      this.$store
        .dispatch("register")
        .then(res => {
          if(JSON.parse(process.env.VUE_APP_GTAG_ACTIVATED)) {
            gtag('event', 'conversion', {
              'allow_custom_scripts': true,
              'send_to': 'DC-8013475/movici/movic0+standard'
            });
          }
          this.$store.commit("register_reset");
          this.$router.push("home");
          this.$router.push({path: "/confirm-registration/" + email});
          this.presentToast(this.$t("Register.success"), "success");
          this.$store.commit("change_sliderloader_visibility");
          // reload the component
          this.refresh++
        })
        .catch(err => {
          this.presentToast(this.$t("Commons.error"), "danger");
          this.$store.commit("change_sliderloader_visibility");
        });
    }
  }
};
</script>
