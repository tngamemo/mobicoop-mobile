<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar class="on-home" color="primary">
        <ion-buttons slot="start">
          <ion-button color="light">
            <ion-icon slot="icon-only" name="custom-logo"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title text-left>{{ $t('solidaryTransport.home.title') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary">
      <div class="mc-home-container">

        <div class="mc-home-logo">
          <img class="mc-home-vector" src="../assets/icons/home.svg">
        </div>

        <template v-if="!this.$store.state.userStore.user">

          <div class="mc-home-content">
            <div class="mc-home-information" :class="{'is-active': display.information}">
              <ion-icon class="mc-information-icon" name="close" @click="closeInformation()"></ion-icon>
              <div class="mc-information-text" v-html="$t('solidaryTransport.home.information')"></div>
            </div>

            <div class="mc-home-actions">
              <ion-button class="mc-action is-high" color="success" v-html="$t('solidaryTransport.home.actions.ask')" @click="$router.push({name:'solidaryTransport.register', query: {type: 'ask'}})"></ion-button>
              <ion-button class="mc-action is-high" color="success" v-html="$t('solidaryTransport.home.actions.give')" @click="$router.push({name:'solidaryTransport.register', query: {type: 'give'}})"></ion-button>
              <ion-button class="mc-action as-light" color="light">
                <ion-icon slot="start" name="chatboxes"></ion-icon>
                <span v-html="$t('solidaryTransport.home.actions.contact')"></span>
              </ion-button>
            </div>
          </div>
          
        </template>

        <template v-else>

          <div class="mc-home-content">
            <div class="mc-home-profile">
              <UserCard/>
            </div>

            <div class="mc-home-information" :class="{'is-active': display.information}">
              <ion-icon class="mc-information-icon" name="close" @click="closeInformation()"></ion-icon>
              <div class="mc-information-text" v-html="$t('solidaryTransport.home.information')"></div>
            </div>

            <div class="mc-home-actions when-connected">
              <ion-button class="mc-action" color="success" v-html="$t('solidaryTransport.home.actions.request')" @click="$router.push({name:'solidaryTransport.publish'})"></ion-button>

              <ion-button class="mc-action as-light" color="light" v-html="$t('solidaryTransport.home.actions.publish')" @click="$router.push({name:'solidaryTransport.register', query: {type: 'give'}})"></ion-button>

              <ion-button class="mc-action as-light" color="light" @click="$router.push({name:'solidaryTransport.help'})">
                <ion-icon slot="start" name="help-circle"></ion-icon>
                <span v-html="$t('solidaryTransport.home.actions.help')"></span>
              </ion-button>

              <ion-button class="mc-action as-light" color="light">
                <ion-icon slot="start" name="chatboxes"></ion-icon>
                <span v-html="$t('solidaryTransport.home.actions.contact')"></span>
              </ion-button>
            </div>
          </div>

        </template>

      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="scss">

  ion-toolbar.on-home {

    ion-buttons {
      margin-left: 10px;
    }

    ion-title {
      font-size: 24px;
      font-weight: bold;
      padding-left: 66px;

      &.md {
        padding-left: 0;
      }
    }
  }
  

  .mc-home-container {
    border-radius: 15px 15px 0px 0px;
    padding: 15px 30px 0 30px;
    min-height: 100%;
    position: relative;
    display: flex;
    width: 100%;

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
      display: flex;
      width: 100%;
      flex-direction: column;
      min-height: 100%;
      flex: 1 0 auto;

      .mc-home-profile {
        margin-top: 50px;
        margin-bottom: 20px;
      }

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
        flex: 1 0 auto;

        &.when-connected {
          margin-left: -30px;
          margin-right: -30px;
          border-radius: 15px 15px 0px 0px;
          background-color: var(--ion-color-light);
          padding: 30px;
        }

        .mc-action {
          --border-radius: 25px;
          --padding-start: 30px;
          --padding-end: 30px;
          height: 45px;
          width: 100%;
          word-break: break-word;
          white-space: normal;
          font-weight: bold;
          text-transform: none;
          font-size: 14px;

          + .mc-action {
            margin-top: 15px
          }

          &.is-high {
            height: 60px;
          }

          &.as-light {
            --background: var(--ion-color-light);
            --color: var(--ion-color-primary);
            --border-color: var(--ion-color-primary);
            --border-style: solid;
            --border-width: 1px;
            width: 100%;
          }
        }


      }
    }
  }
</style>

<script>
import { mapState, mapGetters } from 'vuex'

import UserCard from '../Profile/Card.component.vue';

export default {
  name: 'solidaryTransport.home',
  components: {
    UserCard
  },
  data () {
    return {
      display: {
        information: true
      }
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