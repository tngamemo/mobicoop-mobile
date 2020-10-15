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
        <div class="mc-home-header">
          <div class="mc-home-log">
            <img v-if="!noIconToolbar" class="background-img ion-margin-end" src="/assets/home.png" alt="" />
            <h1  v-if="!noTextToolbar">{{ title }}</h1>
            <ion-icon v-if="numberOfModule > 1" name="apps" size="large" class="mc-home-switch pointer" v-on:click="showModule()"></ion-icon>
          </div>

        </div>

      </ion-toolbar>
    </ion-header>

    <ion-content color="primary">
      <UserHome />

      <div class="mc-white-container">
        <SearchQuick />

        <BlockAction v-if="showCommunities"
          :action="'communities'"
          :color="'rgba('+ primary+ ', 1)'"
          :colorBg="'rgba('+ primary+ ', 0.4)'"
          :icon="'briefcase'"
          @clickButton="redirectToCommunities()"
        />
        <BlockAction  v-if="showEvents"
          :action="'events'"
          :color="'rgba('+ secondary+ ', 1)'"
          :colorBg="'rgba('+ secondary+ ', 0.4)'"
          :icon="'musical-note'"
          @clickButton="redirectToEvents()"
        />
        <BlockAction v-if="showSolidarity"
          :action="'solidarity'"
          :color="'rgba('+ success+ ', 1)'"
          :colorBg="'rgba('+ success+ ', 0.4)'"
          :icon="'thumbs-up'"
          :secondButton="true"
          @clickButton="redirectToSolidarity()"
          @clickSecondButton="redirectToSolidarityPost()"
        />

        <ion-button
          class="mc-big-button"
          color="primary"
          expand="block"
          fill="outline"
          v-on:click="redirectToFAQ()"
        >
          <ion-icon name="help-circle" class="ion-padding-end"></ion-icon>
          {{ $t('HOME.FAQ') }}
        </ion-button>

        <ion-button
          class="mc-big-button"
          color="primary"
          expand="block"
          fill="outline"
          v-on:click="redirectToCGU()"
        >
          <ion-icon name="document" class="ion-padding-end"></ion-icon>
          {{ $t('HOME.CGU') }}
        </ion-button>

        <ion-button
          class="mc-big-button"
          color="primary"
          expand="block"
          fill="outline"
          v-on:click="redirectToContact()"
        >
          <ion-icon name="chatboxes" class="ion-padding-end"></ion-icon>
          {{ $t('HOME.contact') }}
        </ion-button>

        <div v-if="partner" class="d-flex justify-center ion-margin">
          <img alt class="partner-img" src="/assets/partner.png" alt="" />
        </div>

        <div class="text-center" v-if="version">
          <ion-text color="primary"><small style="opacity: 0.75">version {{version}}</small></ion-text>
        </div>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
.mc-container {
  padding: 30px;
  background-image: url("/assets/banner.png");
  background-repeat: no-repeat;
  background-size: 100%;
  // background-size: cover;
  // background-position: center;
}

.partner-img {
  width: 75%;
  object-fit: contain;
  // max-height: 100px;
}

.mc-home-header {
  .mc-home-log {
    display: flex;
    align-items: center;

    img {
      // width: 26px;
      height: 36px;
      margin-top: 6px;
      margin-bottom: 6px;
    }

    h1 {
      margin: 0;
      padding: 0;
      font-weight: bold;
    }

    .mc-home-switch {
      margin-left: auto;
    }
  }
}
</style>

<script>
import UserHome from "./Components/UserHome.component";
import BlockAction from "./Components/BlockAction.component";
import ModuleModal from "../../Shared/Component/ModuleModal.component";
import SearchQuick from "../Shared/Components/SearchQuick.component";
import {isPlatform} from "@ionic/core";
import { Plugins } from '@capacitor/core';
const { Device } = Plugins;


export default {
  name: "home",
  components: {
    UserHome,
    BlockAction,
    SearchQuick
  },
  data() {
    return {
      title: process.env.VUE_APP_NAME,
      primary: "",
      secondary: "",
      success: "",
      partner: JSON.parse(process.env.VUE_APP_PARTNER),
      showSolidarity: JSON.parse(process.env.VUE_APP_SHOW_SOLIDARITY_TRANSPORT),
      appModule: JSON.parse(process.env.VUE_APP_MODULE),
      showEvents: JSON.parse(process.env.VUE_APP_SHOW_EVENTS),
      showCommunities: JSON.parse(process.env.VUE_APP_SHOW_COMMUNITIES),
      noIconToolbar: JSON.parse(process.env.VUE_APP_NO_ICON_TOOLBAR),
      noTextToolbar: JSON.parse(process.env.VUE_APP_NO_TEXT_TOOLBAR),
      version: null
    };
  },
  created() {
    this.primary = window
      .getComputedStyle(document.body)
      .getPropertyValue("--ion-color-primary-rgb");
    this.secondary = window
      .getComputedStyle(document.body)
      .getPropertyValue("--ion-color-secondary-rgb");

    this.success = window
      .getComputedStyle(document.body)
      .getPropertyValue("--ion-color-success-rgb");
  },
  computed: {
    numberOfModule() {
      return Object.values(this.appModule).filter(item => item == "true").length;
    }
  },
  mounted() {
    this.getVersion();
    // caching for crawlers
    setTimeout(() => {
      window.prerenderReady = true;
    }, 1000)
  },
  methods: {
    closeWelcome: function() {
      this.seeWelcome = false;
    },

    redirectToCommunities: function() {
      this.$router.push({ name: !!this.$store.state.userStore.user ? "communities" : "allcommunities" });
    },

    redirectToEvents: function() {
      this.$router.push({ name: "carpool-events" });
    },

    redirectToFAQ: function() {
      this.$router.push({
        name: "article",
        params: { id: 10 }
      });
    },

    redirectToCGU: function() {
      this.$router.push({
        name: "article",
        params: { id: 1 }
      });
    },

    redirectToContact: function() {
      this.$router.push({ name: "carpool-contact" });
    },

    redirectToSolidarity: function() {
      this.$router.push({ name: "carpool.solidary.home.request" });
    },

    redirectToSolidarityPost: function() {
      this.$router.push({ name: "post-carpool", params: { solidarity: true } });
    },

    showModule: async function() {
       const modal = await this.$ionic.modalController
        .create({
          component: ModuleModal,
          componentProps: {
            propsData: {
              appModule: this.appModule,
              router: this.$router
            },
          },
        });

        await modal.present();
    },
    async getVersion() {
      if (isPlatform(window.document.defaultView, "capacitor")) {
        let info = await Device.getInfo();
        this.version = info.appVersion;
      }
    }
  }
};
</script>
