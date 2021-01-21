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
        <h1 class="ion-text-center">{{ $t('Profile.title') }}</h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" no-bounce>
      <div class="mc-white-container">
        <!-- Bloc user -->
        <div class="mc-user-profile ion-margin-bottom" v-if="user">
          <div class="mc-user-bloc-info">
            <div class="mc-user-image">
              <ion-thumbnail v-if="!! user.avatars">
                <img :src="user.avatars[0]" alt="" />
              </ion-thumbnail>
            </div>

            <div class="mc-user-info">
              <p>
                <b>{{user.givenName }} {{user.shortFamilyName}}</b>
              </p>
              <p>{{user.email }}</p>
              <p>{{user.telephone }}</p>
              <p v-if="user.addresses[0]">{{user.addresses[0].addressLocality }}</p>
            </div>
          </div>

          <div class="mc-user-action">
            <ion-icon
              @click="$router.push('update-profile')"
              name="create"
              size="large"
              class="ion-padding-end pointer"
            ></ion-icon>
          </div>
        </div>

        <div class="d-flex justify-between">
          <div class="user-prefs-bloc">
            <div v-if="user.smoke === 0">{{ $t('ProfilePrefs.smoke0')}}</div>
            <div v-if="user.smoke === 1">{{ $t('ProfilePrefs.smoke1')}}</div>
            <div v-if="user.smoke === 2">{{ $t('ProfilePrefs.smoke2')}}</div>
            <div v-if="user.music === false">{{ $t('ProfilePrefs.music0')}}</div>
            <div v-if="user.music === true">{{ $t('ProfilePrefs.music1')}}</div>
            <div v-if="user.chat === false">{{ $t('ProfilePrefs.chat0')}}</div>
            <div v-if="user.chat === true">{{ $t('ProfilePrefs.chat1')}}</div>
          </div>
          <div class="mc-user-action">
            <ion-icon
              @click="$router.push('profile-prefs')"
              color="primary"
              name="create"
              size="large"
              class="ion-padding-end pointer"
            ></ion-icon>
          </div>
        </div>

        <!-- Bloc buttons -->
        <div>
          <ion-button
            class="mc-big-button"
            color="success"
            expand="block"
            @click="$router.push('my-carpools')"
          >
            <ion-icon class="ion-margin-end" name="list-box"></ion-icon>
            {{ $t('Profile.my-announce') }}
          </ion-button>

          <ion-button class='mc-big-button' color="success" expand="block" @click="$router.push('accepted-carpools')">
            <ion-icon class="ion-margin-end" name="checkmark-circle"></ion-icon> {{ $t('Profile.my-accepted-carpools') }}
          </ion-button>

          <ion-button v-if="showPayment" class='mc-big-button' color="success" expand="block" @click="$router.push('bank-account')">
            <ion-icon class="ion-margin-end" name="card"></ion-icon> {{ $t('BankAccount.title') }}
          </ion-button>

          <ion-button
            class="mc-big-button"
            color="success"
            expand="block"
            @click="$router.push('profile-alerts')"
          >
            <ion-icon class="ion-margin-end" name="notifications"></ion-icon>
            {{ $t('Profile.alerts') }}
          </ion-button>
          <ion-button class="mc-big-button" color="success" expand="block" @click="$router.push('reviews')">
            <ion-icon class="ion-margin-end" name="quote"></ion-icon>{{ $t('Profile.reviews') }}
          </ion-button>
          <ion-button class="mc-big-button" color="warning" expand="block" @click="logout()">
            <ion-icon class="ion-margin-end" name="log-out"></ion-icon>
            {{ $t('Profile.logout') }}
          </ion-button>

          <ion-button class='mc-big-button' color="danger" expand="block" @click="deleteUser()">
            <ion-icon class="ion-margin-end" name="trash"></ion-icon> {{ $t('Profile.delete') }}
          </ion-button>


        </div>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
.mc-user-profile {
  display: flex;
  justify-content: space-between;
  color: var(--ion-color-primary);

  .mc-user-bloc-info {
    display: flex;
    width: calc(100% - 48px);
    flex-wrap: wrap;

  }

  .mc-user-image {
    margin-right: 20px;
    margin-bottom: 20px;
  }

  ion-thumbnail {
    --size: 90px;
    --border-radius: 50%;
  }

  .mc-user-info {
    p {
      margin: 0;
    }
  }

}

.user-prefs-bloc {

  padding: 15px 20px;
  background: #F5F6FA;
  border-radius: 0px 15px 15px 15px;
  color: rgba(0, 0, 0, 0.4);
  width: 100%;
  margin-right: 15px;
  margin-bottom: 30px;
}
</style>

<script>
import {toast} from "../../Shared/Mixin/toast.mixin";

export default {
  name: "profile",
  data() {
    return {
      showPayment: JSON.parse(process.env.VUE_APP_PAYMENT)
    };
  },
  mixins: [toast],
  computed: {
    user: {
      get() {
        return this.$store.state.userStore.user;
      }
    }
  },
  created() {},
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        // On va authentifier l'appli via un utilisateur anonyme
        this.$store.commit("reset_current_dynamic");
        this.$store.dispatch("authAnonymousUser");
      });
      this.$router.push("home");
    },
    deleteUser() {
      return this.$ionic.alertController
        .create({
          header: this.$t("Profile.confirmDeleteTitle"),
          message: this.$t("Profile.confirmDeleteText"),
          buttons: [
            {
              text: this.$t("Commons.cancel"),
              role: 'cancel',
              cssClass: 'secondary'
            },
            {
              text: this.$t("Commons.confirm"),
              handler: () => {
                this.$store.dispatch('deleteUser').then(() => {
                  this.presentToast(this.$t("Profile.delete-success"), "success");
                  this.logout();
                }).catch(() => {
                  this.presentToast(this.$t("Commons.error"), "danger");
                })
              },
            },
          ],
        })
        .then(a => a.present())
    }
  }
};
</script>
