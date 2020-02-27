<template>


        <div class="mc-form-register">

          <div class="mc-form-register-input">

            <ion-item>
              <ion-label position="floating">{{$t('Register.phone')}} *</ion-label>
              <ion-input
                type="text"
                name="telephone"
                :value="user.telephone"
                @input="user.telephone = $event.target.value;"
                :placeholder="$t('Register.phone')"
              ></ion-input>
            </ion-item>
            <div v-if="$v.user.telephone.$error">
              <div class="mc-error-label"  v-if="!$v.user.telephone.required">{{$t('Validation.required')}}</div>
            </div>

            <ion-item v-on:click="goGeoSearch('register_address', 'search')">
              <ion-label position="floating">{{$t('Register.address')}} *</ion-label>
              <ion-input
                type="text"
                name="address"
                :value="displayAddress"
                readonly="true"
                class="no-clickable"
                v-bind:placeholder="$t('Register.address')"
              ></ion-input>
            </ion-item>
            <div v-if="$v.user.addresses.$error">
              <div class="mc-error-label"  v-if="!$v.user.addresses.required">{{$t('Validation.required')}}</div>
            </div>
            <br>

            <ion-item>
              <ion-label position="floating">{{$t('Register.gender')}} *</ion-label>
              <ion-select
                required
                :value="user.gender"
                @ionChange="user.gender = Number($event.target.value)"
                :cancel-text="$t('Commons.cancel')"
                :placeholder="$t('Register.gender')"
              >
                <ion-select-option value="3">{{$t('Register.nc')}}</ion-select-option>
                <ion-select-option value="2">{{$t('Register.male')}}</ion-select-option>
                <ion-select-option value="1">{{$t('Register.female')}}</ion-select-option>
              </ion-select>
            </ion-item>
            <div v-if="$v.user.gender.$error">
              <div class="mc-error-label"  v-if="!$v.user.gender.required">{{$t('Validation.required')}}</div>
            </div>

            <ion-item>
              <ion-label position="floating">{{ $t('Register.birthDate') }} *</ion-label>
              <ion-datetime
                display-format="DD/MM/YYYY"
                picker-format="DD/MM/YYYY"
                :cancel-text="$t('Commons.cancel')"
                :done-text="$t('Commons.validate')"
                :max="maxBirthDate"
                :value="user.birthDate"
                @ionChange="user.birthDate = $event.detail.value"
              ></ion-datetime>
            </ion-item>
            <div v-if="$v.user.birthDate.$error">
              <div class="mc-error-label"  v-if="!$v.user.birthDate.required">{{$t('Validation.required')}}</div>
            </div>
            <br>
            <ion-item lines="none">
              <ion-checkbox
                name="userAgreementAccepted"
                :value="user.userAgreementAccepted"
                color="success"
                slot="start"
                @ionChange="changeUserAgreementAccepted($event)"
                :checked="user.userAgreementAccepted"
              ></ion-checkbox>
              <ion-label class="no-white-space">{{ $t('Register.userAgreementAccepted') }}</ion-label>
            </ion-item>
            <div v-if="$v.user.userAgreementAccepted.$error">
              <div class="mc-error-label"  v-if="!$v.user.userAgreementAccepted.required">{{$t('Validation.required')}}</div>
              <div class="mc-error-label"  v-if="!$v.user.userAgreementAccepted.checked">{{$t('Validation.required')}}</div>
            </div>

            <br>
            <!--<a class="text-center" v-on:click="$router.push('cgu')">Voir les conditions</a>-->

          </div>

        </div>

</template>

<style lang="scss">

  .no-white-space {
    white-space: normal !important;
  }
  .mc-form-register {
    display: block;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;

    .mc-form-register-input {
      flex: 1;
      flex-direction: column;
      display: flex;
      justify-content: center
    }
  }

</style>

<script>
    import { required, email, sameAs } from 'vuelidate/lib/validators'
    import { mapState } from 'vuex'

    const checked = value => value === true;

    export default {
        name: 'registerStep2',
        data () {
            return {
                maxBirthDate: new Date().toISOString()
            }
        },
        validations: {
            user: {
                telephone: {
                    required,
                },
                addresses: {
                    required
                },
                gender: {
                    required,
                },
                birthDate: {
                    required
                },
                userAgreementAccepted: {
                    required,
                    checked
                }
            }
        },
        computed: {
            user : {
                get() {
                    return this.$store.state.registerStore.userToRegister
                },
                set() {
                    this.$store.commit('register_update', this.user);
                }
            },
            displayAddress : {
                get() {
                    return this.$store.state.registerStore.displayAddress
                }
            }
        },
        created() {
        },
        methods: {
            goGeoSearch(type, action) {
                this.$router.push({ name: "geoSearch", query: { type, action }});
            },
            validate() {
                this.$v.$reset();
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return false;
                } else {
                    return true;
                }
            },
            changeUserAgreementAccepted(event) {
                event.detail.checked ? ( this.user.userAgreementAccepted = true) : (this.user.userAgreementAccepted = false);
            },
        }
    }
</script>
