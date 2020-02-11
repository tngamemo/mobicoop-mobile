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

        <div class="mc-form-login">

          <div class="mc-form-login-input">
            <form>
              <!-- Input with placeholder -->
              <ion-item>
                <ion-input
                  type="email"
                  :placeholder="$t('Login.mail-placeholder')"
                  :value="email"
                  @input="email = $event.target.value">
                </ion-input>
              </ion-item>

              <ion-item>
                <ion-input
                  type="password"
                  :placeholder="$t('Login.password-placeholder')"
                  :value="password"
                  @input="password = $event.target.value">
                </ion-input>
              </ion-item>
            </form>
          </div>

          <div class="mc-form-login-button">
            <ion-button class='mc-big-button' color="success" expand="block" :disabled="loginDisable()" @click="loginUser()" >
              <ion-icon size="large" class="rotating" v-if="this.$store.state.status == 'loading'" name="md-sync"></ion-icon>
              <span v-if="this.$store.state.status != 'loading'">{{ $t('Login.log-in') }}</span>
            </ion-button>
          </div>
        </div>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">

  .mc-form-login {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;

    .mc-form-login-input {
      flex: 1;
      flex-direction: column;
      display: flex;
      justify-content: center
    }
  }
</style>

<script>

  import { toast } from '../../Shared/toast.mixin';
  import jwt_decode from "jwt-decode";

  export default {
    name: 'login',
    mixins: [toast],
    data () {
      return {
        title: 'Connexion',
        email: '',
        password: '',
      }
    },

    methods: {
      loginDisable: function () {
        if (!! this.email && !! this.password && this.$store.state.status != 'loading') {
          return false;
        }
        return true;
      },

      loginUser: function() {

        let username = this.email
        let password = this.password

        this.$store.dispatch('login', { username, password })
       .then(res => this.getUser(res))
       .catch(err => {
         console.log(err)
         if (err.response.status == 401) {
           this.presentToast("Erreur d'identifiants", 'danger')
         } else {
           this.presentToast("Une erreur est survenue", 'danger')
         }
       })
      },

      getUser(res) {
        const idUser = jwt_decode(res.data.token).id;
        this.$store.dispatch('getUser', { idUser })
       .then(res => {
         this.presentToast("La connexion est un succès", 'success');
         this.$router.push('home');

        })
       .catch(err => {
          this.presentToast("Une erreur est survenue", 'danger')
       })
      }
    }
  }
</script>
