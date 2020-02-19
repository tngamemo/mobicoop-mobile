<template>

        <form>
        <div class="mc-form-register">

          <div class="mc-form-register-input">

            <ion-item>
              <ion-input
                type="text"
                :placeholder="$t('Register.firstname') + '*'"
                :value="user.firstname"
                @input="user.firstname = $event.target.value"
              >
              </ion-input>
            </ion-item>

            <br>
            <ion-item>
              <ion-input
                type="text"
                :placeholder="$t('Register.name') + '*'"
                :value="user.name"
                @input="user.name = $event.target.value"
              >
              </ion-input>
            </ion-item>
          </div>
        </div>
        </form>

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
      computed: {
          user () {
              console.log(this.$store.state.registerStore);
              return this.$store.state.registerStore.userToRegister
          }
      },
    methods: {
    }
  }
</script>
