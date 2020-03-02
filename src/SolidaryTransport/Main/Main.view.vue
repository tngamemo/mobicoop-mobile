<template>


  <!-- Listen to before and after tab change events -->
  <ion-tabs>

    <ion-tab tab="home" :routes="'solidaryTransport.home'">
      <Home/>
    </ion-tab>

    <ion-tab tab="register">
      <div>register</div>
    </ion-tab>

    <ion-tab tab="login">
      <div>login</div>
    </ion-tab>

    <!-- Use v-slot:bottom with Vue ^2.6.0 -->
    <template slot="bottom">
      <ion-tab-bar>
        <ion-tab-button tab="home" :to="{ name: 'solidaryTransport.home' }">
          <ion-icon name="home"></ion-icon>
          <ion-label>{{ $t('SolidaryTransport.Navigation.home') }}</ion-label>
        </ion-tab-button>

        <template v-if="!this.$store.state.userStore.user">
          <ion-tab-button v-if="! !!this.$store.state.userStore.user" :to="{ name: 'solidaryTransport.help' }">
            <ion-icon name="help-circle"></ion-icon>
            <ion-label>{{ $t('SolidaryTransport.Navigation.help') }}</ion-label>
          </ion-tab-button>

          <ion-tab-button v-if="! !!this.$store.state.userStore.user" tab="register">
            <ion-icon name="create"></ion-icon>
            <ion-label>{{ $t('Nav.register') }}</ion-label>
          </ion-tab-button>

          <ion-tab-button v-if="! !!this.$store.state.userStore.user" tab="login">
            <ion-icon name="person"></ion-icon>
            <ion-label>{{ $t('Nav.sign-in') }}</ion-label>
          </ion-tab-button>
        </template>
        <template v-else>

        </template>

        <!-- <ion-tab-button v-if="!!this.$store.state.userStore.user" tab="messages" :to="{ name: 'messages' }">
          <ion-icon name="text"></ion-icon>
          <ion-label>{{ $t('Nav.messages') }}</ion-label>
        </ion-tab-button>

        <ion-tab-button v-if="!!this.$store.state.userStore.user" tab="communities" :to="{ name: 'communities' }">
          <ion-icon name="people"></ion-icon>
          <ion-label>{{ $t('Nav.communities') }}</ion-label>
        </ion-tab-button>

        <ion-tab-button v-if="!!this.$store.state.userStore.user" tab="profile" :to="{ name: 'profile' }">
          <ion-icon name="person"></ion-icon>
          <ion-label>{{ $t('Nav.profile') }}</ion-label>
        </ion-tab-button> -->


      </ion-tab-bar>
    </template>
  </ion-tabs>
</template>

<style>

  ion-tab-bar {
    --border: none;
  }

  ion-tab-button {
    --background: #F5F6FA;
    --color: var(--ion-color-primary) !important;
    --color-selected: var(--ion-color-primary) !important;
  }

  ion-tab-button.tab-selected {
    --background: var(--ion-color-primary) !important;
    --color: var(--ion-color-light) !important;
    --color-selected: var(--ion-color-light) !important;
  }
</style>

<script>

  import Home from '../Home/Home.view.vue';
  // import Register from '../Register/Register.view.vue';
  // import Login from '../Login/Login.view.vue';
  // import Help from '../Help/Help.view.vue';
  // import Messages from '../Messages/Messages.view.vue';
  // import Communities from '../Communities/Communities.view.vue';
  // import Profile from '../Profile/Profile.view.vue';

  export default {
    name: 'solidary.main',
    components: {
      Home
    },
    data () {
      return {
      }
    }
  }
</script>
