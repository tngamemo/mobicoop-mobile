<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>{{$t('solidaryTransport.profile.preferences.title')}}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary">
      <div class="mc-st-container">

        <div class="mc-st-form">
          <div class="mc-st-form-content">
            <ion-list class="mc-st-form-item as-list">

              <!-- SMOKE -->
              <ion-radio-group class="mc-st-form-list">
                <ion-list-header class="mc-st-form-list-header">
                  <ion-label>{{$t('solidaryTransport.profile.preferences.smoke.title')}}</ion-label>
                </ion-list-header>

                <ion-item lines="none" class="mc-st-form-list-item" v-for="(item, index) in [0, 1, 2]" :key="index">
                  <ion-label class="ion-text-wrap">{{$t('solidaryTransport.profile.preferences.smoke.' + index)}}</ion-label>
                  <ion-radio slot="start" :value="index" :checked="userStore.user.smoke == index" @ionSelect="userStore.user.smoke = index"></ion-radio>
                </ion-item>
              </ion-radio-group>

              <!-- MUSIC -->
              <ion-radio-group class="mc-st-form-list">
                <ion-list-header class="mc-st-form-list-header">
                  <ion-label>
                    {{$t('solidaryTransport.profile.preferences.music.title')}}
                  </ion-label>
                </ion-list-header>
                <ion-item lines="none" class="mc-st-form-list-item" v-for="(item, index) in [true, false]" :key="index">
                  <ion-label class="ion-text-wrap">{{$t('solidaryTransport.profile.preferences.music.' + item)}}</ion-label>
                  <ion-radio slot="start" :value="item" :checked="userStore.user.music == item" @ionSelect="userStore.user.music = item"></ion-radio>
                </ion-item>
              </ion-radio-group>

              <!-- CHAT -->
              <ion-radio-group class="mc-st-form-list">
                <ion-list-header class="mc-st-form-list-header">
                  <ion-label>
                    {{$t('solidaryTransport.profile.preferences.chat.title')}}
                  </ion-label>
                </ion-list-header>
                <ion-item lines="none" class="mc-st-form-list-item" v-for="(item, index) in [true, false]" :key="index">
                  <ion-label class="ion-text-wrap">{{$t('solidaryTransport.profile.preferences.chat.' + item)}}</ion-label>
                  <ion-radio slot="start" :value="item" :checked="userStore.user.chat == item" @ionSelect="userStore.user.chat = item"></ion-radio>
                </ion-item>
              </ion-radio-group>

            </ion-list>
          </div>

          <div class="mc-st-form-controls with-multiple" :class="{'is-loading': processing}">
            <ion-button class="mc-st-form-control as-back" color="light" v-html="$t('solidaryTransport.buttons.back')" @click="$router.back()"></ion-button>

            <ion-button class="mc-st-form-control as-loader" color="success" @click="validate()">
              <ion-icon slot="start" name="sync" size="large"></ion-icon>
              <span v-html="$t('solidaryTransport.buttons.save')"></span>
            </ion-button>
          </div>

        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="scss"></style>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'solidaryTransport.profile.preferences',
  components: {},
  data () {
    return {
      processing: false
    }
  },
  computed: {
    ...mapState([
      'userStore'
    ])
  },
  methods: {
    validate: function () {
      if (!this.processing) {
        this.processing = true

        this.$store.dispatch('updateUser', this.userStore.user)
        .then(() => {
          this.$router.back();
        }).catch(() => {
          this.presentToast(this.$t("Commons.error"), "danger");
        })
        .finally(() => {
          this.processing = false
        })
      }
    }
  },
  created: function () {}
}
</script>