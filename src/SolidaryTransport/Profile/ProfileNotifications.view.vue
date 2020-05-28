<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>{{$t('solidaryTransport.profile.notifications.title')}}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary">
      <div class="mc-st-container">

        <div class="mc-st-form" v-if="!loading">
          <div class="mc-st-form-content">
            <div class="mc-st-form-item as-list">

              <div class="mc-st-form-list" v-for="(notification, index) in this.$store.state.userStore.alerts" :key="notification.action">
                <div class="mc-st-form-list-header">
                  <ion-label>{{$t('solidaryTransport.profile.notifications.actions.' + camelCase(notification.action))}}</ion-label>
                </div>
                <ion-item class="mc-st-form-list-item" lines="none" v-for="item in notification.alert" :key="item.id">
                  <ion-checkbox
                    class="mc-st-form-checkbox"
                    color="success"
                    slot="start"
                    :value="item.active"
                    :checked="item.active"
                    @ionChange="item.active = $event.target.checked; dispatch($event, item);"
                  ></ion-checkbox>
                  <ion-label class="mc-st-form-label no-white-space" color="primary">{{ $t('solidaryTransport.profile.notifications.types.' + item.medium) }}</ion-label>
                  <ion-icon class="rotating" size="medium" slot="end" :hidden="!($store.state.userStore.statusUpdateAlert == 'loading' && currentUpdateIds.includes(item.id))" name="sync"></ion-icon>
                </ion-item>
              </div>

            </div>
          </div>

        </div>

        <div class="mc-st-loading" v-else>
          <ion-spinner name="crescent" class="mc-st-loading-spinner"></ion-spinner>
          <p class="mc-st-loading-message">{{$t('solidaryTransport.commons.loading')}}</p>
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="scss"></style>

<script>
import { mapState, mapGetters } from 'vuex'
import {toast} from "../../Shared/Mixin/toast.mixin"

export default {
  name: 'solidaryTransport.profile.notifications',
  components: {},
  data () {
    return {
      processing: false,
      loading: true,
      currentUpdateIds : []
    }
  },
  mixins: [toast],
  created() {
    this.$store.dispatch('getAlerts', this.$store.state.userStore.user.id)
    .then(res => {
      this.loading = false
    }).catch(err => {
      this.presentToast(this.$t("Commons.error"), "danger");
    });
  },
  computed: {
    ...mapState([
      'userStore'
    ])
  },
  methods: {
    camelCase: function (string) {
      return _.camelCase(string)
    },
    dispatch: function (event, alert) {
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