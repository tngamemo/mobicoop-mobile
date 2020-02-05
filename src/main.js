import Vue from 'vue'
import App from './App.vue'
import router from './router';
import i18n from './i18n';

import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';

import Ionic from '@ionic/vue';
import '@ionic/core/css/ionic.bundle.css';

Vue.use(Ionic);
Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  el: '#app',
  render: h => h(App)
})

// Default locale
i18n.locale = 'fr';


// Ajout des icons ionic
const currentIcons = Object.keys(allIcons).map(i => {
  return {
    ['ios-' + i]: allIcons[i].ios,
    ['md-' + i]: allIcons[i].md
  };
});
const iconsObject = Object.assign({}, ...currentIcons);
addIcons(iconsObject);
