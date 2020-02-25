<template>
  <div class="ion-page">
    <ion-header no-border>
      <ion-toolbar color="background">
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center"> {{ $t('Profile.title') }} </h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="background" no-bounce>
      <div class="mc-white-container" style="height: 100%">

        <!-- Bloc user -->
        <div class="mc-user-profile ion-margin-bottom" v-if="user">
          <div class="mc-user-bloc-info">
            <div class="mc-user-image">
              <ion-thumbnail v-if="!! user.avatars">
                <img :src="user.avatars[0]">
              </ion-thumbnail>
            </div>

            <div class="mc-user-info">
              <p><b>{{user.givenName }} {{user.shortFamilyName}}</b></p>
              <p>{{user.email }}</p>
              <p>{{user.telephone }}</p>
              <p v-if="user.addresses[0]">{{user.addresses[0].addressLocality }}</p>
            </div>
          </div>

          <div class="mc-user-action">
            <ion-icon @click="$router.push('update-profile')" name="create" size="large" class="ion-padding-end pointer"></ion-icon>
          </div>

        </div>

        <!-- Bloc buttons -->
        <div>
          <ion-button class='mc-big-button' color="success" expand="block" @click="">
            <ion-icon class="ion-margin-end" name="list-box"></ion-icon> {{ $t('Profile.my-announce') }}
          </ion-button>
          <!--
          <ion-button class='mc-big-button' color="success" expand="block" @click="">
            <ion-icon class="ion-margin-end" name="checkmark-circle"></ion-icon> {{ $t('Profile.my-accepted-carpools') }}
          </ion-button>
          -->
          <ion-button class='mc-big-button' color="success" expand="block" @click="">
            <ion-icon class="ion-margin-end" name="notifications"></ion-icon> {{ $t('Profile.alerts') }}
          </ion-button>
          <ion-button class='mc-big-button' color="warning" expand="block" @click="logout()">
            <ion-icon class="ion-margin-end" name="log-out"></ion-icon> {{ $t('Profile.logout') }}
          </ion-button>
          <ion-button class='mc-big-button' color="danger" expand="block" @click="">
            <ion-icon class="ion-margin-end" name="trash"></ion-icon> {{ $t('Profile.delete') }}
          </ion-button>
        </div>

      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
  .mc-user-profile {
    display: flex;
    justify-content: space-between;
    color: var(--ion-color-primary);

    .mc-user-bloc-info {
      display: flex;
    }

    ion-thumbnail {
      --size: 90px;
      --border-radius: 50%;
    }

    .mc-user-info {
      margin-left: 20px;

      p {
        margin: 0;
      }
    }

  }
</style>

<script>
  export default {
    name: 'profile',
    data () {
      return {

      }
    },
      computed: {
          user : {
              get() {
                  return this.$store.state.userStore.user
              }
          }
      },
      created() {

      },
    methods: {
        logout: function() {
            this.$store.dispatch('logout');
            this.$router.push('home');
        }
    }
  }
</script>
