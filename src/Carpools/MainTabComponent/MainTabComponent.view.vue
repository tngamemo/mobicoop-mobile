<template>


      <!-- Listen to before and after tab change events -->
      <ion-tabs>
        <ion-tab tab="home" :routes="'carpoolsHome'">
          <Home />
        </ion-tab>

        <!-- Match by "app.speakers" route name -->
        <ion-tab tab="speakers" :routes="'app.speakers'">
          <Speakers />
        </ion-tab>

        <!-- Use v-slot:bottom with Vue ^2.6.0 -->
        <template slot="bottom">
          <ion-tab-bar>
            <ion-tab-button tab="home" :to="{ name: 'carpoolsHome' }">
              <ion-icon name="home"></ion-icon>
              <ion-label>{{ $t('Nav.home') }}</ion-label>
            </ion-tab-button>

            <ion-tab-button v-if="! !!this.$store.state.userStore.user" tab="help" :to="{ name: 'app.speakers' }">
              <ion-icon name="help-circle"></ion-icon>
              <ion-label>{{ $t('Nav.help') }}</ion-label>
            </ion-tab-button>

            <ion-tab-button v-if="! !!this.$store.state.userStore.user" tab="register" :to="{ name: 'register' }">
              <ion-icon name="create"></ion-icon>
              <ion-label>{{ $t('Nav.register') }}</ion-label>
            </ion-tab-button>

            <ion-tab-button v-if="! !!this.$store.state.userStore.user" tab="login" :to="{ name: 'login' }">
              <ion-icon name="person"></ion-icon>
              <ion-label>{{ $t('Nav.sign-in') }}</ion-label>
            </ion-tab-button>

            <ion-tab-button v-if="!!this.$store.state.userStore.user" tab="help" :to="{ name: 'app.speakers' }">
              <ion-icon name="text"></ion-icon>
              <ion-label>{{ $t('Nav.messages') }}</ion-label>
            </ion-tab-button>

            <ion-tab-button v-if="!!this.$store.state.userStore.user" tab="register" :to="{ name: 'register' }">
              <ion-icon name="people"></ion-icon>
              <ion-label>{{ $t('Nav.communities') }}</ion-label>
            </ion-tab-button>

            <ion-tab-button v-if="!!this.$store.state.userStore.user" tab="login" :to="{ name: 'login' }">
              <ion-icon name="person"></ion-icon>
              <ion-label>{{ $t('Nav.profile') }}</ion-label>
            </ion-tab-button>


          </ion-tab-bar>
        </template>
      </ion-tabs>
</template>

<style>

  ion-tab-bar {
    --border: none;
  }

  ion-tab-button {
    --background: ##F5F6FA;
    --color: var(--ion-color-statusbar) !important;
    --color-selected: var(--ion-color-statusbar) !important;
  }

  ion-tab-button.tab-selected {
    --background: var(--ion-color-statusbar) !important;
    --color: var(--ion-color-primary) !important;
    --color-selected: var(--ion-color-primary) !important;
  }
</style>

<script>

  import Home from '../Home/Home.view.vue';
  export default {
    name: 'carpools',
    components: {
      Home
    },
    data () {
      return {
      }
    }
  }
</script>
