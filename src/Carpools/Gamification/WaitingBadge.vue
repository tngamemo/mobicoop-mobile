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
        <h1 class="ion-text-center"> Attention ... </h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" no-bounce>
      <div>
        <img class="mc-image-waiting-badge" src="/assets/tenor.gif"/>
      </div>
      <ion-fab horizontal="end" vertical="bottom" slot="fixed">
        <ion-fab-button v-on:click="redirectToWinBadges" color="secondary">
          <ion-icon name="arrow-forward"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </div>
</template>

<script>
  export default {
    name: 'my-badges',
    methods: {
        redirectToWinBadges() {
            this.$router.push({ name: "win-badge" });
        }
    }
  }
</script>

<style lang="scss">
  .mc-image-waiting-badge {
    width: "100%";
    padding-top: 50px;
    background-size: contain;
  }
</style>