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
  <div class="mc-home-search">
    <div class="mc-search-block">
      <form>
        <!-- Input with placeholder -->
        <ion-item v-on:click="goGeoSearch('origin', 'search')">
          <ion-label position="floating">{{$t('Search.origin')}}</ion-label>
          <ion-input
            type="text"
            class="no-clickable ellipsis"
            :placeholder="$t('Search.origin')"
            :value="this.$store.state.searchStore.display.origin"
          ></ion-input>
        </ion-item>

        <div class="mc-div-icon-swap">
          <ion-icon
            v-on:click="swapDestinationAndOrigin()"
            class="mc-rotate-icon"
            name="swap"
            color="primary"
            size="large"
          ></ion-icon>
        </div>

        <!-- Input with placeholder -->
        <ion-item v-on:click="goGeoSearch('destination', 'search')">
          <ion-label position="floating">{{$t('Search.destination')}}</ion-label>
          <ion-input
            type="text"
            class="no-clickable ellipsis"
            :placeholder="$t('Search.destination')"
            :value="this.$store.state.searchStore.display.destination"
          ></ion-input>
        </ion-item>

        <ion-grid class="ion-margin-bottom mc-block-date">
          <ion-row>
            <ion-col size="4">
              <ion-item v-if="showDate">
                <ion-label position="floating">{{$t('Search.date')}}</ion-label>
                <ion-datetime
                  display-format="DD/MM"
                  picker-format="DD/MM"
                  cancel-text="Annuler"
                  done-text="Valider"
                  :disabled="this.$store.state.searchStore.searchObject.frequency == 2"
                  :value="this.$store.state.searchStore.searchObject.outwardDate"
                  :min="$moment().format('YYYY-MM-DD')"
                  @ionChange="changeDate($event)"
                ></ion-datetime>
              </ion-item>
            </ion-col>

            <ion-col size="2" v-if="clearDate">
              <div class="pointer"><ion-icon class="reset-color" size="large" name="close-circle" @click="resetDate()" style="margin-top: 20px"></ion-icon></div>
            </ion-col>

            <ion-col size="6" class="d-flex ion-align-items-end">
              <ion-item lines="none">
                <ion-label style="white-space: normal">Trajet régulier</ion-label>
                <ion-checkbox
                  slot="start"
                  :checked="this.$store.state.searchStore.searchObject.frequency == 2"
                  @ionChange="changeFrequency($event)"
                ></ion-checkbox>
              </ion-item>
            </ion-col>
          </ion-row>
        </ion-grid>
      </form>
    </div>

    <ion-button
      class="mc-big-button"
      color="success"
      expand="block"
      :disabled="!hasSearchOriginAndDestination"
      v-on:click="goToSearchPage()"
    >{{ $t('HOME.searchCarpool') }}</ion-button>

    <ion-button
      v-if="showPostCarpool"
      class="mc-big-button"
      color="primary"
      expand="block"
      fill="outline"
      @click="goToPostCarpool()"
    >{{ $t('HOME.postCarpool') }}</ion-button>

    <ion-button
      v-if="showPostCarpool && isCapacitor && canSeeDynamics"
      class="mc-big-button"
      color="primary"
      expand="block"
      fill="outline"
      @click="goToDynamic()"
    >{{ $t('HOME.dynamic') }}</ion-button>
  </div>
</template>

<style lang="scss">
.mc-home-search {
  margin-bottom: 30px;
}

.no-clickable {
  pointer-events: none;
  touch-action: none;
}

.mc-div-icon-swap {
  margin-top: 20px;
  .mc-rotate-icon {
    transform: rotate(90deg);
  }
}

.mc-block-date {
  margin-top: 20px;
}

ion-datetime {
  padding-left: 0px !important;
}

  .reset-color {
    // color:rgba(0, 0, 0, 0.3)
    color:var(--ion-color-primary)
  }
</style>

<script>
  import { isPlatform } from "@ionic/core";

export default {
  name: "search-home",
  props: ["showPost", "searchWithFilter", "postWithFilter", "communities", "from", "eventId"],
  data() {
    return {
      showPostCarpool: true,
      isCapacitor : isPlatform(window.document.defaultView, "capacitor"),
      showDate: true,
      clearDate: JSON.parse(process.env.VUE_APP_CAN_CLEAR_DATE),
      canSeeDynamics: JSON.parse(process.env.VUE_APP_CAN_SEE_DYNAMICS)
    };
  },
  created() {
      if (this.showPost != null) this.showPostCarpool = this.showPost;
      this.$store.dispatch('checkOutWardDate');
  },
  mounted() {},
  computed: {
    hasSearchOriginAndDestination() {
      return (
        !!this.$store.getters.searchObject.outwardWaypoints[0] &&
        !!this.$store.getters.searchObject.outwardWaypoints[1]
      );
    }
  },
  methods: {
    goGeoSearch(type, action) {
      this.$router.push({ name: "geoSearch", query: { type, action } });
    },

    /**
     * Fonction qui change la date pour la recherche
     */
    changeDate($event) {
      this.$store.state.searchStore.searchObject.outwardDate = new Date(
        $event.detail.value
      );
    },

    resetDate() {
      // this.changeDate({detail: {value: undefined}});
      this.$store.state.searchStore.searchObject.outwardDate = null;
      this.showDate = false;
      setTimeout(() => {this.showDate = true});
    },

    swapDestinationAndOrigin() {
      this.$store.dispatch("swapDestinationAndOrigin");
    },

    /**
     * Fonction qui change la frequence d'un carpooling pour la recherche
     */
    changeFrequency(event) {
      event.detail.checked
        ? (this.$store.state.searchStore.searchObject.frequency = 2)
        : (this.$store.state.searchStore.searchObject.frequency = 1);
    },

    goToSearchPage() {
      this.$store.commit('reset_search_object');

      if (this.$store.getters.userId) {
        this.$store.commit("changeUserIdOfSearch", this.$store.getters.userId);
      } else {
        this.$store.commit("changeUserIdOfSearch", null);
      }

      let filters = null;
      if (this.searchWithFilter) {
        filters = {communities: this.communities};
      }
      this.$router.push({ name: "search", params: {filters} });
    },

    goToPostCarpool() {
      const payload = {
        origin: this.$store.state.searchStore.searchObject.outwardWaypoints[0],
        destination: this.$store.state.searchStore.searchObject
          .outwardWaypoints[1],
        outwardDate: this.$store.state.searchStore.searchObject.outwardDate,
        frequency: this.$store.state.searchStore.searchObject.frequency
      };

      // Si on a un object carpoolToPost inextistant
      // if (!!!this.$store.getters.carpoolToPost) {
        this.$store.commit("carpoolPost_init");
      // }

      this.$store.commit("carpoolPost_fromSearch", payload);
      if (payload.origin || payload.outwardDate) {
        this.$store.dispatch("treatementUpdateAddresses");
      }

      let filters = {};
      if (this.postWithFilter) {
        filters = {communities: this.communities};
      }

      if (this.eventId) {
        filters = {eventId: this.eventId};
      }

      this.$router.push({name: "post-carpool", params: {filters}});
    },

    goToDynamic() {
      this.$router.push({name: "dynamic"});
    }
  }
};
</script>
