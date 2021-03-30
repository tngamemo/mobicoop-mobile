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
  <div class="mc-banner-badge">
    <p>
      {{ $t('Badge.actionCompleted.message') }}
    </p>
    <button class="mc-button-badge" v-on:click="redirectToMyBadges">{{ $t('Badge.actionCompleted.button.text') }}</button>
    <ion-fab-button color="primary">Primary</ion-fab-button>
  </div>
</template>

<style lang="scss">
.mc-banner-badge {
  position: absolute;
  z-index: 1;
  top: 10px;
  right: 10px;
  left: 10px;
  background: white;
  padding: 10px;
  border-radius: 30px;
  border: 1px solid var(--ion-color-primary);
  p {
    font-size: 0.9rem;
    margin-bottom: 0;
    color: #000000;
  }

  .mc-button-badge {
    float: right;
    background: #666;
    padding: 8px;
    color: #fff;
    border-width: 2px 4px;
    border-radius: 40px;
    font-size: 1em;
  }
}
</style>

<script>
export default {
  name: "banner-completed-action",
  data: function() {
    return {
    };
  },
  mounted() {},
  methods: {
    redirectToMyBadges() {
        this.$router.push({ name: "my-badges" });
    }
  }
};
</script>
