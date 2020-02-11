import Vue from 'vue'
import App from './App.vue'
import router from './router';
import i18n from './i18n';
import store from './Shared/user.store';


import Ionic from '@ionic/vue';
import '@ionic/core/css/ionic.bundle.css';

Vue.use(Ionic);
Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  el: '#app',
  store,
  render: h => h(App)
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
