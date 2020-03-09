<template>
  <div class="mc-container mc-user-home">
    <div class="mc-welcome-home" v-if="seeWelcome">
      <ion-icon name="close" item-right @click="closeWelcome()"></ion-icon>
      <h2 v-html="$t('HOME.title', { title })"></h2>
    </div>

    <div class="mc-user-home-login" v-if="! !!this.$store.state.userStore.user">
      <ion-button class='mc-big-button' color="success" expand="block" @click="$router.push('login')">
        {{ $t('HOME.sign-in') }}
      </ion-button>
      <ion-button class='mc-big-button' color="light" expand="block" fill="outline" @click="$router.push('register')">
        {{ $t('HOME.register') }}
      </ion-button>
    </div>

    <div class="mc-user-home-profile" v-if="!!this.$store.state.userStore.user">
      <div class="mc-user-bloc-info">
        <div class="mc-user-image">
          {{this.$store.state.userStore.avatars}}
          <ion-thumbnail v-if="!! this.$store.state.userStore.user.avatars">
            <img :src="this.$store.state.userStore.user.avatars[0]" alt="">
          </ion-thumbnail>
        </div>

        <div class="mc-user-info">
          <p>{{this.$store.state.userStore.user.givenName }}</p>
          <p>{{this.$store.state.userStore.user.shortFamilyName }}</p>
        </div>
      </div>

      <div class="mc-user-action">
        <ion-icon name="create" size="large" class="ion-padding-end"></ion-icon>
         <ion-icon name="log-out" size="large" v-on:click="logout"></ion-icon>
      </div>

    </div>
  </div>
</template>

<style lang="scss">

  .mc-welcome-home {
    text-align: right;
    h2 {
      font-weight: bold;
      text-align: center;
      margin-bottom: 200px;
    }
  }

  .mc-user-home-profile {
    display: flex;
    justify-content: space-between;

    .mc-user-bloc-info {
      display: flex;
    }

    ion-thumbnail {
      --size: 90px;
      --border-radius: 50%;
    }

    .mc-user-info {
      display: flex;
      justify-content: center;
      flex-direction: column;
      margin-left: 20px;

      p {
        margin: 0;
        font-weight: bold;
      }
    }

  }

</style>

<script>

  export default {
    name: 'user-home',
    data () {
      return {
        title: process.env.VUE_APP_NAME,
        seeWelcome: true
      }
    },
    mounted() {},
    methods: {

      closeWelcome: function() {
        this.seeWelcome = false;
      },

      logout: function() {
        this.$store.dispatch('logout').then(() => {

          // On va authentifier l'appli via un utilisateur anonyme
          this.$store.dispatch('authAnonymousUser')
        });
      }
    }
  }
</script>
