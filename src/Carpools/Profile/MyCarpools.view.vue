<template>
  <div class="ion-page">
    <ion-header no-border>
      <ion-toolbar color="background">
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center"> {{ $t('MyCarpools.title') }} </h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="background" no-bounce>
      <div class="mc-white-container">

        <div v-for="carpool in carpools">
          <CarpoolItem :carpool="carpool" />
        </div>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">

</style>

<script>
  import CarpoolItem from "../Search/Components/CarpoolItem.component";

  export default {
    name: 'my-carpools',
    data () {
      return {

      }
    },
    components: {
      CarpoolItem
    },
    created() {
      this.$store.dispatch('getMyCarpools', this.$store.state.userStore.user.id).then(res => {}).catch(err => {});
    },
    computed: {
      carpools: {
        get() {
          console.log(this.$store.state.userStore.myCarpools);
          return this.$store.state.userStore.myCarpools
        },
      }
    },
    methods: {
    }
  }
</script>
