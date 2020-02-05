// Global
import { IonicVueRouter } from '@ionic/vue'

import Home from './Carpools/Home/Home.view.vue';
import Carpools from './Carpools/Carpools.view.vue';

import Vue from 'vue'
import routerCarpools from './Carpools/router-carpools';

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
  ]
})

