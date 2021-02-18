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
        <h1 class="ion-text-center"> {{ $t('AcceptedCarpools.title') }} </h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" no-bounce>
      <div class="mc-white-container">
        <div class="d-flex justify-between">
          <ion-button class='mc-small-button' color="primary" :fill="archived ? 'outline' : 'solid'" @click="archived = false">
            {{ $t('AcceptedCarpools.come-up') }}
          </ion-button>
          <ion-button class='mc-small-button' color="primary" :fill="archived ? 'solid' : 'outline'" @click="archived = true">
            {{ $t('AcceptedCarpools.past') }}
          </ion-button>
        </div>
        <hr>

        <div class="ion-text-center">
          <ion-icon size="large" color="primary" class="rotating" v-if="$store.state.userStore.statusAcceptedCarpools == 'loading'" name="md-sync"></ion-icon>
        </div>

        <div class="ion-text-center" v-if="$store.state.userStore.statusAcceptedCarpools == 'error'">
          {{ $t('AcceptedCarpools.error')}}
        </div>

        <div v-if="$store.state.userStore.statusAcceptedCarpools == 'success' ">
        <div class="ion-text-center mb-20" v-if="filterCarpools(carpools).length > 0 && webURL">
          <small>{{ $t('AcceptedCarpools.proof', {value: webURL})}}</small>
        </div>
        </div>

        <div v-if="$store.state.userStore.statusAcceptedCarpools == 'success'"
          v-for="(carpool, index) in filterCarpools(carpools)"
          :key="index"
        >
          <CarpoolItem :carpool="getFormattedCarpoolItem(carpool)" :type="'accepted'" :payment="getPayment(carpool)" :carpoolProofId="carpool.asks[0].carpoolProofId"/>
        </div>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
  hr {
    background-color: rgba(0, 0, 0, 0.4);
    margin-top: 25px;
    margin-bottom: 25px;
  }

  .mb-20 {
    margin-bottom: 20px;
  }
</style>

<script>
  import CarpoolItem from "../Shared/Components/CarpoolItem.component";
  import CarpoolItemDTO from "../Shared/CarpoolItemDTO";

  export default {
    name: 'accepted-carpools',
    data () {
      return {
        archived : false,
        webURL: process.env.VUE_APP_WEB_URL
      }
    },
    components: {
      CarpoolItem
    },
    created() {
      this.$store.dispatch('getAcceptedCarpools', this.$store.state.userStore.user.id).then(res => {}).catch(err => {});
    },
    computed: {
      carpools: {
        get() {
          return this.$store.state.userStore.acceptedCarpools
        },
      }
    },
    methods: {
      getFormattedCarpoolItem(carpool) {
        return new CarpoolItemDTO().carpoolItemFromSearch(carpool)
      },
      getPayment(carpool) {
        const payment = {};
        payment.paymentStatus = carpool.paymentStatus;
        payment.paymentItemId = carpool.paymentItemId;
        payment.paymentItemWeek = carpool.paymentItemWeek;
        payment.unpaidDate = carpool.unpaidDate;
        payment.askId = carpool.asks[0] ? carpool.asks[0].askId : null;
        return payment;
      },
      filterCarpools() {
        return this.carpools.filter(carpool => {
          return this.archived == this.isArchivedCarpool(carpool)
          /*
          if(this.archived) {
            if (this.isArchivedCarpool(carpool)){
              return true
            } else {
              return false
            }
          } else {
            if (!this.isArchivedCarpool(carpool)){
              return true
            } else {
              return false
            }
          }
           */
        })
      },
      isArchivedCarpool(carpool) {
        let result = false;

        if (carpool.frequency > 1) {
          result = this.$moment(carpool.outwardDate).isBefore(this.$moment().startOf('day'));
        } else {
          const dateAndTimeOutwardDate = this.$moment(`${this.$moment(carpool.outwardDate).format('YYYY-MM-DD')}`);
          const dateAndTimeReturnDate = this.$moment(`${this.$moment(carpool.returnDate).format('YYYY-MM-DD')}`);
          result = this.$moment(dateAndTimeOutwardDate).isBefore(this.$moment().startOf('day')) || (!!carpool.returnDate && this.$moment(dateAndTimeReturnDate).isBefore(this.$moment().startOf('day')));
        }

        return result;
      },
    }
  }
</script>
