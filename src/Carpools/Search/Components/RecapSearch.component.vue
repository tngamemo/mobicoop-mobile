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

    <div class="mc-recap-search-filters" v-if="!!this.filters">
      <p>{{$t('RecapSearch.filters')}} :</p>
      <span v-if="!!this.filters.communities" class="mc-recap-search-filter">{{$t('RecapSearch.communities')}}</span>
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
        border: 1px solid white;
        border-radius: 30px;
        padding: 10px;
      }
    }
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

      goToHome: function() {
        this.$router.push('home');
      }
    }
  }
</script>
