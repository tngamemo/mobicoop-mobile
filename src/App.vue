<template>
  <div id="app">
    <ion-app v-if="!! this.$store.state.userStore.user || !! this.$store.state.userStore.tokenAnonymousUser">
      <ion-vue-router />
    </ion-app>
  </div>
</template>

<script>
  import jwt_decode from "jwt-decode";

  export default {
    name: 'app',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },

    created: function () {

      document.title = process.env.VUE_APP_NAME;
      // On change les couleurs en fonction de l'environement
      document.documentElement.style.setProperty('--ion-color-primary', '#' + process.env.VUE_APP_PRIMARY);
      document.documentElement.style.setProperty('--ion-color-primary-rgb', process.env.VUE_APP_PRIMARY_RGB);
      document.documentElement.style.setProperty('--ion-color-secondary', '#' + process.env.VUE_APP_SECONDARY);
      document.documentElement.style.setProperty('--ion-color-secondary-rgb', process.env.VUE_APP_SECONDARY_RGB);
      document.documentElement.style.setProperty('--ion-color-tertiary', '#' + process.env.VUE_APP_TERTIARY);
      document.documentElement.style.setProperty('--ion-color-success', '#' + process.env.VUE_APP_SUCCESS);
      document.documentElement.style.setProperty('--ion-color-success-rgb',  process.env.VUE_APP_SUCCESS_RGB);
      document.documentElement.style.setProperty('--ion-color-warning', '#' + process.env.VUE_APP_WARNING);
      document.documentElement.style.setProperty('--ion-color-danger', '#' + process.env.VUE_APP_DANGER);

      // Fonction qui va log l'user ou utilisé un user par défault
      this.authUserOnStart();
    },
    methods: {

      authUserOnStart: function() {
        // Get the user api Token. If empty, we connect with the anonymous User
        if (this.$store.state.userStore.tokenUser) {
            const idUser = jwt_decode(this.$store.state.userStore.tokenUser).id;
            this.$store.dispatch('getUser', { idUser })
            .then(res => {


              })
            .catch(err => {
              // On va authentifier l'appli via un utilisateur anonyme
              this.$store.dispatch('authAnonymousUser')
            })
        } else {

          // On va authentifier l'appli via un utilisateur anonyme
          this.$store.dispatch('authAnonymousUser')
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "./style.scss";

</style>
