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
            <img class="background-img ion-margin-end" src="/assets/home.png" />
            <h1>{{ title }}</h1>
            <ion-icon v-if="numberOfModule > 1" name="apps" size="large" class="mc-home-switch pointer" v-on:click="showModule()"></ion-icon>
          </div>

        </div>

      </ion-toolbar>
    </ion-header>

    <ion-content color="primary">
      <UserHome />

      <div class="mc-white-container">
        <SearchQuick />

        <BlockAction
          :action="'communities'"
          :color="'rgba('+ primary+ ', 1)'"
          :colorBg="'rgba('+ primary+ ', 0.4)'"
          :icon="'briefcase'"
          @clickButton="redirectToCommunities()"
        />
        <BlockAction
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
          <img alt class="partner-img" src="/assets/partner.png" />
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
}

.partner-img {
  width: 50%;
  object-fit: contain;
  max-height: 100px;
}

.mc-home-header {
  .mc-home-log {
    display: flex;
    align-items: center;

    img {
      width: 26px;
      height: 26px;
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
      appModule: JSON.parse(process.env.VUE_APP_MODULE)
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
      this.$router.push({ name: "communities" });
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
      this.$router.push({ name: "carpool-solidarity" });
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
        })

        await modal.present();
    }
  }
};
</script>
