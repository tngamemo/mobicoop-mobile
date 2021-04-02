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

            <img style="width:20%; padding:15px;" src="/assets/badges.png"/>
            <img style="width:20%; padding:15px;" src="/assets/badges.png"/>
            
            <!-- Button -->
            <ion-button  @click="redirectToPublicProfil" size="small" shape="round" color="secondary">
              Voir profil public
            </ion-button>

           <!-- My badges in progress -->
          <div class="d-flex justify-between" style="margin-top:10px;">
              <h5 class="ion-text-left" style="padding: 0"><strong>Badges en cours : </strong> </h5>            
          </div>
          <ion-item>
            <ion-row  class="text-left d-flex align-center">
              <ion-col size="2" >
                <img style="width:50%" src="/assets/carpool.jpeg"/>
              </ion-col>
              <ion-col size="10">
                <ion-label >Badges en cours</ion-label>
                <ion-select placeholder="Badges en cours">
                  <ion-select-option v-for="(item, index) in items" :key="index" :value="index">{{ item.label }} </ion-select-option>
                </ion-select>
              </ion-col>

              <ion-col size="12"style="padding-bottom:15px; padding-top:5px;"> 
                <div>
                  <span class="mc-progress-bar">
                    1/2
                  </span>
                  <ion-progress-bar color="primary" value="0.5" >3/10</ion-progress-bar>
                </div>
              </ion-col>
            </ion-row> 
          </ion-item>

          <!-- My badges in progress -->
            <div class="d-flex justify-between" style="margin-top:10px;">
              <h5 class="ion-text-left" style="padding: 0"><strong>Autres badges : </strong> </h5>            
            </div>
            <ion-item>
              <ion-row  class="text-left d-flex align-center">
                <ion-col size="1" >
                  <img style="width:100%;" src="/assets/carpool.jpeg"/>
                </ion-col>
                <ion-col size="11">
                <p style="margin-left:5px;"> J'ai parrainé 3 utilisateurs </p>
                </ion-col>
              </ion-row>
            </ion-item>

          <!-- checkbox -->
          <div class="mc-checkbox d-flex bottom-checkbox">
            <ion-item lines="none">
                <ion-checkbox
                    name="displayNone"
                    color="primary"
                ></ion-checkbox>
                    <ion-label class="no-white-space"><p>Ne plus afficher de message pour une action réalisée</p></ion-label>
            </ion-item>
          </div>
          <div class="mc-checkbox d-flex bottom-checkbox">
            <ion-item lines="none">
                <ion-checkbox
                    name="displayNone"
                    color="primary"
                ></ion-checkbox>
                    <ion-label class="no-white-space"><p>Ne plus afficher de message pour un badge gagné</p></ion-label>
            </ion-item>
          </div>
          <!-- checkbox -->
      </div>
   
    </ion-content>
  </div>
</template>

<script>
  export default {
    name: 'my-badges',
    data () {
      return {
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
  .mc-progress-bar {
    position: absolute;
    z-index: 1;
    margin-left:150px;  
  }
</style>