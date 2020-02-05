// Global
import { IonicVueRouter } from '@ionic/vue'

import Home from './Home/Home.view.vue';
import MainTabComponent from './MainTabComponent/MainTabComponent.view.vue';

import Vue from 'vue'

Vue.use(IonicVueRouter);

export default [
  {
    path: '',
    name: 'mainTabComponent',
    component: MainTabComponent,
    children: [
      {
        path: '/',
        name: '',
        redirect: {name: 'carpoolsHome'}
      },
      {
        path: 'home',
        name: 'carpoolsHome',
        component: Home,
      }
    ]
  }
]

