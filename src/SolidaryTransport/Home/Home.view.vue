<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar class="on-home" color="primary">
        <ion-buttons slot="start">
          <ion-button color="light">
            <ion-icon slot="icon-only" name="custom-logo"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{ $t('solidaryTransport.home.title') }}</ion-title>
        <ion-icon
        slot="end"
          v-if="numberOfModule > 1"
          name="apps"
          size="large"
          class="mc-home-switch"
          v-on:click="showModule()"
        ></ion-icon>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary">
      <div class="mc-st-container is-home">
        <div class="mc-st-logo">
          <img class="mc-st-vector" src="../assets/icons/home.svg" />
        </div>

        <template v-if="!this.$store.state.userStore.user">
          <div class="mc-st-content">
            <div class="mc-st-information" :class="{'is-active': display.information}">
              <ion-icon class="mc-information-icon" name="close" @click="closeInformation()"></ion-icon>
              <div class="mc-information-text" v-html="$t('solidaryTransport.home.information')"></div>
            </div>

            <div class="mc-st-actions">
              <ion-button
                class="mc-st-action is-high"
                color="success"
                v-html="$t('solidaryTransport.home.actions.ask')"
                @click="$router.push({name:'solidaryTransport.register', query: {type: 'ask'}})"
              ></ion-button>
              <ion-button
                class="mc-st-action is-high"
                color="success"
                v-html="$t('solidaryTransport.home.actions.give')"
                @click="$router.push({name:'solidaryTransport.register', query: {type: 'give'}})"
              ></ion-button>
              <ion-button class="mc-st-action as-light" color="light">
                <ion-icon slot="start" name="chatboxes"></ion-icon>
                <span v-html="$t('solidaryTransport.home.actions.contact')"></span>
              </ion-button>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="mc-st-content">
            <div class="mc-st-profile">
              <ProfileCard />
            </div>

            <div class="mc-st-information" :class="{'is-active': display.information}">
              <ion-icon class="mc-information-icon" name="close" @click="closeInformation()"></ion-icon>
              <div class="mc-information-text" v-html="$t('solidaryTransport.home.information')"></div>
            </div>

            <div class="mc-st-actions when-connected">
              <ion-button
                class="mc-st-action"
                color="success"
                v-html="$t('solidaryTransport.home.actions.request')"
                @click="$router.push({name:'solidaryTransport.home.request'})"
              ></ion-button>

              <ion-button
                class="mc-st-action as-light"
                color="light"
                v-html="$t('solidaryTransport.home.actions.publish')"
                @click="$router.push({name:'solidaryTransport.home.ad'})"
              ></ion-button>

              <ion-button
                class="mc-st-action as-light"
                color="light"
                @click="$router.push({name:'solidaryTransport.help'})"
              >
                <ion-icon slot="start" name="help-circle"></ion-icon>
                <span v-html="$t('solidaryTransport.home.actions.help')"></span>
              </ion-button>

              <ion-button class="mc-st-action as-light" color="light">
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

  .mc-home-switch {
    margin-left: auto;
  }
}

.mc-st-container.is-home {
  padding: 15px 30px 0 30px;
  background-color: inherit;

  .mc-st-content {
    .mc-st-profile {
      margin-top: 50px;
    }
  }
}
</style>

<script>
import { mapState, mapGetters } from "vuex";

import ProfileCard from "../Profile/ProfileCard.component.vue";
import ModuleModal from "../../Shared/Component/ModuleModal.component";

export default {
  name: "solidaryTransport.home",
  components: {
    ProfileCard
  },
  data() {
    return {
      display: {
        information: true
      },
      appModule: JSON.parse(process.env.VUE_APP_MODULE)
    };
  },
  computed: {
    numberOfModule() {
      return Object.values(this.appModule).filter(item => item == "true")
        .length;
    }
  },
  methods: {
    closeInformation: function() {
      this.display.information = false;
    },
    showModule: async function() {
      const modal = await this.$ionic.modalController.create({
        component: ModuleModal,
        componentProps: {
          propsData: {
            appModule: this.appModule,
            router: this.$router
          }
        }
      });

      await modal.present();
    }
  },
  created: function() {}
};
</script>
