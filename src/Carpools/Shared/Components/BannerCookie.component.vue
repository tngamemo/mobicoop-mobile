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
  <div v-if="!this.$store.getters.userCookies" class="mc-banner-cookie">
    <p>
      {{$t('BannerCookie.desc')}}
      <a
        style="color:#284b99"
        v-on:click="$router.push('/article/4')"
      >{{$t('BannerCookie.politic')}}</a>
    </p>
    <button class="mc-button-cookie" v-on:click="setUserCookie">{{$t('BannerCookie.agree')}}</button>
  </div>
</template>

<style lang="scss">
.mc-banner-cookie {
  position: absolute;
  z-index: 1;
  bottom: 0;
  background: white;
  padding: 10px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  border: 1px solid var(--ion-color-primary);
  p {
    font-size: 0.8rem;
    margin-bottom: 0;
  }

  .mc-button-cookie {
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
  name: "BannerCookie",
  data: function() {
    return {
    };
  },
  mounted() {},
  methods: {
    setUserCookie() {
      this.$store.commit("changeUserCookies", true);
    }
  }
};
</script>
