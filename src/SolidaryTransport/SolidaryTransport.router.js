// Global
import { IonicVueRouter } from '@ionic/vue'

import Main from './Main/Main.view.vue';
import Help from './Help/Help.view.vue';
import Home from './Home/Home.view.vue';
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
    component: Main,
    children: [
      {
        path: '/',
        name: '',
        redirect: {name: 'solidaryTransport.home'}
      },
      {
        path: 'home',
        name: 'solidaryTransport.home',
        component: Home,
      }
      // {
      //   path: 'help',
      //   name: 'help',
      //   component: Help,
      // },
      // {
      //   path: 'login',
      //   name: 'login',
      //   component: Login,
      // },
      // {
      //   path: 'register',
      //   name: 'register',
      //   component: Register,
      // },
      // {
      //   path: 'messages',
      //   name: 'messages',
      //   component: Messages,
      // },
      // {
      //   path: 'communities',
      //   name: 'communities',
      //   component: Communities,
      // },
      // {
      //   path: 'profile',
      //   name: 'profile',
      //   component: Profile,
      // },
    ]
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

