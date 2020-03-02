<template>
  <div class="ion-page">
    <ion-header no-border>
      <ion-toolbar color="background">
        <ion-buttons slot="start">
          <ion-back-button default-href="profile"></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center"> {{ $t('MyCarpools.title') }} </h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="background" no-bounce>
      <div class="mc-white-container">
        <div class="d-flex justify-between">
          <ion-button class='mc-small-button' color="primary" :fill="archived ? 'outline' : 'solid'" @click="archived = false">
            {{ $t('MyCarpools.in-progress') }}
          </ion-button>
          <ion-button class='mc-small-button' color="primary" :fill="archived ? 'solid' : 'outline'" @click="archived = true">
            {{ $t('MyCarpools.archived') }}
          </ion-button>
        </div>
        <hr>

        <div class="ion-text-center">
          <ion-icon size="large" color="background" class="rotating" v-if="$store.state.userStore.statusMyCarpools == 'loading'" name="md-sync"></ion-icon>
        </div>

        <div class="ion-text-center" v-if="$store.state.userStore.statusMyCarpools == 'error'">
          {{ $t('MyCarpools.error')}}
        </div>

        <div v-if="$store.state.userStore.statusMyCarpools == 'success'" v-for="carpool in filterCarpools(carpools)">
          <CarpoolItem :carpool="getFormattedCarpoolItem(carpool)" :type="'my-carpool'" />
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
  import CarpoolItem from "../Search/Components/CarpoolItem.component";
  import CarpoolItemDTO from "../Search/Components/CarpoolItemDTO";

  export default {
    name: 'my-carpools',
    data () {
      return {
        archived : false
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
      getFormattedCarpoolItem(carpool) {
        return new CarpoolItemDTO().carpoolItemFromMyCarpool(carpool)
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
          const dateAndTimeOutwardDate = this.$moment(`${this.$moment(carpool.outwardDate).format('YYYY-MM-DD')} ${this.$moment(carpool.outwardTime).format('HH:mm')}`);
          const dateAndTimeReturnDate = this.$moment(`${this.$moment(carpool.returnDate).format('YYYY-MM-DD')} ${this.$moment(carpool.returnTime).format('HH:mm')}`);
          result = this.$moment(dateAndTimeOutwardDate).isBefore(this.$moment()) || this.$moment(dateAndTimeReturnDate).isBefore(moment());
        }

        return result;
      },
    }
  }
</script>
