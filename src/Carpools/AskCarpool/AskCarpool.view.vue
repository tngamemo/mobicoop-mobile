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
        <div class="mc-carpool-ask-recap">
          <RecapCarpool v-if="carpoolRecap" ref="recap" :recap="carpoolRecap" :type="'askCarpool'"></RecapCarpool>
          <div class="mc-carpool-ask-firstQuestion">
            <p>
              <b>Je souhaite covoiturer pour...</b>
            </p>
            <p>Sélectionnez le ou les trajets souhaités</p>

            <div class="d-flex">
              <ion-button class="mc-big-button flex-1" color="primary" expand="block" fill="outline">Aller</ion-button>

              <ion-button class="mc-big-button flex-1" color="primary" expand="block" fill="outline">Retour</ion-button>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
.mc-carpool-ask-recap {
  background: rgba(var(--ion-color-primary-rgb), 0.1);
  border-radius: 20px;
  .mc-carpool-ask-firstQuestion {
    padding: 20px;
    color: var(--ion-color-primary);
    p {
      margin: 0;
    }
  }
}
</style>

<script>
import { toast } from "../../Shared/Mixin/toast.mixin";
import RecapCarpoolDTO from "../Shared/RecapCarpoolDTO";
import RecapCarpool from "../Shared/Components/RecapCarpool.component";

export default {
  name: "ask-carpool",
  mixins: [toast],
  components: { RecapCarpool },
  data() {
    return {
      carpoolSelected: null,
      carpoolRecap: null,
      hasOutward: false,
      hasReturn: false
    };
  },
  created() {
    this.getCarpoolAsk();
  },
  computed: {},

  methods: {
    getCarpoolAsk() {
      const index = this.$route.params.id;
      this.carpoolSelected = this.$store.getters.resultSearch[index];
      console.log(this.carpoolSelected);
      this.carpoolRecap = new RecapCarpoolDTO().fromAskCarpool(
        this.carpoolSelected
      );

      this.checkDaySlot();
    },

    checkDaySlot() {
      let result = carpool.resultDriver;
      if (!!!result) result = carpool.resultPassenger;

      this.hasOutward = !!result.outward;
      this.hasReturn = !!result.return;
    }
  }
};
</script>
