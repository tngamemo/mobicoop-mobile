<template>

        <div class="mc-form-register">

          <div class="mc-form-register-input">

            <ion-item>
              <ion-label position="floating">{{$t('Register.givenName')}} *</ion-label>
              <ion-input
                type="text"
                :placeholder="$t('Register.givenName') + '*'"
                :value="user.givenName"
                @input="user.givenName = $event.target.value;"
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
                @input="user.familyName = $event.target.value;"
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


</template>

<style lang="scss">

  .mc-form-register {
    display: block;
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
    name: 'registerStep1',
    data () {
      return {
        user: {givenName : '', familyName: ''}
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
          /*
          ...mapState({
              getUser: state => {
                  console.log('compute');
                  this.user = Object.assign({}, state.registerStore.userToRegister);
                  console.log(this.user);
                  return state.registerStore.userToRegister
              }
          })
          */
          getUser : {
              get() {
                  return this.$store.state.registerStore.userToRegister
              },
              set() {
                  this.$store.commit('register_update', this.user);
              }
          }

      },
        created() {
        this.user = this.getUser
        console.log(this.user);
        this.test()
        },
    methods: {
      validate() {
          this.$v.$reset();
          this.$v.$touch();
          this.test();
          if (this.$v.$invalid) {
              return false;
          } else {
              return true;
          }
      },
        test() {
          //console.log(this.$v.user)
        },
        updateMessage(){
            this.$store.commit('register_update', this.user);
        }
    }
  }
</script>
