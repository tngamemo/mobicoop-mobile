<template>
  <div class="ion-page">
    <ion-header no-border>
      <ion-toolbar color="background">
        <div class='mc-home-header'>
          <div class="mc-home-log">
            <img class="background-img ion-margin-end" src="../../assets/icons/home.png">
            <h1>{{ title }}</h1>
          </div>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content class="mc-container ion-padding" color="background" no-bounce>
      <div class="mc-container">
        <div class="mc-welcome-home" v-if="seeWelcome">
          <ion-icon name="close" item-right @click="closeWelcome()"></ion-icon>
          <h2>Bienvenue <br>sur {{title}} !</h2>
        </div>

        <div class="mc-user-home">
          <ion-button class='mc-big-button' color="success" expand="block">Connexion</ion-button>
          <ion-button class='mc-big-button' expand="block" fill="outline">Inscription</ion-button>
        </div>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">

  .mc-container {
    padding: 30px;
    background-image: url("/assets/background.png");
    background-repeat: no-repeat;
    background-size: 40%;
  }

  .mc-home-header {
    .mc-home-log {
      display: flex;
      align-items: center;

      img {
        width: 26px;
        height: 26px;
      }

      h1 {
        margin: 0;
        padding: 0;
        font-weight: bold;
      }
    }
  }

  .mc-welcome-home {
    text-align: right;
    h2 {
      font-weight: bold;
      text-align: center;
      margin-bottom: 200px;
    }
  }

</style>

<script>
  export default {
    name: 'home',
    data () {
      return {
        title: process.env.VUE_APP_NAME,
        seeWelcome: true
      }
    },

    methods: {

      closeWelcome: function() {
        this.seeWelcome = false;
      }
    }
  }
</script>
