import Vue from 'vue'
import App from './App.vue'
import router from './router';
import i18n from './i18n';
import store from './Shared/Store/store';


import Ionic from '@ionic/vue';
import '@ionic/core/css/ionic.bundle.css';
import Vuelidate from 'vuelidate'
import VueMoment from 'vue-moment'
const moment = require('moment')
require('moment/locale/fr')

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
   iconUrl: require('leaflet/dist/images/marker-icon.png'),
   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

import 'leaflet/dist/leaflet.css';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen';

Vue.use(Ionic, { 'backButtonText' : ''});
Vue.use(Vuelidate);
Vue.use(VueMoment, { moment });
Vue.config.productionTip = false;



new Vue({
  router,
  i18n,
  el: '#app',
  store,
  render: h => h(App),
})

// Default locale
i18n.locale = 'fr';
i18n.test = 'a'


import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';

const currentIcons = Object.keys(allIcons).map(i => {
  const key = i.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
  if(typeof allIcons[i] === 'string') {
    return {
      [key]: allIcons[i],
    }
  }
  return {
    ['ios-' + key]: allIcons[i].ios,
    ['md-' + key]: allIcons[i].md,
  };
});

const iconsObject = Object.assign({}, ...currentIcons);
addIcons(iconsObject);
