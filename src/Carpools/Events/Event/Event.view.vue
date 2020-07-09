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
          <ion-back-button default-href="/events"></ion-back-button>
        </ion-buttons>
        <h1 v-if="event" class="ion-text-center">{{ event.name}}</h1>
        <h1 v-if="!event" class="ion-text-center">{{ $t('Event.title')}}</h1>
      </ion-toolbar>
    </ion-header>

    <ion-content class="mc-carpool-event" color="primary" no-bounce>
      <div
        class="ion-text-center ion-margin-top"
        v-if="this.$store.getters.statusGetEvent == 'loading'"
      >
        <ion-icon size="large" color="light" class="rotating" name="md-sync"></ion-icon>
      </div>

      <div
        class="ion-text-center ion-margin-top"
        v-if="this.$store.getters.statusGetEvent != 'loading' && !event"
      >Une erreur est survenue</div>

      <div v-if="event">
        <div class="mc-event-avatar">
          <ion-thumbnail>
            <img :src="!!event.images[0] && event.images[0].versions.square_250" />
          </ion-thumbnail>
        </div>

        <div class="mc-event-description mc-event-padding">
          <span>{{event.description}}</span>
          <div class="d-flex justify-between">
            <span><b>Début : </b>{{event.fromDate | moment("utc", "DD/MM/YY") }}</span>
            <span><b>Fin : </b>{{event.toDate | moment("utc", "DD/MM/YY") }}</span>
          </div>
          <p class="mc-event-address">{{event.address.displayLabel[0]}}, {{event.address.displayLabel[1]}}</p>
        </div>

        <div class="mc-event-padding">
          <MiniMap :LMarker="LMarker" :LPolyline="LPolyline" />
        </div>
      </div>
      <div class="mc-white-container" v-if="event">
        <SearchQuick :from="'event'" :eventId="this.event.id"/>

        <ion-button class="mc-big-button" color="danger" expand="block" v-on:click="signalEvent()">
          <ion-icon
            size="large"
            color="light"
            class="rotating"
            name="md-sync"
            v-if="this.$store.getters.statusSignalEvent == 'loading'"
          ></ion-icon>
          <div v-if="this.$store.getters.statusSignalEvent != 'loading'">
            <ion-icon name="close" class="ion-padding-end"></ion-icon>
            {{ $t('Event.signalEvent')}}
          </div>
        </ion-button>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
.mc-carpool-event {
  .mc-event-padding {
    padding: 20px;
  }
  .mc-event-description {
    padding-bottom: 0px !important;
  }
  .mc-event-avatar {
    display: flex;
    justify-content: center;
    ion-thumbnail {
      --size: 90px;
      --border-radius: 50%;
    }
  }
  .mc-event-address {
    margin-bottom: 0;
    font-style:  italic;
    font-size: small;
  }
}
</style>

<script>
import { toast } from "../../../Shared/Mixin/toast.mixin";
import { address } from "../../../Shared/Mixin/address.mixin";
import SearchQuick from "../../Shared/Components/SearchQuick.component";
import MiniMap from "../../Shared/Components/MiniMap.component";

export default {
  name: "carpool-event",
  mixins: [toast, address],
  components: { SearchQuick, MiniMap },
  data() {
    return {
      event: "",
      eventId: null,
      LMarker: [],
      LPolyline: []
    };
  },
  created() {
    this.getSpecificEvent();
  },
  computed: {},
  methods: {
    getSpecificEvent() {
      // On récupére l'event\
      this.eventId = this.$route.params.id;
      this.$store
        .dispatch("getSpecificEvent", this.eventId)
        .then(resp => {
          this.event = resp.data;
          this.getAdsEvent();

          if (!!this.event.address) {
            this.$store.commit("changeDestination", {
              addressDTO: this.event.address,
              displayGeo: this.formatAddress(this.event.address)
            });

            this.LMarker.push({
              latlng: [
                this.event.address.latitude,
                this.event.address.longitude
              ],
              name: this.event.name
            });
          }
        })
        .catch(error => {
          this.presentToast(this.$t("Commons.error"), "danger");
        });
    },

    getAdsEvent() {
      // On récupére les communities\
      this.$store
        .dispatch("getAdsEvent", this.eventId)
        .then(resp => {
          this.constructDataMap(resp.data["hydra:member"]);
        })
        .catch(error => {
          console.log(error);
          this.presentToast(this.$t("Commons.error"), "danger");
        });
    },


    constructDataMap(data) {
      let polyline = [];
      data.forEach(element => {
        let result = [];
        element.outwardWaypoints.forEach(wayPoint => {
          result.push([wayPoint.address.latitude, wayPoint.address.longitude]);
        });

        polyline.push(result);
      });

      this.LPolyline = polyline;
    },

    signalEvent() {
      return this.$ionic.alertController
        .create({
          header: this.$t("Event.signalTitle"),
          message: this.$t("Event.signalDesc"),
          inputs: [
            {
              name: "signalEventEmail",
              id: "signalEventEmail",
              placeholder: this.$t("Event.signalEventEmail")
            },
            {
              name: "signalEventExplication",
              id: "signalEventExplication",
              placeholder: this.$t("Event.signalEventExplication")
            }
          ],
          buttons: [
            {
              text: "Annuler",
              role: "cancel",
              cssClass: "secondary",
              handler: () => {}
            },
            {
              text: "Signaler",
              handler: data => {
                if (data.signalEventEmail && data.signalEventExplication) {
                  const payload = {
                    eventId: this.eventId,
                    data: {
                      email: data.signalEventEmail,
                      description: data.signalEventExplication
                    }
                  };
                  this.$store
                    .dispatch("signalEvent", payload)
                    .then(
                      this.presentToast(this.$t("Event.signalSend"), "success")
                    );
                } else {
                  this.presentToast(this.$t("Event.missingInfo"), "danger");
                }
              }
            }
          ]
        })
        .then(a => a.present());
    }
  }
};
</script>
