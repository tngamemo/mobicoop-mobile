// Global
import { IonicVueRouter } from '@ionic/vue'

import Main from './Main/Main.view.vue';
import Help from './Help/Help.view.vue';
import Home from './Home/Home.view.vue';
import Register from './Register/Register.view.vue';
import RegisterAsk from './Register/RegisterAsk.view.vue';
import RegisterGive from './Register/RegisterGive.view.vue';
import Login from './Login/Login.view.vue';
//import MainTabComponent from './MainTabComponent/MainTabComponent.view.vue';
// import Login from './Login/Login.view.vue';
// import Register from './Register/Register.view.vue';
// import GeoSearch from './GeoSearch/GeoSearch.view.vue';

import Vue from 'vue'

Vue.use(IonicVueRouter);

export default [
  {
    path: '',
    component: Main,
    children: [
      {
        path: '/solidary-transport',
        name: 'solidaryTransport',
        redirect: {name: 'solidaryTransport.home'}
      },
      {
        path: '/solidary-transport/home',
        name: 'solidaryTransport.home',
        component: Home,
      },
      {
        path: '/solidary-transport/register',
        name: 'solidaryTransport.register',
        components: {
          register: Register
        }
      },
      {
        path: '/solidary-transport/register/ask',
        name: 'solidaryTransport.register.ask',
        components: {
          register: RegisterAsk
        }
      },
      {
        path: '/solidary-transport/register/give',
        name: 'solidaryTransport.register.give',
        components: {
          register: RegisterGive
        }
      },
      {
        path: '/solidary-transport/login',
        name: 'solidaryTransport.login',
        component: Login
      },
      {
        path: '/solidary-transport/help',
        name: 'solidaryTransport.help',
        component: Help
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
  }
]

