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

http.interceptors.response.use( (response) => {
    // Return a successful response back to the calling service
    return response;
  }, (error) => {
    return new Promise((resolve, reject) => {
      reject(error);
    });
})

export default http;
