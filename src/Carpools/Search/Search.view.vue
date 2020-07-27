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
        <div class="ion-text-center">
          <ion-icon size="large" color="primary" class="rotating" v-if="getStatusOfSearch == 'loading'" name="md-sync"></ion-icon>
        </div>

        <div class="ion-text-center" v-if="getStatusOfSearch == 'error'">
          {{ $t('Search.error')}}
        </div>

        <div class="" v-if="getStatusOfSearch == 'success'">
          <div class="ion-margin-bottom ion-text-center"> {{ $tc('Search.nbResult', numberOfResultsSearch )}}</div>
          <div v-for="(result, index) in this.$store.getters.resultSearch" :key="index" v-on:click="goToDetailCarpool(index)">
            <CarpoolItem :carpool="getFormattedCarpoolItem(result)" :type="'search'" />
          </div>
        </div>

        <div class="ion-text-center">
          <ion-icon size="large" color="primary" class="rotating" v-if="getStatusOfSearch == 'success' && getStatusOfPTSearch == 'loading'" name="md-sync"></ion-icon>
        </div>

        <div class="" v-if="getStatusOfPTSearch == 'success' && publicTransportList.length > 0">
          <div v-for="(result, index) in publicTransportList" :key="index" v-on:click="goToDetailPT(index)">
            <PublicTransportItem :pt-item="result" />
          </div>
        </div>


      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">

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

      }
    },

    methods: {
      search(role) {
        this.$store.state.searchStore.searchObject.role = role;
        this.$store.dispatch('searchCarpools', this.$route.params.filters);
        this.$store.dispatch('searchPublicTransports');
      },
      getFormattedCarpoolItem(carpool) {
        return new CarpoolItemDTO().carpoolItemFromSearch(carpool)
      },

      goToDetailCarpool(index) {
        this.$router.push({ name: 'carpool-detail', params: { param: index } });
      },

      goToDetailPT(index) {
        this.$router.push({ name: 'public-transport', params: { param: index } });
      }
    }
  }
</script>
