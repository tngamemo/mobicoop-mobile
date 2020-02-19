// Global
import { IonicVueRouter } from '@ionic/vue'

import Main from './Main/Main.view.vue';
//import MainTabComponent from './MainTabComponent/MainTabComponent.view.vue';
// import Login from './Login/Login.view.vue';
// import Register from './Register/Register.view.vue';
// import GeoSearch from './GeoSearch/GeoSearch.view.vue';

import Vue from 'vue'

Vue.use(IonicVueRouter);

export default [
  {
    path: '',
    name: 'solidarityTransport',
    component: Main,
    children: [
      {
        path: 'login',
        name: 'solidarityTransport.login',
        component: Main
      },
      {
        path: 'register',
        name: 'solidarityTransport.register',
        component: Main
      },
      {
        path: 'help',
        name: 'solidarityTransport.help',
        component: Main
      }
    ]
  }
]

