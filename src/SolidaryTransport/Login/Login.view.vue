<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start"></ion-buttons>
        <ion-title text-center>{{ $t('solidaryTransport.login.title') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" class="is-scrollable">
      <div class="mc-st-container">
        <div class="mc-st-form">

          <div class="mc-st-form-content">
            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.login.form.fields.login')}} *</ion-label>
              <ion-input class="mc-st-form-input" type="email" @input="username = $event.target.value"></ion-input>
            </ion-item>

            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.login.form.fields.password')}} *</ion-label>
              <ion-input class="mc-st-form-input" type="password" @input="password = $event.target.value"></ion-input>
            </ion-item>
          </div>

          <div class="mc-form-alternate">
            <ion-router-link>{{$t('solidaryTransport.login.form.forgotPassword')}}</ion-router-link>
            <ion-router-link>{{$t('solidaryTransport.login.form.notRegistered')}}</ion-router-link>
          </div>

          <div class="mc-st-form-controls with-multiple">
            <ion-button class="mc-st-form-control as-back" color="light" v-html="$t('solidaryTransport.buttons.back')" @click="$router.back()"></ion-button>

            <ion-button class="mc-st-form-control" color="success" v-html="$t('solidaryTransport.buttons.validate')" @click="loginUser()"></ion-button>
          </div>

        </div>
      </div>
    </ion-content>
  </ion-page>

  <!-- <div class="ion-page">
    <ion-header no-border>
      <ion-toolbar color="background">
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center"> {{ title }} </h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="background" no-bounce>
      <div class="mc-white-container" style="height: 100%">

        <div class="mc-form-login">

          <div class="mc-form-login-input">
            <form>
              
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
              <ion-icon size="large" class="rotating" v-if="this.$store.state.userStore.status == 'loading'" name="md-sync"></ion-icon>
              <span v-if="this.$store.state.userStore.status != 'loading'">{{ $t('Login.log-in') }}</span>
            </ion-button>
          </div>
        </div>
      </div>
    </ion-content>
  </div> -->






</template>

<style lang="scss"></style>

<script>
import jwt_decode from 'jwt-decode'

export default {
  name: 'solidaryTransport.login',
  components: {},
  data () {
    return {
      username: undefined,
      password: undefined,
      loading: false
    }
  },
  computed: {},
  methods: {
    loginUser: function () {
      this.loading = true

      let username = this.username,
          password = this.password
      this.$store.dispatch('login', { username, password })
       .then(res => this.getUser(res))
       .catch(err => {
         console.log(err)
         if (err.response.status == 401) {
           console.log("Erreur d'identifiants", 'danger')
         } else {
           console.log("Une erreur est survenue", 'danger')
         }
       })
    },
    getUser(res) {
      const idUser = jwt_decode(res.data.token).id;
      this.$store.dispatch('getUser', { idUser })
       .then(res => {
         console.log("La connexion est un succès", 'success');

         // if (!! this.$store.getters.redirectionUrl) {
         //    this.$router.push({name: this.$store.getters.redirectionUrl});
         //    this.$store.commit('redirectionUrl_reset');
         // } else {
         //    this.$router.push('home');
         // }
        })
       .catch(err => {
          console.log("Une erreur est survenue", 'danger')
       })
    },
  },
  created: function () {}
}
</script>