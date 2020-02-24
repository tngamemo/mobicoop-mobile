<template>
  <div class="ion-page">
    <ion-header no-border>
      <ion-toolbar color="background">
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center"> Résultats de recherche </h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary">

      <RecapSearch />

      <div class="mc-white-container" style="height: 100%">
        <div class="ion-text-center">
          <ion-icon size="large" color="background" class="rotating" v-if="getStatusOfSearch == 'loading'" name="md-sync"></ion-icon>
        </div>

        <div class="ion-text-center" v-if="getStatusOfSearch == 'error'">
          Une erreur est survenue durant la recherche. Veuillez réessayer ultérieurement.
        </div>

        <div class="" v-if="getStatusOfSearch == 'success'">
          {{numberOfResultsSearch}} annonces en covoiturages trouvées
        </div>


      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">

</style>

<script>

  import RecapSearch from './Components/RecapSearch.component';

  export default {
    name: 'search',
    components: {
      RecapSearch
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
      this.$store.dispatch('searchCarpools')
    },
    data () {
      return {

      }
    },

    methods: {

    }
  }
</script>
