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
            this.$router.back();

          })
          .catch(err => {
            this.presentToast("Une erreur est survenue", 'danger')
          })
      },
    }
  }
</script>
