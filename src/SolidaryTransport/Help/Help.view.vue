<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title text-center>{{$route.query.title || $t('solidaryTransport.help.title')}}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content ref="help" color="primary">
      <div class="mc-st-container">
        <div class="mc-st-rounded-cards">

          <template v-if="typeof article === 'undefined'">
            <div class="mc-st-loading">
              <ion-spinner name="crescent" class="mc-st-loading-spinner"></ion-spinner>
              <p class="mc-st-loading-message">{{$t('solidaryTransport.help.loading')}}</p>
            </div>
          </template>

          <template v-else>

            <template v-if="article.sections.length !== 0">
              <ion-card v-for="(section, index) in article.sections" @click="interactWithCard(index)" :key="index" class="mc-st-card" :ref="'help-' + index">
                <ion-card-header class="mc-st-card-header">
                  <ion-card-title class="mc-st-card-title">{{section.title}}</ion-card-title>
                </ion-card-header>

                <ion-card-content class="mc-st-card-content">
                  <div class="mc-st-card-content-wrapper" :class="{'is-active': active === index}">
                    <p v-for="(paragraph, index) in section.paragraphs" v-html="paragraph.text"></p>
                  </div>
                </ion-card-content>
              </ion-card>
            </template>

            <template v-else>
              <div class="mc-st-loading">
                <ion-icon name="alert" size="large" class="mc-st-loading-spinner"></ion-icon>
                <p class="mc-st-loading-message">{{$t('solidaryTransport.help.noContent')}}</p>
              </div>
            </template>

          </template>

        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="scss"></style>

<script>
export default {
  name: 'solidaryTransport.help',
  components: {},
  data () {
    return {
      active: 0,
      article: undefined
    }
  },
  computed: {},
  methods: {
    interactWithCard: function (index) {
      this.active = index

      this.$refs.help.getScrollElement().then((parent) => {
        if (index === 0) {
          this.$refs.help.scrollToPoint(0, 0, 0)
        } else {
          let child = this.$refs['help-' + index][0]
          var childPos = child.offsetTop;
          var parentPos = parent.offsetTop;
          var top = childPos - parentPos - 20
          this.$refs.help.scrollToPoint(0, top, 0)
        }
      })
    }   
  },
  created: function () {
    // Get articles for help
    this.$store.dispatch('getSolidaryArticle', this.$route.query.id || process.env.VUE_APP_SOLIDARY_HELP_ARTICLE_ID)
      .then((article) => {
        this.article = article
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
</script>