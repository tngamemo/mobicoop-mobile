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

    <div class="mc-select-type">
      <ion-radio-group @ionChange="changeRole($event.target.value)">
        <ion-row>
          <ion-col>
            <ion-item lines="none">
              <ion-radio value="1" :checked="carpoolToPost.role == 1"></ion-radio>
              <ion-label>{{ $t('PostCarpool.driver')}}</ion-label>
            </ion-item>
          </ion-col>
          <ion-col v-if="!carpoolToPost.solidaryExclusive">
            <ion-item lines="none">
              <ion-radio value="2" :checked="carpoolToPost.role == 2"></ion-radio>
              <ion-label>{{ $t('PostCarpool.passenger')}}</ion-label>
            </ion-item>
          </ion-col>
          <ion-col v-if="!carpoolToPost.solidaryExclusive">
            <ion-item lines="none">
              <ion-radio value="3" :checked="carpoolToPost.role == 3"></ion-radio>
              <ion-label>{{ $t('PostCarpool.driverOrPassenger')}}</ion-label>
            </ion-item>
          </ion-col>
        </ion-row>
      </ion-radio-group>
    </div>

    <div class="mc-select-origin-destination">
      <!-- Input with placeholder -->
        <ion-item  v-on:click="goGeoSearch('origin', 'post')">
          <ion-input
            type="text"
            class="no-clickable"
            :placeholder="$t('Search.origin')"
            :value="displayOrigin"
            >
          </ion-input>
          <ion-icon name="close" v-on:click="clearInput($event, 'origin')"></ion-icon>
        </ion-item>
        <div v-if="$v.addressessUseToPost.destination.$error">
          <div class="mc-error-label"  v-if="!$v.addressessUseToPost.destination.required">{{$t('Validation.required')}}</div>
        </div>

        <div class="mc-div-icon-swap">
         <ion-icon v-on:click="swapDestinationAndOrigin()"
            class="mc-rotate-icon"
            name="swap"
            color="primary"
            size="large">
          </ion-icon>
        </div>

        <ion-item v-on:click="goGeoSearch('destination', 'post')">
          <ion-input
            type="text"
            class="no-clickable"
            :placeholder="$t('Search.destination')"
            :value="displayDestination"
            >
          </ion-input>
          <ion-icon name="close" v-on:click="clearInput($event, 'destination')"></ion-icon>
        </ion-item>
        <div v-if="$v.addressessUseToPost.destination.$error">
          <div class="mc-error-label"  v-if="!$v.addressessUseToPost.destination.required">{{$t('Validation.required')}}</div>
        </div>

    </div>

    <div class="mc-select-regular">
      <ion-item lines="none">
        <ion-label>{{$t('PostCarpool.regular')}}</ion-label>
        <ion-checkbox slot="start"
          :checked="this.$store.getters.carpoolToPost.frequency == 2"
          @ionChange="changeFrequency()">
        </ion-checkbox>
      </ion-item>
    </div>

    <ion-item v-if="this.$store.getters.carpoolToPost.frequency == 1">
      <ion-datetime
        display-format="DD/MM/YY"
        picker-format="DD/MM/YY"
        cancel-text="Annuler"
        done-text="Valider"
        :placeholder="$t('PostCarpool.dayOutward')"
        :value="this.$store.getters.carpoolToPost.outwardDate"
        @ionChange="changePostOutwardDate($event)"
      ></ion-datetime>
    </ion-item>
    <div v-if="$v.carpoolToPost.outwardDate.$error">
      <div class="mc-error-label"  v-if="!$v.carpoolToPost.outwardDate.required">{{$t('Validation.required')}}</div>
    </div>

  </div>
</template>

<style lang="scss">
 .mc-form-carpool{
   .mc-select-type {
     margin-top: 40px;
     margin-bottom: 40px;
     ion-radio {
       margin-right: 10px;
     }
   }

   .mc-select-origin-destination {
     margin-bottom: 40px;
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
import { address } from "../../Shared/Mixin/address.mixin";

export default {
  name: "post-carpool-step1",
  data() {
    return {
    };
  },
  mixins: [address],
  validations: {
    carpoolToPost: {
      role: {
        required,
      },
      outwardDate: {
        required: requiredIf(function (outwardDate) {
          return this.$store.getters.carpoolToPost.frequency == 1
        })
      },
    },
    addressessUseToPost: {
      origin: {
        required
      },

      destination: {
        required
      }
    },
  },
  created() {
    if(this.carpoolToPost.outwardDate == "") {
      this.$store.commit('changeDateOutwardCarpool', {outwardDate: new Date()})
    }
  },
  computed: {
    carpoolToPost() {
      return this.$store.getters.carpoolToPost;
    },

    addressessUseToPost() {
      return this.$store.getters.addressessUseToPost;
    },

    displayOrigin() {
      const addressess = this.$store.getters.addressessUseToPost;

      /*
      if (!! addressess && addressess.origin){

        if (!! addressess.origin.displayLabel) {
          result = `${addressess.origin.displayLabel[0]},  ${addressess.origin.displayLabel[1]}`;
        } else {
          result = `${addressess.origin.addressLocality},  ${addressess.origin.addressCountry}`;
        }
      }*/
      return this.formatAddress(addressess.origin);
    },

    displayDestination() {
      const addressess = this.$store.getters.addressessUseToPost;
      return this.formatAddress(addressess.destination);
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

    changeRole: function(value) {
      this.$store.getters.carpoolToPost.role = parseInt(value);
      this.$emit('changeRole', value)
    },

    changeFrequency: function() {
      if (this.$store.getters.carpoolToPost.frequency == 1) {
        this.$store.getters.carpoolToPost.frequency = 2;
      } else {
        this.$store.getters.carpoolToPost.frequency = 1;
      }
    },

    goGeoSearch: function(type, action) {
      this.$router.push({ name: "geoSearch", query: { type, action }});
    },

    swapDestinationAndOrigin: function() {
      this.$store.dispatch('swapPostDestinationAndOrigin');
    },

    clearInput($event, type) {
      $event.stopPropagation();
      this.$store.getters.addressessUseToPost[type] = '';
    },

    changePostOutwardDate($event) {
      this.$store.commit('changeDateOutwardCarpool', {outwardDate: new Date($event.detail.value)})
    },
  }
};
</script>
