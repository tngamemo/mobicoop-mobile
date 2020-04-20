<template>
  <div class="ion-page">
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="profile"></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center"> {{ $t('AcceptedCarpools.title') }} </h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" no-bounce>
      <div class="mc-white-container">
        <div class="d-flex justify-between">
          <ion-button class='mc-small-button' color="primary" :fill="archived ? 'outline' : 'solid'" @click="archived = false">
            {{ $t('AcceptedCarpools.come-up') }}
          </ion-button>
          <ion-button class='mc-small-button' color="primary" :fill="archived ? 'solid' : 'outline'" @click="archived = true">
            {{ $t('AcceptedCarpools.past') }}
          </ion-button>
        </div>
        <hr>

        <div class="ion-text-center">
          <ion-icon size="large" color="primary" class="rotating" v-if="$store.state.userStore.statusAcceptedCarpools == 'loading'" name="md-sync"></ion-icon>
        </div>

        <div class="ion-text-center" v-if="$store.state.userStore.statusAcceptedCarpools == 'error'">
          {{ $t('AcceptedCarpools.error')}}
        </div>

        <div v-if="$store.state.userStore.statusAcceptedCarpools == 'success'"
          v-for="(carpool, index) in filterCarpools(carpools)"
          :key="index"
        >
          <CarpoolItem :carpool="getFormattedCarpoolItem(carpool)" :type="'search'" />
        </div>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
  hr {
    background-color: rgba(0, 0, 0, 0.4);
    margin-top: 25px;
    margin-bottom: 25px;
  }
</style>

<script>
  import CarpoolItem from "../Shared/Components/CarpoolItem.component";
  import CarpoolItemDTO from "../Shared/CarpoolItemDTO";

  export default {
    name: 'accepted-carpools',
    data () {
      return {
        archived : false
      }
    },
    components: {
      CarpoolItem
    },
    created() {
      this.$store.dispatch('getAcceptedCarpools', this.$store.state.userStore.user.id).then(res => {}).catch(err => {});
    },
    computed: {
      carpools: {
        get() {
          return this.$store.state.userStore.acceptedCarpools
        },
      }
    },
    methods: {
      getFormattedCarpoolItem(carpool) {
        return new CarpoolItemDTO().carpoolItemFromSearch(carpool.asks[0].results[0])
      },
      filterCarpools() {
        return this.carpools.filter(carpool => {
          if(this.archived) {
            if (this.isArchivedCarpool(carpool)){
              return carpool
            }
          } else {
            if (!this.isArchivedCarpool(carpool)){
              return carpool
            }
          }
        })
      },
      isArchivedCarpool(carpool) {
        let result = false;

        if (carpool.frequency > 1) {
          result = this.$moment(carpool.outwardLimitDate).isBefore(this.$moment());
        } else {
          const dateAndTimeOutwardDate = this.$moment(`${this.$moment(carpool.outwardDate).format('YYYY-MM-DD')}`);
          const dateAndTimeReturnDate = this.$moment(`${this.$moment(carpool.returnDate).format('YYYY-MM-DD')}`);
          result = this.$moment(dateAndTimeOutwardDate).isBefore(this.$moment()) || this.$moment(dateAndTimeReturnDate).isBefore(this.$moment());
        }

        return result;
      },
    }
  }
</script>
