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
  <div class="mc-form-carpool-recap">
    <div class="mc-recap-item">
      <div
        class="mc-recap-header d-flex flex-wrap justify-between align-center"
        v-if="type != 'askCarpool'"
      >
        <div v-if="recapCarpool.frequency == 2" class="d-flex flex-wrap">
          <div v-for="(day, index) in recapCarpool.regularDays" :key="index">
            <div class="mc-pastille-day" v-bind:class="{ 'selected': day.value }">
              <b>{{$t(day.trad)}}</b>
            </div>
          </div>
        </div>
        <span>{{recapCarpool.outwardDate | moment('DD MMMM YYYY') }}</span>
        <div class="d-flex align-center">
          <div>{{recapCarpool.priceCarpool}} €</div>
          <ion-icon v-if="recapCarpool.passenger" color="secondary" class="price-info" @click="priceInfo()" name="information-circle-outline"></ion-icon>
        </div>
      </div>
      <div
        v-if="recapCarpool.frequency == 1 && (!!recapCarpool.outwardTime || !!recapCarpool.returnTime)"
        class="mc-carpool-subheader d-flex justify-around align-center"
      >
        <div v-if="recapCarpool.outwardTime" class="d-flex align-center mc-carpool-regular-time">
          <ion-icon name="arrow-down"></ion-icon>
          <span>{{ $t('Carpool.oneWay') }}</span>
          <span class="time">{{ recapCarpool.outwardTime }}</span>
        </div>
        <div
          v-if="recapCarpool.returnTime"
          class="d-flex align-center mc-carpool-regular-time"
        >
          <ion-icon name="arrow-up"></ion-icon>
          <span>{{ $t('Carpool.return') }}</span>
          <span class="time">{{ recapCarpool.returnTime }}</span>
        </div>
      </div>
      <div
        v-if="recapCarpool.frequency == 2"
        class="mc-carpool-subheader d-flex justify-around align-center"
      >
        <div
          v-if="recapCarpool.isMultipleTime"
          class="d-flex align-center mc-carpool-regular-time"
        >Horaires différents selon les jours</div>
        <div
          v-if="!recapCarpool.isMultipleTime && recapCarpool.outwardTime"
          class="d-flex align-center mc-carpool-regular-time"
        >
          <ion-icon name="arrow-down"></ion-icon>
          <span>{{ $t('Carpool.oneWay') }}</span>
          <span class="time">{{ recapCarpool.outwardTime }}</span>
        </div>

        <div
          v-if="!recapCarpool.isMultipleTime && recapCarpool.returnTime"
          class="d-flex align-center mc-carpool-regular-time"
        >
          <ion-icon name="arrow-up"></ion-icon>
          <span>{{ $t('Carpool.return') }}</span>
          <span class="time">{{ recapCarpool.returnTime }}</span>
        </div>
      </div>
      <div class="mc-recap-step d-flex">
        <div class="mc-carpool-info-image d-flex flex-col">
          <div v-if="recapCarpool.driver" class="mc-carpool-driver">
            <ion-icon size="large" name="car"></ion-icon>
          </div>
          <div v-if="recapCarpool.passenger" class="mc-carpool-passenger">
            <ion-icon size="large" name="person"></ion-icon>
          </div>
        </div>

        <div class="timeline-container d-flex flex-col">
          <p
            class="timeline text-left d-flex align-center"
            v-for="(step, index) in recapCarpool.outwardWaypoints"
            :key="index"
          >
            <span v-if="!!!step.role && !!!step.type" class="dot"></span>
            <ion-icon
              v-if="step.role && step.type"
              :name="getIconStepName(step).name"
              class="mc-step-icon"
              :class="getIconStepName(step).background"
            ></ion-icon>
            <span v-html="displayStep(step)"></span>
          </p>
        </div>
      </div>

      <div class="mc-recap-footer text-left" v-if="!! recapCarpool.seats && type != 'askCarpool'">
        Places disponibles
        <div class="d-flex">
          <ion-icon v-for="index in parseInt(recapCarpool.seats)" :key="index" name="person">{{index}}</ion-icon>
        </div>
      </div>
    </div>

    <div v-if="!!recapCarpool.comment" class="mc-recap-message ion-margin-top">{{recapCarpool.comment}}</div>

    <div class="mc-recap-user" v-if="!!recapCarpool.user && type != 'askCarpool'">
      <div class="mc-recap-user-bloc-info">
        <div class="mc-user-image">
          <ion-thumbnail v-if="!! recapCarpool.user.avatars">
            <img alt="" :src="recapCarpool.user.avatars[0]" />
          </ion-thumbnail>
        </div>

        <div class="mc-recap-user-info">
          <p>{{recapCarpool.user.givenName }} {{recapCarpool.user.shortFamilyName }}</p>
        </div>
      </div>
    </div>

    <div class="mc-carpool-map" v-if="type != 'askCarpool'">
      <l-map
        v-if="showCard"
        :ref="'mapRecap'"
        style="height: 350px"
        :zoom="zoom"
        :bounds="bounds"
        :options="optionsCard"
      >
        <l-tile-layer v-if="bounds" :url="url"></l-tile-layer>
        <l-polyline v-if="bounds" :lat-lngs="recapCarpool.directPoints" :color="'blue'"></l-polyline>
        <l-marker :lat-lng="[recapCarpool.outwardWaypoints[0].latitude, recapCarpool.outwardWaypoints[0].longitude]">
          <l-icon :iconSize="[30, 42]" :iconAnchor="[15, 42]" className="custom-div-icon"><div class="marker-pin"></div><ion-icon name="pin"></ion-icon></l-icon>
        </l-marker>
        <l-marker :lat-lng="[recapCarpool.outwardWaypoints[recapCarpool.outwardWaypoints.length - 1].latitude, recapCarpool.outwardWaypoints[recapCarpool.outwardWaypoints.length - 1].longitude]">
          <l-icon :iconSize="[30, 42]" :iconAnchor="[15, 42]" className="custom-div-icon"><div class="marker-pin"></div><ion-icon name="flag"></ion-icon></l-icon>
        </l-marker>
      </l-map>
    </div>
  </div>
</template>

<style lang="scss">
.mc-form-carpool-recap {
  margin-top: 20px;

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

  .mc-step-icon {
    border-radius: 50%;
    padding: 4px;
    color: white;
    margin-right: 10px;
    min-width: 16px;

    &.active {
      font-size: 22px;
      margin-left: -3px;
      min-width: 22px
    }
  }

  .mc-icon-step-background-primary {
    background-color: var(--ion-color-primary);
  }

  .mc-icon-step-background-green {
    background-color: #13a569;
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

  .mc-carpool-info-image {
    margin-right: 10px;

    .mc-carpool-driver {
      flex: 1;
      justify-content: center;
      align-items: center;
      width: 40px;
      display: flex;
      background: var(--ion-color-success);
      color: white;
    }

    .mc-carpool-passenger {
      flex: 1;
      justify-content: center;
      align-items: center;
      width: 40px;
      display: flex;
      background: var(--ion-color-primary);
      color: white;
    }
  }

  .mc-recap-item {
    background: rgba(var(--ion-color-primary-rgb), 0.1);
    border: 1px solid rgba(var(--ion-color-primary-rgb), 0.1);
    border-radius: 20px;

    .mc-recap-header {
      padding: 10px;
      color: var(--ion-color-primary);
      font-weight: bold;
    }

    .mc-recap-step {
      background: white;
      color: var(--ion-color-primary);

      .timeline-container{
        position: relative;
      }

      .timeline-container::before {
        content: "";
        position: absolute;
        margin: auto;
        width: 1px;
        background-color: lightgrey;
        top: 7px;
        bottom: 7px;
        left: 11px;
      }

      .dot {
        width: 12px;
        height: 12px;
        border-radius: 6px;
        background-color: var(--ion-color-primary);
        margin-left: 5px;
        margin-right: 10px;
      }

      .timeline {
        position: relative;
        //padding-left: 20px;

        /*
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
          left: 0px;
        }
         */
      }
    }

    .mc-recap-footer {
      color: var(--ion-color-primary);
      padding: 10px;
    }
  }

  .mc-recap-message {
    background: #f5f6fa;
    padding: 10px;
    color: rgba(0, 0, 0, 0.6);
    border-radius: 15px 15px 15px 0px;
    margin-bottom: 20px;
    white-space: pre-line;
  }

  .mc-recap-user {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    margin-top: 45px;

    .mc-recap-user-bloc-info {
      color: var(--ion-color-primary);
      display: flex;
    }

    ion-thumbnail {
      --size: 90px;
      --border-radius: 50%;
    }

    .mc-recap-user-info {
      display: flex;
      justify-content: center;
      flex-direction: column;
      margin-left: 20px;

      p {
        margin: 0;
        font-weight: bold;
      }
    }
  }

  .price-info {
    cursor: pointer;
    font-size: 20px;
    margin-left: 5px;
  }
}
</style>

<script>
import { LMap, LTileLayer, LPolyline, LMarker, LIcon } from "vue2-leaflet";
import { isPlatform } from "@ionic/core";
import {toast} from "../../../Shared/Mixin/toast.mixin";
import {address} from "../../../Shared/Mixin/address.mixin";

export default {
  name: "recap-carpool",
  mixins: [toast, address],
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 8,
      showCard: true,
      optionsCard: {
        dragging: !isPlatform(window.document.defaultView, "mobile"),
        touchZoom: isPlatform(window.document.defaultView, "mobile"),
        tap: !isPlatform(window.document.defaultView, "mobile")
      }
    };
  },
  components: {
    LMap,
    LTileLayer,
    LPolyline,
    LMarker,
    LIcon
  },
  props: ["recap", "type"],
  mounted() {
    setTimeout(() => {
      if (!!this.$refs.mapRecap) this.$refs.mapRecap.mapObject.invalidateSize();
    }, 500);
  },
  computed: {
    bounds() {
      const bounds = new L.LatLngBounds(this.recap.directPoints);
      if (!!this.$refs.mapRecap) this.$refs.mapRecap.mapObject.invalidateSize();
      return bounds;
    },

    recapCarpool() {
      return this.recap
    }
  },
  methods: {
    priceInfo() {
      console.log(this.recapCarpool);
      this.presentToast(this.$t("PostCarpool.price-info"), "secondary");
    },
    displayStep(step) {
      let result = "";
      if (!!step.time) {
        result = `<b>${this.$moment(step.time)
          .utc()
          .format("HH[h]mm")}</b>: `;
      }
      result += this.formatAddress(step);
      /*
      if (!!step.displayLabel && step.displayLabel[0] && step.displayLabel[1]) {
        result += `${step.displayLabel[0]}`;
      } else {
        if (!!step.addressCountry) {
          result += `${step.addressLocality},  ${step.addressCountry}`;
        } else {
          result += `${step.addressLocality}`;
        }
      }
       */
      return result;
    },

    getIconStepName(step) {
      switch (step.type) {
        case "origin":
          if (step.role == "driver") {
            return {
              name: "home",
              background: "mc-icon-step-background-green" + (this.recapCarpool.passenger ? ' active' : '')
            };
          } else {
            return {
              name: "person",
              background: "mc-icon-step-background-primary" + (this.recapCarpool.driver ? ' active' : '')
            };
          }
          break;

        case "destination":
          if (step.role == "driver") {
            return {
              name: "flag",
              background: "mc-icon-step-background-green" + (this.recapCarpool.passenger ? ' active' : '')
            };
          } else {
            return {
              name: "flag",
              background: "mc-icon-step-background-primary" + (this.recapCarpool.driver ? ' active' : '')
            };
          }

        case "step":
          if (step.role == "driver") {
            return {
              name: "pin",
              background: "mc-icon-step-background-green"
            };
          } else {
            return {
              name: "pin",
              background: "mc-icon-step-background-primary"
            };
          }
          break;
        default:
          break;
      }
    }
  }
};
</script>
