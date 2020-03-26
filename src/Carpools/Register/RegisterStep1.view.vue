<template>
  <div class="mc-form-register">
    <div class="mc-form-register-input">
      <ion-item>
        <ion-label position="floating">{{$t('Register.givenName')}} *</ion-label>
        <ion-input
          type="text"
          :placeholder="$t('Register.givenName') + '*'"
          :value="user.givenName"
          @input="user.givenName = $event.target.value;"
        ></ion-input>
      </ion-item>
      <div class="label-visible-by-all">{{$t('Register.visible-by-all')}}</div>
      <div v-if="$v.user.givenName.$error">
        <div class="mc-error-label" v-if="!$v.user.givenName.required">{{$t('Validation.required')}}</div>
      </div>

      <br />
      <ion-item>
        <ion-label position="floating">{{$t('Register.familyName')}} *</ion-label>
        <ion-input
          type="text"
          :placeholder="$t('Register.familyName') + '*'"
          :value="user.familyName"
          @input="user.familyName = $event.target.value;"
        ></ion-input>
      </ion-item>
      <div v-if="$v.user.familyName.$error">
        <div
          class="mc-error-label"
          v-if="!$v.user.familyName.required"
        >{{$t('Validation.required')}}</div>
      </div>

      <ion-item>
        <ion-label position="floating">{{$t('Register.email')}} *</ion-label>
        <ion-input
          type="text"
          :placeholder="$t('Register.email') + '*'"
          :value="user.email"
          @ionBlur="checkedEmail = null"
          @input="user.email = $event.target.value"
        ></ion-input>
        <ion-icon
          style="margin-top: 16px"
          slot="end"
          size="large"
          color="primary"
          class="rotating"
          v-if="this.$store.state.registerStore.statusCheckEmail == 'loading'"
          name="md-sync"
        ></ion-icon>
      </ion-item>
      <div v-if="$v.user.email.$error">
        <div class="mc-error-label" v-if="!$v.user.email.required">{{$t('Validation.required')}}</div>
        <div class="mc-error-label" v-if="!$v.user.email.email">{{$t('Validation.email')}}</div>
        <div class="mc-error-label" v-if="!$v.user.email.checkEmail">{{$t('Validation.checkEmail')}}</div>
      </div>

      <br />
      <ion-item>
        <ion-label position="floating">{{$t('Register.password')}} *</ion-label>
        <ion-input
          type="password"
          :placeholder="$t('Register.password') + '*'"
          :value="user.password"
          @input="user.password = $event.target.value;"
        ></ion-input>
      </ion-item>
      <div v-if="$v.user.password.$error">
        <div class="mc-error-label" v-if="!$v.user.password.required">{{$t('Validation.required')}}</div>
        <div
          class="mc-error-label"
          v-if="!$v.user.password.minLength"
        >{{$t('Validation.minLength')}}</div>
        <div
          class="mc-error-label"
          v-if="!$v.user.password.oneUppercase"
        >{{$t('Validation.oneUppercase')}}</div>
        <div class="mc-error-label" v-if="!$v.user.password.oneDigit">{{$t('Validation.oneDigit')}}</div>
      </div>

      <ion-item>
        <ion-label position="floating">{{$t('Register.confirmPassword')}} *</ion-label>
        <ion-input
          type="password"
          :placeholder="$t('Register.confirmPassword') + '*'"
          :value="user.confirmPassword"
          @input="user.confirmPassword = $event.target.value;"
        ></ion-input>
      </ion-item>
      <div v-if="$v.user.confirmPassword.$error">
        <div
          class="mc-error-label"
          v-if="!$v.user.confirmPassword.required"
        >{{$t('Validation.required')}}</div>
        <div
          class="mc-error-label"
          v-if="!$v.user.confirmPassword.sameAsPassword"
        >{{$t('Validation.sameAsPassword')}}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.mc-form-register {
  display: block;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;

  .mc-form-register-input {
    flex: 1;
    flex-direction: column;
    display: flex;
    justify-content: center;
  }

  .label-visible-by-all {
    float: left;
    font-size: 11px;
    opacity: 0.6;
    text-align: start;
    margin-top: 3px;
  }
}
</style>

<script>
import {
  required,
  email,
  sameAs,
  minLength,
  helpers
} from "vuelidate/lib/validators";

const oneUppercase = helpers.regex("oneUppercase", /[A-Z]/);
const oneDigit = helpers.regex("oneDigit", /\d/);

export default {
  name: "registerStep1",
  data() {
    return {
      checkedEmail: null
    };
  },
  validations: {
    user: {
      givenName: {
        required
      },
      familyName: {
        required
      },
      email: {
        required,
        email,
        checkEmail(email) {
          if (!this.checkedEmail) {
            this.checkedEmail = this.$store.dispatch('checkEmail', email).then(res => { return res});
            return this.checkedEmail
          } else {
            return this.checkedEmail
          }

        }
      },
      password: {
        required,
        minLength: minLength(8),
        oneUppercase,
        oneDigit
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs("password")
      }
    }
  },
  computed: {
    user: {
      get() {
        return this.$store.state.registerStore.userToRegister;
      },
      set() {
        this.$store.commit("register_update", this.user);
      }
    }
  },
  created() {},
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
