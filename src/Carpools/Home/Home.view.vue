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

    <ion-content color="primary">
      <UserHome />

      <div class="mc-white-container">

        <SearchHome />

        <BlockAction
          :action="'communities'"
          :color="'#2E499A'"
          :colorBg="'rgba(46, 73, 154, 0.4)'"
          :icon="'briefcase'"
          @clickButton="redirectToCommunities()"
        />

        <BlockAction
          :action="'events'"
          :color="'#C67100'"
          :colorBg="'#FFD149'"
          :icon="'musical-note'"
          @clickButton="redirectToEvents()"
        />

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

  import UserHome from './Components/UserHome.component';
  import BlockAction from './Components/BlockAction.component';
  import SearchHome from './Components/SearchHome.component';

  export default {
    name: 'home',
    components: {
      UserHome,
      BlockAction,
      SearchHome
    },
    data () {
      return {
        title: process.env.VUE_APP_NAME,
      }
    },
    methods: {

      closeWelcome: function() {
        this.seeWelcome = false;
      },

      redirectToCommunities: function() {
        console.log('GO TO COMMU');
      },

      redirectToEvents: function() {
        console.log('GO TO EVENTS');
      }
    }
  }
</script>
