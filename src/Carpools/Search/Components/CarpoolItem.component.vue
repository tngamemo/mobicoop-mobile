<template>
  <div class="mc-carpool-item">

    <div class="mc-carpool-header d-flex justify-between align-center">

      <div v-if="isPunctualCarpool">
        <span>{{ getDateCarpoolItem }}</span>
      </div>

      <div v-if="!isPunctualCarpool" class="d-flex">
        <div v-for="(day, index) in daySelectedOnCarpool" :key="index">
          <div class="mc-pastille-day" v-bind:class="{ 'selected': day.value }"><b>{{$t(day.trad)}} </b></div>
        </div>
      </div>

      <div class="">
        <span>{{ this.carpool.roundedPrice }} €</span>
      </div>
    </div>

    <div v-if="!isPunctualCarpool" class="mc-carpool-subheader d-flex justify-around align-center">
      <div v-if="this.carpool.outwardTime" class="d-flex align-center mc-carpool-regular-time">
        <ion-icon name="arrow-down"></ion-icon>
        <span>{{ $t('Carpool.oneWay') }}</span>
        <span class="time">{{ this.carpool.outwardTime | moment("utc", "HH:mm")}}</span>
      </div>

      <div v-if="this.carpool.returnTime" class="d-flex align-center mc-carpool-regular-time">
        <ion-icon name="arrow-up"></ion-icon>
        <span>{{ $t('Carpool.return') }}  </span>
        <span class="time">{{ this.carpool.returnTime | moment("utc", "HH:mm")}} </span>
      </div>
    </div>

    <div class="mc-carpool-info d-flex align-center align-stretch">
      <div class="mc-carpool-info-image d-flex flex-col">
        <div v-if="!! this.carpool.resultDriver" class="mc-carpool-driver"><ion-icon size="large" name="car"></ion-icon></div>
        <div v-if="!! this.carpool.resultPassenger" class="mc-carpool-passenger"><ion-icon size="large" name="person"></ion-icon></div>
      </div>
      <div class="d-flex mc-carpool-way">
        <div class="mc-carpool-time" v-if="isPunctualCarpool">
          <p>{{resultDriveOrPassenger.outward.waypoints[0].time | moment("utc", "HH:mm") }}</p>
          <p>{{ [...resultDriveOrPassenger.outward.waypoints].pop().time  | moment("utc", "HH:mm")}}</p>
        </div>
        <div class='mc-carpool-origin-destination'>
          <div>
            <p class="timeline">{{this.carpool.origin.addressLocality}}</p>
            <p class="timeline">{{this.carpool.destination.addressLocality}}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="mc-carpool-footer d-flex align-center">
        <ion-thumbnail>
          <img :hidden="!(this.carpool.carpooler.avatars[0] && this.avatarLoaded)" :src="this.carpool.carpooler.avatars[0]" @load="onImgLoad()">
          <ion-icon v-if="!this.avatarLoaded" name="contact" size="large" ></ion-icon>
        </ion-thumbnail>
        <strong class="mc-carpool-carpooler">{{this.carpool.carpooler.givenName}} {{this.carpool.carpooler.shortFamilyName}}</strong>
      </div>
  </div>
</template>

<style lang="scss">
  .mc-carpool-item {
    background: rgba(var(--ion-color-primary-rgb), 0.1);
    border: 1px solid rgba(var(--ion-color-primary-rgb), 0.1);
    margin-bottom: 20px;
    border-radius: 20px;

    .mc-carpool-header {
      font-weight: bold;
      color: var(--ion-color-primary);
      padding: 20px;
    }

    .mc-carpool-subheader {
      background: rgba(255,255,255, 0.5);
      color: var(--ion-color-primary);
      height: 50px;

      .mc-carpool-regular-time {
        font-weight: bold;

        span {
          padding-right: 10px;

          &.time {
            font-weight: lighter;
            color: rgba(var(--ion-color-primary-rgb), 0.7);
          }
        }
      }
    }

    .mc-pastille-day {
      background: white;
      color: rgba(var(--ion-color-primary-rgb), 0.5);
      font-weight: bold;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;

      &.selected {
        background: rgba(var(--ion-color-primary-rgb), 0.5);
        color: white;
      }
    }

    .mc-carpool-info {
      background: white;
      color: var(--ion-color-primary);

      .mc-carpool-driver {
        flex: 1;
        justify-content: center;
        align-items: center;
        width: 40px;
        display: flex;
        background: var(--ion-color-success);
      }

      .mc-carpool-passenger {
        flex: 1;
        justify-content: center;
        align-items: center;
        width: 40px;
        display: flex;
        background: var(--ion-color-primary);
      }

      .mc-carpool-way {
        padding-left: 20px;

        .mc-carpool-time {
          padding-right: 10px;
        }

        .mc-carpool-origin-destination {
          font-weight: bold;

          div {
            // border-left: 2px solid red;
            padding-left: 10px;
            position: relative;

            &::before {
              content: '';
              position: absolute;
              width: 4px;
              height: 80%;
              background-color: var(--ion-color-primary);
              top: 50%;
              transform: translateY(-50%);
              left: 3px;
            }

            .timeline {
              position: relative;
              padding-left: 10px;

              &::before {
                content: '';
                position: absolute;
                margin: auto;
                width: 12px;
                height: 12px;
                border-radius: 6px;
                background-color: var(--ion-color-primary);
                top: 0px;
                bottom: 0;
                left: -10px;
              }
            }
          }
        }
      }

      ion-icon {
        color: white;
      }
    }

    .mc-carpool-footer {
      padding: 20px;
      color: var(--ion-color-primary);

      .mc-carpool-carpooler {
        padding-left: 20px;
      }

      ion-thumbnail {
      --size: 40px;
      --border-radius: 50%;
      }
    }
  }
</style>


<script>
  export default {
    name: 'carpool-item',
    props: ['carpool'],
    data () {
      return {
        avatarLoaded: false,
      }
    },
    mounted() {
    },
    computed: {
      getDateCarpoolItem() {
        return this.$moment(this.carpool.date).format('dddd D[.]MM');
      },

      resultDriveOrPassenger() {
        return !! this.carpool.resultDriver ? this.carpool.resultDriver : this.carpool.resultPassenger;
      },

      isPunctualCarpool() {
        return this.carpool.frequency == 1;
      },

      daySelectedOnCarpool() {
        const result = [];
        result.push({trad: 'Carpool.L', value: this.carpool.monCheck});
        result.push({trad: 'Carpool.Ma', value: this.carpool.tueCheck});
        result.push({trad: 'Carpool.Me', value: this.carpool.wedCheck});
        result.push({trad: 'Carpool.J', value: this.carpool.thuCheck});
        result.push({trad: 'Carpool.V', value: this.carpool.friCheck});
        result.push({trad: 'Carpool.S', value: this.carpool.satCheck});
        result.push({trad: 'Carpool.D', value: this.carpool.sunCheck});

        return result;
      }
    },
    methods: {

      onImgLoad: function () {
        this.avatarLoaded = true;
      }
    }
  }
</script>
