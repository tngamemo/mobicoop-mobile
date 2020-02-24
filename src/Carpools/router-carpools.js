// Global
import { IonicVueRouter } from '@ionic/vue'

import Home from './Home/Home.view.vue';
import MainTabComponent from './MainTabComponent/MainTabComponent.view.vue';
import Help from './Help/Help.view.vue';
import Login from './Login/Login.view.vue';
import Register from './Register/Register.view.vue';
import GeoSearch from './GeoSearch/GeoSearch.view.vue';
import Search from './Search/Search.view.vue';

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
      },
      {
        path: 'help',
        name: 'help',
        component: Help,
      },
      {
        path: 'login',
        name: 'login',
        component: Login,
      },
      {
        path: 'register',
        name: 'register',
        component: Register,
      },
    ]
  },

  {
    path: 'geosearch',
    name: 'geoSearch',
    component: GeoSearch
  },

  {
    path: 'search',
    name: 'search',
    component: Search
  },
]

