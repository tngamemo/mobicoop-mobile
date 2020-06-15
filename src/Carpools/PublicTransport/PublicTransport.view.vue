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
        <h1 class="ion-text-center"></h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" no-bounce>
      <div class="mc-white-container" >
        <div>
          <ion-item>
            <ion-row class="w-100 leg-item">
              <ion-col size="2"><span class="mdi mdi-home"></span></ion-col>
              <ion-col size="2">{{ptItem.ptdeparture.date | moment('utc', 'HH[h]mm')}}</ion-col>
              <ion-col size="8">{{ptItem.ptdeparture.address.streetAddress}}, {{ptItem.ptdeparture.address.addressLocality}}</ion-col>
            </ion-row>
          </ion-item>
          <ion-item v-for="(leg, index) in ptItem.ptlegs" class="d-flex align-center">
            <ion-row class="w-100 leg-item">
              <ion-col size="2">
                <div class="d-flex align-center">
                  <span class="mdi" :class="getIcon(leg)"></span>
                  <ion-badge class="mc-badge-line-number" v-if="leg.ptline" color="primary">{{leg.ptline.number}}</ion-badge>
                </div>
              </ion-col>
              <ion-col size="2">
                <div>{{leg.ptdeparture.date | moment('utc', 'HH[h]mm')}}</div>
                <div>{{leg.ptarrival.date | moment('utc', 'HH[h]mm')}}</div>
              </ion-col>
              <ion-col size="8" v-html="getText(leg)"></ion-col>
            </ion-row>
          </ion-item>
          <ion-item>
            <ion-row class="w-100 leg-item">
              <ion-col size="2"><span class="mdi mdi-flag"></span></ion-col>
              <ion-col size="2">{{ptItem.ptarrival.date | moment('utc', 'HH[h]mm')}}</ion-col>
              <ion-col size="8">{{ptItem.ptarrival.address.streetAddress}}, {{ptItem.ptarrival.address.addressLocality}}</ion-col>
            </ion-row>
          </ion-item>
        </div>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
  .w-100 {
    width: 100%
  }

  .leg-item {
    padding-top: 11px;
    padding-bottom: 11px;
  }
</style>

<script>
  import {toast} from "../../Shared/Mixin/toast.mixin";
  import { publicTransportMixin } from "../../Shared/Mixin/public-transport.mixin";
  import * as moment from 'moment';

  export default {
    name: 'public-transport',
    data () {
      return {

      }
    },
    mixins: [toast, publicTransportMixin],
    props : [],
    created() {
      this.index = this.$route.params.param;
      this.ptItem = this.$store.state.publicTransportStore.resultSearchPT[this.index];
    },
    methods: {
      getText(ptLeg) {
        let duration = moment().startOf('day');
        if (ptLeg.duration.includes('H')) {
          duration = moment(ptLeg.duration, '[PT]H[H]m[M]ss[S]');
        } else if (ptLeg.duration.includes('M')) {
          duration = moment(ptLeg.duration, '[PT]m[M]ss[S]');
        } else if (ptLeg.duration.includes('S')) {
          duration = moment(ptLeg.duration, '[PT]ss[S]');
        }

        switch (ptLeg.travelMode.name) {
          case "CAR":
            return 'Prendre la voiture de  <b>' + ptLeg.ptdeparture.name +  '</b> jusqu\'à <b>'  + ptLeg.ptarrival.name + '</b>.' + '<br><small>Durée estimée : ' + duration.format('m[m] ss[s]') + '</small>';
          case "BUS":
            return 'Prendre le Bus en partance de <b>' + ptLeg.ptdeparture.name + '</b> et en direction de <b>' + ptLeg.direction + '</b><br>' + "Descendre à <b>" + ptLeg.ptarrival.name + '</b>' + '<br><small>Durée estimée : ' + duration.format('m[m] s[s]') + '</small>';
          case "TRAMWAY":
            return 'Prendre le Tramway en partance de <b>' + ptLeg.ptdeparture.name + '</b> et en direction de <b>' + ptLeg.direction + '</b><br>' + "Descendre à <b>" + ptLeg.ptarrival.name + '</b>' + '<br><small>Durée estimée : ' + duration.format('m[m] s[s]') + '</small>';
          case "COACH":
            return 'Prendre le Bus en partance de <b>' + ptLeg.ptdeparture.name + '</b> et en direction de <b>' + ptLeg.direction + '</b><br>' + "Descendre à <b>" + ptLeg.ptarrival.name + '</b>' + '<br><small>Durée estimée : ' + duration.format('m[m] s[s]') + '</small>';
          case "TRAIN":
            return 'Prendre le Train en partance de <b>' + ptLeg.ptdeparture.name + '</b> et en direction de <b>' + ptLeg.direction + '</b><br>' + "Descendre à <b>" + ptLeg.ptarrival.name + '</b>' + '<br><small>Durée estimée : ' + duration.format('m[m] s[s]') + '</small>';
          case "TRAIN_LOCAL":
            return 'Prendre le Train en partance de <b>' + ptLeg.ptdeparture.name + '</b> et en direction de <b>' + ptLeg.direction + '</b><br>' + "Descendre à <b>" + ptLeg.ptarrival.name + '</b>' + '<br><small>Durée estimée : ' + duration.format('m[m] s[s]') + '</small>';
          case "TRAIN_HIGH_SPEED":
            return 'Prendre le Train en partance de <b>' + ptLeg.ptdeparture.name + '</b> et en direction de <b>' + ptLeg.direction + '</b><br>' + "Descendre à <b>" + ptLeg.ptarrival.name + '</b>' + '<br><small>Durée estimée : ' + duration.format('m[m] s[s]') + '</small>';
          case "BIKE":
            return 'Prendre le vélo de  <b>' + ptLeg.ptdeparture.name +  '</b> jusqu\'à <b>'  + ptLeg.ptarrival.name + '</b>.' + '<br><small>Durée estimée : ' + duration.format('m[m] s[s]') + '</small>';
          case "WALK":
            return 'Marcher de  <b>' + ptLeg.ptdeparture.name +  '</b> jusqu\'à <b>'  + ptLeg.ptarrival.name + '</b>.' + '<br><small>Durée estimée : ' + duration.format('m[m] s[s]') + '</small>';
          case "SUBWAY":
            return 'Prendre le Métro en partance de <b>' + ptLeg.ptdeparture.name + '</b> et en direction de <b>' + ptLeg.direction + '</b><br>' + "Descendre à <b>" + ptLeg.ptarrival.name + '</b>' + '<br><small>Durée estimée : ' + duration.format('m[m] s[s]') + '</small>';
          case "WAITING":
            return 'Veuillez attendre ' + duration.format('m') + ' minutes';
          default:
            return ''
        }
      }
    }
  }
</script>
