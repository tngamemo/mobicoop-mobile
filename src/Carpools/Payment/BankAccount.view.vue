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
        <h1 class="ion-text-center">{{ $t('BankAccount.title') }} </h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" no-bounce>
      <div class="mc-white-container">
        <ion-item>
          <ion-label position="floating">{{$t('BankAccount.iban')}} *</ion-label>
          <ion-input
            type="text"
            :placeholder="$t('BankAccount.iban') + '*'"
            :value="bankAccount.iban"
            :disabled="bankAccount.id"
            @input="bankAccount.iban = $event.target.value"
          >
          </ion-input>
        </ion-item>
        <div v-if="$v.bankAccount.iban.$error">
          <div class="mc-error-label"  v-if="!$v.bankAccount.iban.required">{{$t('Validation.required')}}</div>
          <div class="mc-error-label"  v-if="!$v.bankAccount.iban.minLength">{{$t('Validation.minLengthIBAN')}}</div>
        </div>

        <ion-item>
          <ion-label position="floating">{{$t('BankAccount.bic')}} *</ion-label>
          <ion-input
            type="text"
            :placeholder="$t('BankAccount.bic') + '*'"
            :value="bankAccount.bic"
            :disabled="bankAccount.id"
            @input="bankAccount.bic = $event.target.value"
          >
          </ion-input>
        </ion-item>
        <div v-if="$v.bankAccount.bic.$error">
          <div class="mc-error-label"  v-if="!$v.bankAccount.bic.required">{{$t('Validation.required')}}</div>
          <div class="mc-error-label"  v-if="!$v.bankAccount.bic.minLength">{{$t('Validation.minLengthBIC')}}</div>
        </div>

        <br>
        <ion-item  v-on:click="goGeoSearch('update_bank_address', 'search')">
          <ion-label position="floating">{{$t('BankAccount.address')}} *</ion-label>
          <ion-input
            type="text"
            name="address"
            :value="formatAddress(bankAccount.address)"
            :disabled="bankAccount.id"
            readonly="true"
            class="no-clickable ellipsis"
            v-bind:placeholder="$t('BankAccount.address')"
          ></ion-input>
        </ion-item>
        <div v-if="$v.bankAccount.address.$error">
          <div class="mc-error-label"  v-if="!$v.bankAccount.address.required">{{$t('Validation.required')}}</div>
        </div>

        <div v-if="bankAccount.id">
          <br>
          <ion-label position="floating">{{$t('BankAccount.identity')}} *</ion-label>
          <div style="line-height: 18px"><small>{{$t('BankAccount.identity-desc')}}</small></div>
          <div class="validationStatus">
            <div v-if="bankAccount.validationStatus == 0" class="text-center">
              <ion-text color="secondary" class="d-flex justify-center align-center">
                <ion-icon class="status-icon" name="hourglass"></ion-icon>
                <b>{{$t('BankAccount.waiting')}}</b>
              </ion-text>
            </div>
            <div v-if="bankAccount.validationStatus == 1" class="text-center">
              <ion-text color="success" class="d-flex justify-center align-center">
                <ion-icon class="status-icon" name="checkmark"></ion-icon>
                <b>{{$t('BankAccount.accepted')}}</b>
              </ion-text>
            </div>
            <div v-if="bankAccount.validationStatus == 2" class="text-center">
              <ion-text color="danger" class="d-flex justify-center align-center">
                <ion-icon class="status-icon" name="close"></ion-icon>
                <b>{{$t('BankAccount.refused')}}</b>
              </ion-text>
            </div>
            <div v-if="bankAccount.validationStatus == 3" class="text-center">
              <ion-text color="danger" class="d-flex justify-center align-center">
                <ion-icon class="status-icon" name="close"></ion-icon>
                <b>{{$t('BankAccount.outdated')}}</b>
              </ion-text>
            </div>
          </div>
          <ion-button v-if="!(bankAccount.validationStatus == 0 || bankAccount.validationStatus == 1)" class='mc-small-button' color="primary" fill="outline" expand="block" @click="$refs.docInput.click()">
            <ion-icon class="ion-margin-end" name="create"></ion-icon> {{ $t('BankAccount.identity-send') }}
          </ion-button>
          <input ref="docInput" style="display: none" type="file" @change="changeDoc($event)" />
        </div>

        <br>
        <ion-button class='mc-small-button' :color="bankAccount.id ? 'danger' : 'success'" expand="block" @click="postBankAccount()">
            <span v-if="loading">
            <ion-icon size="large" class="rotating" name="md-sync"></ion-icon>
          </span>
          <span v-if="!loading">
          {{ bankAccount.id ? $t('BankAccount.disable') : $t('Commons.save') }}
          </span>
        </ion-button>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
.validationStatus {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>

<script>
  import {toast} from "../../Shared/Mixin/toast.mixin";
  import {required, minLength} from "vuelidate/lib/validators";
  import { address } from '../../Shared/Mixin/address.mixin';

  export default {
    name: 'bankAccount',
    data () {
      return {
        loading: false
      }
    },
    mixins: [toast, address],
    props : [],
    created() {
      // this.$store.commit('reset_bank_account');
      if (!this.bankAccount) {
        this.$store.commit('reset_bank_account');
      }
      this.getBankAccount()
    },
    validations: {
      bankAccount: {
        iban: {
          required,
          minLength: minLength(27)
        },
        bic: {
          required,
          minLength: minLength(8)
        },
        address: {
          required
        }
      }
    },
    computed: {
      bankAccount() {
        return this.$store.state.paymentStore.bankAccount;
      },
    },
    methods: {
      goGeoSearch(type, action) {
        this.$router.push({ name: "geoSearch", query: { type, action }});
      },
      getBankAccount() {
        this.$store.dispatch('getBankAccount').then(res =>{
          this.bankAccount = res
        })
      },
      postBankAccount() {
        if (this.bankAccount.id) {
          this.$store.dispatch('disableBankAccount', this.bankAccount.id)
        } else {
          this.$v.$reset();
          this.$v.$touch();
          if (!this.$v.$invalid) {
            this.loading = true
            this.$store.dispatch('postBankAccount', this.bankAccount)
              .then(res => {
                this.bankAccount = res;
                this.loading = false
                this.presentToast(this.$t("BankAccount.success"), 'success')
              })
              .catch(err => {
                this.loading = false
                this.presentToast(this.$t("Commons.error"), 'danger')
              });
          }
        }
      },
      changeDoc(e) {
        const file = e.target.files[0];
        if (file) {
          this.$store.dispatch('sendValidationDocument', { file: file })
            .then(res => {
              this.getBankAccount()
              this.presentToast(this.$t("BankAccount.document-success"), 'success')
            })
            .catch(err => {
              this.presentToast(this.$t("Commons.error"), 'danger')
            });
        }
      },
    }
  }
</script>
