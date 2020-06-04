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
// Request related
import Request from './Request/Request.view.vue';
import RequestCheck from './Request/RequestCheck.view.vue';
import RequestPath from './Request/RequestPath.view.vue';
import RequestPunctual from './Request/RequestPunctual.view.vue';
import RequestRegular from './Request/RequestRegular.view.vue';
import RequestUser from './Request/RequestUser.view.vue';
import RequestSummary from './Request/RequestSummary.view.vue';

// Volunteer related
import Volunteer from './Volunteer/Volunteer.view.vue';
import VolunteerAvailabilities from './Volunteer/VolunteerAvailabilities.view.vue';
import VolunteerUser from './Volunteer/VolunteerUser.view.vue';
import VolunteerDetails from './Volunteer/VolunteerDetails.view.vue';

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
      // HOME ----- ( start here )
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
      // HOME ----- ( end here )

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
      {
        path: '/solidary-transport/home/request/punctual',
        name: 'solidaryTransport.home.request.punctual',
        components: {
          home: RequestPunctual
        }
      },
      {
        path: '/solidary-transport/home/request/regular',
        name: 'solidaryTransport.home.request.regular',
        components: {
          home: RequestRegular
        }
      },
      {
        path: '/solidary-transport/home/request/user',
        name: 'solidaryTransport.home.request.user',
        components: {
          home: RequestUser
        }
      },
      {
        path: '/solidary-transport/home/request/summary',
        name: 'solidaryTransport.home.request.summary',
        components: {
          home: RequestSummary
        }
      },
      // REQUEST ----- ( end here )

      // VOLUNTEER ----- ( start here )
      {
        path: '/solidary-transport/home/volunteer',
        name: 'solidaryTransport.home.volunteer',
        components: {
          home: Volunteer
        }
      },
      {
        path: '/solidary-transport/home/volunteer/availabilities',
        name: 'solidaryTransport.home.volunteer.availabilities',
        components: {
          home: VolunteerAvailabilities
        }
      },
      {
        path: '/solidary-transport/home/volunteer/user',
        name: 'solidaryTransport.home.volunteer.user',
        components: {
          home: VolunteerUser
        }
      },
      {
        path: '/solidary-transport/home/volunteer/details',
        name: 'solidaryTransport.home.volunteer.details',
        components: {
          home: VolunteerDetails
        }
      },
      // VOLUNTEER ----- ( end here )

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
      },
      // MESSAGES ----- ( end here )

      // HELP ----- ( start here )
      {
        path: '/solidary-transport/help',
        name: 'solidaryTransport.help',
        component: Help
      }
      // HELP ----- ( end here )
    ]
  },
  {
    path: 'geo-search',
    name: 'solidaryTransport.geoSearch',
    component: GeoSearch
  },
]

