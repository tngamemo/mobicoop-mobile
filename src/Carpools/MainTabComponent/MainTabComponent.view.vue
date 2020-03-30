<template>
  <div>


      <!-- Listen to before and after tab change events -->
      <ion-tabs>

        <ion-tab tab="home" :routes="'carpoolsHome'">
          <Home />
          <BannerCookie />
        </ion-tab>

        <ion-tab tab="help"  v-if="! !!this.$store.state.userStore.user">
          <Article :title="$t('Help.title')" id="10"/>
        </ion-tab>

        <ion-tab tab="register"  v-if="! !!this.$store.state.userStore.user">
          <Register />
        </ion-tab>

        <ion-tab tab="login"  v-if="! !!this.$store.state.userStore.user">
          <Login />
        </ion-tab>

        <ion-tab tab="messages" v-if="!!this.$store.state.userStore.user">
          <keep-alive>
          <Messages />
          </keep-alive>
        </ion-tab>

        <ion-tab tab="communities"  v-if="!!this.$store.state.userStore.user">
          <Communities />
        </ion-tab>

        <ion-tab tab="profile"  v-if="!!this.$store.state.userStore.user">
          <Profile />
        </ion-tab>



        <!-- Use v-slot:bottom with Vue ^2.6.0 -->
        <template slot="bottom">
          <ion-tab-bar>
            <ion-tab-button tab="home" :to="{ name: 'carpoolsHome' }">
              <ion-icon name="home"></ion-icon>
              <ion-label>{{ $t('Nav.home') }}</ion-label>
            </ion-tab-button>

            <ion-tab-button v-if="! !!this.$store.state.userStore.user" tab="help" :to="{ name: 'help' }">
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

            <ion-tab-button v-if="!!this.$store.state.userStore.user" tab="messages" :to="{ name: 'messages' }">
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
            </ion-tab-button>


          </ion-tab-bar>
        </template>
      </ion-tabs>
  </div>
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
  import BannerCookie from "../Shared/Components/BannerCookie.component";
  import Home from '../Home/Home.view.vue';
  import Register from '../Register/Register.view.vue';
  import Login from '../Login/Login.view.vue';
  import Article from '../Article/Article.view.vue';
  import Messages from '../Messages/Messages.view.vue';
  import Communities from '../Communities/Communities.view.vue';
  import Profile from '../Profile/Profile.view.vue';
  import { isPlatform } from "@ionic/core";

  export default {
    name: 'carpools',
    components: {
      Home,
        Register,
        Login,
        Article,
        Profile,
        Messages,
        Communities,
        BannerCookie
    },
    data () {
      return {
        isMobile: isPlatform(window.document.defaultView, "mobile"),
      }
    }
  }
</script>
