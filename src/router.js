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

// Global
import { IonicVueRouter } from '@ionic/vue'

import Home from './Carpools/Home/Home.view.vue';
import Carpools from './Carpools/Carpools.view.vue';

import Vue from 'vue'
import routerCarpools from './Carpools/router-carpools';

Vue.use(IonicVueRouter);

const router = new IonicVueRouter({
  routes: [
    {
      path: '/',
      name: '',
      redirect: '/carpools',
    },
    {
      path: '/carpools',
      name: 'carpools',
      component: Carpools,
      children: [
        ...routerCarpools
      ]
    }
  ],
})

router.onError(err => {
  console.error("Handling router error", err.message);
});

export default router;

