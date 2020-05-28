<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start"></ion-buttons>
        <ion-title text-center>{{$t('solidaryTransport.profile.title')}}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary">
      <div class="mc-st-container is-profile">
        <div class="mc-st-content">
          <div class="mc-st-profile">
            <ProfileCard :is-detailed="true"/>
          </div>

          <div class="mc-st-actions when-connected">
            <ion-button class="mc-st-action" color="success" @click="$router.push({name:'solidaryTransport.profile.agenda'})">
              <ion-icon slot="start" name="calendar"></ion-icon>
              <span v-html="$t('solidaryTransport.profile.actions.agenda')"></span>
            </ion-button>

            <ion-button class="mc-st-action" color="success" @click="$router.push({name:'solidaryTransport.profile.requests'})">
              <ion-icon slot="start" name="hand"></ion-icon>
              <span v-html="$t('solidaryTransport.profile.actions.requests')"></span>
            </ion-button>

            <ion-button class="mc-st-action" color="success" @click="$router.push({name:'solidaryTransport.profile.notifications'})">
              <ion-icon slot="start" name="notifications"></ion-icon>
              <span v-html="$t('solidaryTransport.profile.actions.manage')"></span>
            </ion-button>

            <ion-button class="mc-st-action" color="warning" @click="logout()">
              <ion-icon slot="start" name="exit"></ion-icon>
              <span v-html="$t('solidaryTransport.profile.actions.logout')"></span>
            </ion-button>

            <ion-button class="mc-st-action" color="danger" @click="$router.push({name:'solidaryTransport.profile.delete'})">
              <ion-icon slot="start" name="trash"></ion-icon>
              <span v-html="$t('solidaryTransport.profile.actions.delete')"></span>
            </ion-button>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="scss">
  .mc-st-container.is-profile {
    
  }
</style>

<script>
  import { mapState, mapGetters } from 'vuex'

  import ProfileCard from '../Profile/ProfileCard.component.vue'

  export default {
    name: 'solidaryTransport.profile',
    components: {
      ProfileCard
    },
    data () {
      return {}
    },
    computed: {},
    methods: {
      logout: function() {
        this.$store.dispatch('logout')
        this.$router.replace({name: 'solidaryTransport.login'})
      }
    },
    created: function () {}
  }
</script>