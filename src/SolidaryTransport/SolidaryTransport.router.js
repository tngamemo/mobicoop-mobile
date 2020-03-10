// Global
import Main from './Main/Main.view.vue';
import Help from './Help/Help.view.vue';
import Home from './Home/Home.view.vue';
import Register from './Register/Register.view.vue';
import RegisterAsk from './Register/RegisterAsk.view.vue';
import RegisterSubscribe from './Register/RegisterSubscribe.view.vue';
import RegisterSubscribeDetails from './Register/RegisterSubscribeDetails.view.vue';
import Login from './Login/Login.view.vue';

import Vue from 'vue'
import store from '../Shared/Store/store'
import _ from 'lodash'

let preventAccess = function (to, from, next) {
  let user = store.state.userStore.user
  if (user) {
    if (_.includes(to.name, 'solidaryTransport.register')) {
      next({name: 'solidaryTransport.home'})
    } else if (_.includes(to.name, 'solidaryTransport.login')) {
      next({name: 'solidaryTransport.home'})
    } else {
      next()
    }
  } else {
    next()
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
        component: Home,
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
      }
    ]
  }
]

