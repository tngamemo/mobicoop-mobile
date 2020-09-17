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
        <h1 class="ion-text-center">{{$t(`Search.${type}`) }}</h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" no-bounce>
      <div class="mc-white-container">
        <ion-item>
          <ion-input
            ref="inputSearch"
            type="text"
            name="date"
            v-bind:placeholder="$t('Search.placeHolder')"
            @input="submitSearch($event)"
          ></ion-input>
          <ion-icon
            size="large"
            color="primary"
            class="rotating"
            v-if="this.$store.state.searchStore.statusGeo == 'loading'"
            name="md-sync"
          ></ion-icon>
        </ion-item>

        <div v-if="myPosition">
          <ion-item
            class="flex-card"
            v-if="myPosition.displayLabel[0]"
            v-on:click="selectGeo(myPosition)"
          >
            <div class="iconSearch">
              <ion-icon size="large" color="primary" name="locate"></ion-icon>
            </div>
            <ion-card-header>
              <ion-card-title class="mc-small-card-title">{{ myPosition.displayLabel[0] }}</ion-card-title>
              <ion-card-subtitle>
                <div>{{ myPosition.displayLabel[1] }}</div>
              </ion-card-subtitle>
            </ion-card-header>
          </ion-item>
        </div>

        <div v-for="address in this.$store.state.searchStore.resultsGeo" :key="address.key">
          <ion-item
            class="flex-card"
            v-if="address.displayLabel[0]"
            v-on:click="selectGeo(address)"
          >
            <div class="iconSearch">
              <img v-bind:src="address.icon" alt />
            </div>
            <ion-card-header>
              <ion-card-title class="mc-small-card-title">{{ address.displayLabel[0] }}</ion-card-title>
              <ion-card-subtitle>
                <div>{{ address.displayLabel[1] }}</div>
              </ion-card-subtitle>
            </ion-card-header>
          </ion-item>
        </div>

        <p class="mc-carpool-previousSearch" v-if="this.$store.getters.previousSearch.length > 0">Recherches précédentes</p>
        <div v-for="address in this.$store.getters.previousSearch" :key="address.key">
          <ion-item
            class="flex-card"
            v-if="address.displayLabel[0]"
            v-on:click="selectGeo(address)"
          >
            <div class="iconSearch">
              <img v-bind:src="address.icon" alt />
            </div>
            <ion-card-header>
              <ion-card-title class="mc-small-card-title">{{ address.displayLabel[0] }}</ion-card-title>
              <ion-card-subtitle>
                <div>{{ address.displayLabel[1] }}</div>
              </ion-card-subtitle>
            </ion-card-header>
          </ion-item>
        </div>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">

.mc-carpool-previousSearch {
  margin-bottom: 0px;
}

.flex-card {
  display: flex;
  align-items: center;

  & .iconSearch {
    width: 30px;
    margin-left: 20px;
  }
}

  .mc-small-card-title {
    font-size: 19px;
  }
</style>

<script>
import { toast } from "../../Shared/Mixin/toast.mixin";
import { address } from "../../Shared/Mixin/address.mixin";
import { Plugins } from '@capacitor/core';
import {isPlatform} from "@ionic/core";
const { Geolocation } = Plugins;

export default {
  name: "geo-search",
  mixins: [toast, address],
  components: {},
  created() {
    this.$store.state.searchStore.resultsGeo = [];
    this.unwatch = this.$store.watch(
      (state, getters) => getters.addressessUseToPost,
      (newValue, oldValue) => {
        this.$store.dispatch("treatementUpdateAddresses");
      }
    );
    if(isPlatform(window.document.defaultView, "capacitor")) {
      this.getMyPosition();
    }
  },
  beforeDestroy() {
    this.unwatch();
  },
  data() {
    return {
      type: this.$route.query.type,
      action: this.$route.query.action,
      index: this.$route.query.index,
      myPosition: null
    };
  },

  methods: {
    submitSearch: function(event) {
      if (this.searchTimeout) clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        const searchQuery = event.target.value;
        if (!!searchQuery) {
          this.$store.dispatch("geoSearch", { searchQuery }).catch(err => {
            this.presentToast("Une erreur est survenue", "danger");
          });
        }
      }, 500);
    },

    async getMyPosition() {
      const coordinates = await Geolocation.getCurrentPosition();
      this.$store.dispatch("getAddressesByCoordinate", {latitude: coordinates.coords.latitude.toString(), longitude: coordinates.coords.longitude.toString()}).then(res => {
        if (res.data['hydra:member'].length > 0) {
          this.myPosition = res.data['hydra:member'][0];
        }
      }).catch(err => {

      });
    },

    selectGeo: function(address) {
      let addressDTO = address;
      this.$store.dispatch('setPreviousSearch', address);
      let displayGeo = this.formatAddress(address);
      switch (this.action) {
        case "search": {
          switch (this.type) {
            case "origin": {
              this.$store.commit("changeOrigin", { addressDTO, displayGeo });
              break;
            }

            case "destination": {
              this.$store.commit("changeDestination", {
                addressDTO,
                displayGeo
              });
              break;
            }

            case "register_address": {
              this.$store.commit("changeRegisterAddress", {
                addressDTO,
                displayGeo
              });
              break;
            }

            case "update_user_address": {
              this.$store.commit("updateUserAddress", {
                addressDTO,
                displayGeo
              });
              break;
            }

            case "update_community_address": {
              this.$store.commit("updateCommunityAddress", {
                addressDTO,
                displayGeo
              });
              break;
            }

            case "update_event_address": {
              this.$store.commit("updateEventAddress", {
                addressDTO,
                displayGeo
              });
              break;
            }
          }
          break;
        }

        case "post": {
          switch (this.type) {
            case "origin": {
              this.$store.commit("addPostCarpoolOrigin", { addressDTO });
              break;
            }

            case "destination": {
              this.$store.commit("addPostCarpoolDestination", { addressDTO });
              break;
            }

            case "step": {
              this.$store.commit("addPostCarpoolStep", {
                addressDTO,
                index: this.index
              });
              break;
            }
          }
          break;
        }

        case "solidaryTransport.search": {
          this.$store.commit("solidaryAddressUpdate", address)

          switch (this.type) {
            case "register": {
              this.$store.commit("solidaryUserAddressUpdate", address)
              break;
            }

            case "request.home": {
              this.$store.commit("solidaryRequestHomeAddressUpdate", address)
              break;
            }

            case "request.origin": {
              this.$store.commit("solidaryRequestOriginAddressUpdate", address)
              break;
            }

            case "request.destination": {
              this.$store.commit("solidaryRequestDestinationAddressUpdate", address)
              break;
            }

            case "volunteer.home": {
              this.$store.commit("solidaryVolunteerHomeAddressUpdate", address)
              break;
            }
            case "user.home": {
              this.$store.commit("updateUserAddress", {addressDTO : address});
              break;
            }
          }
          break;
        }

        default:
          break;
      }
      this.$router.back();
    }
  }
};
</script>
