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
        <h1 class="ion-text-center">{{ $t('Paye.title') }} </h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" no-bounce>
      <div class="mc-white-container" >

      <div class="d-flex flex-col align-center">
        <ion-icon color="success" size="large" name="checkmark-circle"></ion-icon>
        <ion-text color="success">{{ $t('Paye.paye') }}</ion-text>
      </div>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">

</style>

<script>
  import {toast} from "../../Shared/Mixin/toast.mixin";

  export default {
    name: 'paye',
    data () {
      return {

      }
    },
    mixins: [toast],
    props : [],
    created() {

    },
    methods: {
      getPayment(params) {
        params.week = this.selectedWeek;
        this.$store.dispatch('getPayment', params)
          .then((res) => {
            const result = res.data['hydra:member'];
          })
          .catch((error) => {
            this.presentToast(this.$t("Commons.error"), "danger");
          })
      },
    }
  }
</script>
