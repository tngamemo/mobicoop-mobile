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
            <h1 class="ion-text-center">Badges</h1>
        </ion-toolbar>
        </ion-header>
        <ion-content class="mc-message-badge" color="primary" no-bounce>
            <div class="mc-white-container mc-white-container-no-padding-full message-flex" style="height: 100%">
                <div class="mc-white-container">
                    <!-- composant -> message selon badges obtenu -->
                    <div class="top-message d-flex justify-between">
                        <h2 class="ion-text-center">{{ message }} </br/><strong>{{ actionDone }}</strong> </h2>
                    </div>
                    <div class="d-flex justify-center align-center">
                        <ion-text color="primary">
                            <p class="ion-text-center"><strong> {{ $t('Badge.actionCompleted.actionNumberToAchieve.text.part1') }} {{ actionNumberToAchieve }} {{ $t('Badge.actionCompleted.actionNumberToAchieve.text.part2') }}</strong></p>
                            <h5 class="ion-text-center" ><strong> {{ actionToDo }}</strong></h5>
                        </ion-text>
                        <img style="width: 20%" src="/assets/mi-badge.png"/>
                    </div> 
                    <ion-progress-bar class="mc-progress-bar" color="primary" :value="progress"></ion-progress-bar>
                    <!-- composant -> message selon badges obtenu -->

                    <!-- composant -> prochaine action -->
                    <div class="mc-action-next">
                        <ion-text color="secondary">
                            <h5 class="ion-text-left"><strong> {{ $t('Badge.actionNext.label') }}</strong></h5>
                        </ion-text>
                        <ion-card class="link pointer" v-on:click="$router.push('/carpools/messages')" color="primary">
                            <ion-card-content>{{ actionNext }}</ion-card-content>
                        </ion-card>
                    </div>
                    <!-- composant -> prochaine action -->

                    <!-- checkbox -->
                    <div class="mc-checkbox d-flex bottom-checkbox">
                    <ion-item lines="none">
                        <ion-checkbox
                            name="displayNone"
                            color="primary"
                        ></ion-checkbox>
                            <ion-label class="no-white-space">{{ $t('Badge.checkbox.label') }}</ion-label>
                    </ion-item>
                    </div>
                    <!-- checkbox -->
                </div>
                
            </div>
        </ion-content>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: this.$t('Badge.actionCompleted.message'),
                actionDone: "Publier une annonce associée à un événement !",
                actionToDo: "J'ai créé un événement covoituré avec succès",
                actionNumberToAchieve: "1",
                actionNext: "Accepter un covoiturage associé à un événement dont on est l'auteur",
                progress: 0.75
            }
        },
    }
</script>

<style lang="scss" scoped>
  .mc-action-next {
    padding: 5px;  
  }

    .mc-progress-bar {
      margin-top: 15px;
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
    margin-top: -20px;
    border-top-left-radius: 15px !important;
    border-top-right-radius: 15px !important;
  }
  .bottom-checkbox {
    padding: 20px;  
  }

</style>