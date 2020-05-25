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
  <div class="mc-form-carpool-recap">

    <RecapCarpool
    v-if="showRecap"
      ref="recap"
      :recap="recap"
    ></RecapCarpool>

    <div class="license-certification" v-if="recap.driver">
      En publiant mon annonce, je certifie avoir un permis de conduire et une assurance valides et à jour.
    </div>
  </div>
</template>

<style lang="scss">
  .license-certification {
    margin-top: 20px;
    margin-bottom: 30px;
  }
</style>

<script>

import RecapCarpool from "../Shared/Components/RecapCarpool.component";
import RecapCarpoolDTO from "../Shared/RecapCarpoolDTO";

export default {
  name: "post-carpool-step7",
  data() {
    return {
      showRecap: true
    };
  },
  validations: {},
  components: {
    RecapCarpool
  },
  mounted() {
    setTimeout(() => {
      if (!!this.$refs.recap.$refs.mapRecap) this.$refs.recap.$refs.mapRecap.mapObject.invalidateSize();
    }, 500);
  },
  created() {
    this.unwatch = this.$store.watch(
      (state, getters) => getters.currentSlider,
      (newValue, oldValue) => {
        if (oldValue != newValue && newValue == "post-carpool-step7") {
         this.showRecap = false;
          setTimeout(() => {
            this.showRecap = true;
          }, 1);
        }
      }
    );
  },
  beforeDestroy() {
    this.unwatch();
  },
  computed: {
    carpoolToPost() {
      return this.$store.getters.carpoolToPost;
    },

    priceCarpool() {
      return this.$store.getters.priceCarpool;
    },

    directPointsCarpool() {
      return this.$store.getters.directPointsCarpool.directPoints;
    },

    recap() {
      return new RecapCarpoolDTO().fromCarpoolToPost(
        this.carpoolToPost,
        this.$store.state.userStore.user,
        this.priceCarpool,
        this.directPointsCarpool
      )
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
    },
  }
};
</script>
