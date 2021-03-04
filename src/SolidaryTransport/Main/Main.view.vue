<template>


  <!-- Listen to before and after tab change events -->
  <ion-tabs>

    <ion-tab tab="home">
      <ion-vue-router name="home" :animated="false"></ion-vue-router>
    </ion-tab>

    <ion-tab tab="help">
      <Help/>
    </ion-tab>

    <ion-tab tab="register">
      <ion-vue-router name="register" :animated="false"></ion-vue-router>
    </ion-tab>

    <ion-tab tab="login">
      <template v-if="$route.query.redirect">
        <LoginSolidary :init-redirect="{name: $route.query.redirect || 'solidaryTransport.home'}"/>
      </template>
      <template v-else>
        <LoginSolidary :init-redirect="{name: 'solidaryTransport.home'}"/>
      </template>
    </ion-tab>

    <ion-tab tab="messages">
      <ion-vue-router name="messages" :animated="false"></ion-vue-router>
    </ion-tab>

    <ion-tab tab="profile">
      <ion-vue-router name="profile" :animated="false"></ion-vue-router>
    </ion-tab>

    <!-- Use v-slot:bottom with Vue ^2.6.0 -->
    <template slot="bottom">
      <ion-tab-bar class="as-main">
        <ion-tab-button tab="home" :to="{ name: 'solidaryTransport.home' }">
          <ion-icon name="custom-logo"></ion-icon>
          <ion-label>{{ $t('solidaryTransport.navigation.home') }}</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="help" :to="{ name: 'solidaryTransport.help' }">
          <ion-icon name="help-circle"></ion-icon>
          <ion-label>{{ $t('solidaryTransport.navigation.help') }}</ion-label>
        </ion-tab-button>

        <template v-if="!this.$store.state.userStore.user">
          <ion-tab-button tab="register" :to="{ name: 'solidaryTransport.register' }">
            <ion-icon name="create"></ion-icon>
            <ion-label>{{ $t('solidaryTransport.navigation.register') }}</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="login" :to="{name: 'solidaryTransport.login' }">
            <ion-icon name="person"></ion-icon>
            <ion-label>{{ $t('solidaryTransport.navigation.login') }}</ion-label>
          </ion-tab-button>
        </template>
        <template v-else>
          <ion-tab-button tab="messages" :to="{ name: 'solidaryTransport.messages' }">
            <ion-icon name="text"></ion-icon>
            <ion-label>{{ $t('solidaryTransport.navigation.messages') }}</ion-label>
            <!--<ion-badge color="warning">6</ion-badge>-->
          </ion-tab-button>

          <ion-tab-button tab="profile" :to="{ name: 'solidaryTransport.profile' }">
            <ion-icon name="person"></ion-icon>
            <ion-label>{{ $t('solidaryTransport.navigation.profile') }}</ion-label>
          </ion-tab-button>
        </template>

      </ion-tab-bar>
    </template>
  </ion-tabs>
</template>

<style lang="scss">

  ion-tab-bar.as-main {
    --border: none;

    ion-tab-button {
      --background: #F5F6FA;
      --color: var(--ion-color-primary) !important;
      --color-selected: var(--ion-color-primary) !important;

      &[tab="home"] {
        ion-icon {
          width: .7em;
          height: 1em;
        }
      }
    }

    ion-tab-button.tab-selected {
      --background: var(--ion-color-primary) !important;
      --color: var(--ion-color-light) !important;
      --color-selected: var(--ion-color-light) !important;
    }
  }
</style>

<script>
  import _ from 'lodash'

  import Home from '../Home/Home.view.vue';
  import Help from '../Help/Help.view.vue';
  import Register from '../Register/Register.view.vue';
  import LoginSolidary from '../Login/LoginSolidary.view.vue';
  // import Register from '../Register/Register.view.vue';
  // import Login from '../Login/Login.view.vue';
  // import Help from '../Help/Help.view.vue';
  // import Messages from '../Messages/Messages.view.vue';
  // import Communities from '../Communities/Communities.view.vue';
  // import Profile from '../Profile/Profile.view.vue';

  export default {
    name: 'solidaryTransport.main',
    components: {
      Home,
      Help,
      Register,
      LoginSolidary
    },
    data () {
      return {
      }
    },
    methods: {}
  }
</script>
