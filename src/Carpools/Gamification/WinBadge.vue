/**

Copyright (c) 2021, MOBICOOP. All rights reserved.
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
            <h1 class="ion-text-center">Badges</h1>
        </ion-toolbar>
    </ion-header>

    <!-- en attendant l'api changer loading par null -->
    <div v-if="$store.state.badgeStore.statusBadges == ''"> 
      <h2 class="ion-text-center" color="white"> Attention ... </h2>
      <img class="mc-image-waiting-badge" src="/assets/tenor.gif"/>
    </div>
    <ion-content class="mc-message-badge" color="primary" no-bounce>
        <!-- en attendant l'api changer '' par loading -->
        <div class="mc-white-container" v-if="$store.state.badgeStore.statusBadges == 'loading'">
            <ion-row>
                <ion-col size="12">
                    <p class="mc-message-text text-center" color="primary">{{ message }} </br /><strong>{{ titleBadge }}</strong> </p>
                </ion-col>
                <ion-col size="12" class="d-flex justify-center align-center">
                    <img style="width: 20%" src="/assets/badges.png" />
                </ion-col>
                <ion-col size="12" style="margin-top:15px">
                    <img style="width: 100%" src="/assets/win-badge.gif" />
                </ion-col>
            </ion-row>
            <!-- composant -> prochaine action -->
            <div class="mc-action-next">
                <ion-text color="secondary" class="d-flex justify-center">
                    <h6><strong> {{ $t('Badge.winBadge.otherBadge.label') }}</strong></h6>
                </ion-text>
                <ion-card color="primary" style="margin-top:10px;">
                    <ion-row>
                        <ion-col size="12" style="padding:2px;">
                                <p class="text-center">{{ otherBadge }}</p>
                        </ion-col>
                        <ion-col class="d-flex justify-center align-center">
                        <ion-button shape="round" size="small"  style="margin-top:-10px;margin-bottom:10px;" color="secondary" @click="redirectToMyBadges">Voir "Badges"</ion-button>
                        </ion-col>
                    </ion-row>
                </ion-card>
            </div>
            <!-- composant -> prochaine action -->

            <!-- checkbox -->
            <div class="mc-checkbox d-flex bottom-checkbox">
                <ion-item lines="none">
                    <ion-checkbox name="displayNone" color="primary"></ion-checkbox>
                    <ion-label class="no-white-space">
                        <p>{{ $t('Badge.checkbox.label') }}</p>
                    </ion-label>
                </ion-item>
            </div>
        </div>
        <!-- checkbox -->
        <div class="d-flex justify-center" v-if="$store.state.badgeStore.statusBadges == ''">
        <ion-button  v-show="displayButton" shape="round" color="secondary">
                Afficher version allégée
        </ion-button>
        </div>
    </ion-content>
</div>
</template>

<script>
export default {
  data() {
    return {
      message: this.$t('Badge.winBadge.message'),
      titleBadge: "J'ai créé un événement covoituré avec succès !",
      otherBadge: "Retrouver ce badge dans votre profil public et dans l'écran 'Badges' de votre compte.",
      displayButton: false
    }
  },
  created() {
    setTimeout(() => this.displayButton = true, 5000)
  },

  methods: {
    redirectToMyBadges() {
      this.$router.push({ name: "my-badges" });
    }
  }
}
</script>

<style lang="scss" scoped>
.mc-action-next {
    padding: 0;
}

.no-white-space {
  white-space: normal !important;
  padding-left: 10px;
}

.mc-checkbox {
  justify-content: center;
}

.top-message {
  background-color: #f5f6fa;
  color: var(--ion-color-primary);
  padding: 15px 30px;
  margin-top: -30px;
  border-top-left-radius: 15px !important;
  border-top-right-radius: 15px !important;
}

.mc-image-waiting-badge {
    width: "100%";
    padding-top: 50px;
    background-size: cover;
}
 .mc-message-text {
    font-size: 1rem;
    padding: 3px;
    color: var(--ion-color-primary);
 }
</style>
