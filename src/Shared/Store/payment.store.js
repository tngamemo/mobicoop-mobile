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

import http from '../Mixin/http.mixin'

export const paymentStore = {
  state: {
    statusPayment: '',
    bankAccount: null
  },
  mutations: {
    payment_request(state) {
      state.statusPayment = 'loading';
    },

    payment_success(state) {
      state.statusPayment = 'success';
    },

    payment_error(state) {
      state.statusPayment = 'error';
    },

    reset_bank_account(state) {
      state.bankAccount = {
        iban: '',
        bic: ''
      }
    },

    update_bank_account(state, data) {
      state.bankAccount = data
    },

    updateBankAddress(state, payload) {
      state.bankAccount.address = payload.addressDTO;
    },

  },
  actions: {
    getPayment: ({commit}, params) => {
      commit('payment_request');
      return new Promise((resolve, reject) => {
        http.get("/payment_items", {params : params}).then(resp => {
          if (resp) {
            commit('payment_success');
            resolve(resp)
          }
        }).catch(err => {
          commit('payment_error');
          reject(err)
        })
      })
    },
    getWeeks: ({commit}, askId) => {
      return new Promise((resolve, reject) => {
        http.get("/asks/" + askId + "/pendingPayment").then(resp => {
          if (resp) {
            resolve(resp)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    postPayment: ({commit}, data) => {
      commit('payment_request');
      return new Promise((resolve, reject) => {
        http.post("/payment_payments" , data).then(resp => {
          if (resp) {
            commit('payment_success');
            resolve(resp)
          }
        }).catch(err => {
          commit('payment_error');
          reject(err)
        })
      })
    },
    getBankAccount: ({commit, state}, params) => {
      return new Promise((resolve, reject) => {
        http.get("/users/paymentProfile", {params : params}).then(resp => {
          if (resp) {
            if(resp.data['hydra:member'][0].bankAccounts[0]) {
              commit('update_bank_account', resp.data['hydra:member'][0].bankAccounts[0]);
            } else if(state.bankAccount.id) {
              commit('reset_bank_account');
            }
            resolve(resp)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    disableBankAccount: ({commit}, bankAccountId) => {
      return new Promise((resolve, reject) => {
        http.get("/bank_accounts/disable?idBankAccount=" + bankAccountId).then(resp => {
          if (resp) {
            commit('reset_bank_account');
            resolve(resp)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    postBankAccount: ({commit}, data) => {
      delete data.address.id;
      delete data.address.geoJson;
      return new Promise((resolve, reject) => {
        http.post("/bank_accounts" , data).then(resp => {
          if (resp) {
            commit('update_bank_account', resp.data);
            resolve(resp)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    sendValidationDocument: ({commit}, params) => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', params.file);

        http.post(`/validation_documents`, formData)
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
  },
  getters : {

  }
}

export default { paymentStore };
