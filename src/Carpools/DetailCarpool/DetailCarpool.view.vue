<template>
  <div class="ion-page">
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center">{{ $t('DetailCarpool.title')}}</h1>
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

        <div class="ion-text-center" v-if="carpoolRecap && this.fromMessage">
          <ion-badge color="secondary" style="white-space: normal">
            <div v-if="askFromMessage.askStatus == 2">{{ $t('DetailCarpool.askSend')}}</div>
            <div v-if="askFromMessage.askStatus == 3">{{ $t('DetailCarpool.askSend')}}</div>
            <div v-if="askFromMessage.askStatus == 4">{{ $t('DetailCarpool.askAccepted')}}</div>
            <div v-if="askFromMessage.askStatus == 5">{{ $t('DetailCarpool.askAccepted')}}</div>
            <div v-if="askFromMessage.askStatus == 6">{{ $t('DetailCarpool.askDeclined')}}</div>
            <div v-if="askFromMessage.askStatus == 7">{{ $t('DetailCarpool.askDeclined')}}</div>
          </ion-badge>
        </div>

        <RecapCarpool v-if="carpoolRecap" ref="recap" :recap="carpoolRecap"></RecapCarpool>

        <div
          v-if="carpoolRecap && carpoolRecap.frequency == 2 && fromMessage && askFromMessage.askStatus !== 1 && !!selectedDay"
          class="mc-recap-choose-day"
        >
          <div class="mc-ask-header">{{ $t('DetailCarpool.askFor')}}</div>
          <ion-item v-for="(day, index) in selectedDay" :key="index">
            <div class="mc-choose-day d-flex justify-between">
              <b>{{$t(day.trad)}}</b>
              <span
                v-if="day.outwardTime"
              >{{ $t('DetailCarpool.outward')}} : {{day.outwardTime | moment("utc", "HH:mm")}}</span>
              <span
                v-if="day.returnTime"
              >{{ $t('DetailCarpool.return')}} : {{day.returnTime | moment("utc", "HH:mm")}}</span>
            </div>
          </ion-item>
        </div>

        <div class="mc-DetailCarpool-action" v-if="carpoolRecap">
          <div
            class="d-flex align-center"
            v-if="(carpoolSelected.acceptedAsk || carpoolSelected.pendingAsk) && !this.fromMessage"
          >
            <ion-icon name="warning" size="large" color="warning"></ion-icon>
            <ion-text color="warning">{{ $t('DetailCarpool.alreadyAsk')}}</ion-text>
          </div>

          <div
            class="mc-DetailCarpool-button-action"
            v-if="!carpoolSelected.acceptedAsk && !carpoolSelected.pendingAsk"
          >
            <ion-button
              class="mc-big-button"
              color="primary"
              expand="block"
              fill="outline"
              v-if="hasPhoneNumber"
              :href="'tel:'+ carpoolSelected.carpooler.phone"
            >
              <ion-icon name="call" class="ion-padding-end"></ion-icon>
              {{ $t('DetailCarpool.call') }}
            </ion-button>

            <ion-button
              v-if="!this.fromMessage"
              class="mc-big-button"
              color="primary"
              expand="block"
              fill="outline"
              v-on:click="contact()"
            >
              <ion-icon name="mail" class="ion-padding-end"></ion-icon>
              {{ $t('DetailCarpool.contact') }}
            </ion-button>

            <ion-button
              v-if="canSeeButton(3)"
              class="mc-big-button"
              color="success"
              expand="block"
              v-on:click="goToAskCarpool()"
            >
              <ion-icon name="checkmark" class="ion-padding-end hidden-xs"></ion-icon>
              {{ $t('DetailCarpool.ask') }}
            </ion-button>

            <ion-button
              v-if="canSeeButton(1)"
              class="mc-big-button ion-text-wrap"
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
                <ion-icon name="checkmark" class="ion-padding-end hidden-xs"></ion-icon>
                {{ $t('DetailCarpool.askAsDriver') }}
              </div>
            </ion-button>

            <ion-button
              v-if="canSeeButton(2)"
              class="mc-big-button ion-text-wrap"
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
                <ion-icon name="checkmark" class="ion-padding-end hidden-xs"></ion-icon>
                {{ $t('DetailCarpool.askAsPassenger') }}
              </div>
            </ion-button>
          </div>
        </div>

        <div
          class
          v-if="carpoolRecap && this.fromMessage && askFromMessage.canUpdateAsk "
          justify-content-center
        >
          <ion-button
            v-on:click="updateAsk(4)"
            v-if="askFromMessage.askStatus == 2"
            class="mc-big-button ion-text-wrap"
            color="success"
            expand="block"
          >
            <ion-icon
              size="large"
              color="background"
              class="rotating"
              v-if="$store.state.carpoolStore.statusCarpoolAskPost == 'loading'"
              name="md-sync"
            ></ion-icon>
            <div
              v-if="$store.state.carpoolStore.statusCarpoolAskPost != 'loading'"
            >{{ $t('DetailCarpool.acceptAsk') }}</div>
          </ion-button>
          <br />

          <ion-button
            v-on:click="updateAsk(6)"
            v-if="askFromMessage.askStatus == 2"
            class="mc-big-button ion-text-wrap"
            color="danher"
            expand="block"
          >
            <ion-icon
              size="large"
              color="background"
              class="rotating"
              v-if="$store.state.carpoolStore.statusCarpoolAskPost == 'loading'"
              name="md-sync"
            ></ion-icon>
            <div
              v-if="$store.state.carpoolStore.statusCarpoolAskPost != 'loading'"
            >{{ $t('DetailCarpool.declineAsk') }}</div>
          </ion-button>

          <ion-button
            v-on:click="updateAsk(5)"
            v-if="askFromMessage.askStatus == 3"
            class="mc-big-button ion-text-wrap"
            color="success"
            expand="block"
          >
            <ion-icon
              size="large"
              color="background"
              class="rotating"
              v-if="$store.state.carpoolStore.statusCarpoolAskPost == 'loading'"
              name="md-sync"
            ></ion-icon>
            <div
              v-if="$store.state.carpoolStore.statusCarpoolAskPost != 'loading'"
            >{{ $t('DetailCarpool.acceptAsk') }}</div>
          </ion-button>
          <br />

          <ion-button
            v-on:click="updateAsk(7)"
            v-if="askFromMessage.askStatus == 3"
            class="mc-big-button"
            color="danger"
            expand="block"
          >
            <ion-icon
              size="large"
              color="background"
              class="rotating"
              v-if="$store.state.carpoolStore.statusCarpoolAskPost == 'loading'"
              name="md-sync"
            ></ion-icon>
            <div
              v-if="$store.state.carpoolStore.statusCarpoolAskPost != 'loading'"
            >{{ $t('DetailCarpool.declineAsk') }}</div>
          </ion-button>
          <br />
        </div>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
.mc-DetailCarpool-action {
  margin-top: 50px;
}

.mc-recap-choose-day {
  background: rgba(var(--ion-color-primary-rgb), 0.1);
  border-radius: 20px;
  padding: 20px;
  color: var(--ion-color-primary);
  margin-top: 20px;
  .mc-ask-header {
    background: #f5f6fa;
    text-align: center;
    font-weight: bold;
    padding: 10px;
  }
  .mc-choose-day {
    width: 100%;
    color: var(--ion-color-primary);
  }
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
      carpoolRecap: null,
      fromMessage: false,
      askFromMessage: null,
      selectedDay: []
    };
  },
  created() {
    this.getCarpoolAsk();
  },
  computed: {
    hasPhoneNumber() {
      let result = false;
      if (!!this.carpoolSelected) {
        if (!!this.carpoolSelected && !!this.carpoolSelected.carpooler) {
          if (
            !!this.carpoolSelected.carpooler.phone &&
            this.carpoolSelected.carpooler.phoneDisplay == 2
          ) {
            result = true;
          }
        }
      }

      return result;
    }
  },

  methods: {
    async getCarpoolAsk() {
      this.fromMessage = this.$route.params.param == "fromMessage";
      if (this.fromMessage) {
        this.carpoolSelected = this.$store.getters.askFromMessage.results[0];
        this.askFromMessage = this.$store.getters.askFromMessage;
        this.setSelectedByUserDay();
      } else {
        this.index = this.$route.params.param;
        this.carpoolSelected = this.$store.getters.resultSearch[this.index];
      }

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

        if (this.fromMessage) {
          this.carpoolRecap = new RecapCarpoolDTO().fromMessage(
            this.carpoolSelected,
            resDirectPoint.data["hydra:member"][0].directPoints
          );
        } else {
          this.carpoolRecap = new RecapCarpoolDTO().fromCarpoolSearch(
            this.carpoolSelected,
            resDirectPoint.data["hydra:member"][0].directPoints
          );
        }
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
        this.$router.push({ name: "ask-carpool", param: this.index });
      }
    },

    askCarpool(role) {
      if(this.fromMessage) {
        if (role == 1) {
          this.updateAsk(2)
        } else {
          this.updateAsk(3)
        }
      } else {
        this.postAskCarpool(role)
      }
    },

    postAskCarpool(role) {
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
    },

    setSelectedByUserDay() {
      const resultDriverOrPassenger = this.getResultDriveOrPassenger();
      if (!!resultDriverOrPassenger.outward) {
        if (resultDriverOrPassenger.outward["monCheck"])
          this.pushInSelectDay(resultDriverOrPassenger, "mon", "outward");
        if (resultDriverOrPassenger.outward["tueCheck"])
          this.pushInSelectDay(resultDriverOrPassenger, "tue", "outward");
        if (resultDriverOrPassenger.outward["wedCheck"])
          this.pushInSelectDay(resultDriverOrPassenger, "wed", "outward");
        if (resultDriverOrPassenger.outward["thuCheck"])
          this.pushInSelectDay(resultDriverOrPassenger, "thu", "outward");
        if (resultDriverOrPassenger.outward["friCheck"])
          this.pushInSelectDay(resultDriverOrPassenger, "fri", "outward");
        if (resultDriverOrPassenger.outward["satCheck"])
          this.pushInSelectDay(resultDriverOrPassenger, "sat", "outward");
        if (resultDriverOrPassenger.outward["sunCheck"])
          this.pushInSelectDay(resultDriverOrPassenger, "sun", "outward");
      }

      if (!!resultDriverOrPassenger.return) {
        if (resultDriverOrPassenger.return["monCheck"])
          this.pushInSelectDay(resultDriverOrPassenger, "mon", "return");
        if (resultDriverOrPassenger.return["tueCheck"])
          this.pushInSelectDay(resultDriverOrPassenger, "tue", "return");
        if (resultDriverOrPassenger.return["wedCheck"])
          this.pushInSelectDay(resultDriverOrPassenger, "wed", "return");
        if (resultDriverOrPassenger.return["thuCheck"])
          this.pushInSelectDay(resultDriverOrPassenger, "thu", "return");
        if (resultDriverOrPassenger.return["friCheck"])
          this.pushInSelectDay(resultDriverOrPassenger, "fri", "return");
        if (resultDriverOrPassenger.return["satCheck"])
          this.pushInSelectDay(resultDriverOrPassenger, "sat", "return");
        if (resultDriverOrPassenger.return["sunCheck"])
          this.pushInSelectDay(resultDriverOrPassenger, "sun", "return");
      }
    },

    pushInSelectDay(resultDriverOrPassenger, day, type) {
      const existInSelectDay = this.selectedDay.find(item => item.name == day);
      if (existInSelectDay) {
        existInSelectDay[`${type}Time`] =
          resultDriverOrPassenger[type][`${day}Time`];
      } else {
        let object = {};
        object[`${type}Time`] = resultDriverOrPassenger[type][`${day}Time`];
        object["trad"] = `PostCarpool.${day}`;
        object["name"] = day;
        this.selectedDay.push(object);
      }
    },

    updateAsk(status) {
      const payload = {
        idAsk: this.askFromMessage.askId,
        userId: this.$store.getters.userId,
        data: { askStatus: status }
      };
      this.$store
        .dispatch("updateAskCarpool", payload)
        .then(res => {
          this.presentToast(this.$t("DetailCarpool.updateSuccess"), "success");

          this.$router.push({ name: "carpoolsHome" });
        })
        .catch(err => {
          console.log(err);
          this.presentToast(this.$t("Commons.error"), "danger");
        });
    },

    canSeeButton(type) {
      switch (type) {
        case 3:
          if (this.fromMessage) {
            return (
              this.carpoolRecap.frequency == 2 &&
              this.askFromMessage.askStatus == 1 &&
              this.askFromMessage.canUpdateAsk
            );
          } else {
            return this.carpoolRecap.frequency == 2;
          }
          break;

        case 1:
          if (this.fromMessage) {
            return (
              this.askFromMessage.askStatus == 1 &&
              this.askFromMessage.canUpdateAsk &&
              !!this.carpoolSelected.resultDriver &&
              this.carpoolRecap.frequency == 1
            );
          } else {
            return (
              !!this.carpoolSelected.resultDriver &&
              this.carpoolRecap.frequency == 1
            );
          }
          break;

        case 2:
          if (this.fromMessage) {
            return (
              this.askFromMessage.askStatus == 1 &&
              this.askFromMessage.canUpdateAsk &&
              !!this.carpoolSelected.resultPassenger &&
              this.carpoolRecap.frequency == 1
            );
          } else {
            return (
              !!this.carpoolSelected.resultPassenger &&
              this.carpoolRecap.frequency == 1
            );
          }
          break;

        default:
          break;
      }
    },

    contact() {
      let role = 1;
      let result = this.carpoolSelected.resultDriver;
      if (
        !!this.carpoolSelected.resultDriver &&
        !!this.carpoolSelected.resultPassenger
      ) {
        role = 3;
      } else if (!!this.carpoolSelected.resultPassenger) {
        role = 2;
        result = this.carpoolSelected.resultPassenger;
      }

      const adId = result.outward.proposalId;
      const matchingId = result.outward.matchingId;

      const payload = {
        role,
        adId,
        matchingId,
        paused: false
      };

      this.$store
        .dispatch("contactCarpool", payload)
        .then(resp => {
          console.log(resp);
          // this.presentToast(this.$t("AskCarpool.contactSuccess"), "success");
          this.$router.push({ name: "messages" });
        })
        .catch(err => {
          console.log(err);
          this.presentToast(this.$t("Commons.error"), "danger");
        });
    }
  }
};
</script>
