<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-title color="primary">{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item v-for="(module,index) in modules" :key="index">
        <ion-label v-on:click="redirectModule(module.linkName)" color="primary">{{module.name}}</ion-label>
      </ion-item>
    </ion-content>
  </div>
</template>

<script>

export default {
  name: "Modal",
  props: {
    title: { type: String, default: "Choix du module" },
    appModule: "",
    router: ""
  },
  data() {
    return {
      modules: []
    };
  },
  created() {
    this.checkModule();
  },
  methods: {
    checkModule: function() {
      if (this.appModule.CARPOOL == "true") {
        this.modules.push({
          name: "Covoiturage",
          linkName: "carpoolsHome"
        });
        if (this.appModule.SOLIDARYTRANSPORT == "true") {
          this.modules.push({
            name: "Transport solidaire",
            linkName: "solidaryTransport"
          });
        }
      }
    },

    redirectModule(linkName) {
      console.log(linkName)
      this.router.push({name: linkName})
      this.$ionic.modalController.dismiss()
    }
  }
};
</script>
