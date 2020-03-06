<template>


  <!-- Listen to before and after tab change events -->
  <ion-tabs @IonTabsWillChange="tabsChange()">

    <ion-tab tab="home" :routes="'solidaryTransport.home'">
      <Home/>
    </ion-tab>

    <ion-tab tab="help" :routes="'solidaryTransport.help'">
      <Help/>
    </ion-tab>

    <template v-if="!this.$store.state.userStore.user">

      <ion-tab tab="register">
        <ion-vue-router name="register"></ion-vue-router>
      </ion-tab>

      <ion-tab tab="login" :routes="'solidaryTransport.login'">
        <Login/>
      </ion-tab>

    </template>
    <template v-else>

      <ion-tab tab="messages" :routes="'solidaryTransport.messages'">
        <Register/>
      </ion-tab>

      <ion-tab tab="profile" :routes="'solidaryTransport.profile'">
        <Login/>
      </ion-tab>

    </template>

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

          <ion-tab-button tab="login" :to="{name: 'login'}">
            <ion-icon name="person"></ion-icon>
            <ion-label>{{ $t('solidaryTransport.navigation.login') }}</ion-label>
          </ion-tab-button>
        </template>
        <template v-else>
          <ion-tab-button tab="messages" :to="{ name: 'solidaryTransport.messages' }">
            <ion-icon name="text"></ion-icon>
            <ion-label>{{ $t('solidaryTransport.navigation.messages') }}</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="profile" :to="{ name: 'profile' }">
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
      pointer-events: none;
    }
  }
</style>

<script>
  import _ from 'lodash'

  import Home from '../Home/Home.view.vue';
  import Help from '../Help/Help.view.vue';
  import Register from '../Register/Register.view.vue';
  import Login from '../Login/Login.view.vue';
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
      Login
    },
    data () {
      return {
      }
    },
    methods: {
      tabsChange: function () {
        // // Prevent Query Type propagation on tab change
        // if (!_.isEmpty(this.$route.query.type)) {
        //   setTimeout(() => {
        //     this.$router.replace({query: {type: undefined}})
        //   }, 100)
        // }
      }
    }
  }
</script>
