// Global
import { IonicVueRouter } from '@ionic/vue'

import Home from './Home/Home.view.vue';
import MainTabComponent from './MainTabComponent/MainTabComponent.view.vue';
import Article from './Article/Article.view.vue';
import Login from './Login/Login.view.vue';
import Register from './Register/Register.view.vue';
import GeoSearch from './GeoSearch/GeoSearch.view.vue';
import Search from './Search/Search.view.vue';
import Messages from './Messages/Messages.view.vue';
import Communities from './Communities/Communities/Communities.view.vue';
import Profile from './Profile/Profile.view.vue';
import UpdateProfile from './Profile/UpdateProfile.view.vue';
import ProfileAlerts from './Profile/ProfileAlerts.view.vue';
import ProfilePrefs from './Profile/ProfilePrefs.view.vue';
import MyCarpools from './Profile/MyCarpools.view.vue';
import PostCarpool from './PostCarpool/PostCarpool.view.vue';
import Message from './Messages/Message.view.vue';
import PostCarpoolStep from './PostCarpool/PostCarpoolStep.view.vue';
import DetailCarpool from './DetailCarpool/DetailCarpool.view.vue';
import AskCarpool from './AskCarpool/AskCarpool.view.vue';
import ConfirmRegistration from './Register/ConfirmRegistration.view.vue';
import Community from './Communities/Community/Community.view.vue';
import Events from './Events/Events/Events.view.vue';
import Event from './Events/Event/Event.view.vue';
import Contact from './Contact/Contact.view.vue';
import Solidarity from './Solidarity/Solidarity.view.vue';
import PostCommunity from './Communities/PostCommunity/PostCommunity.view.vue';
import PostEvent from './Events/PostEvent/PostEvent.view.vue';

import Vue from 'vue'
import store from '../Shared/Store/store';

Vue.use(IonicVueRouter);

function guardAccesByLogin(to, from, next) {
  if (to.name !== 'login' && !store.getters.userId && !store.getters.userId) {
    store.commit('redirectionUrl_change', to.path)
    next({ name: 'login' })
  } else {
    next()
  }
}

export default [
  {
    path: '',
    name: 'mainTabComponent',
    component: MainTabComponent,
    children: [
      {
        path: '/',
        name: '',
        redirect: { name: 'carpoolsHome' }
      },
      {
        path: 'home',
        name: 'carpoolsHome',
        component: Home,
      },
      {
        path: 'help',
        name: 'help',
        component: Article,
      },
      {
        path: 'login',
        name: 'login',
        component: Login
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
    path: 'profile-prefs',
    name: 'profile-prefs',
    component: ProfilePrefs
  },
  {
    path: 'my-carpools',
    name: 'my-carpools',
    component: MyCarpools
  },
  {
    path: 'post-carpool-step',
    name: 'post-carpool-step',
    component: PostCarpoolStep
  },
  {
    path: 'post-carpool',
    name: 'post-carpool',
    component: PostCarpool,
    props: (route) => ({
      ...route.params
    }),
    beforeEnter: guardAccesByLogin
  },
  {
    path: 'message/:idRecipient/:idAsk',
    name: 'message',
    component: Message,
    /*
    props: (route) => ({
      ...route.params
    })
     */
  },
  {
    path: '/article/:id',
    name: 'article',
    component: Article,
  },
  {
    path: '/confirm-registration/:email',
    name: 'confirm-registration',
    component: ConfirmRegistration,
  },
  {
    path: '/carpool-detail/:param',
    name: 'carpool-detail',
    component: DetailCarpool,
    beforeEnter: guardAccesByLogin
  },
  {
    path: '/ask-carpool/:param',
    name: 'ask-carpool',
    component: AskCarpool,
    beforeEnter: guardAccesByLogin
  },
  {
    path: 'community/:id',
    name: 'carpool-community',
    component: Community,
    beforeEnter: guardAccesByLogin
  },
  {
    path: 'post-community',
    name: 'post-community',
    component: PostCommunity,
    beforeEnter: guardAccesByLogin
  },
  {
    path: '/events',
    name: 'carpool-events',
    component: Events,
    beforeEnter: guardAccesByLogin
  },
  {
    path: 'event/:id',
    name: 'carpool-event',
    component: Event,
    beforeEnter: guardAccesByLogin
  },
  {
    path: 'post-event',
    name: 'post-event',
    component: PostEvent,
    beforeEnter: guardAccesByLogin
  },
  {
    path: 'contact',
    name: 'carpool-contact',
    component: Contact,
  },
  {
    path: 'solidarity',
    name: 'carpool-solidarity',
    component: Solidarity,
  },
]
