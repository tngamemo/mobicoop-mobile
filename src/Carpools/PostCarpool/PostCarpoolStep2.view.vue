<template>
  <div class="mc-form-carpool-time-ponctual" v-if="isPonctual">
    <ion-row>
      <ion-col>
        <ion-item>
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
        <ion-item>
          <ion-label position="floating">Heure de départ</ion-label>
          <ion-datetime
            display-format="HH:mm"
            picker-format="HH:mm"
            cancel-text="Annuler"
            done-text="Valider"
            :placeholder="$t('PostCarpool.timeOutward')"
            :value="outwardTimeInit"
            @ionChange="changePostOutwardTime($event)"
          ></ion-datetime>
        </ion-item>
        <div v-if="$v.outwardTimeCopy.$error">
          <div
            class="mc-error-label"
            v-if="!$v.outwardTimeCopy.required"
          >{{$t('Validation.required')}}</div>
        </div>
      </ion-col>
    </ion-row>

    <ion-row>
      <ion-item lines="none">
        <ion-label>{{$t('PostCarpool.return')}}</ion-label>
        <ion-checkbox
          slot="start"
          :checked="this.$store.getters.carpoolToPost.oneWay == false"
          @ionChange="changeOneWay()"
        ></ion-checkbox>
      </ion-item>
    </ion-row>

    <ion-row v-if="carpoolToPost.oneWay == false">
      <ion-col>
        <ion-item v-if="isPonctual">
          <ion-label position="floating">{{$t('PostCarpool.dayReturn')}}</ion-label>
          <ion-datetime
            display-format="DD/MM/YY"
            picker-format="DD/MM/YY"
            cancel-text="Annuler"
            done-text="Valider"
            :placeholder="$t('PostCarpool.dayReturn')"
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
          <ion-label position="floating">{{$t('PostCarpool.timeReturn')}}</ion-label>
          <ion-datetime
            display-format="HH:mm"
            picker-format="HH:mm"
            cancel-text="Annuler"
            done-text="Valider"
            :placeholder="$t('PostCarpool.timeReturn')"
            :value="computeReturnTime"
            @ionChange="changePostReturnTime($event)"
          ></ion-datetime>
        </ion-item>
        <div v-if="$v.carpoolToPost.returnTime.$error">
          <div
            class="mc-error-label"
            v-if="!$v.carpoolToPost.returnTime.required"
          >{{$t('Validation.required')}}</div>
        </div>
      </ion-col>
    </ion-row>
  </div>

</template>

<style lang="scss">
.mc-form-carpool-time-ponctual {
  margin-top: 40px;

  ion-row {
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
  name: "post-carpool-step2",
  data() {
    return {
      dateOutwardCarpool: Object.assign(
        {},
        this.$store.getters.carpoolToPost.outwardDate
      ),
      outwardTimeInit: this.computeOutWardTime(),
      outwardTimeCopy: this.$store.getters.carpoolToPost.outwardTime,
      returnTimeInit: this.computeReturnTime(),
      returnTimeCopy: this.$store.getters.carpoolToPost.returnTime
    };
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
      },
      returnDate: {
        required: requiredIf(function(returnDate) {
          return (
            this.$store.getters.carpoolToPost.frequency == 1 &&
            !this.$store.getters.carpoolToPost.oneWay
          );
        })
      },
      returnTime: {
        required: requiredIf(function(returnTime) {
          return (
            this.$store.getters.carpoolToPost.frequency == 1 &&
            !this.$store.getters.carpoolToPost.oneWay
          );
        })
      }
    },
    outwardTimeCopy: {
      required: requiredIf(function(outwardTime) {
        return this.$store.getters.carpoolToPost.frequency == 1;
      })
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
        this.$store.commit("changeTimeOutwardCarpool", {
          outwardTime: this.outwardTimeCopy
        });

        this.$store.commit("changeTimeReturnCarpool", {
          returnTime: this.returnTimeCopy
        });
        return true;
      }
    },

    changePostOutwardDate($event) {
      this.$store.commit("changeDateOutwardCarpool", {
        outwardDate: new Date($event.detail.value)
      });
    },

    changePostOutwardTime($event) {
      const outwardTime = this.$moment($event.detail.value).format("HH:mm");
      this.outwardTimeCopy = outwardTime;
    },

    changePostReturnDate($event) {
      this.$store.commit("changeDateReturnCarpool", {
        returnDate: new Date($event.detail.value)
      });
    },

    changePostReturnTime($event) {
      const returnTime = this.$moment($event.detail.value).format("HH:mm");
      this.returnTimeCopy = returnTime;
    },

    changeOneWay() {
      if (this.$store.getters.carpoolToPost.oneWay == false) {
        this.$store.getters.carpoolToPost.oneWay = true;
      } else {
        this.$store.getters.carpoolToPost.oneWay = false;
      }
    },

    computeOutWardTime() {
      if (!!this.$store.getters.carpoolToPost.outwardTime) {
        const hour = this.$store.getters.carpoolToPost.outwardTime.split(
          ":"
        )[0];
        const min = this.$store.getters.carpoolToPost.outwardTime.split(":")[1];
        const date = new Date();

        if (!!hour && !!min) {
          date.setHours(hour, min);
          return date.toString();
        } else {
          return "";
        }
      } else {
        return "";
      }
    },

    computeReturnTime() {
      if (!!this.$store.getters.carpoolToPost.returnTime) {
        const hour = this.$store.getters.carpoolToPost.returnTime.split(":")[0];
        const min = this.$store.getters.carpoolToPost.returnTime.split(":")[1];
        const date = new Date();
        date.setHours(hour, min);
        return date.toString();
        if (!!hour && !!min) {
          date.setHours(hour, min);
          return date.toString();
        } else {
          return "";
        }
      } else {
        return "";
      }
    }
  }
};
</script>
