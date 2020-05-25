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
  <div class="mc-form-carpool-message">
    <ion-item>
      <ion-label position="floating">{{$t('PostCarpool.comment')}}</ion-label>
      <ion-textarea rows="10" cols="12"
        :value="carpoolToPost.comment"
        @ionInput="changeComment($event.target.value)">
      </ion-textarea>
    </ion-item>
  </div>
</template>

<style lang="scss">
.mc-form-carpool-message {
  margin-top: 20px;
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
  name: "post-carpool-step6",
  data() {
    return {};
  },
  validations: {},
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

    changeComment(value){
      this.$store.commit('changeOptionsCarpoolPost', {property: 'comment', value: value})
    }
  }
};
</script>
