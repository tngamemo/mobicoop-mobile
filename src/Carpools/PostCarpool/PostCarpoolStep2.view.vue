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
            :placeholder="$t('PostCarpool.timeOutward')"
            :value="computeOutWardTime"
            @ionChange="changePostOutwardTime($event)"
          ></ion-datetime>
        </ion-item>
      </ion-col>
    </ion-row>


    <ion-row>
      <ion-col>
        <ion-item v-if="isPonctual">
          <ion-label position="floating">Date de retour</ion-label>
          <ion-datetime
            display-format="DD/MM/YY"
            picker-format="DD/MM/YY"
            cancel-text="Annuler"
            done-text="Valider"
            :placeholder="$t('PostCarpool.dayOutward')"
            :value="this.$store.getters.carpoolToPost.returnDate"
            @ionChange="changePostReturnDate($event)"
          ></ion-datetime>
        </ion-item>
        <div v-if="$v.carpoolToPost.returnDate.$error">
          <div
            class="mc-error-label"
            v-if="!$v.carpoolToPost.returnDate.required"
          >{{$t('Validation.required')}}</div>
        </div>
      </ion-col>

      <ion-col>
        <ion-item v-if="isPonctual">
          <ion-label position="floating">Heure de retour</ion-label>
          <ion-datetime
            display-format="HH:MM"
            picker-format="HH:MM"
            cancel-text="Annuler"
            done-text="Valider"
            :placeholder="$t('PostCarpool.timeOutward')"
            :value="computeReturnTime"
            @ionChange="changePostReturnTime($event)"
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
    return {
      dateOutwardCarpool: Object.assign({},this.$store.getters.carpoolToPost.outwardDate )
    };
  },
  validations: {
    carpoolToPost: {
      role: {
        required
      },
      outwardDate: {
        required: requiredIf(function(outwardDate) {
          console.log('asdasd')
          return this.$store.getters.carpoolToPost.frequency == 1;
        })
      },
      outwardTime: {
        required: requiredIf(function(outwardTime) {
          console.log('JE PASSE LA')
          return this.$store.getters.carpoolToPost.frequency == 1;
        })
      },
      returnDate: {
        required: requiredIf(function(returnDate) {
          return this.$store.getters.carpoolToPost.frequency == 1;
        })
      },
      returnTime: {
        required: requiredIf(function(returnTime) {
          console.log('coucou')
          return this.$store.getters.carpoolToPost.frequency == 1;
        })
      },
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
    },

    computeOutWardTime() {
      const hour = this.$store.getters.carpoolToPost.outwardTime.split(':')[0];
      const min = this.$store.getters.carpoolToPost.outwardTime.split(':')[1];

      const date = new Date();
      date.setHours(hour, min);
      return date.toString()
    },

    computeReturnTime() {
      const hour = this.$store.getters.carpoolToPost.returnTime.split(':')[0];
      const min = this.$store.getters.carpoolToPost.returnTime.split(':')[1];

      const date = new Date();
      date.setHours(hour, min);
      return date.toString()
    }
  },
  methods: {
    validate() {
      console.log(this.$v);
      console.log(this.carpoolToPost)
      this.$v.$reset();
      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      } else {
        return true;
      }
    },

    changePostOutwardDate($event) {
      this.$store.commit('changeDateOutwardCarpool', {outwardDate: new Date($event.detail.value)})
    },

    changePostOutwardTime($event) {
      const outwardTime = this.$moment($event.detail.value).format('HH:MM');
      this.$store.commit('changeTimeOutwardCarpool', {outwardTime})
    },

    changePostReturnDate($event) {
      this.$store.commit('changeDateReturnCarpool', {returnDate: new Date($event.detail.value)})
    },

    changePostReturnTime($event) {
      const returnTime = this.$moment($event.detail.value).format('HH:MM');
      this.$store.commit('changeReturnCarpool', {returnTime})
    },
  }
};
</script>
