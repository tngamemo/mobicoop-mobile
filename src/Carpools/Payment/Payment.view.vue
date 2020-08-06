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
        <h1 class="ion-text-center">{{ $t('Payment.title') }} </h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" no-bounce>
      <div class="mc-white-container" >

        <div class="ion-text-center" v-if="$store.state.paymentStore.statusPayment == 'loading'" >
          <ion-icon size="large" color="primary" class="rotating"  name="md-sync"></ion-icon>
        </div>

        <div v-if="$store.state.paymentStore.statusPayment == 'success' && payments">
          <div class="mc-carpool-item" v-for="payment in payments">
            <!-- Header -->
            <div class="mc-carpool-header d-flex justify-between align-center flex-wrap">
              <div class="d-flex align-center">
                <ion-thumbnail>
                  <img
                    :hidden="!(payment.avatar && avatarLoaded)"
                    :src="payment.avatar"
                    @load="onImgLoad()"
                  />
                </ion-thumbnail>
                <strong
                  class="mc-carpool-carpooler"
                >{{payment.givenName}} {{payment.shortFamilyName}}</strong>
              </div>
            </div>

            <!-- Carpool  info -->
            <div class="mc-carpool-info d-flex align-center align-stretch">
              <div class="mc-carpool-info-image d-flex flex-col">
                <div v-if="payment.type == 1" class="mc-carpool-driver">
                  <ion-icon size="large" name="car"></ion-icon>
                </div>
                <div v-if="payment.type == 2" class="mc-carpool-passenger">
                  <ion-icon size="large" name="person"></ion-icon>
                </div>
              </div>
              <div class="d-flex mc-carpool-way">
                <div class="mc-carpool-origin-destination">
                  <div>
                    <p class="timeline">{{payment.origin.addressLocality}}</p>
                    <p class="timeline">{{payment.destination.addressLocality}}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="mc-carpool-footer">
              <div class="text-center" v-if="payment.frequency == 1">{{payment.date | moment("dddd D[.]MM")}}</div>
              <div class="text-center" v-if="payment.frequency == 2">

              </div>
              <div class="text-center"><b>{{$t('Payment.amount')}} : {{payment.amount}}€</b></div>
              <div>
                <ion-item lines="none" class="item-transparent">
                  <ion-label>{{ $t('Payment.' + (type == 1 ? 'pay' : 'collect') + '.direct')}}</ion-label>
                  <ion-checkbox
                    slot="start"
                    color="success"
                    @ionChange="addForPost($event, payment, 2)"
                  ></ion-checkbox>
                </ion-item>
              </div>
            </div>

          </div>
        </div>

      </div>
      <div class="confirm-footer">
        <ion-row>
          <ion-col class="d-flex align-center">
            <b>Total : {{getTotal()}}€</b>
          </ion-col>
          <ion-col>
            <ion-button class="mc-small-button normal-wrap"
                        color="success"
                        expand="block"
                        :disabled="dataToPost.items.length == 0"
                        @click="postPayment()"
            >
              {{$t("Payment.validate")}}
            </ion-button>
          </ion-col>
        </ion-row>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">

  .confirm-footer{
    position: fixed;
    right: 0px;
    left: 0px;
    bottom: 0px;
    background-color: var(--ion-color-primary);
    padding: 15px
  }

  .item-transparent {
    --background: transparent;
    color: var(--ion-color-primary)
  }

.mc-carpool-header {

  ion-thumbnail {
    --size: 40px;
    --border-radius: 50%;
  }

  .mc-carpool-carpooler {
    margin-left: 15px
  }
}
</style>

<script>
  import {toast} from "../../Shared/Mixin/toast.mixin";

  export default {
    name: 'payment',
    data () {
      return {
        defaultPaymentId: null,
        payments: null,
        avatarLoaded: false,
        type: 0,
        dataToPost: null
      }
    },
    mixins: [toast],
    props : [],
    created() {
      this.defaultPaymentId = this.$route.query.defaultId;
      this.type = Number(this.$route.query.type);
      this.dataToPost = {
        type : this.type,
        items : []
      };
      this.getPayment(this.$route.query);
    },
    methods: {
      getPayment(params) {
        this.$store.dispatch('getPayment', params)
          .then((res) => {
            this.payments = res.data['hydra:member'];
          })
          .catch((error) => {
            this.presentToast(this.$t("Commons.error"), "danger");
          })
      },
      onImgLoad: function() {
        this.avatarLoaded = true;
      },
      addForPost(event, payment, mode) {
        if(event.detail.checked) {
          this.dataToPost.items.push({
            id: payment.id,
            status: 1,
            mode: mode
          })
        } else {
          const index = this.dataToPost.items.findIndex(item => item.id === payment.id);
          this.dataToPost.items.splice(index, 1);
        }
      },
      getTotal() {
        let total = 0;
        this.dataToPost.items.forEach(item => {
          const p = this.payments.find(payment => payment.id === item.id)
          total += Number(p.amount)
        })
        return total
      },
      postPayment() {
        this.$store.dispatch('postPayment', this.dataToPost)
          .then((res) => {
            this.presentToast(this.$t('Payment.' + (this.type == 1 ? 'pay' : 'collect') + '.success'), "success");
            this.$router.back()
          })
          .catch((error) => {
            this.presentToast(this.$t("Commons.error"), "danger");
          })
      }
    }
  }
</script>
