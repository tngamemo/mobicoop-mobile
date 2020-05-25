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
        <h1 class="ion-text-center">{{ $t('ConfirmRegistration.title')}}</h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" no-bounce>
      <div class="mc-white-container" >

        <div class='mc-encart'>
          <p>{{ $t('ConfirmRegistration.register-almost-done')}}</p>
          <p>{{ $t('ConfirmRegistration.mail-sent')}}</p>
          <p>{{ $t('ConfirmRegistration.copy')}}</p>
        </div>
        <ion-item>
          <ion-label position="floating">{{$t('ConfirmRegistration.my-code')}} *</ion-label>
          <ion-input
            type="text"
            name="validatedDateToken"
            :value="validatedDateToken"
            @input="validatedDateToken = $event.target.value"
            v-bind:placeholder="$t('ConfirmRegistration.paste')"
          ></ion-input>
        </ion-item>
        <div v-if="$v.validatedDateToken.$error">
          <div class="mc-error-label"  v-if="!$v.validatedDateToken.required">{{$t('Validation.required')}}</div>
        </div>

        <br />
        <ion-button
          type="button" class='mc-small-button' color="success" expand="block"
          v-on:click="validateEmail"
        >
          <span v-if="this.$store.state.registerStore.statusValidateToken == 'loading'">
            <ion-icon size="large" class="rotating" name="md-sync"></ion-icon>
          </span>
          <span v-if="this.$store.state.registerStore.statusValidateToken != 'loading'">
            {{$t('ConfirmRegistration.confirm')}}
          </span>

        </ion-button>

      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
  .mc-encart {
    border: 1px solid var(--ion-color-primary);
    border-radius: 15px;
    padding: 10px 15px;
    margin-bottom: 20px;
  }
</style>

<script>
  import {toast} from "../../Shared/Mixin/toast.mixin";
  import { required} from 'vuelidate/lib/validators'
  import jwt_decode from "jwt-decode";
  import {isPlatform} from "@ionic/core";
  import {
    Plugins,
    PushNotification,
    PushNotificationToken,
    PushNotificationActionPerformed } from '@capacitor/core';

  const { PushNotifications } = Plugins;

  export default {
    name: 'confirm-registration',
    data () {
      return {
        validatedDateToken: ''
      }
    },
    mixins: [toast],
    created() {
      if (this.$route.query.token) {
        this.validatedDateToken = this.$route.query.token;
      }
    },
    validations: {
      validatedDateToken: {
        required
      }
    },
    methods: {
      validateEmail() {
        this.$v.$reset();
        this.$v.$touch();
        if (!this.$v.$invalid) {
            const email = this.$route.params.email;
            this.$store.dispatch('validateToken', {
              email: email,
              emailToken: this.validatedDateToken
            }).then(res => {
              // this.presentToast(this.$t("ConfirmRegistration.success"), 'success');
              //this.$router.back()
              this.getUser(res);
            }).catch(() => {
              this.presentToast(this.$t("Commons.error"), 'danger')
            })
        }
      },
      getUser(res) {
        const idUser = jwt_decode(res.data.token).id;
        this.$store.dispatch('getUser', { idUser })
          .then(res => {
            this.presentToast("Vous êtes connecté", 'success');
            this.$router.push({ name: "carpoolsHome" });

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
    }
  }
</script>
