// Global
import { IonicVueRouter } from '@ionic/vue'

import Home from './Carpools/Home/Home.view.vue';
import Carpools from './Carpools/Carpools.view.vue';
import SolidaryTransport from './SolidaryTransport/SolidaryTransport.view.vue';

import Vue from 'vue'
import routerCarpools from './Carpools/router-carpools';
import routerSolidaryTransport from './SolidaryTransport/router-solidaryTransport';

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
      path: '/solidary-transport',
      component: SolidaryTransport,
      children: [
        ...routerSolidaryTransport
      ]
    },
  ]
})

