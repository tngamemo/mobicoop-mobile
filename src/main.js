/**

 Copyright (c) 2018, MOBICOOP. All rights reserved.
 This project is dual licensed under AGPL and proprietary licence.

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 GNU Affero General Public License for more details.
 You should have received a copy of the GNU Affero General Public License
 along with this program. If not, see <gnu.org/licenses>.

 Licence MOBICOOP described in the file
 LICENSE
 **************************/

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
