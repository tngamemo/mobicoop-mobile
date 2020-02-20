// Global
import { IonicVueRouter } from '@ionic/vue'

import Main from './Main/Main.view.vue';
import Help from './Help/Help.view.vue';
//import MainTabComponent from './MainTabComponent/MainTabComponent.view.vue';
// import Login from './Login/Login.view.vue';
// import Register from './Register/Register.view.vue';
// import GeoSearch from './GeoSearch/GeoSearch.view.vue';

import Vue from 'vue'

Vue.use(IonicVueRouter);

export default [
  {
    path: '',
    name: 'solidaryTransport',
    component: Main
  },
  {
    path: 'login',
    name: 'solidaryTransport.login',
    component: Main
  },
  {
    path: 'register',
    name: 'solidaryTransport.register',
    component: Main
  },
  {
    path: 'help',
    name: 'solidaryTransport.help',
    component: Help
  }
]

