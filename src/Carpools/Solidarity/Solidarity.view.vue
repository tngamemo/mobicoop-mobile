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
          <ion-back-button default-href="home"></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center">{{ this.$t("Solidarity.title") }}</h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="light" no-bounce class="mc-carpool-solidarity no-scroll">
       <iframe :src="link"  style="width:100%;height:100%" ></iframe>
    </ion-content>
  </div>
</template>

<style lang="scss">
</style>

<script>

export default {
  name: "carpool-solidarity",
  data() {
    return {
      link: process.env.VUE_APP_SOLIDARITY_LINK
    };
  },
  props: [],
  created() {},
  methods: {}
};
</script>
