<template>
  <div id="app">
    <ion-app>
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

      // On change les couleurs en fonction de l'environement
      document.documentElement.style.setProperty('--ion-color-primary', '#' + process.env.VUE_APP_PRIMARY);
      document.documentElement.style.setProperty('--ion-color-background', '#' + process.env.VUE_APP_BACKGROUND);
      document.documentElement.style.setProperty('--ion-color-statusbar', '#' + process.env.VUE_APP_BACKGROUND);
      document.documentElement.style.setProperty('--ion-color-secondary', '#' + process.env.VUE_APP_SECONDARY);
      document.documentElement.style.setProperty('--ion-color-tertiary', '#' + process.env.VUE_APP_TERTIARY);
      document.documentElement.style.setProperty('--ion-color-success', '#' + process.env.VUE_APP_SUCCESS);

      // Fonction qui va log l'user ou utilisé un user par défault
      this.authUserOnStart();
    },

    methods: {

      authUserOnStart: function() {

        // Get the user api Token. If empty, we connect with the anonymous User
        if (this.$store.state.tokenUser) {

            const idUser = jwt_decode(this.$store.state.tokenUser).id;
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
