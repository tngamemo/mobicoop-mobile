<template>

  <div class="mc-home-search">

    <div class="mc-search-block">
      <form>
        <!-- Input with placeholder -->
        <ion-item  v-on:click="goGeoSearch('origin', 'search')">
          <ion-input
            type="text"
            class="no-clickable"
            :placeholder="$t('Search.origin')"
            :value="this.$store.state.searchStore.display.origin"
            >
          </ion-input>
        </ion-item>
        <ion-icon name="swap" color="background" size="large"></ion-icon>

        <!-- Input with placeholder -->
        <ion-item v-on:click="goGeoSearch('destination', 'search')">
          <ion-input
            type="text"
            class="no-clickable"
            :placeholder="$t('Search.destination')"
            :value="this.$store.state.searchStore.display.destination"
            >
          </ion-input>
        </ion-item>

        <div class="d-flex">
          <ion-item v-on:click="goGeoSearch('destination', 'search')">
            <ion-input
              type="text"
              class="no-clickable"
              :placeholder="$t('Search.destination')"
              :value="this.$store.state.searchStore.display.destination"
              >
            </ion-input>
          </ion-item>

          <ion-item>
            <ion-label>Trajet régulier</ion-label>
            <ion-checkbox slot="start"></ion-checkbox>
          </ion-item>
        </div>
      </form>
    </div>

     <ion-button class='mc-big-button' color="success" expand="block">
        {{ $t('HOME.searchCarpool') }}
      </ion-button>
      <ion-button class='mc-big-button' color="background" expand="block" fill="outline" @click="$router.push('register')">
        {{ $t('HOME.postCarpool') }}
      </ion-button>
  </div>

</template>

<style lang="scss">
  .mc-home-search {
    margin-bottom : 30px;
  }

  .no-clickable {
    pointer-events: none;
    touch-action: none;
  }

</style>

<script>

  export default {
    name: 'search-home',
    data () {
      return {}
    },
    mounted() {
    },
    methods: {
      goGeoSearch(type, action) {
        this.$router.push({ name: "geoSearch", query: { type, action } });
      },
    }
  }
</script>
