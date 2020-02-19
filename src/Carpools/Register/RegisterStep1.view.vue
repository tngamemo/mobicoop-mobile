<template>

        <form>
        <div class="mc-form-register">

          <div class="mc-form-register-input">

            <ion-item>
              <ion-label position="floating">{{$t('Register.givenName')}} *</ion-label>
              <ion-input
                type="text"
                :placeholder="$t('Register.givenName') + '*'"
                :value="user.givenName"
                @input="user.givenName = $event.target.value; updateMessage()"
              >
              </ion-input>
            </ion-item>
            <div class="mc-error-label"  v-if="$v.user.givenName.$error">{{$t('Validation.required')}}</div>

            <br>
            <ion-item>
              <ion-label position="floating">{{$t('Register.familyName')}} *</ion-label>
              <ion-input
                type="text"
                :placeholder="$t('Register.familyName') + '*'"
                :value="user.familyName"
                @input="user.familyName = $event.target.value; updateMessage()"
              >
              </ion-input>
            </ion-item>
            <div class="mc-error-label"  v-if="$v.user.familyName.$error">{{$t('Validation.required')}}</div>

            <ion-item>
              <ion-label position="floating">{{$t('Register.email')}} *</ion-label>
              <ion-input
                type="text"
                :placeholder="$t('Register.email') + '*'"
                :value="user.email"
                @input="user.email = $event.target.value; updateMessage()"
              >
              </ion-input>
            </ion-item>
            <div class="mc-error-label"  v-if="$v.user.email.$error">{{$t('Validation.required')}}</div>

            <br>
            <ion-item>
              <ion-label position="floating">{{$t('Register.password')}} *</ion-label>
              <ion-input
                type="password"
                :placeholder="$t('Register.password') + '*'"
                :value="user.password"
                @input="user.password = $event.target.value; updateMessage()"
              >
              </ion-input>
            </ion-item>
            <div class="mc-error-label"  v-if="$v.user.confirmPassword.$error">{{$t('Validation.required')}}</div>

            <ion-item>
              <ion-label position="floating">{{$t('Register.confirmPassword')}} *</ion-label>
              <ion-input
                type="password"
                :placeholder="$t('Register.confirmPassword') + '*'"
                :value="user.confirmPassword"
                @input="user.confirmPassword = $event.target.value; updateMessage()"
              >
              </ion-input>
            </ion-item>
            <div class="mc-error-label"  v-if="$v.user.confirmPassword.$error">{{$t('Validation.required')}}</div>

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
    import { required, email, sameAs } from 'vuelidate/lib/validators'
    import { mapState } from 'vuex'

    export default {
    name: 'register',
    data () {
      return {

      }
    },
        validations: {
          user: {
              givenName: {
                  required,
              },
              familyName: {
                  required
              },
              email: {
                  required,
                  email
              },
              password: {
                  required
              },
              confirmPassword: {
                  required,
                  sameAsPassword: sameAs('password')
              }
          }
        },
      computed: {
          ...mapState({
              user: state => {
                  console.log(state);
                  return state.registerStore.userToRegister
              }
          })
        /*
          user : {
              get() {
                  console.log('updatedobject');
                  return this.$store.state.registerStore.userToRegister
              }
          }
          */
      },
        created() {
        this.test()
        },
    methods: {
      validate() {
          this.$v.$touch();
          this.test();
          if (this.$v.$invalid) {
              return false;
          } else {
              return true;
          }
      },
        test() {
          console.log(this.$v.user)
        },
        updateMessage(){
            this.$store.commit('register_update', this.user);
        }
    }
  }
</script>
