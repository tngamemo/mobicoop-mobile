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
  <div class="mc-carpool-item pointer">
    <div class="mc-carpool-header d-flex justify-between align-center flex-wrap">
      <div v-if="isPunctualCarpool">
        <span>{{ getDateCarpoolItem }}</span>
      </div>

      <div v-if="!isPunctualCarpool" class="d-flex flex-wrap">
        <div v-for="(day, index) in carpool.regularDays" :key="index">
          <div class="mc-pastille-day" v-bind:class="{ 'selected': day.value }">
            <b>{{$t(day.trad)}}</b>
          </div>
        </div>
      </div>

      <div v-if="this.carpool.price" class>
        <span>{{ this.carpool.price }} €</span>
      </div>
    </div>
    <div v-if="!isPunctualCarpool" class="mc-carpool-subheader d-flex justify-around align-center">
      <div
        v-if="this.carpool.outwardTime && !this.carpool.isMultipleTimes"
        class="d-flex align-center mc-carpool-regular-time"
      >
        <ion-icon name="arrow-down"></ion-icon>
        <span>{{ $t('Carpool.oneWay') }}</span>
        <span class="time">{{ this.carpool.outwardTime | moment("utc", "HH:mm")}}</span>
      </div>

      <div
        v-if="this.carpool.returnTime && !this.carpool.isMultipleTimes"
        class="d-flex align-center mc-carpool-regular-time"
      >
        <ion-icon name="arrow-up"></ion-icon>
        <span>{{ $t('Carpool.return') }}</span>
        <span class="time">{{ this.carpool.returnTime | moment("utc", "HH:mm")}}</span>
      </div>

      <div v-if="this.carpool.isMultipleTimes" class="d-flex align-center mc-carpool-regular-time">
        <ion-icon name="arrow-up"></ion-icon>
        <ion-icon name="arrow-down"></ion-icon>
        <span>{{ $t('Carpool.multipeTimes') }}</span>
      </div>
    </div>

    <div class="mc-carpool-info d-flex align-center align-stretch">
      <div class="mc-carpool-info-image d-flex flex-col">
        <div v-if="this.carpool.driver" class="mc-carpool-driver">
          <ion-icon size="large" name="car"></ion-icon>
        </div>
        <div v-if="this.carpool.passenger" class="mc-carpool-passenger">
          <ion-icon size="large" name="walk"></ion-icon>
        </div>
      </div>
      <div class="d-flex mc-carpool-way">
        <div class="mc-carpool-time" v-if="isPunctualCarpool">
          <p>{{ carpool.outwardTime | moment("utc", "HH:mm") }}</p>
          <p>{{ carpool.outwardEndTime | moment("utc", "HH:mm")}}</p>
        </div>
        <div class="mc-carpool-origin-destination">
          <div>
            <p class="timeline">{{this.carpool.origin.addressLocality}}</p>
            <p class="timeline">{{this.carpool.destination.addressLocality}}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="mc-carpool-footer">
      <div v-if="this.carpool.carpooler && (type == 'search' || type == 'accepted' )" class="d-flex justify-between align-center">
        <div class="d-flex align-center">
        <ion-thumbnail class="position-relative">
          <img
            :hidden="!(this.carpool.carpooler.avatar && this.avatarLoaded)"
            :src="this.carpool.carpooler.avatar"
            @load="onImgLoad()"
            alt=""
          />
          <ion-icon v-if="showExperienced && this.carpool.carpooler.experienced" class="experienced" name="star"></ion-icon>
          <!--<ion-icon v-if="! this.avatarLoaded" name="contact" size="large"></ion-icon>-->
        </ion-thumbnail>
        <strong
          class="mc-carpool-carpooler"
        >{{this.carpool.carpooler.givenName}} {{this.carpool.carpooler.shortFamilyName}}</strong>
        </div>
        <div v-if="this.carpool.carpooler.telephone && (this.carpool.carpooler.phoneDisplay == 2 || this.carpool.acceptedAsk)">
          <ion-fab-button :href="'tel:' + carpool.carpooler.telephone" target="_self" style="height: 40px; width: 40px;">
            <ion-icon name="call"></ion-icon>
          </ion-fab-button>
        </div>
        <div v-if="this.carpool.communityImages && this.carpool.communityImages.length > 0">
          <span v-for="c in this.carpool.communityImages">
            <ion-thumbnail>
              <img :src="c[0].versions.square_250" />
            </ion-thumbnail>
          </span>
        </div>
        <div v-if="this.carpool.externalOrigin">
          {{this.carpool.externalOrigin}}
        </div>
      </div>
      <div v-if="type == 'my-carpool'">
        <div class="ion-text-start">
          <div
            v-if="carpool.dateValidity"
          >{{$t("MyCarpools.validatedUntil")}} {{carpool.dateValidity | moment("utc", 'dddd D[.]MM[.]YYYY')}}</div>
        </div>

        <div class="d-flex align-center justify-end" style="flex-flow: wrap">
          <ion-button
            class="mc-small-button"
            color="primary"
            v-if="hasNoAcceptedAsk(carpoolSource)"
            @click="updateCarpool(carpoolSource)"
          >
            <ion-icon name="create"></ion-icon>
            <span class="ion-margin-start">{{$t('Commons.update')}}</span>
          </ion-button>

          <ion-button
            class="mc-small-button"
            color="danger"
            @click="deleteCarpoolAlertConfirm(carpool.id)"
          >
            <ion-icon name="trash"></ion-icon>
            <span class="ion-margin-start">{{$t('Commons.delete')}}</span>
          </ion-button>

          <ion-button
            v-if="carpool.frequency == 2"
            :ref="'test'"
            class="mc-small-button"
            color="primary"
            @click="pauseCarpool(carpool)"
          >
            <ion-icon
              color="light"
              v-if="!carpool.paused && this.$store.getters.statusPauseCarpool != 'loading'"
              name="pause"
            ></ion-icon>
            <ion-icon
              color="light"
              v-if="carpool.paused && this.$store.getters.statusPauseCarpool != 'loading'"
              name="play"
            ></ion-icon>
            <ion-icon
              color="light"
              v-if="this.$store.getters.statusPauseCarpool == 'loading'"
              name="md-sync"
            ></ion-icon>
          </ion-button>
        </div>
      </div>
      <div
        v-if="type == 'my-carpool'"
        class="mc-carpool-potential-carpoolers"
      >
        <ion-button
          class="mc-big-button normal-wrap"
          fill="outline"
          color="success"
          expand="block"
          :disabled="carpool.potentialCarpoolers == 0"
          @click="searchPotentialCarpoolers()"
        >{{carpool.potentialCarpoolers}} {{$t("MyCarpools.potentialCarpoolers")}}</ion-button>
      </div>
      <div
        v-if="payment && payment.paymentItemId && activatedPayment"
        class="mc-carpool-potential-carpoolers"
      >
        <div v-if="payment.paymentStatus === 1" class="text-center text-success"><b>{{$t("Payment.online")}}</b></div>
        <div v-if="payment.paymentStatus === 2" class="text-center text-success"><b>{{$t("Payment.direct")}}</b></div>
        <div v-if="payment.paymentStatus === 4" class="text-center text-success"><b>{{$t("Payment.paid")}}</b></div>
        <div v-if="payment.paymentStatus === 3" style="margin-bottom: 20px" class="text-center text-danger"><b>{{$t("Payment.unpaid")}}</b></div>
        <ion-button v-if="payment.paymentStatus === 0 || payment.paymentStatus === 3"
          class="mc-big-button normal-wrap"
          fill="outline"
          color="success"
          expand="block"
          @click="payCarpoolers()"
        >
          <span v-if="!this.carpool.driver">{{$t("Payment.paye")}}</span>
          <span v-if="this.carpool.driver">{{$t("Payment.validate-paye")}}</span>
        </ion-button>
      </div>
      <div class="mt-10" v-if="activatedProof && type == 'accepted'">
        <div @click="proofAlert()" class="d-flex align-center">
          <div>Preuve géolocalisée d'un trajet</div>
          <div class="proof-info"><ion-icon name="alert"></ion-icon></div>
        </div>
        <ion-button v-if="!carpoolProofId" class="mc-big-button normal-wrap" fill="outline" expand="block" color="primary" @click="postProof()">
          <ion-icon size="large" class="rotating" v-if="proofLoading" name="md-sync"></ion-icon>
          <span  v-if="!proofLoading">Certifier prise en charge</span>
        </ion-button>
        <ion-button v-if="carpoolProofId" class="mc-big-button normal-wrap" fill="outline" expand="block" color="primary" @click="putProof()">
          <ion-icon size="large" class="rotating" v-if="proofLoading" name="md-sync"></ion-icon>
          <span  v-if="!proofLoading">Certifier dépose</span>
        </ion-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.mc-carpool-item {
  background: rgba(var(--ion-color-primary-rgb), 0.1);
  border: 1px solid rgba(var(--ion-color-primary-rgb), 0.1);
  margin-bottom: 20px;
  border-radius: 20px;

  .mc-carpool-header {
    font-weight: bold;
    color: var(--ion-color-primary);
    padding: 20px;
  }

  .mc-carpool-subheader {
    background: rgba(255, 255, 255, 0.5);
    color: var(--ion-color-primary);
    height: 50px;

    .mc-carpool-regular-time {
      font-weight: bold;

      span {
        padding-right: 10px;

        &.time {
          font-weight: lighter;
          color: rgba(var(--ion-color-primary-rgb), 0.7);
        }
      }
    }
  }

  .mc-pastille-day {
    background: white;
    color: rgba(var(--ion-color-primary-rgb), 0.5);
    font-weight: bold;
    font-size: 14px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    margin-bottom: 5px;

    &.selected {
      background: rgba(var(--ion-color-primary-rgb), 0.5);
      color: white;
    }
  }

  .mc-carpool-info {
    background: white;
    color: var(--ion-color-primary);

    .mc-carpool-driver {
      flex: 1;
      justify-content: center;
      align-items: center;
      width: 40px;
      display: flex;
      background: var(--ion-color-success);
    }

    .mc-carpool-passenger {
      flex: 1;
      justify-content: center;
      align-items: center;
      width: 40px;
      display: flex;
      background: var(--ion-color-primary);
    }

    .mc-carpool-way {
      padding-left: 20px;

      .mc-carpool-time {
        padding-right: 10px;
      }

      .mc-carpool-origin-destination {
        font-weight: bold;

        div {
          // border-left: 2px solid red;
          padding-left: 10px;
          position: relative;

          &::before {
            content: "";
            position: absolute;
            width: 4px;
            height: 80%;
            background-color: var(--ion-color-primary);
            top: 50%;
            transform: translateY(-50%);
            left: 3px;
          }

          .timeline {
            position: relative;
            padding-left: 10px;

            &::before {
              content: "";
              position: absolute;
              margin: auto;
              width: 12px;
              height: 12px;
              border-radius: 6px;
              background-color: var(--ion-color-primary);
              top: 0px;
              bottom: 0;
              left: -10px;
            }
          }
        }
      }
    }

    ion-icon {
      color: white;
    }
  }

  .mc-carpool-footer {
    padding: 20px;
    color: var(--ion-color-primary);

    .mc-carpool-carpooler {
      padding-left: 20px;
    }

    ion-thumbnail {
      --size: 40px;
      --border-radius: 50%;
    }

    .mc-carpool-potential-carpoolers {
      margin-top: 20px;
    }
  }
}

  .text-success {
    color: var(--ion-color-success)
  }
  .text-danger {
    color: var(--ion-color-danger)
  }

  .mt-10 {
    margin-top: 10px;
  }

  .proof-info {
    margin-left: 5px;
    display: flex;
  }
</style>


<script>
import { toast } from "../../../Shared/Mixin/toast.mixin";
import {Plugins} from "@capacitor/core";
const { Geolocation } = Plugins;

export default {
  name: "carpool-item",
  props: ["carpool", "type", "carpoolSource", "payment", "carpoolProofId"],
  data() {
    return {
      avatarLoaded: false,
      proofLoading: false,
      proof: null,
      activatedPayment: JSON.parse(process.env.VUE_APP_PAYMENT),
      activatedProof: JSON.parse(process.env.VUE_APP_CAN_SEE_PROOF),
      showExperienced: JSON.parse(process.env.VUE_APP_EXPERIENCED)
    };
  },
  mixins: [toast],
  mounted() {
    if(this.carpool.community && this.carpool.community.length > 0) {
      this.carpool.communityImages = []
      this.carpool.community.forEach(c => {
        this.$store.dispatch("getCommunityImages", c).then(res => {
          this.carpool.communityImages.push(res.data['hydra:member']);
          this.$forceUpdate();
        })
      });
    }

    if (this.carpoolProofId) {
      this.getProof();
    }
  },
  computed: {
    getDateCarpoolItem() {
      return this.$moment(this.carpool.date).format("dddd D[.]MM");
    },

    isPunctualCarpool() {
      return this.carpool.frequency == 1;
    }
  },
  methods: {
    deleteCarpoolAlertConfirm(carpoolId) {
      return this.$ionic.alertController
        .create({
          header: this.$t("MyCarpools.confirmDeleteHeader"),
          message: this.$t("MyCarpools.confirmDeleteText"),
          buttons: [
            {
              text: this.$t("Commons.cancel"),
              role: "cancel",
              cssClass: "secondary"
            },
            {
              text: this.$t("Commons.confirm"),
              handler: () => {
                this.deleteCarpool(carpoolId);
              }
            }
          ]
        })
        .then(a => a.present());
    },
    deleteCarpool(carpoolId) {
      this.$store
        .dispatch("deleteCarpool", carpoolId)
        .then(res => {
          this.presentToast(
            this.$parent.$t("MyCarpools.delete-success"),
            "success"
          );
        })
        .catch(err => {
          this.presentToast(this.$parent.$t("Commons.error"), "danger");
        });
    },
    onImgLoad: function() {
      this.avatarLoaded = true;
    },

    pauseCarpool() {
      const payload = {
        carpoolId : this.carpool.id,
        data: {
          paused: !this.carpool.paused,
          adId: this.carpool.id
        }
      };

      this.$store
        .dispatch("pauseCarpool", payload)
        .then(resp => {
          this.presentToast(
            this.$parent.$t("MyCarpools.pause-success"),
            "success"
          );

          this.carpool.paused = resp.data.paused;
          this.$forceUpdate();
        })
        .catch(err => {
          this.presentToast(this.$parent.$t("Commons.error"), "danger");
        });
    },

    searchPotentialCarpoolers() {
      let addressDTOOrigin = this.carpool.origin;
      const displayGeoOrigin = `${
        !!addressDTOOrigin.addressLocality
          ? addressDTOOrigin.addressLocality
          : ""
      }, ${
        !!addressDTOOrigin.addressCountry ? addressDTOOrigin.addressCountry : ""
      }`;
      let addressDTODestination = this.carpool.destination;
      const displayGeoDestination = `${
        !!addressDTODestination.addressLocality
          ? addressDTODestination.addressLocality
          : ""
      }, ${
        !!addressDTOOrigin.addressCountry ? addressDTOOrigin.addressCountry : ""
      }`;
      this.$store.commit("changeOrigin", {
        addressDTO: addressDTOOrigin,
        displayGeo: displayGeoOrigin
      });
      this.$store.commit("changeDestination", {
        addressDTO: addressDTODestination,
        displayGeo: displayGeoDestination
      });

      this.$store.state.searchStore.searchObject.frequency = this.carpool.frequency;
      this.$store.state.searchStore.searchObject.adId = this.carpool.id;
      this.$router.push({ name: "search" });
    },
    hasNoAcceptedAsk(carpool){
      let res = true;
      if (carpool.results) {
        carpool.results.forEach(item => {
          if ( item.acceptedAsk ) {
            res = false;
          }
        });
      }
      return res;
    },
    updateCarpool(carpool) {
      const payload = {
        origin: carpool.outwardWaypoints[0].address,
        destination: carpool.outwardWaypoints[carpool.outwardWaypoints.length - 1].address,
        step: carpool.outwardWaypoints.length > 2 ? carpool.outwardWaypoints.slice(1, carpool.outwardWaypoints.length - 1).map(item => item.address) : [],
        outwardDate: carpool.outwardDate,
        frequency: carpool.frequency
      };

      this.$store.commit("carpoolPost_update", carpool);
      this.$store.commit("carpoolPost_fromSearch", payload);
      if (payload.origin || payload.outwardDate) {
        this.$store.dispatch("treatementUpdateAddresses", {noPriceChange: true});
      }

      let filters = {};
      this.$router.push({name: "post-carpool", params: {filters}});
    },
    call(telephone) {
      window.location.href ="tel:" + telephone;
    },
    payCarpoolers() {
      this.$router.push({ name: 'payment', query : {
          frequency: this.carpool.frequency,
          type: this.carpool.driver ? 2 : 1,
          week: this.payment.paymentItemWeek,
          defaultId: this.payment.paymentItemId,
          askId: this.payment.askId
        }})
    },
    proofAlert() {
      this.presentToast(
        this.$t("AcceptedCarpools.proof-info"),
        "secondary"
      );
    },
    getProof() {
      this.$store.dispatch("getClassicProof", this.carpoolProofId).then(res => {
        this.proof = res.data;
      });
    },
    async postProof() {
      this.proofLoading = true;
      const coordinates = await Geolocation.getCurrentPosition();
      if (coordinates) {
        const params = { askId: this.carpool.id, latitude: coordinates.coords.latitude.toString() , longitude: coordinates.coords.longitude.toString()}
        this.$store.dispatch("postClassicProof", params).then(res => {
          this.carpoolProofId = res.data.id;
          this.getProof();
          this.proofLoading = false;
          this.presentToast("Preuve envoyée", "success");
        }).catch(error => {
          this.proofLoading = false;
          this.presentToast(this.$parent.$t("Commons.error"), "danger");
        });
      } else {
        this.proofLoading = false;
        this.presentToast(this.$parent.$t("Commons.error"), "danger");
      }
    },
    async putProof() {
      this.proofLoading = true;
      const coordinates = await Geolocation.getCurrentPosition();
      if (coordinates) {
        const params = { id: this.carpoolProofId, latitude: coordinates.coords.latitude.toString() , longitude: coordinates.coords.longitude.toString()}
        this.$store.dispatch("putClassicProof", params).then(res => {
          this.proofLoading = false;
          this.getProof();
          this.presentToast("Preuve envoyée", "success");
        }).catch(error => {
          this.proofLoading = false;
          this.presentToast(this.$parent.$t("Commons.error"), "danger");
        });
      } else {
        this.proofLoading = false;
        this.presentToast(this.$parent.$t("Commons.error"), "danger");
      }
    },

  }
};
</script>
