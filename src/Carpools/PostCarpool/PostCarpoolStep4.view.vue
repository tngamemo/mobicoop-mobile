<template>
  <div class="mc-form-carpool">
    <ion-item>
      <ion-label position="floating">{{$t('PostCarpool.numberPassenger')}} *</ion-label>
      <ion-input
        type="number"
        max="4"
        :placeholder="$t('PostCarpool.numberPassenger') + '*'"
        :value="carpoolToPost.seatsDriver"
        @input="changeOptions('seatsDriver', parseInt($event.target.value))"
      ></ion-input>
    </ion-item>
    <div v-if="$v.carpoolToPost.seatsDriver.$error">
      <div class="mc-error-label" v-if="!$v.carpoolToPost.seatsDriver.required">{{$t('Validation.required')}}</div>
    </div>

    <ion-item lines="none">
      <ion-label>{{$t('PostCarpool.luggage')}}</ion-label>
      <ion-toggle :checked="carpoolToPost.luggage" @ionChange="changeOptions('luggage', $event.target.value)"></ion-toggle>
    </ion-item>

    <ion-item lines="none">
      <ion-label>{{$t('PostCarpool.bike')}}</ion-label>
      <ion-toggle :checked="carpoolToPost.bike"  @ionChange="changeOptions('bike', $event.target.value)"></ion-toggle>
    </ion-item>

    <ion-item lines="none">
      <ion-label>{{$t('PostCarpool.backSeats')}}</ion-label>
      <ion-toggle :checked="carpoolToPost.backSeats"  @ionChange="changeOptions('backSeats', $event.target.value)"></ion-toggle>
    </ion-item>
  </div>
</template>

<style lang="scss">
  .mc-form-carpool {

    ion-item {
      margin-top: 20px
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

export default {
  name: "post-carpool-step4",
  data() {
    return {};
  },
  validations: {
    carpoolToPost: {
      seatsDriver: {
        required
      }
    }
  },
  created() {},
  computed: {
    carpoolToPost() {
      return this.$store.getters.carpoolToPost;
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

    changeOptions(property, value) {
      if (property == 'bike' || property == 'luggage' || property == 'backSeats') {
        value = !this.carpoolToPost[property];
      }
      this.$store.commit('changeOptionsCarpoolPost', {property, value})
    }
  }
};
</script>
