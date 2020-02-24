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
  }
</style>


<script>
  export default {
    name: 'recap-search',
    data () {
      return {}
    },
    mounted() {
    },
    computed: {
      formatedSearchDate() {
        return this.$moment(this.$store.getters.searchObject.outwardDate).format('dddd D[.]MM [à] h:mm');
      }
    },
    methods: {

      goToHome: function() {
        this.$router.push('home');
      }
    }
  }
</script>
