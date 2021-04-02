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

    <div v-if="$store.state.badgeStore.statusBadges == 'loading'">
      <h2 class="ion-text-center" color="white"> Attention ... </h2>
      <img class="mc-image-waiting-badge" src="/assets/tenor.gif"/>
    </div>
    <ion-content class="mc-message-badge" color="primary" no-bounce>
        <div class="mc-white-container mc-white-container-no-padding-full message-flex" style="height: 100%" v-if="$store.state.badgeStore.statusBadges == ''">
            <div class="mc-white-container">
                <ion-row>
                    <ion-col class="top-message d-flex justify-between" style="padding: 0">
                        <h5 class="ion-text-center">{{ message }} </br /><strong>{{ titleBadge }}</strong> </h5>
                    </ion-col>
                    <ion-col class=" d-flex justify-center align-center" style="padding: 0">
                        <img style="width: 70%" src="/assets/badges.png" />
                    </ion-col>
                </ion-row>

                <div class=" d-flex justify-center align-center">
                    <img style="width: 75%" src="/assets/win-badge.gif" />
                </div>

                <!-- composant -> prochaine action -->
                <div class="mc-action-next">
                    <ion-text color="secondary">
                        <h6 class="ion-text-left"><strong> {{ $t('Badge.winBadge.otherBadge.label') }}</strong></h6>
                    </ion-text>
                    <ion-card color="primary">
                        <ion-row>
                            <ion-col class=" d-flex justify-center align-center">
                                <img style="width: 50%" src="/assets/carpool.jpeg" />
                            </ion-col>
                            <ion-col class=" d-flex justify-center align-center" style="padding: 0">
                                <ion-card-content style="padding-left: 0">
                                    <p>{{ otherBadge }}</p>
                                </ion-card-content>
                            </ion-col>fff∏
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
        </div>
        <!-- checkbox -->
        <div class="d-flex justify-center">
        <ion-button  v-show="displayButton" expand="shape" color="secondary">
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
      otherBadge: "J'ai covoituré avec 10 personnes différentes",
      displayButton: false
    }
  },
  created() {
    setTimeout(() => this.displayButton = true, 5000)
  },

  methods: {
    redirectToMyBadges() {
        this.$router.push({
            name: "my-badges"
        });
    },
    redirectToWinBadges() {
      this.$router.push({ name: "win-badge" });
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
</style>
