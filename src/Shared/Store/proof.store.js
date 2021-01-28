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

export const proofStore = {
  state: {

  },
  mutations: {


  },
  actions: {
    // Register
    postClassicProof: ({commit, state}, params) => {
      return new Promise((resolve, reject) => {
        http.post("/classic_proofs", params ).then(resp => {
          if (resp) {
            resolve(resp)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    putClassicProof: ({commit, state}, params) => {
      return new Promise((resolve, reject) => {
        http.put("/classic_proofs/" + params.id, {latitude: params.latitude, longitude: params.longitude} ).then(resp => {
          if (resp) {
            resolve(resp)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    getClassicProof: ({commit, state}, id) => {
      return new Promise((resolve, reject) => {
        http.get("/classic_proofs/" + id ).then(resp => {
          if (resp) {
            resolve(resp)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
  },
  getters : {

  }
}

export default { proofStore };
