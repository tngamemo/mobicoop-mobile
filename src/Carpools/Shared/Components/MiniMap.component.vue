/**

Copyright (c) 2018, MOBICOOP. All rights reserved.
This project is dual licensed under AGPL and proprietary licence.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <gnu.org/licenses>.

Licence MOBICOOP described in the file
LICENSE
**************************/

<template>
  <l-map
    v-if="showCard"
    :ref="'map'"
    style="height: 200px"
    :center="center"
    :zoom="zoom"
    :maxZoom="maxZoom"
    :bounds="bounds"
    :options="optionsCard"
  >
    <l-tile-layer :url="url"></l-tile-layer>
    <l-polyline v-if="bounds && this.LPolyline" :lat-lngs="this.LPolyline" :color="'blue'"></l-polyline>
    <div v-if="bounds && LMarker">
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
      maxZoom: 10,
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

    setTimeout(() => {
      this.maxZoom = 18;
    }, 1000);
  },
  computed: {
    bounds() {
      let bounds;
      if (this.LMarker && this.LMarker.length > 0) bounds = new L.LatLngBounds(this.LMarker.map(item => item.latlng));
      if (this.LPolyline && this.LPolyline.length > 0) bounds = new L.LatLngBounds(this.LPolyline);
      if (!!this.$refs.map) this.$refs.map.mapObject.invalidateSize();
      return bounds;
    }
  },
  methods: {
    maxiCard: function() {}
  }
};
</script>
