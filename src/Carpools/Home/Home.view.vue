<template>
  <div class="ion-page">
    <ion-header no-border>
      <ion-toolbar color="primary">
        <div class="mc-home-header">
          <div class="mc-home-log">
            <img class="background-img ion-margin-end" src="/assets/home.png" />
            <h1>{{ title }}</h1>
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
  }
}
</style>

<script>
import UserHome from "./Components/UserHome.component";
import BlockAction from "./Components/BlockAction.component";
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
      showSolidarity: JSON.parse(process.env.VUE_APP_SHOW_SOLIDARITY_TRANSPORT)
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

    redirectToContact: function() {
      this.$router.push({ name: "carpool-contact" });
    },

    redirectToSolidarity: function() {
      this.$router.push({ name: "carpool-solidarity" });
    },

    redirectToSolidarityPost: function() {
      this.$router.push({ name: "post-carpool", params: { solidarity: true } });
    }
  }
};
</script>
