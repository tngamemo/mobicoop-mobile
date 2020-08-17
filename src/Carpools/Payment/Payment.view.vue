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
      <ion-item color="transparent" v-if="frequency == 2 && weeks.length > 0">
        <!--<ion-label></ion-label>-->
        <ion-select :value="selectedWeek" cancel-text="Annuler" class="selectWeek" interface="action-sheet" @ionChange="setWeeks($event)">
          <ion-select-option v-for="week in weeks" :value="week.numWeek.toString() + week.year.toString()">du {{week.fromDate | moment('DD/MM/YYYY')}} au {{week.toDate | moment('DD/MM/YYYY')}}</ion-select-option>
        </ion-select>
      </ion-item>

      <div class="mc-white-container" >

        <div class="ion-text-center" v-if="$store.state.paymentStore.statusPayment == 'loading'" >
          <ion-icon size="large" color="primary" class="rotating"  name="md-sync"></ion-icon>
        </div>

        <div v-if="$store.state.paymentStore.statusPayment == 'success' && payments">
          <div class="text-center" v-if="payments.length == 0">
            {{$t('Payment.none')}}
          </div>
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

                <div class="mc-cp-form-days-wrapper">
                  <div class="mc-cp-form-days-title">Aller</div>
                  <ion-button class="mc-cp-form-day" :color="hasDataToPost(day.value, payment) ? 'primary' : 'light'" v-for="(day, index) in getOutwardOrReturnDay('outward', payment)" :disabled="day.value.status === 0" :key="day.value.id" @click="updateDay(day.value, payment)">
                    <span class="label">{{$t(day.trad)}}</span>
                  </ion-button>
                </div>

                <div class="mc-cp-form-days-wrapper">
                  <div class="mc-cp-form-days-title">Retour</div>
                  <ion-button class="mc-cp-form-day" :color="hasDataToPost(day.value, payment) ? 'primary' : 'light'" v-for="(day, index) in getOutwardOrReturnDay('return', payment)" :disabled="day.value.status === 0" :key="day.value.id" @click="updateDay(day.value, payment)">
                    <span class="label">{{$t(day.trad)}}</span>
                  </ion-button>
                </div>


              </div>
              <div v-if="payment.frequency == 1" class="text-center"><b>{{$t('Payment.amount')}} : {{payment.amount}}€</b></div>
              <div v-if="payment.frequency == 2" class="text-center"><b>{{$t('Payment.amount')}} : {{getTotalForRecurrentPayment(payment)}}€</b></div>
              <div>
                <ion-item lines="none" class="item-transparent">
                  <ion-label>{{ $t('Payment.' + (type == 1 ? 'pay' : 'collect') + '.direct')}}</ion-label>
                  <ion-checkbox
                    slot="start"
                    color="success"
                    @ionChange="addForPost($event, payment, mode)"
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
  .mc-cp-form-days-wrapper {
    margin-bottom: 10px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    .mc-cp-form-days-title {
      width : 70px;
      font-weight: bold;
      text-align: left;
    }

    .mc-cp-form-day {
      --background: var(--ion-color-light);
      --color: var(--ion-color-primary);
      width: 32px;
      height: 32px;
      --padding-start: 0;
      --padding-end: 0;
      --border-radius: 32px;
      --border-color: var(--ion-color-primary);
      --border-style: solid;
      --border-width: 1px;
      transition: background .3s, color .3s;

      .label {
        font-size: 12px;
        text-transform: none;
        font-weight: bold;
      }
    }

    .ion-color-light {
      --ion-color-contrast: var(--ion-color-primary) !important
    }
  }


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

  .selectWeek {
    max-width: 100%;
    width: 100%;
    text-align: center;
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
        dataToPost: null,
        mode: 2,
        frequency: null,
        askId: null,
        weeks: [],
        selectedWeek: null
      }
    },
    mixins: [toast],
    props : [],
    created() {
      this.defaultPaymentId = this.$route.query.defaultId;
      this.type = Number(this.$route.query.type);
      this.frequency = Number(this.$route.query.frequency);
      this.askId = this.$route.query.askId;
      this.selectedWeek =  this.$route.query.week;
      this.dataToPost = {
        type : this.type,
        items : []
      };
      this.getPayment(this.$route.query);
      if(this.frequency == 2) {
        this.getWeeks(this.askId);
      }
    },
    methods: {
      getPayment(params) {
        params.week = this.selectedWeek;
        this.$store.dispatch('getPayment', params)
          .then((res) => {
            const result = res.data['hydra:member'];
            result.forEach(payment => {
              payment.selectedDays = [];
              if(payment.frequency == 2) {
                payment.outwardDays.forEach(item => {
                  item.mode = this.mode
                  if (item.status !== 0) {
                    payment.selectedDays.push(item)
                  }
                })
                payment.returnDays.forEach(item => {
                  item.mode = this.mode
                  if (item.status !== 0) {
                    payment.selectedDays.push(item)
                  }
                })
              }
              payment.items = [];
              payment.selected = false;
            });
            this.payments = result
          })
          .catch((error) => {
            this.presentToast(this.$t("Commons.error"), "danger");
          })
      },
      getWeeks(askId) {
        this.$store.dispatch('getWeeks', askId)
          .then((res) => {
            this.weeks = res.data.weekItems;
          })
          .catch((error) => {
          })
      },
      setWeeks(week) {
        this.selectedWeek = week.numWeek.toString() + week.year.toString();
        this.getPayment(this.$route.query)
      },
      onImgLoad: function() {
        this.avatarLoaded = true;
      },
      addForPost(event, payment, mode) {
        if(event.detail.checked) {
          payment.selected = true
          if (payment.frequency == 1) {
            this.dataToPost.items.push({
              id: payment.id,
              status: 1,
              mode: mode
            })
          } else if (payment.frequency == 2) {
            this.setItems(payment)
          }
        } else {
          payment.selected = false
          if (payment.frequency == 1) {
            const index = this.dataToPost.items.findIndex(item => item.id === payment.id);
            this.dataToPost.items.splice(index, 1);
          } else if (payment.frequency == 2) {
            this.setItems(payment)
          }
        }
      },
      getTotal() {
        let total = 0;
        this.dataToPost.items.forEach(item => {
          if (this.payments[0].frequency == 1) {
            const p = this.payments.find(payment => payment.id === item.id)
            total += Number(p.amount)
          } else {
            const o = this.payments.find(payment => payment.outwardDays.find(od => od.id == item.id) )
            if(o) {
              total += Number(o.outwardAmount)
            }
            const r = this.payments.find(payment => payment.returnDays.find(od => od.id == item.id))
            if(r) {
              total += Number(r.returnAmount)
            }
          }

        });
        return total
      },
      getTotalForRecurrentPayment(payment) {
        let total = 0;
        payment.selectedDays.forEach(item => {
            const o = payment.outwardDays.find(od => od.id == item.id)
            if(o) {
              total += Number(payment.outwardAmount)
            }
            const r = payment.returnDays.find(od => od.id == item.id)
            if(r) {
              total += Number(payment.returnAmount)
            }
          });
        return total;
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
      },
      getOutwardOrReturnDay(type, payment) {
          const days = [
            { name: "mon", trad: "Carpool.L"},
            { name: "tue", trad: "Carpool.Ma"},
            { name: "wed", trad: "Carpool.Me"},
            { name: "thu", trad: "Carpool.J"},
            { name: "fri", trad: "Carpool.V"},
            { name: "sat", trad: "Carpool.S"},
            { name: "sun", trad: "Carpool.D"},
          ]
          const result = [];
          payment[type + 'Days'].forEach((item, index) => {
            result.push({
              name: days[index].name,
              trad: days[index].trad,
              value: item,
            });
          });
          return result;
      },
      hasDataToPost(item, payment) {
        if(payment.selectedDays.find(data => data.id === item.id)) {
          return true
        } else {
          return false
        }
      },
      updateDay(value, payment) {
        const findedIndex = payment.selectedDays.findIndex(item => item.id === value.id);
        if (findedIndex != -1) {
          payment.selectedDays.splice(findedIndex, 1)
        } else {
          payment.selectedDays.push(value);
        }
        this.setItems(payment)
      },
      setItems(payment) {
        if(payment.selected) {
          payment.items = payment.selectedDays
        } else {
          payment.items = []
        }
        this.setDataToPost();
      },
      setDataToPost() {
        this.dataToPost.items = [];
        this.payments.forEach(payment => {
          this.dataToPost.items.push(...payment.items)
        })
      }
    }
  }
</script>
