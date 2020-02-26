<template>
  <div class="mc-form-carpool">
    <ion-row>
      <ion-col>
        <ion-item v-if="isPonctual">
          <ion-label position="floating">Date de départ</ion-label>
          <ion-datetime
            display-format="DD/MM/YY"
            picker-format="DD/MM/YY"
            cancel-text="Annuler"
            done-text="Valider"
            :placeholder="$t('PostCarpool.dayOutward')"
            :value="this.$store.getters.carpoolToPost.outwardDate"
            @ionChange="changePostOutwardDate($event)"
          ></ion-datetime>
        </ion-item>
        <div v-if="$v.carpoolToPost.outwardDate.$error">
          <div
            class="mc-error-label"
            v-if="!$v.carpoolToPost.outwardDate.required"
          >{{$t('Validation.required')}}</div>
        </div>
      </ion-col>

      <ion-col>
        <ion-item v-if="isPonctual">
          <ion-label position="floating">Heure de départ</ion-label>
          <ion-datetime
            display-format="HH:MM"
            picker-format="HH:MM"
            cancel-text="Annuler"
            done-text="Valider"
            :placeholder="$t('PostCarpool.dayOutward')"
            :value="this.$store.getters.carpoolToPost.outwardDate"
            @ionChange="changePostOutwardDate($event)"
          ></ion-datetime>
        </ion-item>
      </ion-col>
    </ion-row>
  </div>
</template>

<style lang="scss">
.mc-form-carpool {
  .mc-select-type {
    margin-top: 40px;
    margin-bottom: 40px;
    ion-radio {
      margin-right: 10px;
    }
  }

  .mc-select-origin-destination {
    margin-bottom: 40px;
  }
}
</style>

<script>
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
  requiredIf
} from "vuelidate/lib/validators";

export default {
  name: "post-carpool-step1",
  data() {
    return {};
  },
  validations: {
    carpoolToPost: {
      role: {
        required
      },
      outwardDate: {
        required: requiredIf(function(outwardDate) {
          return this.$store.getters.carpoolToPost.frequency == 1;
        })
      }
    },
    addressessUseToPost: {
      origin: {
        required
      },

      destination: {
        required
      }
    }
  },
  created() {},
  computed: {
    carpoolToPost() {
      return this.$store.getters.carpoolToPost;
    },

    isPonctual() {
      return this.$store.getters.carpoolToPost.frequency == 1;
    }
  },
  methods: {
    validate() {
      this.$v.$reset();
      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>
