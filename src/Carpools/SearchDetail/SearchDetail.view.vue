<template>
  <div class="ion-page">
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center">{{ $t('SearchDetail.title')}}</h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" no-bounce>
      <div class="mc-white-container">
      <RecapCarpool
      v-if="carpoolRecap"
      ref="recap"
      :recap="carpoolRecap"
    ></RecapCarpool>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
</style>

<script>
import { toast } from "../../Shared/Mixin/toast.mixin";
import RecapCarpool from "../Shared/Components/RecapCarpool.component";
import RecapCarpoolDTO from "../Shared/RecapCarpoolDTO";

export default {
  name: "carpool-search-detail",
  mixins: [toast],
  components: {
    RecapCarpool
  },
  data() {
    return {
      carpoolSelected: null,
      carpoolRecap: null
    };
  },
  created() {
    this.getCarpoolAsk();
  },
  computed: {},

  methods: {
    async getCarpoolAsk() {
      const index = this.$route.params.id;
      this.carpoolSelected = this.$store.getters.resultSearch[index];


      let resultDriverOrPassenger = this.carpoolSelected.resultDriver ;
      if (! !!resultDriverOrPassenger) resultDriverOrPassenger = this.carpoolSelected.resultPassenger;
      const addresses = resultDriverOrPassenger.outward.waypoints.map(a => a.address);

      const resDirectPoint = await this.$store.dispatch('getDirectPointSearch', {addresses});
      this.carpoolRecap = new RecapCarpoolDTO().fromCarpoolSearch(this.carpoolSelected, resDirectPoint.data['hydra:member'][0].directPoints)
    }
  }
};
</script>
