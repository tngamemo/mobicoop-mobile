<template>
  <div class="ion-page">
    <ion-header no-border>
      <ion-toolbar color="background">
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center"> {{ title }} </h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="background" no-bounce>
      <div class="mc-white-container">

        <div class="mc-form-register">

          <!-- <ion-segment @ionChange="segmentChanged($event)">
              <ion-segment-button value="account" :checked="selectedTab == 'account'">
                  <ion-label>{{ $t('profile.account') }}</ion-label>
              </ion-segment-button>
              <ion-segment-button value="alerts" :checked="selectedTab == 'alerts'">
                  <ion-label>{{ $t('profile.myAlerts') }}</ion-label>
              </ion-segment-button>
          </ion-segment> -->

          <div class="mc-form-register-input">
            <!-- Input with placeholder -->
            <ion-item>
              <ion-input
                type="email"
                placeholder="Adresse mail*">
              </ion-input>
            </ion-item>

            <ion-item>
              <ion-input
                type="password"
                placeholder="Mot de passe*">
              </ion-input>
            </ion-item>
          </div>

          <div class="mc-form-register-button">
            <ion-button class='mc-big-button' color="success" expand="block" >Se connecter</ion-button>
          </div>
        </div>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">

  .mc-form-register {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;

  .mc-form-register-input {
    flex: 1;
    flex-direction: column;
    display: flex;
    justify-content: center
  }
}

</style>

<script>
  export default {
    name: 'register',
    data () {
      return {
        title: 'Inscription',
        userToRegister: {
          status: 1,
          gender: '',
          telephone: "",
          multiTransportMode: true,
          userAgreementAccepted: false,
          phoneDisplay: 1,
          birthDate: new Date(),
          maxDeviationTime:600,
          maxDeviationDistance:10000,
          anyRouteAsPassenger:false,
          newsSubscription:true,
          language: "fr_FR",
          addresses: ""
        }
      }
    },

    methods: {
    }
  }
</script>
