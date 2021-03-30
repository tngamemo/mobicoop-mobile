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

           <!-- My badges in progress -->
            <div class="d-flex justify-between" style="margin-top:10px;">
                <h5 class="ion-text-left" style="padding: 0"><strong>Badges en cours : </strong> </h5>            
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
            <!-- My badges in progress -->
      </div>
    </ion-content>
  </div>
</template>

<script>
  export default {
    name: 'my-badges',
    data () {
      return {
      }
    },
    components: {
    },
    created() {
    },
    computed: {
    },
    methods: {
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
</style>