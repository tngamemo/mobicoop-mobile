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
import Vue from 'vue'
import axios from 'axios';

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 60 * 4 * 1000,
  headers: { 'Content-Type': 'application/json', 'accept': 'application/ld+json' },
});

http.interceptors.request.use(
  function (config) {
    const tokenUser = localStorage.getItem('tokenUser');
    const tokenAnonymousUser = localStorage.getItem('tokenAnonymousUser');
    if (tokenUser) {
      config.headers.Authorization = `Bearer ${tokenUser}`;
    } else {
      config.headers.Authorization = `Bearer ${tokenAnonymousUser}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use((response) => {
  // Return a successful response back to the calling service
  return response;
}, async (error) => {

  const regex = /^\/users\/\w+$/g
  const regexIsMatching = error.response.config.url.match(regex);
  // Return any error which is not due to authentication back to the calling service
  if (error.response.status !== 401 || !regexIsMatching) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  } else {

    createToasterLogin();
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
});

async function createToasterLogin() {
  const existingVueInstance = document.querySelector('#app').__vue__;
  const toast = await existingVueInstance.$ionic.toastController.create({
    message: 'Veuillez vous reconnectez',
    duration: 5000,
    showCloseButton: false,
    position: 'bottom',
    color: 'danger',
    buttons: [
      {
        text: 'Se reconnecter',
        handler: () => {
          existingVueInstance.$router.push('login')
        }
      }
    ]
  });
  toast.present();
}


export default http;
