<template>
  <l-map
    v-if="showCard"
    :ref="'map'"
    style="height: 200px"
    :center="center"
    :zoom="zoom"
    :bounds="bounds"
    :options="optionsCard"
  >
    <l-tile-layer :url="url"></l-tile-layer>
    <l-polyline v-if="bounds && this.LPolyline" :lat-lngs="this.LPolyline" :color="'blue'"></l-polyline>
    <div v-if="LMarker">
      <l-marker v-for="(marker, index) in  LMarker" :lat-lng="marker.latlng" :key="index">
        <l-popup
          :content="'<div>'+marker.name+'</div>'"
          :options="{ autoClose: false, closeOnClick: false }"
        ></l-popup>
      </l-marker>
    </div>
  </l-map>
</template>

<style lang="scss">
</style>

<script>
import { LMap, LMarker, LTileLayer, LPolyline, LPopup } from "vue2-leaflet";
import {isPlatform} from "@ionic/core";

export default {
  name: "mini-map",
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 5,
      center: [47.2350952, 2.0426357],
      showCard: true,
      optionsCard: {
        dragging: !isPlatform(window.document.defaultView, "mobile"),
        touchZoom: isPlatform(window.document.defaultView, "mobile"),
        tap: !isPlatform(window.document.defaultView, "mobile"),
        fullscreenControl: {
          pseudoFullscreen: true
        }
      }
    };
  },
  components: {
    LMap,
    LTileLayer,
    LPolyline,
    LMarker,
    LPopup
  },
  props: ["LPolyline", "LMarker"],
  mounted() {
    setTimeout(() => {
      if (!!this.$refs.map) this.$refs.map.mapObject.invalidateSize();
    }, 0);
  },
  computed: {
    bounds() {
      let bounds;
      if (this.LPolyline) bounds = new L.LatLngBounds(this.LPolyline);
      if (this.LMarker) bounds = new L.LatLngBounds(this.LMarker);
      if (!!this.$refs.map) this.$refs.map.mapObject.invalidateSize();
      return bounds;
    }
  },
  methods: {
    maxiCard: function() {}
  }
};
</script>
