<template>
  <div class="ion-page">
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center">{{ $t('Register.title')}}</h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" no-bounce>
      <div class="mc-white-container" style="height: 100%">
        <Slider :key="refresh" v-bind:slides="slides" v-on:save="register()"></Slider>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
</style>

<script>
import Slider from "../../Shared/View/Slider.view";
import { toast } from "../../Shared/Mixin/toast.mixin";
import RegisterStep1 from "../../Carpools/Register/RegisterStep1.view";
import RegisterStep2 from "../../Carpools/Register/RegisterStep2.view";

export default {
  name: "register",
  mixins: [toast],
  components: {
    Slider
  },
  data() {
    return {
      slides: [
        { title: "", component: RegisterStep1 },
        { title: "", component: RegisterStep2 }
      ],
      refresh: 0
    };
  },
  created() {
    this.$store.commit("init_sliderloader_visibility");
    if (!this.user) {
      this.$store.commit("register_reset");
    }
  },
  computed: {
    user: {
      get() {
        return this.$store.state.registerStore.userToRegister;
      },
      set() {
        this.$store.commit("register_update", this.user);
      }
    }
  },

  methods: {
    register() {
      this.$store.commit("change_sliderloader_visibility");
      this.$store
        .dispatch("register")
        .then(res => {
          this.$store.commit("register_reset");
          this.$router.push("home");
          this.presentToast(this.$t("Register.success"), "success");
          this.$store.commit("change_sliderloader_visibility");
          // reload the component
          this.refresh++
        })
        .catch(err => {
          this.presentToast(this.$t("Commons.error"), "danger");
          this.$store.commit("change_sliderloader_visibility");
        });
    }
  }
};
</script>
