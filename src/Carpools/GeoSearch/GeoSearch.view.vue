<template>
 <div class="ion-page">
  <ion-header no-border>
    <ion-toolbar color="background">
      <ion-buttons slot="start">
        <ion-back-button></ion-back-button>
      </ion-buttons>
      <h1 class="ion-text-center"> {{$t(`Search.${type}`) }} </h1>
    </ion-toolbar>
  </ion-header>

  <ion-content color="background" no-bounce>
    <div class="mc-white-container" style="height: 100%">
      <ion-item>
        <ion-input
          ref="inputSearch"
          type="text"
          name="date"
          v-bind:placeholder="$t('Search.placeHolder')"
          @input="submitSearch($event)">
        </ion-input>
        <ion-icon size="large" color="background" class="rotating" v-if="this.$store.state.searchStore.statusGeo == 'loading'" name="md-sync"></ion-icon>
      </ion-item>

      <div v-for="address in this.$store.state.searchStore.resultsGeo" :key="address.key">
        <ion-item class="flex-card" v-if="address.displayLabel[0]" v-on:click="selectGeo(address)">
          <div class='iconSearch'>
            <img v-bind:src="address.icon" alt="">
          </div>
            <ion-card-header>
              <ion-card-title>{{ address.displayLabel[0] }}</ion-card-title>
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
  .flex-card {
    display: flex;
    align-items: center;

    & .iconSearch {
      width: 30px;
      margin-left: 20px;
    }
  }
</style>

<script>
  import { toast } from '../../Shared/Mixin/toast.mixin';

  export default {
    name: 'geo-search',
    mixins: [toast],
    components: {
    },
    created () {
      this.$store.state.searchStore.resultsGeo = [];
    },
    data () {
      return {
        type: this.$route.query.type,
        action: this.$route.query.action,
      }
    },

    methods: {

      submitSearch: function(event) {
        const searchQuery = event.target.value;
        if (!! searchQuery) {
          this.$store.dispatch('geoSearch', { searchQuery }).catch(err => {
            this.presentToast("Une erreur est survenue", 'danger')
          });
        }
      },

      selectGeo: function(address) {
        const addressDTO = {
          "@id": address['@id'],
          "@type": address['@type'],
          id: address.id,
          addressLocality: address.addressLocality,
          latitude: address.latitude,
          longitude: address.longitude
        };

        const displayGeo = `${address.addressLocality}, ${address.addressCountry}`;

        if (this.action == 'search') {
          if (this.type == 'origin') {
            this.$store.commit('changeOrigin', { addressDTO, displayGeo });
          }

          if (this.type == 'destination') {
            this.$store.commit('changeDestination', { addressDTO, displayGeo });
          }
        }
        console.log(this.$store.state.searchStore.searchObject);
        this.$router.back();
      }
    }
  }
</script>
