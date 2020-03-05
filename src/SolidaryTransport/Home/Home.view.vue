<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar class="on-home" color="primary">
        <ion-icon name="custom-logo"></ion-icon>
        <ion-title text-left>{{ $t('solidaryTransport.home.title') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary">
      <div class="mc-home-container">

        <div class="mc-home-logo">
          <img class="mc-home-vector" src="../assets/icons/home.svg">
        </div>

        <template v-if="!this.$store.state.userStore.user">

          <div class="mc-home-content ">
            <div class="mc-home-information" :class="{'is-active': display.information}">
              <ion-icon class="mc-information-icon" name="close" @click="closeInformation()"></ion-icon>
              <div class="mc-information-text" v-html="$t('solidaryTransport.home.information')"></div>
            </div>

            <div class="mc-home-actions">
              <ion-button class="mc-action" color="success" v-html="$t('solidaryTransport.home.actions.ask')" @click="$router.push({name:'solidaryTransport.register', query: {type: 'ask'}})"></ion-button>
              <ion-button class="mc-action" color="success" v-html="$t('solidaryTransport.home.actions.give')" @click="$router.push({name:'solidaryTransport.register', query: {type: 'give'}})"></ion-button>
              <ion-button class="mc-action as-contact" color="light">
                <ion-icon slot="start" name="chatboxes"></ion-icon>
                <span v-html="$t('solidaryTransport.home.actions.contact')"></span>
              </ion-button>
            </div>
          </div>
          
        </template>

        <template v-else>
          connected
        </template>

      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="scss">

  ion-toolbar.on-home {
    ion-icon {
      font-size: 26px;
      position: relative;
      top: 2px;
    }

    ion-title {
      font-size: 24px;
      font-weight: bold;
      padding-left: 66px;
    }
  }
  

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
            height: 45px;
          }
        }


      }
    }
  }
</style>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'solidaryTransport.home',
  components: {},
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