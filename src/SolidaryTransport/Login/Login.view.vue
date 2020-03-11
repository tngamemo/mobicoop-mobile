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

          <div class="mc-st-form-controls with-multiple" :class="{'is-loading': loading}">
            <ion-button class="mc-st-form-control as-back" color="light" v-html="$t('solidaryTransport.buttons.back')" @click="$router.back()"></ion-button>

            <ion-button class="mc-st-form-control as-loader" color="success" @click="loginUser()">
              <ion-icon slot="start" name="sync" size="large"></ion-icon>
              <span v-html="$t('solidaryTransport.buttons.validate')"></span>
            </ion-button>
          </div>

        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="scss"></style>

<script>
import jwt_decode from 'jwt-decode'

export default {
  name: 'solidaryTransport.login',
  components: {},
  props: {
    initRedirect: {
      type: Object,
      required: true
    }
  },
  watch: { 
    initRedirect: function(redirect) { // watch it
      this.redirect = redirect
    }
  },
  data () {
    return {
      username: undefined,
      password: undefined,
      loading: false,
      redirect: this.initRedirect
    }
  },
  computed: {},
  methods: {
    loginUser: function () {
      if (!this.loading) {
        this.loading = true

        let username = this.username,
            password = this.password

        this.$store.dispatch('login', { username, password })
          .then((response) => {
            this.getUser(response)
          })
          .catch(err => {
            this.loading = false
            console.log(err)
            if (err.response.status == 401) {
              console.log("Erreur d'identifiants", 'danger')
            } else {
              console.log("Une erreur est survenue", 'danger')
            }
          })
      }
    },
    getUser(response) {
      const idUser = jwt_decode(response.data.token).id;
      this.$store.dispatch('getUser', { idUser })
        .then(res => {
          console.log("La connexion est un succès", 'success')
          this.$router.push(this.redirect)
          setTimeout(() => {
            this.loading = false
          }, 100)
        })
       .catch(err => {
          this.loading = false
          console.log("Une erreur est survenue", 'danger')
       })
    },
  },
  created: function () {}
}
</script>