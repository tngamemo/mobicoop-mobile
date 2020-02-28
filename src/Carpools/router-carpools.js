// Global
import { IonicVueRouter } from '@ionic/vue'

import Home from './Home/Home.view.vue';
import MainTabComponent from './MainTabComponent/MainTabComponent.view.vue';
import Help from './Help/Help.view.vue';
import Login from './Login/Login.view.vue';
import Register from './Register/Register.view.vue';
import GeoSearch from './GeoSearch/GeoSearch.view.vue';
import Search from './Search/Search.view.vue';
import Messages from './Messages/Messages.view.vue';
import Communities from './Communities/Communities.view.vue';
import Profile from './Profile/Profile.view.vue';
import UpdateProfile from './Profile/UpdateProfile.view.vue';
import ProfileAlerts from './Profile/ProfileAlerts.view.vue';
import MyCarpools from './Profile/MyCarpools.view.vue';
import PostCarpool from './PostCarpool/PostCarpool.view.vue';
import Message from './Messages/Message.view.vue';

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
      {
        path: 'messages',
        name: 'messages',
        component: Messages,
      },
      {
        path: 'communities',
        name: 'communities',
        component: Communities,
      },
      {
        path: 'profile',
        name: 'profile',
        component: Profile,
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
  {
    path: 'update-profile',
    name: 'update-profile',
    component: UpdateProfile
  },
  {
    path: 'profile-alerts',
    name: 'profile-alerts',
    component: ProfileAlerts
  },
  {
    path: 'my-carpools',
    name: 'my-carpools',
    component: MyCarpools
 },
 {
    path: 'post-carpool',
    name: 'post-carpool',
    component: PostCarpool
  },
  {
    path: 'message',
    name: 'message',
    component: Message,
    props: (route) => ({
      ...route.params
    })
  },
]

