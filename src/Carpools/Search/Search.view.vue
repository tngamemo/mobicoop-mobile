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
          <ion-back-button default-href="/carpools/home" @click="$store.commit('reset_search_object')"></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center"> {{ $t('Search.titlePage')}} </h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary">

      <RecapSearch :filters="this.$route.params.filters" />

      <div class="mc-white-container" style="min-height: 100%">

        <ion-segment class="cp-segment" :value="tab" @ionChange="segmentChanged($event)">
          <ion-segment-button value="carpool">
            <ion-icon name="car"></ion-icon>
            <ion-badge class="cp-badge" color="secondary">{{numberOfResultsSearch}}</ion-badge>
          </ion-segment-button>
          <ion-segment-button v-if="hasSearchRdex" value="rdex">
            <ion-icon name="more"></ion-icon>
            <ion-badge class="cp-badge" color="secondary">{{numberOfResultsRdex}}</ion-badge>
          </ion-segment-button>
          <ion-segment-button  v-if="hasSearchPT" value="publicTransport">
            <ion-icon name="bus"></ion-icon>
            <ion-badge class="cp-badge" color="secondary">{{numberOfResultsPT}}</ion-badge>
          </ion-segment-button>
        </ion-segment>

        <div v-if="tab == 'carpool'">
        <div class="ion-text-center">
          <ion-icon size="large" color="primary" class="rotating" v-if="getStatusOfSearch == 'loading'" name="md-sync"></ion-icon>
        </div>

        <div class="ion-text-center" v-if="getStatusOfSearch == 'error'">
          {{ $t('Search.error')}}
        </div>

        <div class="" v-if="getStatusOfSearch == 'success'">
          <div class="ion-margin-bottom text-grey"><small> {{ $tc('Search.nbResult', numberOfResultsSearch )}} <b>sur {{getName()}}</b></small></div>
          <div v-for="(result, index) in this.$store.getters.resultSearch" :key="index" v-on:click="goToDetailCarpool(index)">
            <CarpoolItem :carpool="getFormattedCarpoolItem(result)" :type="'search'" />
          </div>
        </div>
        </div>

        <div v-if="tab == 'rdex'">
          <div class="ion-text-center">
            <ion-icon size="large" color="primary" class="rotating" v-if="getStatusOfRdex == 'loading'" name="md-sync"></ion-icon>
          </div>

          <div class="" v-if="getStatusOfRdex == 'success'">
          <div class="ion-margin-bottom text-grey"><small> {{ $tc('Search.nbResult', numberOfResultsRdex )}} <b>hors {{getName()}}</b></small></div>
          <div v-for="(result, index) in rdexList" :key="index" v-on:click="goToDetailRdex(result)">
            <CarpoolItem :carpool="getFormattedRdexCarpoolItem(result)" :type="'search'" />
          </div>
          </div>
        </div>

        <div v-if="tab == 'publicTransport'">
        <div class="ion-text-center">
          <ion-icon size="large" color="primary" class="rotating" v-if="getStatusOfPTSearch == 'loading'" name="md-sync"></ion-icon>
        </div>

        <div class="" v-if="getStatusOfPTSearch == 'success'">
          <div class="ion-margin-bottom text-grey"><small> {{ $tc('Search.nbResultPT', numberOfResultsPT )}} <b>en transport en commun</b></small></div>
          <div v-for="(result, index) in publicTransportList" :key="index" v-on:click="goToDetailPT(index)">
            <PublicTransportItem :pt-item="result" />
          </div>
        </div>
        </div>


      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
  .cp-segment {
    margin-bottom: 16px;
  }

  .text-grey {
    color: rgba(0, 0, 0, 0.6)
  }

  .cp-badge{
    transform: translateX(26px) translateY(-10px);
    position: absolute;
    font-size: 10px;
    border-radius: 9px;
    height: 18px;
    width: 18px;
    padding-top: 4px;
    padding-left: 0px;
    text-align: center;
    padding-right: 0px;
  }

  .ios .cp-badge {
    transform: translateX(26px) translateY(0px);
  }

  ion-segment-button {
    max-width: none;
  }
</style>

<script>

  import RecapSearch from './Components/RecapSearch.component';
  import CarpoolItem from '../Shared/Components/CarpoolItem.component';
  import CarpoolItemDTO from '../Shared/CarpoolItemDTO';
  import PublicTransportItem from "../Shared/Components/PublicTransportItem.component";

  export default {
    name: 'search',
    components: {
      PublicTransportItem,
      RecapSearch,
      CarpoolItem
    },
    computed: {
      numberOfResultsSearch(){
        return this.$store.getters.resultSearch.length;
      },

      getStatusOfSearch() {
        return this.$store.getters.statusSearch;
      },

      numberOfResultsRdex(){
        return this.$store.state.rdexStore.resultRdex.length;
      },

      getStatusOfRdex() {
        return this.$store.state.rdexStore.statusRdex;
      },

      rdexList() {
        return this.$store.state.rdexStore.resultRdex;
      },

      numberOfResultsPT(){
        return this.$store.state.publicTransportStore.resultSearchPT.length;
      },

      getStatusOfPTSearch() {
        return this.$store.state.publicTransportStore.statusSearchPT;
      },

      publicTransportList() {
        return this.$store.state.publicTransportStore.resultSearchPT;
      }
    },
    created() {
      this.search(2);
    },
    data () {
      return {
        tab: 'carpool',
        hasSearchPT: JSON.parse(process.env.VUE_APP_SEARCH_PT),
        hasSearchRdex: JSON.parse(process.env.VUE_APP_SEARCH_RDEX)
      }
    },

    methods: {
      segmentChanged(event) {
        this.tab = event.detail.value;
      },
      search(role) {
        this.$store.state.searchStore.searchObject.role = role;
        this.$store.dispatch('searchCarpools', this.$route.params.filters);
        if (this.hasSearchPT) {
          this.$store.dispatch('searchPublicTransports');
        }
        if (this.hasSearchPT) {
          this.$store.dispatch('searchRdex');
        }
      },
      getFormattedCarpoolItem(carpool) {
        return new CarpoolItemDTO().carpoolItemFromSearch(carpool)
      },

      getFormattedRdexCarpoolItem(carpool) {
        return new CarpoolItemDTO().carpoolItemFromRdex(carpool)
      },

      goToDetailCarpool(index) {
        this.$router.push({ name: 'carpool-detail', params: { param: index } });
      },

      goToDetailPT(index) {
        this.$router.push({ name: 'public-transport', params: { param: index } });
      },
      goToDetailRdex(carpool) {
        window.open(carpool.externalUrl + carpool.externalOrigin, '_blank');
      },
      getName() {
        return process.env.VUE_APP_NAME
      }
    }
  }
</script>
