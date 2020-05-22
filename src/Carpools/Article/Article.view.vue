<template>
  <div class="ion-page">
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="carpools/home"></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center">{{ title }} </h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" no-bounce>
      <div class="mc-white-container" >

        <div class="ion-text-center" v-if="$store.state.articleStore.statusArticle == 'loading'" >
          <ion-icon size="large" color="primary" class="rotating"  name="md-sync"></ion-icon>
        </div>

        <div v-if="$store.state.articleStore.statusArticle == 'success' && sections.length !== 0">
          <ion-card v-for="(section, index) in sections" @click="activeCard(index)" :key="index" class="mc-cp-card pointer">
            <ion-card-header class="mc-cp-card-header">
              <ion-card-title class="mc-cp-card-title">{{section.title}}</ion-card-title>
            </ion-card-header>

            <ion-card-content class="mc-cp-card-content">
              <div class="mc-cp-card-content-wrapper" :class="{'is-active': active.includes(index)}">
                <p v-for="(paragraph, index) in section.paragraphs" v-html="paragraph.text"></p>
              </div>
            </ion-card-content>
          </ion-card>
        </div>


      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
  .mc-cp-card {
    background-color: var(--ion-color-light-tint);
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
    box-shadow: none;
    border-radius: 15px;

    &:first-of-type {
      margin-top: 0;
    }

    + .mc-cp-card {
      margin-top: 20px;
    }

    .mc-cp-card-header {
      padding: 13px 20px;

      .mc-cp-card-title {
        color: var(--ion-color-primary);
        font-weight: bold;
        font-size: 16px;
      }
    }

    .mc-cp-card-content {
      font-size: 14px;
      padding: 0;

      .mc-cp-card-content-wrapper {
        padding: 0 20px;
        max-height: 0;
        opacity: 0;
        transition: max-height .7s ease, opacity .5s ease, padding .1s ease;

        &.is-active {
          padding: 0 20px 15px;
          opacity: 1;
          max-height: 3500px;
        }
      }

      p + p {
        margin-top: 10px;
        background-color: transparent;
      }
    }
  }

</style>

<script>
  import {toast} from "../../Shared/Mixin/toast.mixin";

  export default {
    name: 'article',
    data () {
      return {
        sections: [],
        active: [],
        paramId: null
      }
    },
    mixins: [toast],
    props : ['title' , 'id'],
    created() {
      this.paramId = this.$route.params.id;
      if (this.paramId) {
        this.id = this.paramId;
      }
      this.getArticle();
    },
    methods: {
      activeCard(index) {
        const findActive = this.active.findIndex(item => item === index);
        if (findActive === -1) {
          this.active.push(index);
        } else {
          this.active.splice(findActive, 1);
        }

      },
      getArticle() {
        this.$store.dispatch('getArticle', this.id)
          .then((res) => {
            this.sections = res.data.sections;
            if(this.paramId) {
              this.title = res.data.title;
            }
          })
          .catch((error) => {
            this.presentToast(this.$t("Commons.error"), "danger");
          })
      }
    }
  }
</script>
