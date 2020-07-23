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
  <div class="ion-page">
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/carpools/home"></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center"> {{ $t('ProfileAlerts.title') }} </h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" no-bounce>
      <div class="mc-white-container">

        <div class='mc-profile-alerts'>
          <div class='mc-block-alert' v-for="alertItem in alerts" v-bind:key="alertItem.action">
            {{$t(`ProfileAlerts.${alertItem.action}`)}}

            <ion-item lines="none" v-for="alert in alertItem.alert" v-bind:key="alert.id">
              <ion-label>{{$t(`ProfileAlerts.medium-${alert.medium}`)}}</ion-label>
              <ion-checkbox slot="start" :checked="alert.active" @ionChange="onChange($event, alert)"></ion-checkbox>
              <ion-icon slot="end" class="rotating" :hidden="!($store.state.userStore.statusUpdateAlert == 'loading' && currentUpdateIds.includes(alert.id))" name="md-sync"></ion-icon>
            </ion-item>
          </div>
        </div>

      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
  .mc-profile-alerts {
    margin-top: 20px;

    .mc-block-alert {
      margin-bottom: 20px;
      border-bottom: 1px solid var(--ion-color-primary);

      .mc-alert-switch {
        display: flex;
        align-items: center;
      }
    }
  }
</style>

<script>
  import {toast} from "../../Shared/Mixin/toast.mixin";

  export default {
    name: 'profile-alerts',
    data () {
      return {
        currentUpdateIds : []
      }
    },
    mixins: [toast],
    created() {
      this.$store.dispatch('getAlerts', this.$store.state.userStore.user.id).then(res => {}).catch(err => {});
    },
    computed: {
      alerts: {
        get() {
          return this.$store.state.userStore.alerts
        },
      }
    },
    methods: {
      onChange(event, alert) {
        this.currentUpdateIds.push(alert.id);
        this.$store.dispatch('updateAlert', {
          userId: this.$store.state.userStore.user.id,
          alertId: alert.id,
          alertValue: event.detail.checked
        }).then(res => {
          this.currentUpdateIds.splice(this.currentUpdateIds.find(item => item.id === alert.id), 1)
        }).catch(err => {
          this.currentUpdateIds.splice(this.currentUpdateIds.find(item => item.id === alert.id), 1)
          this.presentToast(this.$t("Commons.error"), "danger");
        });
      }
    }
  }
</script>
