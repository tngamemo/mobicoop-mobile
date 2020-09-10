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
              <div class="mc-error-label"  v-if="!$v.user.telephone.minLength">{{$t('Validation.minLengthTel')}}</div>
            </div>

            <ion-item v-on:click="goGeoSearch('register_address', 'search')">
              <ion-label position="floating">{{$t('Register.address')}} *</ion-label>
              <ion-input
                type="text"
                name="address"
                :value="displayAddress"
                readonly="true"
                class="no-clickable ellipsis"
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
              <ion-label position="floating">{{ $t('Register.birthDate') }} <span v-if="requiredBirthdate">*</span></ion-label>
              <ion-datetime
                display-format="DD/MM/YYYY"
                picker-format="DD/MM/YYYY"
                :cancel-text="$t('Commons.cancel')"
                :done-text="$t('Commons.validate')"
                :value="user.birthDate"
                @ionChange="user.birthDate = $event.detail.value"
              ></ion-datetime>
            </ion-item>
            <div v-if="$v.user.birthDate.$error">
              <div class="mc-error-label"  v-if="!$v.user.birthDate.required">{{$t('Validation.required')}}</div>
              <div class="mc-error-label"  v-if="!$v.user.birthDate.isMaxBirthDate">{{$t('Validation.age', { value: minAge })}}</div>
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
            <a class="text-center pointer" v-on:click="$router.push('/article/1')">Voir les conditions</a>

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
  import {required, email, sameAs, minLength, requiredIf} from 'vuelidate/lib/validators'
    import { mapState } from 'vuex'
    var moment = require('moment');

    const checked = value => value === true;
    const isMaxBirthDate = (value, vm) => {
      if (JSON.parse(process.env.VUE_APP_REQUIRED_BIRTHDATE)) {
        let n = new Date();
        n.setFullYear(n.getFullYear() - process.env.VUE_APP_REGISTER_MIN_AGE);
        return moment(value).isBefore(moment(n.toISOString()));
      } else {
        return true;
      }
    }

    export default {
        name: 'registerStep2',
        data () {
            return {
                maxBirthDate: this.getMaxBirthDate(),
                minAge: process.env.VUE_APP_REGISTER_MIN_AGE,
                requiredBirthdate: JSON.parse(process.env.VUE_APP_REQUIRED_BIRTHDATE)
            }
        },
        validations: {
            user: {
                telephone: {
                    required,
                    minLength: minLength(10)
                },
                addresses: {
                    required
                },
                gender: {
                    required,
                },
                birthDate: {
                    required :  requiredIf(function () {
                      return this.requiredBirthdate;
                    }),
                    isMaxBirthDate
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
            getMaxBirthDate() {
              let n = new Date();
              n.setFullYear(n.getFullYear() - process.env.VUE_APP_REGISTER_MIN_AGE);
              return n.toISOString();
            },
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
