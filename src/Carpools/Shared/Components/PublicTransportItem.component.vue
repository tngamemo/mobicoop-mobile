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
  <div class="mc-pt-item pointer">
    <div>{{ptItem.ptdeparture.address.streetAddress}}, {{ptItem.ptdeparture.address.addressLocality}} à {{ptItem.ptdeparture.date | moment('utc', 'HH[h]mm')}}</div>
    <div class="d-flex">
      <div v-for="(leg, index) in ptItem.ptlegs" class="d-flex align-center">
        <span class="mdi" :class="getIcon(leg)"></span>
        <ion-badge class="mc-badge-line-number" v-if="leg.ptline" color="primary">{{leg.ptline.number}}</ion-badge>
        <div class="mc-arrow-right"><span v-if="index !== ptItem.ptlegs.length - 1" class="mdi mdi-arrow-right"></span></div>
      </div>
    </div>
    <div>{{ptItem.ptarrival.address.streetAddress}}, {{ptItem.ptarrival.address.addressLocality}} à {{ptItem.ptarrival.date | moment('utc', 'HH[h]mm')}}</div>
  </div>
</template>

<style lang="scss">
  .mc-pt-item {
    background: rgba(var(--ion-color-primary-rgb), 0.1);
    border: 1px solid rgba(var(--ion-color-primary-rgb), 0.1);
    margin-bottom: 20px;
    border-radius: 20px;
    padding: 20px;
  }

  .mc-badge-line-number {
    margin-left: 3px
  }

  .mc-arrow-right {
    margin-right: 5px;
    margin-left: 5px;
  }
</style>


<script>
import { toast } from "../../../Shared/Mixin/toast.mixin";
import { publicTransportMixin } from "../../../Shared/Mixin/public-transport.mixin";

export default {
  name: "public-transport-item",
  props: ["ptItem",],
  data() {
    return {

    };
  },
  mixins: [toast, publicTransportMixin],
  mounted() {},
  computed: {

  },
  methods: {

  }
};
</script>
