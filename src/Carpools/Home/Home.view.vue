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

    <ion-content class="ion-padding ion-content-padding" color="background" no-bounce>
      <UserHome />
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

  import UserHome from './Components/UserHome.component'

  export default {
    name: 'home',
    components: {
      UserHome
    },
    data () {
      return {
        title: process.env.VUE_APP_NAME,
      }
    },

    methods: {

      closeWelcome: function() {
        this.seeWelcome = false;
      }
    }
  }
</script>
