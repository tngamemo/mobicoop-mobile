// Common
import Main from './Main/Main.view.vue';
import Help from './Help/Help.view.vue';
import Home from './Home/Home.view.vue';

// Anonymous
import Register from './Register/Register.view.vue';
import RegisterSubscribe from './Register/RegisterSubscribe.view.vue';
import RegisterSuccess from './Register/RegisterSuccess.view.vue';
import Login from './Login/Login.view.vue';

// Logged
import Profile from './Profile/Profile.view.vue';
import ProfilePersonal from './Profile/ProfilePersonal.view.vue';
import ProfilePreferences from './Profile/ProfilePreferences.view.vue';
import ProfileNotifications from './Profile/ProfileNotifications.view.vue';
import ProfileVehicle from './Profile/ProfileVehicle.view.vue';
import ProfileRealtime from './Profile/ProfileRealtime.view.vue';
import ProfileAgenda from './Profile/ProfileAgenda.view.vue';
import Messages from './Messages/Messages.view.vue';

// Solidary
// Ad Related
// import AdPublish from './Ad/AdPublish.view.vue';
// import AdPublishPonctual from './Ad/AdPublishPonctual.view.vue';
// import AdPublishPonctualSummary from './Ad/AdPublishPonctualSummary.view.vue';
// import AdPublishRegular from './Ad/AdPublishRegular.view.vue';
// import AdPublishRegularSummary from './Ad/AdPublishRegularSummary.view.vue';
// Request Related
import Request from './Request/Request.view.vue';
import RequestCheck from './Request/RequestCheck.view.vue';
import RequestPath from './Request/RequestPath.view.vue';
// import RequestPublish from './Request/RequestPublish.view.vue';
// import RequestPublishPonctual from './Request/RequestPublishPonctual.view.vue';
// import RequestPublishPonctualSummary from './Request/RequestPublishPonctualSummary.view.vue';
// import RequestPublishRegular from './Request/RequestPublishRegular.view.vue';
// import RequestPublishRegularSummary from './Request/RequestPublishRegularSummary.view.vue';

// Tools related
import GeoSearch from './GeoSearch/GeoSearch.view.vue';


import Vue from 'vue'
import store from '../Shared/Store/store'
import _ from 'lodash'

let preventAccess = function (to, from, next) {
  let user = store.state.userStore.user
  if (user) {
    if (_.isEqual(to.name, 'solidaryTransport.register.subscribe')) {
      next({name: 'solidaryTransport.register.success'})
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
      // {
      //   path: '/solidary-transport/home/ad',
      //   name: 'solidaryTransport.home.ad',
      //   components: {
      //     home: AdPublish
      //   }
      // },
      // {
      //   path: '/solidary-transport/home/ad/ponctual',
      //   name: 'solidaryTransport.home.ad.ponctual',
      //   components: {
      //     home: AdPublishPonctual
      //   }
      // },
      // {
      //   path: '/solidary-transport/home/ad/ponctual/summary',
      //   name: 'solidaryTransport.home.ad.ponctual.summary',
      //   components: {
      //     home: AdPublishPonctualSummary
      //   }
      // },
      // {
      //   path: '/solidary-transport/home/ad/regular',
      //   name: 'solidaryTransport.home.ad.regular',
      //   components: {
      //     home: AdPublishRegular
      //   }
      // },
      // {
      //   path: '/solidary-transport/home/ad/regular/summary',
      //   name: 'solidaryTransport.home.ad.regular.summary',
      //   components: {
      //     home: AdPublishRegularSummary
      //   }
      // },
      // REQUEST ----- ( start here )
      {
        path: '/solidary-transport/home/request',
        name: 'solidaryTransport.home.request',
        components: {
          home: Request
        }
      },
      {
        path: '/solidary-transport/home/request/check',
        name: 'solidaryTransport.home.request.check',
        components: {
          home: RequestCheck
        }
      },
      {
        path: '/solidary-transport/home/request/path',
        name: 'solidaryTransport.home.request.path',
        components: {
          home: RequestPath
        }
      },
      // {
      //   path: '/solidary-transport/home/request/ponctual',
      //   name: 'solidaryTransport.home.request.ponctual',
      //   components: {
      //     home: RequestPublishPonctual
      //   }
      // },
      // {
      //   path: '/solidary-transport/home/request/ponctual/summary',
      //   name: 'solidaryTransport.home.request.ponctual.summary',
      //   components: {
      //     home: RequestPublishPonctualSummary
      //   }
      // },
      // {
      //   path: '/solidary-transport/home/request/regular',
      //   name: 'solidaryTransport.home.request.regular',
      //   components: {
      //     home: RequestPublishRegular
      //   }
      // },
      // {
      //   path: '/solidary-transport/home/request/regular/summary',
      //   name: 'solidaryTransport.home.request.regular.summary',
      //   components: {
      //     home: RequestPublishRegularSummary
      //   }
      // },
      {
        path: '/solidary-transport/help',
        name: 'solidaryTransport.help',
        component: Help
      },

      // REGISTER ----- ( start here )
      {
        path: '/solidary-transport/register',
        name: 'solidaryTransport.register',
        components: {
          register: Register
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
        path: '/solidary-transport/register/success',
        name: 'solidaryTransport.register.success',
        components: {
          register: RegisterSuccess
        },
        beforeEnter: preventAccess
      },
      // REGISTER ----- ( end here )

      // PROFILE ----- ( start here )
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
        path: '/solidary-transport/profile/vehicle',
        name: 'solidaryTransport.profile.vehicle',
        components: {
          profile: ProfileVehicle
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
          profile: ProfileNotifications
        },
        beforeEnter: preventAccess
      },
      // PROFILE ----- ( end here )
      // MESSAGES ----- ( start here )
      {
        path: '/solidary-transport/messages',
        name: 'solidaryTransport.messages',
        components: {
          messages: Messages
        },
        beforeEnter: preventAccess
      }
      // MESSAGES ----- ( end here )
    ]
  },
  {
    path: 'geo-search',
    name: 'solidaryTransport.geoSearch',
    component: GeoSearch
  },
]

