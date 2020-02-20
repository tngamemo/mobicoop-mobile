<template>
    <ion-page>
      <ion-header no-border>
          <ion-toolbar color="background">
            <div class='mc-home-header'>
              <div class="mc-home-log">
                <img class="background-img ion-margin-end" src="../../assets/icons/home.png">
                <h1>Main Page for Solidarity Transport</h1>
              </div>
            </div>
          </ion-toolbar>
        </ion-header>

        <ion-content color="background">
          <ion-button @click="$router.push('/')">Home</ion-button>
          <ion-button @click="$router.push({name: 'solidaryTransport.login'})">Login access</ion-button>
          <ion-button @click="$router.push({name: 'solidaryTransport.register'})">Register access</ion-button>
          <ion-button @click="$router.push({name: 'solidaryTransport.help'})">Help access</ion-button>
        </ion-content>
    </ion-page>
</template>

<script>
export default {
  name: 'index',
  components: {},
  data () {
    return {
      title: process.env.VUE_APP_NAME,
    }
  },
  methods: {

    
  },
  created: function () {
    //console.log('here', this.$router)
  }
}
</script>