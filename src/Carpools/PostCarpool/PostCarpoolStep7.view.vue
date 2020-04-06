<template>
  <div class="mc-form-carpool-recap">

    <RecapCarpool
    v-if="showRecap"
      ref="recap"
      :recap="recap"
    ></RecapCarpool>
  </div>
</template>

<style lang="scss">
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
