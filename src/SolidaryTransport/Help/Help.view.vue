<template>
  <ion-page>
    <ion-header no-border>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button text=""></ion-back-button>
          </ion-buttons>
          <ion-title class="mc-bar-title">{{$t('SolidaryTransport.Help.title')}}</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content color="primary">
        <div class="mc-rounded-cards" v-if="sections.length !== 0">
          <ion-card v-for="(section, index) in sections" @click="interactWithCard(index)" :key="index" class="mc-card">
            <ion-card-header class="mc-card-header">
              <ion-card-title class="mc-card-title">{{section.title}}</ion-card-title>
            </ion-card-header>

            <ion-card-content class="mc-card-content">
              <div class="mc-card-content-wrapper" :class="{'is-active': active === index}">
                <p v-for="(paragraph, index) in section.paragraphs" v-html="paragraph.text"></p>
              </div>
            </ion-card-content>
          </ion-card>
        </div>

        <div class="mc-rounded-cards" v-else>
          <div class="mc-loading">
            <ion-spinner name="crescent" class="mc-loading-spinner"></ion-spinner>
            <p class="mc-loading-message">{{$t('SolidaryTransport.Help.loading')}}</p>
          </div>
        </div>
      </ion-content>
  </ion-page>
</template>

<style lang="scss">
  .mc-rounded-cards {
    border-radius: 15px 15px 0px 0px;
    background-color: var(--ion-color-light);
    padding: 30px;
    min-height: 100%;

    .mc-card {
      background-color: var(--ion-color-light-tint);
      margin-left: 0;
      margin-right: 0;
      box-shadow: none;
      border-radius: 15px;

      + .mc-card {
        margin-top: 20px;
      }

      .mc-card-header {
        padding: 13px 20px;

        .mc-card-title {
          color: var(--ion-color-primary);
          font-weight: bold;
          font-size: 16px;
        }
      }

      .mc-card-content {
        font-size: 14px;
        padding: 0;

        .mc-card-content-wrapper {
          padding: 0 20px;
          max-height: 0;
          opacity: 0;
          transition: max-height .7s ease, opacity .5s ease, padding .1s ease;

          &.is-active {
            padding: 0 20px 15px;
            opacity: 1;
            max-height: 600px;
          }
        }

        p + p {
          margin-top: 10px;
        }
      }
    }

    .mc-loading {
      text-align: center;

      .mc-loading-spinner {
        display: inline-block;
        color: var(--ion-color-primary);
      }

      .mc-loading-message {
        color: var(--ion-color-primary);
        margin: 0;
      }
    }
  }
</style>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'solidary.help',
  components: {},
  data () {
    return {
      active: 0,
      sections: []
    }
  },
  computed: {},
  methods: {
    interactWithCard: function (index) {
      this.active = index
    }
    
  },
  created: function () {
    // Get articles for help
    this.$store.dispatch('getSectionsForHelp')
      .then((sections) => {
        this.sections = sections
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
</script>