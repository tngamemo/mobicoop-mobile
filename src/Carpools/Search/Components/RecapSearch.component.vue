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
  <div class="mc-recap-search">
    <div class="d-flex justify-between">
      <div><span v-if="this.$store.getters.searchObject.frequency == 1">{{ formatedSearchDate }}</span></div>
      <div v-on:click="goToHome()"><ion-icon name="create"></ion-icon></div>
    </div>

    <div>
      <p>{{ this.$store.getters.displayOrigin }}</p>
      <p>{{ this.$store.getters.displayDestination }}</p>
    </div>

    <div class="mc-recap-search-filters mb-5" v-if="!!this.filters">
      <p class="mb-5">{{$t('RecapSearch.filters')}} :</p>
      <div>
        <div v-if="!!this.filters.communities" class="mc-recap-search-filter">{{$t('RecapSearch.communities')}}</div>
      </div>
    </div>

    <div>
      <ion-item lines="none" class="background-transparent">
        <ion-label class="ion-text-wrap">Voir les annonces passager</ion-label>
        <ion-toggle slot="start"
                    color="success"
                    :checked="$store.state.searchStore.searchObject.role == 3"
                    @ionChange="search($store.state.searchStore.searchObject.role == 3 ? 2 : 3)">
        </ion-toggle>
      </ion-item>
    </div>
  </div>
</template>

<style lang="scss">
  .mc-recap-search {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    margin: 30px;
    padding: 20px;

    font-weight: bold;
    color: white;

    .mc-recap-search-filters {
      border-top: 1px solid white;

      .mc-recap-search-filter {
        display: inline-block;
        border: 1px solid white;
        border-radius: 30px;
        padding: 10px;
      }
    }
  }

  .mb-5 {
    margin-bottom: 5px;
  }

  .background-transparent{
    --ion-background-color: transparent !important;
    color: white;
  }
</style>


<script>
  export default {
    name: 'recap-search',
    props: ['filters'],
    data () {
      return {}
    },
    mounted() {
    },
    computed: {
      formatedSearchDate() {
        return this.$moment(this.$store.getters.searchObject.outwardDate).format('dddd D[.]MM');
      }
    },
    methods: {
      search(role) {
        this.$store.state.searchStore.searchObject.role = role;
        this.$store.dispatch('searchCarpools', this.$route.params.filters)
      },

      goToHome: function() {
        this.$router.push('home');
      }
    }
  }
</script>
