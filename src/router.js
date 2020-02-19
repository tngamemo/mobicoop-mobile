// Global
import { IonicVueRouter } from '@ionic/vue'

import Home from './Carpools/Home/Home.view.vue';
import Carpools from './Carpools/Carpools.view.vue';
import SolirarityTransport from './SolidarityTransport/SolidarityTransport.view.vue';

import Vue from 'vue'
import routerCarpools from './Carpools/router-carpools';
import routerSolidarityTransport from './SolidarityTransport/router-solidarityTransport';

Vue.use(IonicVueRouter);

export default new IonicVueRouter({
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
    },
    {
      path: '/solidarity-transport',
      component: SolirarityTransport,
      children: [
        ...routerSolidarityTransport
      ]
    },
  ]
})

