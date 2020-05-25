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
  <div class="mc-form-carpool">
    <ion-item>
      <ion-label class="ion-text-wrap" position="floating">{{$t('PostCarpool.numberPassenger')}} *</ion-label>
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
      <div class="mc-error-label" v-if="!$v.carpoolToPost.seatsDriver.minValue">{{$t('Validation.minValue', { value: '0' })}}</div>
      <div class="mc-error-label" v-if="!$v.carpoolToPost.seatsDriver.maxValue">{{$t('Validation.maxValue', { value: '4' })}}</div>
    </div>

    <ion-item lines="none">
      <ion-label class="ion-text-wrap">{{$t('PostCarpool.luggage')}}</ion-label>
      <ion-toggle :checked="carpoolToPost.luggage" @ionChange="changeOptions('luggage', $event.target.checked)"></ion-toggle>
    </ion-item>

    <ion-item lines="none">
      <ion-label class="ion-text-wrap">{{$t('PostCarpool.bike')}}</ion-label>
      <ion-toggle :checked="carpoolToPost.bike"  @ionChange="changeOptions('bike', $event.target.checked)"></ion-toggle>
    </ion-item>

    <ion-item lines="none">
      <ion-label class="ion-text-wrap">{{$t('PostCarpool.backSeats')}}</ion-label>
      <ion-toggle :checked="carpoolToPost.backSeats"  @ionChange="changeOptions('backSeats', $event.target.checked)"></ion-toggle>
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
  minValue,
  maxValue,
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
        minValue: (value) => value > 0,
        maxValue: (value) => value <= 4,
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
