<template>
    <ion-page>
      <ion-header no-border>
          <ion-toolbar color="background">
            <div class='mc-home-header'>
              <div class="mc-home-log">
                <h1>{{ $t('SolidaryTransport.Help.title') }}</h1>
              </div>
            </div>
          </ion-toolbar>
        </ion-header>

        <ion-content color="background">
          Display Help with toggle elements
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