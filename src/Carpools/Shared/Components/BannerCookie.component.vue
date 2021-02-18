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
  <div v-if="cookies.seePopup" class="mc-banner-cookie">
    <h5>{{$t('BannerCookie.private-life')}}: <b>{{appName}} {{$t('BannerCookie.private-life-choice')}}</b></h5>
    <p>
      {{$t('BannerCookie.desc')}}
    </p>
    <p>
      {{$t('BannerCookie.politic-desc')}}
      <a class="pointer" style="color:#284b99" v-on:click="$router.push('/article/18')">{{$t('BannerCookie.politic')}}</a>
    </p>
    <ion-item lines="none">
      <ion-checkbox slot="start" @ionChange="switchAttr('connexion')" :checked="cookies.connexion"></ion-checkbox>
      <ion-label>{{$t('BannerCookie.connexion')}} <br><small class="text-grey">{{$t('BannerCookie.necessary-cookie')}}</small></ion-label>
     </ion-item>
    <ion-item lines="none">
      <ion-checkbox slot="start" @ionChange="switchAttr('statistics')" :checked="cookies.statistics"></ion-checkbox>
      <ion-label>{{$t('BannerCookie.statistics')}}
        <br><small class="text-grey">{{$t('BannerCookie.optional-cookie')}}</small>
        <br><div class="statistics text-grey">{{$t('BannerCookie.statistics-desc')}}</div>
      </ion-label>
    </ion-item>
    <ion-item lines="none">
      <ion-checkbox  slot="start" @ionChange="switchAttr('socialNetwork')" :checked="cookies.socialNetwork"></ion-checkbox>
      <ion-label>{{$t('BannerCookie.socialNetwork')}}
        <br><small class="text-grey">{{$t('BannerCookie.optional-cookie')}}</small>
      </ion-label>
    </ion-item>
    <button class="mc-button-cookie" v-on:click="closePopup">{{$t('BannerCookie.register')}}</button>
    <div style="height: 15px"></div>
  </div>
</template>

<style lang="scss">
.mc-banner-cookie {
  position: absolute;
  z-index: 1;
  bottom: 0;
  background: white;
  padding: 15px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  border: 1px solid var(--ion-color-primary);
  width: 100%;
  max-height: 100%;
  overflow-y: scroll;

  p {
    font-size: 0.8rem;
    margin-bottom: 0;
  }

  .mc-button-cookie {
    float: right;
    background: var(--ion-color-primary);
    padding: 8px 12px;
    color: #fff;
    border-width: 2px 4px;
    border-radius: 40px;
    font-size: 1em;
    margin-top: 15px;
  }

  ion-label {
    white-space: normal !important;
  }

  .statistics {
    font-size: 12px;
    line-height: 14px;
  }
}
</style>

<script>
  import { EventBus } from '../../../Shared/Mixin/event-bus.js';

export default {
  name: "BannerCookie",
  data: function() {
    return {
      appName: process.env.VUE_APP_NAME,
    };
  },
  created() {
    if (!!!this.cookies || typeof this.cookies === "boolean") {
      this.cookies = {
        connexion: false,
        statistics: false,
        socialNetwork: false,
        seePopup: true
      }
    }
  },
  computed: {
    cookies: {
      get() {
        return this.$store.state.appStore.userCookies;
      },
      set(cookies) {
        this.$store.commit("changeUserCookies", cookies);
      }
    }
  },
  methods: {
    switchAttr(attr) {
      this.cookies[attr] = !this.cookies[attr];
      this.cookies = this.cookies;
    },
    closePopup() {
      this.cookies.seePopup = false;
      this.cookies = this.cookies;
      if (this.cookies.statistics) {
        EventBus.$emit('INIT_STATISTICS');
      }
    }
  }
};
</script>
