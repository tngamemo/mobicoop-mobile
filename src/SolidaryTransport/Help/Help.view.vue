<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title text-center>{{$t('solidaryTransport.help.title')}}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary">
      <div class="mc-st-container">
        <div class="mc-st-rounded-cards" v-if="sections.length !== 0">
          <ion-card v-for="(section, index) in sections" @click="interactWithCard(index)" :key="index" class="mc-st-card">
            <ion-card-header class="mc-st-card-header">
              <ion-card-title class="mc-st-card-title">{{section.title}}</ion-card-title>
            </ion-card-header>

            <ion-card-content class="mc-st-card-content">
              <div class="mc-st-card-content-wrapper" :class="{'is-active': active === index}">
                <p v-for="(paragraph, index) in section.paragraphs" v-html="paragraph.text"></p>
              </div>
            </ion-card-content>
          </ion-card>
        </div>

        <div class="mc-st-rounded-cards" v-else>
          <div class="mc-st-loading">
            <ion-spinner name="crescent" class="mc-st-loading-spinner"></ion-spinner>
            <p class="mc-st-loading-message">{{$t('solidaryTransport.help.loading')}}</p>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="scss"></style>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'solidaryTransport.help',
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