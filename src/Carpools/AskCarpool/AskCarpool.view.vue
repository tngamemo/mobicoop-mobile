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
          <div class="mc-carpool-ask-firstStep">
            <div class="mc-carpool-ask-question">
              <p>
                <b>Je souhaite covoiturer pour...</b>
              </p>
              <p>Sélectionnez le ou les trajets souhaités</p>
            </div>
            <div class="d-flex mc-ask-carpool-buttons">
              <div
                class="mc-button-step flex-1"
                v-bind:class="{ 'button-step-selected': outwardSelected == true }"
                color="primary"
                expand="block"
                v-on:click="selectOutward()"
              >Aller</div>

              <div
                class="mc-button-step flex-1"
                v-bind:class="{ 'button-step-selected': returnSelected == true }"
                color="primary"
                expand="block"
                v-on:click="selectReturn()"
              >Retour</div>
            </div>
            <div class="mc-ask-select-outward" v-if="outwardSelected">
              <div class="mc-ask-header">L'aller</div>
              <div class="mc-ask-outward-choose-day">
                <div v-for="(item, index) in getOutwardDay()" v-bind:key="index">
                  <ion-item>
                    <ion-label>{{ $t(`${item.trad}`) }}: {{item.time}} </ion-label>
                    <ion-checkbox
                      slot="end"
                      :disabled="!item.value"
                    ></ion-checkbox>
                  </ion-item>
                </div>
              </div>
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
  .mc-carpool-ask-firstStep {
    color: var(--ion-color-primary);

    .mc-carpool-ask-question,
    .mc-ask-carpool-buttons {
      padding: 10px 20px;
    }
    p {
      margin: 0;
    }

    .mc-ask-outward-choose-day{
      background: rgba(var(--ion-color-primary-rgb), 0.1);
      padding: 20px;
    }

    .mc-button-step {
      text-align: center;
      justify-content: center;
      align-items: center;
      display: flex;
      border: 2px solid;
      border-radius: 40px;
      padding: 10px;
      cursor: pointer;
      font-weight: bold;
    }

    .button-step-selected {
      background: var(--ion-color-success);
      color: white;
    }

    .mc-ask-header {
      background: #f5f6fa;
      text-align: center;
      font-weight: bold;
      padding: 10px;
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
      hasReturn: false,
      outwardSelected: false,
      returnSelected: false
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
      this.carpoolRecap = new RecapCarpoolDTO().fromAskCarpool(
        this.carpoolSelected
      );

      this.checkDaySlot();
    },

    checkDaySlot() {
      const result = this.getResultDriveOrPassenger();
      this.hasOutward = !!result.outward;
      this.hasReturn = !!result.return;
    },

    selectOutward() {
      this.outwardSelected = !this.outwardSelected;
    },

    selectReturn() {
      this.returnSelected = !this.returnSelected;
    },

    getResultDriveOrPassenger() {
      let result = this.carpoolSelected.resultDriver;
      if (!!!result) result = this.carpoolSelected.resultPassenger;

      return result;
    },

    getOutwardDay() {
      const resultDriverOrPassenger = this.getResultDriveOrPassenger();
      console.log(resultDriverOrPassenger.outward.wedCheck);
      if (!!resultDriverOrPassenger.outward) {
        const result = [];
        result.push({
          trad: "Carpool.L",
          value: !!resultDriverOrPassenger.outward.monCheck,
          time:
            !!resultDriverOrPassenger.outward.monTime &&
            this.$moment(resultDriverOrPassenger.outward.monTime).format(
              "HH:mm"
            )
        });
        result.push({
          trad: "Carpool.Ma",
          value: !!resultDriverOrPassenger.outward.tueCheck,
          time:
            !!resultDriverOrPassenger.outward.tueTime &&
            this.$moment(resultDriverOrPassenger.outward.tueTime).format(
              "HH:mm"
            )
        });
        result.push({
          trad: "Carpool.Me",
          value: !!resultDriverOrPassenger.outward.wedCheck,
          time:
            !!resultDriverOrPassenger.outward.wedTime &&
            this.$moment(resultDriverOrPassenger.outward.wedTime).format(
              "HH:mm"
            )
        });
        result.push({
          trad: "Carpool.J",
          value: !!resultDriverOrPassenger.outward.thuCheck,
          time:
            !!resultDriverOrPassenger.outward.thuTime &&
            this.$moment(resultDriverOrPassenger.outward.thuTime).format(
              "HH:mm"
            )
        });
        result.push({
          trad: "Carpool.V",
          value: !!resultDriverOrPassenger.outward.friCheck,
          time:
            !!resultDriverOrPassenger.outward.friTime &&
            this.$moment(resultDriverOrPassenger.outward.friTime).format(
              "HH:mm"
            )
        });
        result.push({
          trad: "Carpool.S",
          value: !!resultDriverOrPassenger.outward.satCheck,
          time:
            !!resultDriverOrPassenger.outward.satTime &&
            this.$moment(resultDriverOrPassenger.outward.satTime).format(
              "HH:mm"
            )
        });
        result.push({
          trad: "Carpool.D",
          value: !!resultDriverOrPassenger.outward.sunCheck,
          time:
            !!resultDriverOrPassenger.outward.sunTime &&
            this.$moment(resultDriverOrPassenger.outward.sunTime).format(
              "HH:mm"
            )
        });

        return result;
      }
    }
  }
};
</script>
