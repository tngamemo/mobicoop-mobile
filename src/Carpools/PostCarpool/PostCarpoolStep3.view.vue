<template>
  <div class="mc-form-carpool">
    <div class="mc-select-step">
      <!-- Input with placeholder -->
      <ion-item v-on:click="goGeoSearch('origin', 'post')">
        <ion-label position="floating">{{$t('PostCarpool.origin')}}</ion-label>
        <ion-input
          type="text"
          class="no-clickable"
          :placeholder="$t('Search.origin')"
          :value="displayOrigin"
        ></ion-input>
      </ion-item>
      <div v-if="$v.addressessUseToPost.destination.$error">
        <div
          class="mc-error-label"
          v-if="!$v.addressessUseToPost.destination.required"
        >{{$t('Validation.required')}}</div>
      </div>

      <div class="mc-add-step">
        <div class="mc-delete-step">
          <ion-item
            v-for="(step, index) in addressessUseToPost.step"
            :key="index"
            v-on:click="goGeoSearch('step', 'post', index)"
          >
            <ion-label position="floating">{{$t('PostCarpool.step')}} {{index + 1}}</ion-label>
            <ion-input
              type="text"
              class="no-clickable"
              :placeholder="'step'"
              :value="displayStep(index)"
            ></ion-input>
            <ion-icon name="close" v-on:click="clearInputStep($event, index)"></ion-icon>
          </ion-item>
        </div>

        <div
          v-if="addressessUseToPost.step.length < 4"
          v-on:click="addInputStep()"
          class="text-left d-flex align-center pointer"
        >
          <ion-icon name="add-circle-outline"></ion-icon>
          {{$t('PostCarpool.addStep')}}
        </div>
      </div>

      <ion-item v-on:click="goGeoSearch('destination', 'post')">
        <ion-label position="floating">{{$t('PostCarpool.destination')}}</ion-label>
        <ion-input
          type="text"
          class="no-clickable"
          :placeholder="$t('Search.destination')"
          :value="displayDestination"
        ></ion-input>
      </ion-item>
      <div v-if="$v.addressessUseToPost.destination.$error">
        <div
          class="mc-error-label"
          v-if="!$v.addressessUseToPost.destination.required"
        >{{$t('Validation.required')}}</div>
      </div>
    </div>

    <div class="mc-select-communities text-left">
      <ion-icon
        size="large"
        color="primary"
        class="rotating"
        v-if="this.$store.getters.statusUserCommunities == 'loading'"
        name="md-sync"
      ></ion-icon>
      <ion-select
        @ionChange="selectCommunities($event.target.value)"
        v-if="this.$store.getters.userCommunities && this.$store.getters.statusUserCommunities == 'success'"
        placeholder="Sélectionnez une communauté"
        multiple="true"
        cancelText="Fermer"
        okText="Valider"
      >
        <ion-select-option
          v-for="community in this.$store.getters.userCommunities"
          :key="community.id"
          :value="parseInt(community.id)"
        >{{ community.name }}</ion-select-option>
      </ion-select>
    </div>

    <div class="mc-carpool-distance text-center">
      <ion-icon
        size="large"
        color="primary"
        class="rotating"
        v-if="this.$store.getters.statusDistanceCarpool == 'loading'"
        name="md-sync"
      ></ion-icon>
      <p
        v-if="this.$store.getters.statusDistanceCarpool == 'success'"
      >{{$t('PostCarpool.distance')}} {{ Math.round(this.$store.getters.distanceCarpool / 1000)}} km</p>
    </div>
    <div class="mc-carpool-map">
      <l-map
        v-if="this.$store.getters.statusDistanceCarpool != 'loading' && showCard"
        :ref="'map'"
        :options="optionsCard"
        style="height: 350px"
        :zoom="zoom"
        :bounds="bounds"
      >
        <l-tile-layer v-if="bounds" :url="url"></l-tile-layer>
        <l-polyline v-if="bounds" :lat-lngs="directPointsCarpool" :color="'red'"></l-polyline>
      </l-map>
    </div>
  </div>
</template>

<style lang="scss">
.mc-form-carpool {
  .mc-select-step {
    margin-bottom: 40px;

    .mc-add-step {
      margin-top: 20px;
      margin-bottom: 20px;

      .mc-delete-step {
        ion-icon {
          position: absolute;
          bottom: 0;
          right: 0;
        }
      }
    }
  }

  .mc-select-communities {
    border: 1px solid #ffa000;
    border-radius: 10px;
    margin-bottom: 20px;
  }

  .mc-carpool-distance {
    border: 1px solid #ffa000;
    border-radius: 10px;
  }
}
</style>

<script>
import { LMap, LTileLayer, LPolyline } from "vue2-leaflet";
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
  requiredIf
} from "vuelidate/lib/validators";

import { isPlatform } from "@ionic/core";

export default {
  name: "post-carpool-step3",
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
  validations: {
    addressessUseToPost: {
      origin: {
        required
      },

      destination: {
        required
      }
    }
  },
  components: {
    LMap,
    LTileLayer,
    LPolyline
  },
  mounted() {
    setTimeout(() => {
      if (!!this.$refs.map) this.$refs.map.mapObject.invalidateSize();
    }, 0);
  },
  created() {
    this.unwatch = this.$store.watch(
      (state, getters) => getters.currentSlider,
      (newValue, oldValue) => {
        if (oldValue != newValue && newValue == "post-carpool-step3") {
          this.showCard = false;
          setTimeout(() => {
            this.showCard = true;
            if (!!this.$refs.map) this.$refs.map.mapObject.invalidateSize();
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
      if (!!this.$refs.map) this.$refs.map.mapObject.invalidateSize();
      return bounds;
    },

    carpoolToPost() {
      return this.$store.getters.carpoolToPost;
    },

    addressessUseToPost() {
      return this.$store.getters.addressessUseToPost;
    },

    displayOrigin() {
      let result = "";
      const addressess = this.$store.getters.addressessUseToPost;
      if (!!addressess && addressess.origin) {
        if (!!addressess.origin.displayLabel) {
          result = `${addressess.origin.displayLabel[0]},  ${addressess.origin.displayLabel[1]}`;
        } else {
          result = `${addressess.origin.addressLocality},  ${addressess.origin.addressCountry}`;
        }
      }
      return result;
    },

    displayDestination() {
      let result = "";
      const addressess = this.$store.getters.addressessUseToPost;
      if (!!addressess && addressess.destination) {
        if (!!addressess.destination.displayLabel) {
          result = `${addressess.destination.displayLabel[0]},  ${addressess.destination.displayLabel[1]}`;
        } else {
          result = `${addressess.destination.addressLocality},  ${addressess.destination.addressCountry}`;
        }
      }

      return result;
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

    displayStep(index) {
      let result = "";
      const addressess = this.$store.getters.addressessUseToPost;
      if (!!addressess && addressess.step && addressess.step[index]) {
        if (!!addressess.step[index].displayLabel) {
          result = `${addressess.step[index].displayLabel[0]},  ${addressess.step[index].displayLabel[1]}`;
        } else if (!!addressess.step[index].addressLocality) {
          result = `${addressess.step[index].addressLocality},  ${addressess.step[index].addressCountry}`;
        }
      }

      return result;
    },

    goGeoSearch: function(type, action, index = null) {
      this.$router.push({ name: "geoSearch", query: { type, action, index } });
    },

    clearInputStep: function($event, index) {
      $event.stopPropagation();
      this.$store.commit("removeStepByIndex", { index });
      this.$store.dispatch("treatementUpdateAddresses");
    },

    addInputStep: function() {
      this.$store.getters.addressessUseToPost["step"].push({});
    },

    selectCommunities: function(value) {
      value.forEach(id =>
        this.$store.getters.carpoolToPost.communities.push(parseInt(id))
      );
    }
  }
};
</script>
