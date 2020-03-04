<template>
  <ion-page>
    <ion-header no-border>
        <ion-toolbar color="primary">
          <div class='mc-home-header'>
            <div class="mc-home-log">
              <img class="background-img ion-margin-end" src="../../assets/icons/home.svg">
              <h1>{{$t('SolidaryTransport.Home.title')}}</h1>
            </div>
          </div>
        </ion-toolbar>
      </ion-header>

      <ion-content color="primary">
        <div class="mc-home-container">

          <div class="mc-home-logo">
            <img class="mc-home-vector" src="../../assets/icons/home.svg">
          </div>

          <div class="mc-home-content">
            <div class="mc-home-information" :class="{'is-active': display.information}">
              <ion-icon class="mc-information-icon" name="close" @click="closeInformation()"></ion-icon>
              <div class="mc-information-text" v-html="$t('SolidaryTransport.Home.information')"></div>
            </div>

            <div class="mc-home-actions">
              <ion-button class="mc-action" color="success" v-html="$t('SolidaryTransport.Home.actions.ask')"></ion-button>
              <ion-button class="mc-action" color="success" v-html="$t('SolidaryTransport.Home.actions.give')"></ion-button>
              <ion-button class="mc-action as-contact" color="light">
                <ion-icon slot="start" name="chatboxes"></ion-icon>
                <span v-html="$t('SolidaryTransport.Home.actions.contact')"></span>
              </ion-button>
            </div>
          </div>

          <div class="mc-home-panel">
            
          </div>
        <!-- <UserHome /> -->

        

          
            <!-- <div class="mc-welcome-home" v-if="seeWelcome">
              <ion-icon name="close" item-right @click="closeWelcome()"></ion-icon>
              <h2 v-html="$t('HOME.title', { title })"></h2>
            </div> -->

            <!-- <div class="mc-user-home-login" v-if="! !!this.$store.state.userStore.user">
              <ion-button class='mc-big-button' color="success" expand="block" @click="$router.push('login')">
                {{ $t('HOME.sign-in') }}
              </ion-button>
              <ion-button class='mc-big-button' color="light" expand="block" fill="outline" @click="$router.push('register')">
                {{ $t('HOME.register') }}
              </ion-button>
            </div> -->

            <!-- <div class="mc-user-home-profile" v-if="!!this.$store.state.userStore.user">
              <div class="mc-user-bloc-info">
                <div class="mc-user-image">
                  {{this.$store.state.userStore.avatars}}
                  <ion-thumbnail v-if="!! this.$store.state.userStore.user.avatars">
                    <img :src="this.$store.state.userStore.user.avatars[0]">
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

            </div> -->
          

          <!-- <SearchHome /> -->

          <!-- <BlockAction
            :action="'communities'"
            :color="'#2E499A'"
            :colorBg="'rgba(46, 73, 154, 0.4)'"
            :icon="'briefcase'"
            @clickButton="redirectToCommunities()"
          />

          <BlockAction
            :action="'events'"
            :color="'#C67100'"
            :colorBg="'#FFD149'"
            :icon="'musical-note'"
            @clickButton="redirectToEvents()"
          /> -->

        </div>
      </ion-content>
  </ion-page>
</template>

<style lang="scss">
  .mc-home-container {
    border-radius: 15px 15px 0px 0px;
    padding: 15px 30px 30px;
    min-height: 100%;
    position: relative;

    .mc-home-logo {
      position: absolute;
      z-index: 0;
      width: 44%;
      right: -5%;
      top: 0;
      opacity: .2;

      .mc-home-vector {
        width: 100%
      }
    }

    .mc-home-content {
      position: relative;
      z-index: 1;

      .mc-home-information {
        max-height: 0;
        opacity: 0;
        transition: max-height .7s ease, opacity .5s ease;

        &.is-active {
          opacity: 1;
          max-height: 600px;

          + .mc-home-actions {
            margin-top: 20px;
          }
        }

        .mc-information-icon {
          font-size: 18px;
          float: right;
        }

        .mc-information-text {
          font-size: 14px;
          text-align: center;
          padding: 0 10px;
        }

        + .mc-home-actions {
          margin-top: 0;
        }
      }

      .mc-home-actions {
        transition: margin-top .4s ease .4s;

        .mc-action {
          --border-radius: 25px;
          --padding-start: 30px;
          --padding-end: 30px;
          height: 60px;
          width: 100%;
          word-break: break-word;
          white-space: normal;
          font-weight: bold;
          text-transform: none;
          font-size: 14px;

          + .mc-action {
            margin-top: 15px
          }

          &.as-contact {
            --background: var(--ion-color-light);
            --color: var(--ion-color-primary);
          }
        }


      }
    }
  }
</style>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'solidary.home',
  components: {},
  data () {
    return {
      display: {
        information: true
      },
      sections: []
    }
  },
  computed: {},
  methods: {
    closeInformation: function () {
      this.display.information = false
    }
  },
  created: function () {}
}
</script>