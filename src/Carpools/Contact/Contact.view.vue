<template>
  <div class="ion-page">
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center">{{ this.$t("Contact.title") }}</h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" no-bounce class="mc-carpool-contact">
      <div class="mc-white-container">
        <ion-item>
          <ion-label position="floating">{{$t('Contact.familyName')}} *</ion-label>
          <ion-input
            type="text"
            :placeholder="$t('Contact.familyName') + '*'"
            :value="contactForm.familyName"
            @input="contactForm.familyName = $event.target.value;"
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">{{$t('Contact.givenName')}} *</ion-label>
          <ion-input
            type="text"
            :placeholder="$t('Contact.givenName') + '*'"
            :value="contactForm.givenName"
            @input="contactForm.givenName = $event.target.value;"
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">{{$t('Contact.email')}} *</ion-label>
          <ion-input
            type="text"
            :placeholder="$t('Contact.email') + '*'"
            :value="contactForm.email"
            @input="contactForm.email = $event.target.value;"
          ></ion-input>
        </ion-item>

        <ion-item lines="none">
          <ion-textarea
            color="primary"
            rows="20"
            type="text"
            :placeholder="$t('Contact.message') + '*'"
            :value="contactForm.message"
            @input="contactForm.message = $event.target.value;"
          ></ion-textarea>
        </ion-item>

        <p class="mc-contact-rgpd">
          {{$t('Contact.rgpd')}}
          <a class="link" :href="link">{{ $t('Contact.protectionLink') }}</a>.
        </p>

        <ion-button class="mc-small-button" color="success" expand="block" @click="sendContact()">
          <span v-if="this.$store.getters.statusContact == 'loading'">
            <ion-icon size="large" class="rotating" name="md-sync"></ion-icon>
          </span>
          <span v-if="this.$store.getters.statusContact != 'loading'">{{ $t('Contact.send') }}</span>
        </ion-button>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
.mc-carpool-contact {
  ion-item {
    margin-bottom: 20px;
  }

  ion-textarea {
    border: 1px solid var(--ion-color-primary);
    border-radius: 20px;
    padding: 10px;
  }

  .mc-contact-rgpd {
    font-size: small;
    font-style: italic;

    .link {
      color: var(--ion-color-warning);
    }
  }
}
</style>

<script>
import { toast } from "../../Shared/Mixin/toast.mixin";
import {
  required,
  email,
  sameAs,
  minLength,
  helpers
} from "vuelidate/lib/validators";

export default {
  name: "carpool-contact",
  data() {
    return {
      contactForm: {
        familyName: "",
        givenName: "",
        email: "",
        demand: "",
        message: "",
        type: 0
      },
      link: process.env.VUE_APP_PRIVACY_LINK
    };
  },
  validations: {
    contactForm: {
      givenName: {
        required
      },
      familyName: {
        required
      },
      email: {
        required,
        email
      },
      message: {
        required
      }
    }
  },
  mixins: [toast],
  props: [],
  created() {},
  methods: {
    sendContact() {
      this.$v.$reset();
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.presentToast(this.$t("Contact.missing"), "danger");
      } else {
        this.$store
          .dispatch("sendContact", this.contactForm)
          .then(resp => {
            this.presentToast(this.$t("Contact.success"), "success");
          })
          .catch(err => {
            console.log(err);
            this.presentToast(this.$t("Commons.error"), "danger");
          });
      }
    }
  }
};
</script>
