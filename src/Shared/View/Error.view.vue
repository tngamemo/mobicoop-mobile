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
        <h1 class="ion-text-center">Erreur</h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" no-bounce>
      <div class="mc-white-container" >

      <div class="d-flex flex-col align-center">
        <br>
        <ion-text color="primary">Cette page n'existe pas</ion-text>
        <br>
        <ion-button @click="goToHome()" color="primary" expand="block">Retourner à l'accueil</ion-button>
      </div>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">

</style>

<script>

  export default {
    name: 'error',
    data () {
      return {

      }
    },
    props : [],
    created() {

    },
    methods: {
      goToHome() {
        this.$router.replace({ name: 'carpoolsHome'})
      }
    }
  }
</script>
