<template>
  <div id="app">
    <ion-app>
      <ion-vue-router />
    </ion-app>
  </div>
</template>

<script>
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

        const tokenUser = localStorage.getItem('tokenUser');

        // Get the user api Token. If empty, we connect with the anonymous User
        if (tokenUser) {

            // const userId = jwt_decode(store.token).id;
            // this
            //     .getUser(id)
            //     .then(res => {
            //         if (!! res) {
            //             this.setUserStorage(res.data);
            //             this.getAsksByUser(id).then(res => this.setUserAsksStorage(res.data['hydra:member']))
            //         }
            //     })
            //     .catch(() => {
            //         store.token = '';
            //         this.authAnonym();
            //     });
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
