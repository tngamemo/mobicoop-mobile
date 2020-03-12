<template>
  <div class="mc-form-carpool-recap">
    <div class="mc-recap-item">
      <div class="mc-recap-header d-flex justify-between align-center">
        <span>{{recap.outwardDate | moment('DD MMMM YYYY') }}</span>
        <div v-if="recap.frequency == 2" class="d-flex">
          <div v-for="(day, index) in recap.regularDays" :key="index">
            <div class="mc-pastille-day" v-bind:class="{ 'selected': day.value }">
              <b>{{$t(day.trad)}}</b>
            </div>
          </div>
        </div>
        <span>{{recap.priceCarpool}} €</span>
      </div>
      <div
        v-if="recap.frequency == 2"
        class="mc-carpool-subheader d-flex justify-around align-center"
      >
        <div
          v-if="recap.isMultipleTime"
          class="d-flex align-center mc-carpool-regular-time"
        >Horaires différents selon les jours</div>
        <div
          v-if="!recap.isMultipleTime && recap.outwardTime"
          class="d-flex align-center mc-carpool-regular-time"
        >
          <ion-icon name="arrow-down"></ion-icon>
          <span>{{ $t('Carpool.oneWay') }}</span>
          <span class="time">{{ recap.outwardTime }}</span>
        </div>

        <div
          v-if="!recap.isMultipleTime && recap.returnTime"
          class="d-flex align-center mc-carpool-regular-time"
        >
          <ion-icon name="arrow-up"></ion-icon>
          <span>{{ $t('Carpool.return') }}</span>
          <span class="time">{{ recap.returnTime }}</span>
        </div>
      </div>
      <div class="mc-recap-step">
        <p
          class="timeline text-left"
          v-for="(step, index) in recap.outwardWaypoints"
          :key="index"
        >{{displayStep(step)}}</p>
      </div>
      <div class="mc-recap-footer text-left" v-if="!! recap.seats">
        Places disponibles
        <div class="d-flex">
          <ion-icon
            v-for="index in parseInt(recap.seats)"
            :key="index"
            name="person"
          >{{index}}</ion-icon>
        </div>
      </div>
    </div>

    <div v-if="!!recap.comment" class="mc-recap-message">{{recap.comment}}</div>

    <div class="mc-recap-user" v-if="!!recap.user">
      <div class="mc-recap-user-bloc-info">
        <div class="mc-user-image">
          <ion-thumbnail v-if="!! recap.user.avatars">
            <img :src="recap.user.avatars[0]" />
          </ion-thumbnail>
        </div>

        <div class="mc-recap-user-info">
          <p>{{recap.user.givenName }} {{recap.user.shortFamilyName }}</p>
        </div>
      </div>
    </div>

    <div class="mc-carpool-map">
      <l-map
        v-if="showCard"
        :ref="'mapRecap'"
        style="height: 350px"
        :zoom="zoom"
        :bounds="bounds"
        :options="optionsCard"
      >
        <l-tile-layer v-if="bounds" :url="url"></l-tile-layer>
        <l-polyline v-if="bounds" :lat-lngs="recap.directPoints" :color="'red'"></l-polyline>
      </l-map>
    </div>
  </div>
</template>

<style lang="scss">
.mc-form-carpool-recap {
  margin-top: 20px;

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

  .mc-carpool-subheader {
    background: rgba(255, 255, 255, 0.5);
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

  .mc-recap-item {
    background: rgba(var(--ion-color-primary-rgb), 0.1);
    border: 1px solid rgba(var(--ion-color-primary-rgb), 0.1);
    margin-bottom: 45px;
    border-radius: 20px;

    .mc-recap-header {
      padding: 10px;
      color: var(--ion-color-primary);
      font-weight: bold;
    }

    .mc-recap-step {
      background: white;
      color: var(--ion-color-primary);
      padding: 10px;

      .timeline {
        position: relative;
        padding-left: 20px;

        &::before {
          content: "";
          position: absolute;
          margin: auto;
          width: 12px;
          height: 12px;
          border-radius: 6px;
          background-color: var(--ion-color-primary);
          top: 0px;
          bottom: 0;
          left: 0px;
        }
      }
    }

    .mc-recap-footer {
      color: var(--ion-color-primary);
      padding: 10px;
    }
  }

  .mc-recap-message {
    background: #f5f6fa;
    padding: 10px;
    color: rgba(0, 0, 0, 0.6);
    border-radius: 15px 15px 15px 0px;
    margin-bottom: 20px;
    white-space: pre-line;
  }

  .mc-recap-user {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .mc-recap-user-bloc-info {
      color: var(--ion-color-primary);
      display: flex;
    }

    ion-thumbnail {
      --size: 90px;
      --border-radius: 50%;
    }

    .mc-recap-user-info {
      display: flex;
      justify-content: center;
      flex-direction: column;
      margin-left: 20px;

      p {
        margin: 0;
        font-weight: bold;
      }
    }
  }
}
</style>

<script>
import { LMap, LTileLayer, LPolyline } from "vue2-leaflet";
import { isPlatform } from "@ionic/core";

export default {
  name: "recap-carpool",
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 8,
      showCard: true,
      optionsCard: {
        dragging: !isPlatform(window.document.defaultView, "mobile"),
        touchZoom: isPlatform(window.document.defaultView, "mobile"),
        tap: !isPlatform(window.document.defaultView, "mobile")
      }
    };
  },
  components: {
    LMap,
    LTileLayer,
    LPolyline
  },
  props: ['recap', 'type'],
  mounted() {
    setTimeout(() => {
      if (!!this.$refs.mapRecap) this.$refs.mapRecap.mapObject.invalidateSize();
    }, 500);
  },
  computed: {
    bounds() {
      const bounds = new L.LatLngBounds(
        this.recap.directPoints
      );
      if (!!this.$refs.mapRecap) this.$refs.mapRecap.mapObject.invalidateSize();
      return bounds;
    }
  },
  methods: {
    displayStep(step) {
      let result = "";
      console.log(step);
      if (!!step.displayLabel && step.displayLabel[0] && step.displayLabel[1] ) {
        result = `${step.displayLabel[0]},  ${step.displayLabel[1]}`;
      } else {
        if (!! step.addressCountry) {
          result = `${step.addressLocality},  ${step.addressCountry}`;
        } else {
          result = `${step.addressLocality}`;
        }

      }
      return result;
    },
  }
};
</script>
