/**

Copyright (c) 2018, MOBICOOP. All rights reserved.
This project is dual licensed under AGPL and proprietary licence.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <gnu.org/licenses>.

Licence MOBICOOP described in the file
LICENSE
**************************/

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
      <div class="mc-white-container" style="height: 100%;">

        <div class="mc-form-login">

          <div class="mc-form-login-input">
            <div class="mc-form-login-input-center">
            <form>
              <!-- Input with placeholder -->
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

              <ion-item>
                <ion-label position="floating">{{$t('Login.confirm-password-placeholder')}} *</ion-label>
                <ion-input
                  :type="passwordType"
                  :placeholder="$t('Login.confirm-password-placeholder')"
                  :value="confirmPassword"
                  @input="confirmPassword = $event.target.value">
                </ion-input>
                <ion-icon style="margin-top: 20px" @click="switchPasswordType" slot="end" :name="passwordType == 'password' ? 'eye-off' : 'eye'"></ion-icon>
              </ion-item>
            </form>

            </div>
          </div>

          <div class="mc-form-login-button">
            <ion-button class='mc-big-button' color="success" expand="block" :disabled="this.$store.state.userStore.resetPasswordStatus == 'loading'" @click="resetPassword()" >
              <ion-icon size="large" class="rotating" v-if="this.$store.state.userStore.resetPasswordStatus == 'loading'" name="md-sync"></ion-icon>
              <span v-if="this.$store.state.userStore.status != 'loading'">{{ $t('Login.newPassword') }}</span>
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
      overflow-y: scroll;
    }

    .mc-form-login-input-center {
      margin-top: auto;
      margin-bottom: auto;
    }
  }
</style>

<script>

  import { toast } from '../../Shared/Mixin/toast.mixin';
  import {
    Plugins,
    PushNotification,
    PushNotificationToken,
    PushNotificationActionPerformed } from '@capacitor/core';
  import {isPlatform} from "@ionic/core";

  export default {
    name: 'reset-password',
    mixins: [toast],
    data () {
      return {
        title: 'Nouveau mot de passe',
        password: '',
        confirmPassword: '',
        pwdToken: null,
        passwordType: 'password'
      }
    },
    created() {
      this.pwdToken = this.$route.query.token;
    },
    methods: {
      switchPasswordType() {
        if (this.passwordType == 'password') {
          this.passwordType = 'text'
        } else {
          this.passwordType = 'password'
        }
      },
      resetPassword: function() {
        if (this.pwdToken) {
          if (this.password == this.confirmPassword) {

            let password = this.password;
            let pwdToken = this.pwdToken;


            this.$store.dispatch('finalizeResetPassword', {password, pwdToken})
              .then(res => {
                this.presentToast("Le mot de passe a bien été réinitialisé", 'success');
                  this.$router.push( (this.$route.name.includes('solidaryTransport') ? 'solidaryTransport.' : '' ) + 'login');
              })
              .catch(err => {
                this.presentToast("Une erreur est survenue", 'danger')
              })
          } else {
            this.presentToast("Le mot de passe et sa confirmation doivent être identiques", 'danger')
          }
        } else {
          this.presentToast("Vous ne disposez pas d'un token de réinitialisation valide", 'danger')
        }
      },


    }
  }
</script>
