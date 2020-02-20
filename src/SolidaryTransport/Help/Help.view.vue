<template>
    <ion-page>
      <ion-header no-border>
          <ion-toolbar color="background">
            <ion-buttons slot="start">
              <ion-back-button text=""></ion-back-button>
            </ion-buttons>
            <ion-title>{{ $t('SolidaryTransport.Help.title') }}</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content color="background" v-if="sections.length !== 0">
          <ion-card v-for="(section, index) in sections" @click="interactWithCard(index)" :key="index" class="mc-card">
            <ion-card-header class="mc-card">
              <ion-card-title>{{section.title}}</ion-card-title>
            </ion-card-header>

            <ion-card-content class="mc-card-content" v-if="active === index">
              <p v-for="(paragraph, index) in section.paragraphs" v-html="paragraph.text"></p>
            </ion-card-content>
          </ion-card>
        </ion-content>

        <ion-content color="background" v-else>
          loading...
        </ion-content>
    </ion-page>
</template>

<style lang="scss">
  .mc-card {

    .mc-card-content {
      p + p {
        margin-top: 10px;
      }
    }
  }
</style>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'index',
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