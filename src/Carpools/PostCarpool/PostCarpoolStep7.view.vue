<template>
  <div class="mc-form-carpool-recap">
    <div class="mc-recap-item">
      <div class="mc-recap-header d-flex justify-between">
        <span>{{carpoolToPost.outwardDate | moment('DD MMMM YYYY') }}</span>
        <span>{{priceCarpool}} €</span>
      </div>
      <div class="mc-recap-step">
        <p
          class="timeline text-left"
          v-for="(step, index) in carpoolToPost.outwardWaypoints"
          :key="index"
        >{{displayStep(step)}}</p>
      </div>
      <div class="mc-recap-footer text-left" v-if="!! carpoolToPost.seatsDriver">
        Places disponibles
        <div class="d-flex">
          <ion-icon
            v-for="index in parseInt(carpoolToPost.seatsDriver)"
            :key="index"
            name="person"
          >{{index}}</ion-icon>
        </div>
      </div>
    </div>

    <div class="mc-recap-message">{{carpoolToPost.comment}}</div>

    <div class="mc-recap-user" v-if="!!this.$store.state.userStore.user">
      <div class="mc-recap-user-bloc-info">
        <div class="mc-user-image">
          {{this.$store.state.userStore.avatars}}
          <ion-thumbnail v-if="!! this.$store.state.userStore.user.avatars">
            <img :src="this.$store.state.userStore.user.avatars[0]" />
          </ion-thumbnail>
        </div>

        <div class="mc-recap-user-info">
          <p>{{this.$store.state.userStore.user.givenName }} {{this.$store.state.userStore.user.shortFamilyName }}</p>
        </div>
      </div>
    </div>

    <div class="mc-carpool-map">
      <l-map
        v-if="this.$store.getters.statusDistanceCarpool != 'loading' && showCard"
        :ref="'mapRecap'"
        style="height: 350px"
        :zoom="zoom"
        :bounds="bounds"
        :options="optionsCard"
      >
        <l-tile-layer v-if="bounds" :url="url"></l-tile-layer>
        <l-polyline v-if="bounds" :lat-lngs="directPointsCarpool" :color="'red'"></l-polyline>
      </l-map>
    </div>
  </div>
</template>

<style lang="scss">
.mc-form-carpool-recap {
  margin-top: 20px;

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
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
  requiredIf
} from "vuelidate/lib/validators";
import { LMap, LTileLayer, LPolyline } from "vue2-leaflet";

export default {
  name: "post-carpool-step7",
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 8,
      showCard: true,
      optionsCard: {
        dragging: false,
        touchZoom: true
      }
    };
  },
  validations: {},
  components: {
    LMap,
    LTileLayer,
    LPolyline
  },
  mounted() {
    setTimeout(() => {
      this.$refs.mapRecap.mapObject.invalidateSize();
    }, 500);
  },
  created() {
    this.unwatch = this.$store.watch(
      (state, getters) => getters.currentSlider,
      (newValue, oldValue) => {
        if (oldValue != newValue && newValue == "post-carpool-step3") {
          this.showCard = false;
          setTimeout(() => {
            this.showCard = true;
            this.$refs.mapRecap.mapObject.invalidateSize();
          }, 1);
        }
      }
    );
  },
  beforeDestroy() {
    this.unwatch();
  },
  computed: {
    bounds() {
      const bounds = new L.LatLngBounds(
        this.$store.getters.directPointsCarpool.directPoints
      );
      if (!!this.$refs.mapRecap) this.$refs.mapRecap.mapObject.invalidateSize();
      return bounds;
    },

    carpoolToPost() {
      return this.$store.getters.carpoolToPost;
    },

    priceCarpool() {
      return this.$store.getters.priceCarpool;
    },

    directPointsCarpool() {
      return this.$store.getters.directPointsCarpool.directPoints;
    }
  },
  methods: {
    validate() {
      this.$v.$reset();
      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      } else {
        return true;
      }
    },

    displayStep(step) {
      let result = "";

      if (!!step.displayLabel) {
        result = `${step.displayLabel[0]},  ${step.displayLabel[1]}`;
      } else {
        result = `${step.addressLocality},  ${step.addressCountry}`;
      }
      return result;
    }
  }
};
</script>
