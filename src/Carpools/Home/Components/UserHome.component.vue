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
  <div class="mc-container mc-user-home">
    <div v-bind:class="seeWelcome ? 'mc-welcome-home' : 'mc-welcome-home is-hidden'">
      <ion-icon name="close" item-right @click="closeWelcome()"></ion-icon>
      <h2 v-html="$t('HOME.title', { title })"></h2>
    </div>

    <div class="mc-user-home-login" v-if="! !!this.$store.state.userStore.user">
      <ion-button
        class="mc-big-button"
        color="success"
        expand="block"
        @click="$router.push('login')"
      >{{ $t('HOME.sign-in') }}</ion-button>
      <ion-button
        class="mc-big-button"
        color="light"
        expand="block"
        fill="outline"
        @click="$router.push('register')"
      >{{ $t('HOME.register') }}</ion-button>
    </div>

    <div class="mc-user-home-profile" v-if="!!this.$store.state.userStore.user">
      <div class="mc-user-bloc-info">
        <div class="mc-user-image">
          {{this.$store.state.userStore.avatars}}
          <ion-thumbnail v-if="!! this.$store.state.userStore.user.avatars">
            <img :src="this.$store.state.userStore.user.avatars[0]" alt />
          </ion-thumbnail>
        </div>

        <div class="mc-user-info">
          <p>{{this.$store.state.userStore.user.givenName }}</p>
          <p>{{this.$store.state.userStore.user.shortFamilyName }}</p>
        </div>
      </div>

      <div class="mc-user-action">
        <ion-icon
          name="create"
          size="large"
          class="pointer mc-user-action-first-action"
          v-on:click="$router.push('profile')"
        ></ion-icon>
        <ion-icon name="log-out" size="large" class="pointer" v-on:click="logout"></ion-icon>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.mc-welcome-home {
  text-align: right;
  transition: max-height 0.7s ease, opacity 0.5s ease, padding 0.1s ease;
  max-height: 600px;
  overflow: hidden;

  &.is-hidden {
    max-height: 0px !important;
  }

  h2 {
    font-weight: bold;
    text-align: center;
    margin-bottom: 30%;
  }
}

.mc-user-action {
  display: flex;
  flex-direction: row;
}

@media screen and (max-width: 320px) {
  .mc-user-action {
    flex-direction: column;
  }
}

.mc-user-home-profile {
  display: flex;
  justify-content: space-between;

  .mc-user-bloc-info {
    display: flex;
  }

  ion-thumbnail {
    --size: 90px;
    --border-radius: 50%;
  }

  .mc-user-info {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-left: 20px;

    p {
      margin: 0;
      font-weight: bold;
    }
  }
}
</style>

<script>
export default {
  name: "user-home",
  data() {
    return {
      title: process.env.VUE_APP_NAME,
      seeWelcome: localStorage.getItem("seeWelcome")
    };
  },
  mounted() {},
  created() {
  },
  methods: {
    closeWelcome: function() {
      this.seeWelcome = false;
      localStorage.setItem("seeWelcome", false);
    },

    logout: function() {
      this.$store.dispatch("logout").then(() => {
        // On va authentifier l'appli via un utilisateur anonyme
        this.$store.dispatch("authAnonymousUser");
      });
    }
  }
};
</script>
