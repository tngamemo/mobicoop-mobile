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
        <h1 class="ion-text-center"> {{ $t('Badge.MyBadges.title') }} </h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" no-bounce>
      <div class="mc-white-container">
          <!-- My badges -->
            <div class=" d-flex justify-between">
                <h5 class="ion-text-left" style="padding: 0"><strong>Mes badges : </strong> </h5>            
            </div>
            <ion-row>
                <ion-col class="d-flex justify-between" size="3">
                    <img style="width:50%" src="/assets/badges.png"/>
                </ion-col>
                    <ion-col class="d-flex justify-between" size="3">
                    <img style="width:50%" src="/assets/badges.png"/>
                </ion-col>
            </ion-row>
                <ion-col size="12"></ion-col>
            </ion-row>
          <!-- My badges -->

          <ion-fab v-if="showExperienced" horizontal="end" vertical="bottom" slot="fixed">
            <ion-fab-button @click="redirectToPublicProfil" color="secondary">
              <ion-icon name="arrow-forward"></ion-icon>
            </ion-fab-button>
          </ion-fab>

           <!-- My badges in progress -->
          <div class="d-flex justify-between" style="margin-top:10px;">
              <h5 class="ion-text-left" style="padding: 0"><strong>Badges en cours : </strong> </h5>            
          </div>
          <ion-row  class="text-left d-flex align-center">
            <ion-col size="12">  
              <ion-progress-bar color="primary" value="0.5">3/10</ion-progress-bar>
            </ion-col>
          </ion-row> 
          <ion-row  class="text-left d-flex align-center">
              <ion-col size="1" >
                  <img style="width:100%" src="/assets/carpool.jpeg"/>
              </ion-col>
              <ion-col size="11">
                <ion-select interface="popover" value="J'ai covoituré avec 10 personnes différentes" >
                  <ion-select-option v-for="(item, index) in items" disabled>{{ item.label }}</ion-select-option>
                </ion-select>
              </ion-col>
          </ion-row>

            <!-- My badges in progress -->
          <div class="d-flex justify-between" style="margin-top:10px;">
              <h5 class="ion-text-left" style="padding: 0"><strong>Autres badges : </strong> </h5>            
          </div>
          <ion-row  class="text-left d-flex align-center">
              <ion-col size="1" >
                  <img style="width:100%" src="/assets/carpool.jpeg"/>
              </ion-col>
              <ion-col size="11">
                <p> J'ai parrainé 3 utilisateurs </p>
              </ion-col>
          </ion-row>
      </div>
    </ion-content>
  </div>
</template>

<script>
  export default {
    name: 'my-badges',
    data () {
      return {
        showExperienced: JSON.parse(process.env.VUE_APP_EXPERIENCED),
        items: [
          { label: "J'ai covoituré avec 10 personnes différentes" },
          { label: "J'ai parrainé 3 utilisateurs" },
        ],
      }
    },
   methods: {
    redirectToPublicProfil() {
      this.$router.push({name : 'profile-public', params : {id: this.$store.getters.userId }});
    }
   }
  }
</script>

<style lang="scss">
  .top-message {
    background-color: #f5f6fa;
    color: var(--ion-color-primary);
    padding: 0px 0px;
    margin-top: -20px;
    border-top-left-radius: 15px !important;
    border-top-right-radius: 15px !important;
  }
  p {
    font-size: 0.9rem;
    color: #000000;
  }
  ion-select-option {
    padding-left: 5px;
  }
</style>