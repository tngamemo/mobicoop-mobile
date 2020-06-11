<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>{{ $t('solidaryTransport.register.success.title') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" class="is-scrollable">
      <div class="mc-st-container">
        <div class="mc-st-form">

          <div class="mc-st-form-content">

            <div class='mc-st-form-information'>
              <p>{{ $t('ConfirmRegistration.register-almost-done')}}</p>
              <p>{{ $t('ConfirmRegistration.mail-sent')}}</p>
              <p>{{ $t('ConfirmRegistration.copy')}}</p>
            </div>
            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('ConfirmRegistration.my-code')}} *</ion-label>
              <ion-input
                type="text"
                name="validatedDateToken"
                :value="token"
                @input="token = $event.target.value"
                v-bind:placeholder="$t('ConfirmRegistration.paste')"
              ></ion-input>
            </ion-item>
            <div class="mc-st-form-details" v-if="$v.token.$error">
              <span class="mc-st-form-error" v-if="!$v.token.required">{{$t('solidaryTransport.register.form.validators.required')}}</span>
            </div>
          </div>

          <div class="mc-st-form-controls" :class="{'is-loading': processing}">
            <ion-button class="mc-st-form-control as-loader" color="success" @click="validate()">
              <ion-icon slot="start" name="sync" size="large"></ion-icon>
              <span v-html="$t('solidaryTransport.buttons.confirm')"></span>
            </ion-button>
          </div>

        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="scss">
  
</style>

<script>
import _ from 'lodash'
import {toast} from "../../Shared/Mixin/toast.mixin";
import {required} from 'vuelidate/lib/validators'
import jwt_decode from "jwt-decode";
import {isPlatform} from "@ionic/core";
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed } from '@capacitor/core';

const { PushNotifications } = Plugins;

export default {
  name: 'solidaryTransport.register.success',
  data () {
    return {
      token: this.$route.query.token,
      email: this.$route.query.email,
      processing: false
    }
  },
  mixins: [toast],
  mounted: function () {},
  validations: {
    token: {
      required
    }
  },
  methods: {
    validate() {
      if (!this.processing) {
        this.$v.$reset();
        this.$v.$touch();
        if (!this.$v.$invalid) {
          this.processing = true
          this.$store.dispatch('validateStandardUser', {
            email: this.email,
            emailToken: this.token
          }).then(res => {
            this.getUser(res)
          }).catch((error) => {
            console.error(error)
            //this.presentToast(this.$t("Commons.error"), 'danger')
          })
          .finally(() => {
            this.processing = false
          })
        }
      }
    },
    getUser(res) {
      const idUser = jwt_decode(res.data.token).id;
      this.$store.dispatch('getUser', { idUser })
        .then(res => {
          this.presentToast("Vous êtes connecté", 'success');
          this.$router.push({ name: "solidaryTransport.home" });

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