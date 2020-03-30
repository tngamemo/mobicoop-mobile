<template>
  <div class="ion-page">
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center">{{ $t('AskCarpool.title')}}</h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" no-bounce>
      <div class="mc-white-container mc-carpool-ask">
        <div>
          <div class="mc-carpool-ask-select-role" v-if="step == 1">
            <p>{{ $t('AskCarpool.askRole')}}</p>
            <div class="mc-carpool-role-choose d-flex">
              <div
                class="mc-button-role flex-1"
                v-bind:class="{ 'button-role-selected': roleSelected == 1 }"
                color="primary"
                expand="block"
                v-on:click="selectRole('driver')"
              >
                <ion-icon size="large" name="car"></ion-icon>
                <p>{{ $t('AskCarpool.driver')}}</p>
              </div>
              <div
                class="mc-button-role flex-1"
                v-bind:class="{ 'button-role-selected': roleSelected == 2 }"
                color="primary"
                expand="block"
                v-on:click="selectRole('passenger')"
              >
                <ion-icon size="large" name="person"></ion-icon>
                <p>{{ $t('AskCarpool.passenger')}}</p>
              </div>
            </div>
          </div>

          <ion-button
            v-if="this.step== 1"
            class="mc-big-button mc-button-nextStep"
            color="success"
            expand="block"
            v-on:click="goToNextStep()"
          >
            <ion-icon name="checkmark" class="ion-padding-end"></ion-icon>
            {{ $t('AskCarpool.chooseRole')}}
          </ion-button>
        </div>

        <div>
          <div class="mc-carpool-ask-recap" v-if="step == 2">
            <RecapCarpool
              v-if="carpoolRecap"
              ref="recap"
              :recap="carpoolRecap"
              :type="'askCarpool'"
            ></RecapCarpool>

            <div class="mc-carpool-ask-firstStep">
              <div class="mc-carpool-ask-question">
                <p>
                  <b>{{ $t('AskCarpool.askSchedule')}}</b>
                </p>
                <p>{{ $t('AskCarpool.askScheduleSubQuestion')}}</p>
              </div>
              <div class="d-flex mc-ask-carpool-buttons">
                <div
                  class="mc-button-sched flex-1"
                  v-bind:class="{ 'button-sched-selected': outwardSelected == true }"
                  color="primary"
                  expand="block"
                  v-on:click="selectOutward()"
                >{{ $t('AskCarpool.outward')}}</div>

                <div
                  class="mc-button-sched flex-1"
                  v-bind:class="{ 'button-sched-selected': returnSelected == true }"
                  color="primary"
                  expand="block"
                  v-on:click="selectReturn()"
                >{{ $t('AskCarpool.return')}}</div>
              </div>
              <div class="mc-ask-select-outward" v-if="outwardSelected">
                <div class="mc-ask-header">{{ $t('AskCarpool.outward')}}</div>
                <div class="mc-ask-outward-choose-day">
                  <div v-for="(item, index) in getOutwardOrReturnDay('outward')" v-bind:key="index">
                    <ion-item>
                      <ion-label>{{ $t(`${item.trad}`) }}: {{item.time}}</ion-label>
                      <ion-checkbox
                        slot="end"
                        :disabled="!item.value"
                        @ionChange="setSchedule($event, item, 'outwardTime')"
                      ></ion-checkbox>
                    </ion-item>
                  </div>
                </div>
              </div>

              <div class="mc-ask-select-outward" v-if="returnSelected">
                <div class="mc-ask-header">{{ $t('AskCarpool.return')}}</div>
                <div class="mc-ask-outward-choose-day">
                  <div v-for="(item, index) in getOutwardOrReturnDay('return')" v-bind:key="index">
                    <ion-item>
                      <ion-label>{{ $t(`${item.trad}`) }}: {{item.time}}</ion-label>
                      <ion-checkbox
                        slot="end"
                        :disabled="!item.value"
                        @ionChange="setSchedule($event, item, 'returnTime')"
                      ></ion-checkbox>
                    </ion-item>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ion-button
            v-if="this.step == 2"
            class="mc-big-button mc-button-nextStep"
            color="success"
            expand="block"
            :disabled="disabledStepSched"
            v-on:click="goToNextStep()"
          >
            <ion-icon name="checkmark" class="ion-padding-end"></ion-icon>
            {{ $t('AskCarpool.chooseSchedule')}}
          </ion-button>
        </div>

        <div>
          <div class="mc-carpool-ask-select-time" v-if="step == 3">
            <div class="mc-carpool-ask-container">
              <p>{{ $t('AskCarpool.askDate')}}</p>
              <div class="mc-carpool-time-choose d-flex">
                <ion-radio-group @ionChange="changeDateOption($event.target.value)">
                  <ion-item lines="none">
                    <ion-radio value="1" :checked="dateOption == 1"></ion-radio>
                    <ion-label>{{ $t('AskCarpool.week')}}</ion-label>
                  </ion-item>
                  <ion-item lines="none">
                    <ion-radio value="2" :checked="dateOption == 2"></ion-radio>
                    <ion-label>{{ $t('AskCarpool.month')}}</ion-label>
                  </ion-item>
                  <ion-item lines="none">
                    <ion-radio value="3" :checked="dateOption == 3"></ion-radio>
                    <ion-label>{{ $t('AskCarpool.specificDate')}}</ion-label>
                  </ion-item>
                </ion-radio-group>
              </div>
            </div>
            <div class="mc-ask-timeBegin">
              <div class="mc-ask-header">{{ $t('AskCarpool.outWardDate')}}</div>
              <ion-item>
                <ion-datetime
                  display-format="DD/MM/YY"
                  picker-format="DD/MM/YY"
                  cancel-text="Annuler"
                  done-text="Valider"
                  :placeholder="$t('PostCarpool.dayOutward')"
                  :value="outwardDate"
                  @ionChange="changeOutwardDate($event)"
                ></ion-datetime>
              </ion-item>
            </div>

            <div class="mc-ask-timeEnd" v-if="dateOption == 3">
              <div class="mc-ask-header">{{ $t('AskCarpool.outwardLimitDate')}}</div>
              <ion-item>
                <ion-datetime
                  display-format="DD/MM/YY"
                  picker-format="DD/MM/YY"
                  cancel-text="Annuler"
                  done-text="Valider"
                  :placeholder="$t('PostCarpool.dayOutward')"
                  :value="outwardLimitDate"
                  @ionChange="changeOutwardLimitDate($event)"
                ></ion-datetime>
              </ion-item>
            </div>
          </div>

          <ion-button
            v-if="this.step== 3"
            class="mc-big-button mc-button-nextStep"
            color="success"
            expand="block"
            v-on:click="askCarpool()"
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
              {{ $t('AskCarpool.ask')}}
            </div>
          </ion-button>
        </div>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
.mc-carpool-ask {
  .mc-button-nextStep {
    margin-top: 40px;
  }

  .mc-carpool-ask-select-time {
    background: rgba(var(--ion-color-primary-rgb), 0.1);
    border-radius: 20px;
    color: var(--ion-color-primary);
    font-weight: bold;
  }

  .mc-carpool-ask-container {
    padding: 10px 20px;
  }

  .mc-carpool-ask-select-role {
    background: rgba(var(--ion-color-primary-rgb), 0.1);
    border-radius: 20px;
    padding: 10px 20px;
    color: var(--ion-color-primary);
    font-weight: bold;

    .mc-button-role {
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

    .button-role-selected {
      background: var(--ion-color-success);
      color: white;
    }
  }

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

      .mc-ask-outward-choose-day {
        padding: 20px;
      }

      .mc-button-sched {
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

      .button-sched-selected {
        background: var(--ion-color-success);
        color: white;
      }
    }
  }

  .mc-ask-header {
    background: #f5f6fa;
    text-align: center;
    font-weight: bold;
    padding: 10px;
  }
  ion-item {
    --background: rgba(0, 0, 0, 0);
    color: var(--ion-color-primary);
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
      step: 1,
      carpoolSelected: null,
      carpoolRecap: null,
      hasOutward: false,
      hasReturn: false,
      outwardSelected: false,
      returnSelected: false,
      scheduleSelected: [],
      roleSelected: 1,
      dateOption: 1,
      disabledStepSched: true,
      outwardDate: new Date(),
      outwardLimitDate: null
    };
  },
  created() {
    this.getCarpoolAsk();

    this.initRole();

    this.outwardLimitDate = new Date(
      this.outwardDate.getFullYear(),
      this.outwardDate.getMonth(),
      this.outwardDate.getDate() + 7
    );
  },
  computed: {},

  methods: {
    getCarpoolAsk() {
      this.fromMessage = this.$route.params.param == "fromMessage";
      if (this.fromMessage) {
        this.carpoolSelected = this.$store.getters.askFromMessage.results[0];
        this.askFromMessage = this.$store.getters.askFromMessage;
      } else {
        const index = this.$route.params.param;
        this.carpoolSelected = this.$store.getters.resultSearch[index];
      }

      if (!!this.carpoolSelected) {
        this.carpoolRecap = new RecapCarpoolDTO().fromAskCarpool(
          this.carpoolSelected
        );

        this.checkDaySlot();
      } else {
        this.$router.push({ name: "carpoolsHome" });
      }
    },

    checkDaySlot() {
      const result = this.getResultDriveOrPassenger();
      this.hasOutward = !!result.outward;
      this.hasReturn = !!result.return;
    },

    initRole() {
      if (
        !!this.carpoolSelected.resultDriver &&
        !!!this.carpoolSelected.resultPassenger
      ) {
        this.roleSelected = 1;
        this.step = 2;
      } else if (
        !!!this.carpoolSelected.resultDriver &&
        !!this.carpoolSelected.resultPassenger
      ) {
        this.roleSelected = 2;
        this.step = 2;
      }
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

    getOutwardOrReturnDay(type) {
      const resultDriverOrPassenger = this.getResultDriveOrPassenger();
      if (!!resultDriverOrPassenger[type]) {
        const result = [];
        result.push({
          name: "mon",
          trad: "Carpool.L",
          value: !!resultDriverOrPassenger[type].monCheck,
          time:
            !!resultDriverOrPassenger[type].monTime &&
            this.$moment(resultDriverOrPassenger[type].monTime).format("HH:mm")
        });
        result.push({
          name: "tue",
          trad: "Carpool.Ma",
          value: !!resultDriverOrPassenger[type].tueCheck,
          time:
            !!resultDriverOrPassenger[type].tueTime &&
            this.$moment(resultDriverOrPassenger[type].tueTime).format("HH:mm")
        });
        result.push({
          name: "wed",
          trad: "Carpool.Me",
          value: !!resultDriverOrPassenger[type].wedCheck,
          time:
            !!resultDriverOrPassenger[type].wedTime &&
            this.$moment(resultDriverOrPassenger[type].wedTime).format("HH:mm")
        });
        result.push({
          name: "thu",
          trad: "Carpool.J",
          value: !!resultDriverOrPassenger[type].thuCheck,
          time:
            !!resultDriverOrPassenger[type].thuTime &&
            this.$moment(resultDriverOrPassenger[type].thuTime).format("HH:mm")
        });
        result.push({
          name: "fri",
          trad: "Carpool.V",
          value: !!resultDriverOrPassenger[type].friCheck,
          time:
            !!resultDriverOrPassenger[type].friTime &&
            this.$moment(resultDriverOrPassenger[type].friTime).format("HH:mm")
        });
        result.push({
          name: "sat",
          trad: "Carpool.S",
          value: !!resultDriverOrPassenger[type].satCheck,
          time:
            !!resultDriverOrPassenger[type].satTime &&
            this.$moment(resultDriverOrPassenger[type].satTime).format("HH:mm")
        });
        result.push({
          name: "sun",
          trad: "Carpool.D",
          value: !!resultDriverOrPassenger[type].sunCheck,
          time:
            !!resultDriverOrPassenger[type].sunTime &&
            this.$moment(resultDriverOrPassenger[type].sunTime).format("HH:mm")
        });

        return result;
      }
    },

    setSchedule($event, item, type) {
      // On regarde si on a déja ajouter l'object
      let object = this.scheduleSelected.find(sched =>
        sched.hasOwnProperty(item.name)
      );

      // Si l'object n'existe pas
      if (!!!object) {
        object = {};
        this.scheduleSelected.push(object);
      }

      // On ajoute ou supprime l'heure en fonction
      object[item.name] = true;
      if ($event.currentTarget.checked) {
        object[type] = item.time;
      } else {
        object[type] = "";
      }

      this.checkSchedule();
    },

    checkSchedule() {
      this.scheduleSelected = this.scheduleSelected.filter(sched => {
        if (!!sched.outwardTime || !!sched.returnTime) {
          if (!!!sched.outwardTime) {
            sched.outwardTime = "";
          }
          if (!!!sched.returnTime) {
            sched.returnTime = "";
          }
          return sched;
        }
      });

      this.disabledStepSched = this.scheduleSelected.length < 1;
    },

    selectRole(role) {
      if (role == "driver") {
        this.roleSelected = 1;
      } else {
        this.roleSelected = 2;
      }
    },

    goToNextStep() {
      this.step++;
    },

    changeDateOption(value) {
      this.dateOption = value;
      this.changeLimitDateByOutward();
    },

    changeLimitDateByOutward() {
      if (this.dateOption == 1) {
        this.outwardLimitDate = new Date(
          this.outwardDate.getFullYear(),
          this.outwardDate.getMonth(),
          this.outwardDate.getDate() + 7
        );
      } else if (this.dateOption == 2) {
        this.outwardLimitDate = new Date(
          this.outwardDate.getFullYear(),
          this.outwardDate.getMonth() + 1,
          this.outwardDate.getDate()
        );
      }
    },

    changeOutwardDate($event) {
      this.outwardDate = new Date($event.detail.value);
      this.changeLimitDateByOutward();
    },

    changeOutwardLimitDate($event) {
      this.outwardLimitDate = new Date($event.detail.value);
    },

    askCarpool() {
      const resultDriverOrPassenger = this.getResultDriveOrPassenger();
      const adId = resultDriverOrPassenger.outward.proposalId;
      const matchingId = resultDriverOrPassenger.outward.matchingId;

      let ask = {};
      ask.schedule = this.scheduleSelected;
      ask.role = this.roleSelected;
      ask.paused = false;
      ask.outwardLimitDate = this.$moment(this.outwardLimitDate).format();
      ask.outwardDate = this.$moment(this.outwardDate).format();
      ask.matchingId = matchingId;
      ask.adId = adId;

      this.$store
        .dispatch("postAskCarpool", ask)
        .then(res => {
          this.presentToast(this.$t("AskCarpool.success"), "success");

          this.$router.push({ name: "carpoolsHome" });
        })
        .catch(err => {
          this.presentToast(this.$t("Commons.error"), "danger");
        });
    }
  }
};
</script>
