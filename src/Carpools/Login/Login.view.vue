<template>
  <div class="ion-page">
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center"> {{ title }} </h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" no-bounce>
      <div class="mc-white-container" style="height: 100%">

        <div class="mc-form-login">

          <div class="mc-form-login-input">
            <form>
              <!-- Input with placeholder -->
              <ion-item>
                <ion-label position="floating">{{$t('Login.mail-placeholder')}} *</ion-label>
                <ion-input
                  type="email"
                  :placeholder="$t('Login.mail-placeholder')"
                  :value="email"
                  @input="email = $event.target.value">
                </ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="floating">{{$t('Login.password-placeholder')}} *</ion-label>
                <ion-input
                  :type="passwordType"
                  :placeholder="$t('Login.password-placeholder')"
                  :value="password"
                  @input="password = $event.target.value">
                </ion-input>
                <ion-icon style="margin-top: 20px" @click="switchPasswordType" slot="end" :name="passwordType == 'password' ? 'eye-off' : 'eye'"></ion-icon>
              </ion-item>
            </form>

            <div class="ion-text-center" style="margin-top: 50px">
              <a v-if="$store.state.userStore.resetPasswordStatus != 'loading'" class="pointer" @click="resetPassword">{{ $t('Login.forgotPassword') }}</a>
              <ion-icon size="large" color="background" class="rotating" v-if="$store.state.userStore.resetPasswordStatus == 'loading'" name="md-sync"></ion-icon>
            </div>
          </div>

          <div class="mc-form-login-button">
            <ion-button class='mc-big-button' color="success" expand="block" :disabled="loginDisable()" @click="loginUser()" >
              <ion-icon size="large" class="rotating" v-if="this.$store.state.userStore.status == 'loading'" name="md-sync"></ion-icon>
              <span v-if="this.$store.state.userStore.status != 'loading'">{{ $t('Login.log-in') }}</span>
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

  import { toast } from '../../Shared/Mixin/toast.mixin';
  import jwt_decode from "jwt-decode";
  import {
    Plugins,
    PushNotification,
    PushNotificationToken,
    PushNotificationActionPerformed } from '@capacitor/core';
  import {isPlatform} from "@ionic/core";

  const { PushNotifications } = Plugins;

  export default {
    name: 'login',
    mixins: [toast],
    data () {
      return {
        title: 'Connexion',
        email: '',
        password: '',
        passwordType: 'password'
      }
    },
    methods: {
      loginDisable: function () {
        if (!! this.email && !! this.password && this.$store.state.userStore.status != 'loading') {
          return false;
        }
        return true;
      },
      switchPasswordType() {
        if (this.passwordType == 'password') {
          this.passwordType = 'text'
        } else {
          this.passwordType = 'password'
        }
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
         this.presentToast("Vous êtes connecté", 'success');
         this.email = '';
         this.password = '';

         if (!! this.$store.getters.redirectionUrl) {
            this.$router.push({path: this.$store.getters.redirectionUrl});
            this.$store.commit('redirectionUrl_reset');
         } else {
            this.$router.push('home');
         }

         if(isPlatform(window.document.defaultView, "capacitor")) {
           PushNotifications.requestPermission().then(result => {
             if (result.granted) {
               // Register with Apple / Google to receive push via APNS/FCM
               PushNotifications.register();
             } else {
               // Show some error
             }
           });
         }

        })
       .catch(err => {
          this.presentToast("Une erreur est survenue", 'danger')
       })
      },

      resetPassword() {
        return this.$ionic.alertController
          .create({
            header: this.$t("Login.resetPassword"),
            inputs: [
              {
                name: "mail",
                id: "mail",
                placeholder: this.$t("Login.mail-placeholder")
              }
            ],
            buttons: [
              {
                text: this.$t("Commons.cancel"),
                role: "cancel",
                cssClass: "secondary",
                handler: () => {}
              },
              {
                text: this.$t("Login.sendResetEmail"),
                handler: (data) => {
                    this.$store.dispatch('resetPassword', {email: data.mail}).then(() => {
                      this.presentToast(this.$t("Login.passwordSuccess"), "secondary");
                    }).catch(() => {
                      this.presentToast(this.$t("Commons.error"), "danger");
                    });

                }
              }
            ]
          })
          .then(a => a.present());
      },
    }
  }
</script>
