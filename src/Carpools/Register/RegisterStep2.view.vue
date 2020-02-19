<template>


        <div class="mc-form-register">

          <div class="mc-form-register-input">

            <ion-item>
              <ion-label position="floating">{{$t('Register.phone')}} *</ion-label>
              <ion-input
                type="text"
                name="phone"
                :value="user.phone"
                @input="user.phone = $event.target.value; updateMessage()"
                :placeholder="$t('Register.phone')"
              ></ion-input>
            </ion-item>
            <div class="mc-error-label"  v-if="$v.user.phone.$error">{{$t('Validation.required')}}</div>

            <ion-item>
              <ion-label position="floating">{{$t('Register.address')}} *</ion-label>
              <ion-input
                type="text"
                name="address"
                :value="user.address"
                @input="user.address = $event.target.value; updateMessage()"
                v-bind:placeholder="$t('Register.address')"
              ></ion-input>
            </ion-item>
            <div class="mc-error-label"  v-if="$v.user.address.$error">{{$t('Validation.required')}}</div>
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
            <div class="mc-error-label"  v-if="$v.user.gender.$error">{{$t('Validation.required')}}</div>

            <ion-item v-on:click="test">
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

    export default {
        name: 'registerStep2',
        data () {
            return {
                maxBirthDate: new Date().toISOString()
            }
        },
        validations: {
            user: {
                phone: {
                    required,
                },
                address: {
                    required
                },
                gender: {
                    required,
                },
                birthDate: {
                    required
                },
                userAgreementAccepted: {
                    required
                }
            }
        },
        computed: {
            ...mapState({
                user: state => {
                    console.log(state.registerStore.userToRegister);
                    return state.registerStore.userToRegister
                }
            })
        },
        created() {
            this.test()
        },
        methods: {
            validate() {
                this.$v.$touch();
                this.test();
                if (this.$v.$invalid) {
                    return false;
                } else {
                    return true;
                }
            },
            changeUserAgreementAccepted(event) {
                event.detail.checked ? ( this.user.userAgreementAccepted = true) : (this.user.userAgreementAccepted = false);
            },
            test() {
                console.log(this.user.birthDate);
                console.log(this.maxBirthDate);
            },
            updateMessage(){
                this.$store.commit('register_update', this.user);
            }
        }
    }
</script>
