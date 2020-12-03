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
          <ion-back-button ref="backButton" default-href="/carpools/profile"></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center">{{ $t('Paye.title') }} </h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" no-bounce>
      <div class="mc-white-container" >

      <div class="d-flex flex-col align-center">
        <ion-icon color="success" size="large" name="checkmark-circle"></ion-icon>
        <ion-text color="success">{{ $t('Paye.paye') }}</ion-text>
        <br>
        <div style="line-height: 14px">
          <small>{{this.$t('Paye.donation-text')}} <a href="https://www.helloasso.com/associations/covoiturage-libre-fr/collectes/campagne-courante/" target="_blank">{{this.$t('Paye.donation-here')}}</a> !</small>
        </div>
        <br>
        <div style="color:lightgrey"><small>retour dans {{countdown}}s</small></div>
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
        paymentId: null,
        countdown: 6,
        countdownInterval: null
      }
    },
    mixins: [toast],
    props : [],
    created() {
      this.paymentId = this.$route.query.paymentPaymentId;
      if (this.paymentId) {
        // this.getPayment(this.paymentId);
      }

      this.countdownInterval = setInterval(() => {
        this.countdown--
        if(this.countdown <= 0) {
          clearInterval(this.countdownInterval);
          this.$refs.backButton.click();
        }
      }, 1000)

    },
    methods: {
      getPayment(id) {
        // todo get payment by id
        this.$store.dispatch('getPayment', {id: id})
          .then((res) => {
            console.log(res);
            const result = res.data['hydra:member'];
          })
          .catch((error) => {
            this.presentToast(this.$t("Commons.error"), "danger");
          })
      },
    }
  }
</script>
