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

<template>
  <div id="app">
    <ion-app v-if="!! this.$store.state.userStore.user || !! this.$store.state.userStore.tokenAnonymousUser">
      <ion-vue-router />
    </ion-app>
  </div>
</template>

<script>
  import jwt_decode from "jwt-decode";
  import {isPlatform} from "@ionic/core";
  import { Plugins } from '@capacitor/core';
  const { Device } = Plugins;
  const { Browser } = Plugins;

  export default {
    name: 'app',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    watch:{
      $route (to, from){
        /* Matomo route change
        if(JSON.parse(process.env.VUE_APP_ANALYTICS_ACTIVATED)) {
          window._paq.push(['setCustomUrl', '/' + window.location.hash.substr(1)]);
          window._paq.push(['trackPageView']);
        }
        */

      }
    },
    created: function () {

      document.title = process.env.VUE_APP_NAME;
      // On change les couleurs en fonction de l'environement
      document.documentElement.style.setProperty('--ion-color-primary', '#' + process.env.VUE_APP_PRIMARY);
      document.documentElement.style.setProperty('--ion-color-primary-rgb', process.env.VUE_APP_PRIMARY_RGB);
      document.documentElement.style.setProperty('--ion-color-secondary', '#' + process.env.VUE_APP_SECONDARY);
      document.documentElement.style.setProperty('--ion-color-secondary-rgb', process.env.VUE_APP_SECONDARY_RGB);
      document.documentElement.style.setProperty('--ion-color-tertiary', '#' + process.env.VUE_APP_TERTIARY);
      document.documentElement.style.setProperty('--ion-color-success', '#' + process.env.VUE_APP_SUCCESS);
      document.documentElement.style.setProperty('--ion-color-success-rgb',  process.env.VUE_APP_SUCCESS_RGB);
      document.documentElement.style.setProperty('--ion-color-warning', '#' + process.env.VUE_APP_WARNING);
      document.documentElement.style.setProperty('--ion-color-danger', '#' + process.env.VUE_APP_DANGER);

      // Fonction qui va log l'user ou utilisé un user par défault
      this.authUserOnStart();



      if(JSON.parse(process.env.VUE_APP_ANALYTICS_ACTIVATED)) {
        this.initAnalytics();
      }
    },
    methods: {

      authUserOnStart: function() {
        // Get the user api Token. If empty, we connect with the anonymous User
        if (this.$store.state.userStore.tokenUser) {
            const idUser = jwt_decode(this.$store.state.userStore.tokenUser).id;
            this.$store.dispatch('getUser', { idUser })
            .then(res => {
              this.getVersion();

              })
            .catch(err => {
              // On va authentifier l'appli via un utilisateur anonyme
              this.$store.dispatch('authAnonymousUser').then(() => {
                this.getVersion();
              })
            })
        } else {

          // On va authentifier l'appli via un utilisateur anonyme
          this.$store.dispatch('authAnonymousUser').then(() => {
            this.getVersion();
          })
        }
      },
      initAnalytics() {
        var _paq = window._paq || [];
        /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
        // _paq.push(["setDocumentTitle", document.domain+"/"+document.title]);
        // _paq.push(["setCookieDomain", "*." + process.env.VUE_APP_ANALYTICS_DOMAIN]);
        // _paq.push(["setDomains", ["*." + process.env.VUE_APP_ANALYTICS_DOMAIN ]]);
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function() {
          var u = process.env.VUE_APP_ANALYTICS_ENDPOINT;
          _paq.push(['setTrackerUrl', "https://"+u+'/matomo.php']);
          _paq.push(['setSiteId', process.env.VUE_APP_ANALYTICS_SITEID]);
          var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
          g.type='text/javascript'; g.async=true; g.defer=true; g.src= "https://"+u+'/matomo.js'; s.parentNode.insertBefore(g,s);
        })();

      },
      getVersion() {
        this.$store.dispatch('getVersions').then(res => {
          if (isPlatform(window.document.defaultView, "capacitor")) {
            const versions = res.data['hydra:member'];
            if (versions.length > 0) {
              this.checkVersion(versions[0]);
            }
          }
        })
      },
      async checkVersion(version) {
        let status = 0;
        let info = await Device.getInfo();
        let mobile = '';
        if (isPlatform(window.document.defaultView, "ios")) {
          mobile = 'ios'
        }
        if (isPlatform(window.document.defaultView, "android")) {
          mobile = 'android'
        }
        if (this.isNewerVersion(info.appVersion, version[ mobile + 'Recommended'])) {
          status = 1
        }
        if (this.isNewerVersion(info.appVersion, version[ mobile + 'Min'])) {
          status = 2
        }

        if(status > 0) {
          const buttons = [];
          if (status == 1) {
            buttons.push({
                text: 'Annuler',
                role: 'cancel',
                cssClass: 'secondary',
                handler: cancel => {

                },
              });
          }
          buttons.push({
              text: 'Mettre à jour',
              handler: () => {
                if (status == 1) {
                  this.openUrl( version[ mobile + 'RecommendedLink'] );
                } else if (status == 2) {
                  this.openUrl(version[ mobile + 'MinLink']);
                }
              },
            });

          this.$ionic.alertController
            .create({
              header: 'Mise à jour',
              backdropDismiss: false,
              message: status == 1 ? this.$t('Commons.version-recommended') : this.$t('Commons.version-min'),
              buttons: buttons,
            })
            .then(a => a.present())
        }
      },
      async openUrl(url) {
        await Browser.open({ url: url });
      },
      isNewerVersion (oldVer, newVer) {
        const oldParts = oldVer.split('.');
        const newParts = newVer.split('.');
        for (var i = 0; i < newParts.length; i++) {
          const a = parseInt(newParts[i]) || 0;
          const b = parseInt(oldParts[i]) || 0;
          if (a > b) return true;
          if (a < b) return false;
        }
        return false
      }
    }
  }
</script>

<style lang="scss">
  @import "./style.scss";

</style>
