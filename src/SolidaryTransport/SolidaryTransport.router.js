// Common
import Main from './Main/Main.view.vue';
import Help from './Help/Help.view.vue';
import Home from './Home/Home.view.vue';

// Anonymous
import Register from './Register/Register.view.vue';
import RegisterAsk from './Register/RegisterAsk.view.vue';
import RegisterSubscribe from './Register/RegisterSubscribe.view.vue';
import RegisterSubscribeDetails from './Register/RegisterSubscribeDetails.view.vue';
import Login from './Login/Login.view.vue';

// Logged
import Profile from './Profile/Profile.view.vue';
import ProfilePersonal from './Profile/ProfilePersonal.view.vue';
import ProfilePreferences from './Profile/ProfilePreferences.view.vue';
import ProfileVehicule from './Profile/ProfileVehicule.view.vue';
import ProfileRealtime from './Profile/ProfileRealtime.view.vue';
import ProfileAgenda from './Profile/ProfileAgenda.view.vue';
import Messages from './Messages/Messages.view.vue';

// Solidary related
import AdPublish from './Ad/AdPublish.view.vue';
import RequestPublish from './Request/RequestPublish.view.vue';

import Vue from 'vue'
import store from '../Shared/Store/store'
import _ from 'lodash'

let preventAccess = function (to, from, next) {
  let user = store.state.userStore.user
  if (user) {
    if (_.isEqual(to.name, 'solidaryTransport.register.subscribe')) {
      next({name: 'solidaryTransport.register.subscribe.details'})
    } else if (_.includes(to.name, 'solidaryTransport.login')) {
      next({name: 'solidaryTransport.home'})
    } else {
      next()
    }
  } else {
    if (_.includes(to.name, 'solidaryTransport.profile')) {
      next({name: 'solidaryTransport.login'})
    } else if (_.includes(to.name, 'solidaryTransport.messages')) {
      next({name: 'solidaryTransport.login'})
    } else {
      next()
    }
  }
}

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
        components: {
          home: Home
        }
      },
      {
        path: '/solidary-transport/home/ad',
        name: 'solidaryTransport.home.ad',
        components: {
          home: AdPublish
        }
      },
      {
        path: '/solidary-transport/home/request',
        name: 'solidaryTransport.home.request',
        components: {
          home: RequestPublish
        }
      },
      {
        path: '/solidary-transport/help',
        name: 'solidaryTransport.help',
        component: Help
      },
      {
        path: '/solidary-transport/register',
        name: 'solidaryTransport.register',
        components: {
          register: Register
        },
        beforeEnter: preventAccess
      },
      {
        path: '/solidary-transport/register/ask',
        name: 'solidaryTransport.register.ask',
        components: {
          register: RegisterAsk
        },
        beforeEnter: preventAccess
      },
      {
        path: '/solidary-transport/register/subscribe',
        name: 'solidaryTransport.register.subscribe',
        components: {
          register: RegisterSubscribe
        },
        beforeEnter: preventAccess
      },
      {
        path: '/solidary-transport/register/subscribe/details',
        name: 'solidaryTransport.register.subscribe.details',
        components: {
          register: RegisterSubscribeDetails
        },
        beforeEnter: preventAccess
      },
      {
        path: '/solidary-transport/login',
        name: 'solidaryTransport.login',
        component: Login,
        beforeEnter: preventAccess
      },
      {
        path: '/solidary-transport/profile',
        name: 'solidaryTransport.profile',
        components: {
          profile: Profile
        },
        beforeEnter: preventAccess
      },
      {
        path: '/solidary-transport/profile/personal',
        name: 'solidaryTransport.profile.personal',
        components: {
          profile: ProfilePersonal
        },
        beforeEnter: preventAccess
      },
      {
        path: '/solidary-transport/profile/preferences',
        name: 'solidaryTransport.profile.preferences',
        components: {
          profile: ProfilePreferences
        },
        beforeEnter: preventAccess
      },
      {
        path: '/solidary-transport/profile/vehicule',
        name: 'solidaryTransport.profile.vehicule',
        components: {
          profile: ProfileVehicule
        },
        beforeEnter: preventAccess
      },
      {
        path: '/solidary-transport/profile/realtime',
        name: 'solidaryTransport.profile.realtime',
        components: {
          profile: ProfileRealtime
        },
        beforeEnter: preventAccess
      },
      {
        path: '/solidary-transport/profile/agenda',
        name: 'solidaryTransport.profile.agenda',
        components: {
          profile: ProfileAgenda
        },
        beforeEnter: preventAccess
      },
      {
        path: '/solidary-transport/profile/notifications',
        name: 'solidaryTransport.profile.notifications',
        components: {
          profile: ProfileAgenda
        },
        beforeEnter: preventAccess
      },
      {
        path: '/solidary-transport/messages',
        name: 'solidaryTransport.messages',
        components: {
          messages: Messages
        },
        beforeEnter: preventAccess
      }
    ]
  }
]

