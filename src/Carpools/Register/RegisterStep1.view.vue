<template>


        <div class="mc-form-register">

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
