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
        <div class="ion-text-center">
          <ion-icon
            size="large"
            color="primary"
            class="rotating"
            v-if="!carpoolRecap"
            name="md-sync"
          ></ion-icon>
        </div>

        <RecapCarpool v-if="carpoolRecap" ref="recap" :recap="carpoolRecap"></RecapCarpool>

        <div class="mc-searchDetail-action" v-if="carpoolRecap">
          <div
            class="d-flex align-center"
            v-if="carpoolSelected.acceptedAsk || carpoolSelected.pendingAsk"
          >
            <ion-icon name="warning" size="large" color="warning"></ion-icon>
            <ion-text color="warning">Vous avez déjà fait une demande sur cette annonce.</ion-text>
          </div>

          <div class="mc-searchDetail-button-action">
            <ion-button class="mc-big-button" color="primary" expand="block" fill="outline">
              <ion-icon name="call" class="ion-padding-end"></ion-icon>
              {{ $t('SearchDetail.call') }}
            </ion-button>

            <ion-button
              class="mc-big-button"
              color="primary"
              expand="block"
              fill="outline"
              @click="goToPostCarpool()"
            >
              <ion-icon name="mail" class="ion-padding-end"></ion-icon>
              {{ $t('SearchDetail.contact') }}
            </ion-button>

            <ion-button
              v-if="carpoolRecap.frequency == 2"
              class="mc-big-button"
              color="success"
              expand="block"
              v-on:click="goToAskCarpool()"
            >
              <ion-icon name="checkmark" class="ion-padding-end"></ion-icon>
              {{ $t('SearchDetail.ask') }}
            </ion-button>

            <ion-button
              v-if="carpoolRecap.frequency == 2"
              class="mc-big-button"
              color="success"
              expand="block"
              v-on:click="goToAskCarpool()"
            >
              <ion-icon name="checkmark" class="ion-padding-end"></ion-icon>
              {{ $t('SearchDetail.ask') }}
            </ion-button>

            <ion-button
              v-if="!! carpoolSelected.resultDriver"
              class="mc-big-button"
              color="success"
              expand="block"
              v-on:click="askCarpool(1)"
            >
              <ion-icon
                size="large"
                color="background"
                class="rotating"
                v-if="$store.state.carpoolStore.statusCarpoolAskPost == 'loading'"
                name="md-sync"
              ></ion-icon>
              <div v-if="$store.state.carpoolStore.statusCarpoolAskPost != 'loading'">
                <ion-icon name="checkmark" class="ion-padding-end"></ion-icon>
                {{ $t('SearchDetail.askAsDriver') }}
              </div>
            </ion-button>

            <ion-button
              v-if="!! carpoolSelected.resultPassenger"
              class="mc-big-button"
              color="success"
              expand="block"
              v-on:click="askCarpool(2)"
            >
              <ion-icon
                size="large"
                color="background"
                class="rotating"
                v-if="$store.state.carpoolStore.statusCarpoolAskPost == 'loading'"
                name="md-sync"
              ></ion-icon>
              <div v-if="$store.state.carpoolStore.statusCarpoolAskPost != 'loading'">
                <ion-icon name="checkmark" class="ion-padding-end"></ion-icon>
                {{ $t('SearchDetail.askAsPassenger') }}
              </div>
            </ion-button>
          </div>
        </div>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
.mc-searchDetail-action {
  margin-top: 50px;
}
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
    this.getCarpoolAskFromSearch();
  },
  computed: {},

  methods: {
    async getCarpoolAskFromSearch() {
      this.index = this.$route.params.id;
      this.carpoolSelected = this.$store.getters.resultSearch[this.index];

      if (!!this.carpoolSelected) {
        let resultDriverOrPassenger = this.carpoolSelected.resultDriver;
        if (!!!resultDriverOrPassenger)
          resultDriverOrPassenger = this.carpoolSelected.resultPassenger;
        const addresses = resultDriverOrPassenger.outward.waypoints.map(
          a => a.address
        );

        const resDirectPoint = await this.$store.dispatch(
          "getDirectPointSearch",
          { addresses }
        );

        this.carpoolRecap = new RecapCarpoolDTO().fromCarpoolSearch(
          this.carpoolSelected,
          resDirectPoint.data["hydra:member"][0].directPoints
        );
      } else {
        this.$router.push({ name: "carpoolsHome" });
      }
    },

    getResultDriveOrPassenger() {
      let result = this.carpoolSelected.resultDriver;
      if (!!!result) result = this.carpoolSelected.resultPassenger;

      return result;
    },

    goToAskCarpool() {
      if (this.carpoolSelected.frequency == 2) {
        this.$router.push({ name: "ask-carpool", id: this.index });
      }
    },

    askCarpool(role) {
      if (this.carpoolSelected.frequency == 1) {
        const resultDriverOrPassenger = this.getResultDriveOrPassenger();
        const adId = resultDriverOrPassenger.outward.proposalId;
        const matchingId = resultDriverOrPassenger.outward.matchingId;

        let ask = {};
        ask.role = role;
        ask.paused = false;
        ask.matchingId = matchingId;
        ask.adId = adId;

        this.$store
          .dispatch("postAskCarpool", ask)
          .then(res => {
            this.presentToast(this.$t("AskCarpool.success"), "success");

            this.$router.push({ name: "carpoolsHome" });
          })
          .catch(err => {
            console.log(err);
            this.presentToast(this.$t("Commons.error"), "danger");
          });
      }
    }
  }
};
</script>
