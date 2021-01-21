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
          <ion-back-button default-href="/carpools/home"></ion-back-button>
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

        <ion-item>
          <ion-label position="floating">Votre demande</ion-label>
          <ion-select
            required
            :value="selectIndex"
            @ionChange="changeDemand($event.target.value)"
            :cancel-text="$t('Commons.cancel')"
          >
            <ion-select-option
              v-for="(type, index) in contactType"
              :key="index"
              :value="index"
            >{{$t(`Contact.${type.key}`)}}</ion-select-option>
          </ion-select>
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
          <a class="link pointer" v-on:click="goToProtection()">{{ $t('Contact.protectionLink') }}</a>.
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
      selectIndex: 0
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
  created() {
    if (this.$store.state.userStore.user) {
      this.contactForm.givenName = this.$store.state.userStore.user.givenName;
      this.contactForm.familyName = this.$store.state.userStore.user.familyName;
      this.contactForm.email = this.$store.state.userStore.user.email;
    }

  },
  mounted() {
    if (this.$route.query.demand) {
      const index = this.contactType.findIndex(item => item.key === this.$route.query.demand);
      this.changeDemand(index)
    } else {
      this.changeDemand(0)
    }
  },
  computed: {
    contactType() {
      const test = Object.assign(
        [],
        this.json2array(JSON.parse(process.env.VUE_APP_CONTACT_TYPES))
      );
      return test;
    }
  },
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
            this.$router.push({ name: "carpoolsHome" });
          })
          .catch(err => {
            console.log(err);
            this.presentToast(this.$t("Commons.error"), "danger");
          });
      }
    },

    json2array(json) {
      const result = [];
      var keys = Object.keys(json);
      keys.forEach(key => {
        result.push({ key, value: json[key] });
      });

      return result;
    },

    changeDemand(index) {
      this.selectIndex = index;
      const contactType = this.contactType[index];
      this.contactForm.demand = contactType.key;
      this.contactForm.type = contactType.value == 'support' ? 0 : 1;
    },

    goToProtection() {
      const t = this.$t("Contact.protection-external-link");
      if (t !== "Contact.protection-external-link") {
        window.open(t, '_blank');
      } else {
        this.$router.push('/article/4')
      }

    }
  }
};
</script>
