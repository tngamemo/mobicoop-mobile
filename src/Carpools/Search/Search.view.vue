<template>
  <div class="ion-page">
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center"> {{ $t('Search.titlePage')}} </h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary">

      <RecapSearch />

      <div class="mc-white-container" style="min-height: 100%">
        <div class="ion-text-center">
          <ion-icon size="large" color="primary" class="rotating" v-if="getStatusOfSearch == 'loading'" name="md-sync"></ion-icon>
        </div>

        <div class="ion-text-center" v-if="getStatusOfSearch == 'error'">
          {{ $t('Search.error')}}
        </div>

        <div class="" v-if="getStatusOfSearch == 'success'">
          <div class="ion-margin-bottom"> {{numberOfResultsSearch}} {{ $t('Search.nbResult')}}</div>
          <div v-for="(result, index) in this.$store.getters.resultSearch" :key="index" v-on:click="goToDetailCarpool(index)">
            <CarpoolItem :carpool="getFormattedCarpoolItem(result)" :type="'search'" />
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

  export default {
    name: 'search',
    components: {
      RecapSearch,
      CarpoolItem
    },
    computed: {
      numberOfResultsSearch(){
        return this.$store.getters.resultSearch.length;
      },

      getStatusOfSearch() {
        return this.$store.getters.statusSearch;
      }
    },
    created() {
      this.$store.dispatch('searchCarpools', this.$route.params.filters)
    },
    data () {
      return {

      }
    },

    methods: {
      getFormattedCarpoolItem(carpool) {
        return new CarpoolItemDTO().carpoolItemFromSearch(carpool)
      },

      goToDetailCarpool(index) {
        this.$router.push({ name: 'carpool-detail', params: { param: index } });
      }
    }
  }
</script>
