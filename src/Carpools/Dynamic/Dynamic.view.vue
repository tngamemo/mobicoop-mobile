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
  <div class="ion-page">
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/carpools/home"></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center">{{ $t('Dynamic.title') }} </h1>
      </ion-toolbar>
    </ion-header>

    <ion-fab vertical="top" horizontal="end" slot="fixed" v-if="$store.state.dynamicStore.status == 'loading' || $store.state.dynamicStore.statusAsk == 'loading'">
      <ion-fab-button color="light">
        <ion-icon size="large" color="primary" class="rotating"  name="md-sync"></ion-icon>
      </ion-fab-button>
    </ion-fab>

    <ion-content color="primary" no-bounce>
      <div class="mc-white-container" >

        <div class="text-center" style="margint-top: 20px" v-if="$store.state.dynamicStore.statusActive == 'loading'">
          <ion-icon size="large" color="primary" class="rotating"  name="md-sync"></ion-icon>
        </div>

        <!-- State 1 : Je choisi mon role -->
        <div class="dynamic-form" v-if="$store.state.dynamicStore.statusActive == 'success' && state == 1">

          <!-- Destination -->
          <ion-item v-on:click="goGeoSearch('destination', 'search')" style="margin-bottom: 20px">
            <ion-label position="floating">{{$t('Search.destination')}}</ion-label>
            <ion-input
              type="text"
              class="no-clickable ellipsis"
              :placeholder="$t('Search.destination')"
              :value="this.$store.state.searchStore.display.destination"
            ></ion-input>
          </ion-item>

          <!-- Role -->
          <ion-radio-group @ionChange="currentDynamic.role = Number($event.target.value)">
            <ion-row>
              <ion-col>
                <ion-item lines="none">
                  <ion-radio value="1" :checked="currentDynamic.role == 1"></ion-radio>
                  <ion-label>{{ $t('PostCarpool.driver')}}</ion-label>
                </ion-item>
              </ion-col>
              <ion-col>
                <ion-item lines="none">
                  <ion-radio value="2" :checked="currentDynamic.role == 2"></ion-radio>
                  <ion-label>{{ $t('PostCarpool.passenger')}}</ion-label>
                </ion-item>
              </ion-col>
            </ion-row>
          </ion-radio-group>

          <!-- Comment -->
          <ion-item>
            <ion-label position="floating">{{$t('Dynamic.comment')}}</ion-label>
            <ion-textarea rows="2" cols="12"
                          :value="currentDynamic.comment"
                          @ionInput="currentDynamic.comment = $event.target.value">
            </ion-textarea>
          </ion-item>

          <ion-item lines="none" v-if="vocalPlugin">
            <ion-label>Commande vocale</ion-label>
            <ion-toggle @ionChange="setVocal($event.target.checked)" :checked="vocal"></ion-toggle>
          </ion-item>

          <br>
          <!-- Start button -->
          <ion-button class='mc-big-button' color="success" expand="block" @click="launchDynamic()">
            {{ $t('Dynamic.launch') }}
          </ion-button>
        </div>



        <!-- State 2  -->
        <div v-if="$store.state.dynamicStore.statusActive == 'success' && state == 2">

          <div v-if="destination">
            <div class="dynamic-map" >
              <l-map
                v-if="map.showCard"
                :ref="'dynamicMap'"
                style="height: 300px; width: 300px; border-radius: 150px;"
                :zoom="map.zoom"
                :bounds="bounds"
                :options="map.optionsCard"
              >
                <l-tile-layer :url="map.url"></l-tile-layer>
                <!--<l-polyline v-if="bounds" :lat-lngs="recapCarpool.directPoints" :color="'blue'"></l-polyline>-->
                <l-marker :lat-lng="[myPosition.latitude, myPosition.longitude]">
                  <l-icon :iconSize="[30, 42]" :iconAnchor="[15, 42]" className="custom-div-icon"><div class="marker-pin"></div><ion-icon :name="currentDynamic.role == 1 ? 'car' : 'walk'"></ion-icon></l-icon>
                </l-marker>
                <l-marker v-if="currentAsk.user && currentAsk.user.position" :lat-lng="[currentAsk.user.position.latitude, currentAsk.user.position.longitude]">
                  <l-icon :iconSize="[30, 42]" :iconAnchor="[15, 42]" className="custom-div-icon"><div class="marker-pin"></div><ion-icon :name="currentDynamic.role == 1 ? 'walk' : 'car'"></ion-icon></l-icon>
                </l-marker>
                <l-marker :lat-lng="[destination.latitude, destination.longitude]">
                  <l-icon :iconSize="[30, 42]" :iconAnchor="[15, 42]" className="custom-div-icon"><div class="marker-pin"></div><ion-icon name="locate"></ion-icon></l-icon>
                </l-marker>
              </l-map>
            </div>

            <!-- CurrentDynamic -->
            <ion-card class="dynamic-card" v-if="currentDynamic['@id']">
              <ion-card-content>
                <!--<div class="text-right muted" ><small>{{currentDynamic['@id']}}</small></div>-->
                <div v-if="destination" class="d-flex align-center"><ion-icon name="flag"></ion-icon> {{this.destination.displayLabel[0]}}</div>
                <div class="" ><small>{{currentDynamic.role == 1 ? 'Conducteur' : 'Passager'}}</small></div>
                <div v-if="currentDynamic.comment" ><small>Commentaire : {{currentDynamic.comment}}</small></div>
                <div v-if="currentDynamic.destination"><b>Arrivé</b></div>
              </ion-card-content>
            </ion-card>

            <!-- CurrentAsk -->
            <ion-card class="dynamic-card" v-if="currentAsk.id">
              <ion-card-content>
                <!--<div class="text-right"><small>{{currentAsk.id}}</small></div>-->
                <div v-if="currentAsk.user" class="text-center"><b>{{currentAsk.user.givenName}} {{currentAsk.user.shortFamilyName}}</b></div>
                <div v-if="currentAsk.user && currentAsk.user.telephone" class="text-center" ><a  :href="'tel:' + currentAsk.user.telephone">{{currentAsk.user.telephone}}</a></div>
                <div v-if="currentAsk.status == 1" class="text-center">Covoiturage Demandé</div>
                <div v-if="currentAsk.status == 2" class="text-center">Covoiturage Accepté</div>
                <div v-if="currentAsk.message" class="text-center">{{currentAsk.message}}</div>
                <div v-if="currentAsk.messages"><div class="text-center" v-for="message in currentAsk.messages">{{message.text}}</div></div>


                <ion-button class="mc-dynamic-button" expand="block" v-if="!currentProof.id && currentDynamic.role === 1 && this.currentAsk.user.position && this.currentAsk.user.position.latitude && this.currentAsk.user.position.latitude" @click="launchNavigation()">
                  <ion-icon slot="start" name="navigate"></ion-icon>
                  Ouvrir le GPS
                </ion-button>

                <div v-if="currentProof.id" class="text-center">
                  <ion-icon name="checkmark"></ion-icon> Preuve déposée <span class="muted"><!--<small style="margin-left: 5px">{{currentProof.id}}</small>--></span>
                </div>
                <ion-button class="mc-dynamic-button" expand="block" v-if="!currentProof.id && currentDynamic.role === 1" @click="postDynamicProof()">Mon passager monte dans le véhicule</ion-button>
                <ion-button class="mc-dynamic-button" expand="block" v-if="currentProof.id && currentDynamic.role === 1" @click="putDynamicProof()">Mon passager descend du véhicule</ion-button>
                <div v-if="currentAsk.proof">
                  <!--<div class="text-right muted"><small>{{currentAsk.proof.id}}</small></div>-->
                  <!--<div>ProofStatus : {{currentAsk.proof.needed}}</div>-->
                  <ion-button class="mc-dynamic-button" expand="block" v-if="!currentProof.id && currentAsk.proof.needed == 'pickUp' && currentDynamic.role === 2" @click="postDynamicProof()">Je monte dans le véhicule</ion-button>
                  <ion-button class="mc-dynamic-button" expand="block" v-if="currentAsk.proof.needed == 'dropOff' && currentDynamic.role === 2" @click="putDynamicProof()">Je descend du véhicule</ion-button>
                </div>


              </ion-card-content>
            </ion-card>


            <div v-if="!currentAsk.id && currentDynamic.role === 2 && currentDynamic.results">
              <div v-if="currentDynamic.results.length === 0" class="ion-text-center no-results">
                <small>{{$t('Dynamic.no-results')}}</small>
              </div>
              <ion-card class="dynamic-card" v-for="(result, index) in currentDynamic.results">
                <ion-card-content>
                  <div>
                    <div>{{result.carpooler.givenName}} {{result.carpooler.shortFamilyName}}</div>
                    <div v-if="result.carpooler.phone">{{result.carpooler.phone}}</div>
                    <div class="d-flex align-center"><ion-icon name="flag"></ion-icon> {{result.resultPassenger.outward.destination.addressLocality}}</div>
                  </div>
                  <ion-button class="mc-dynamic-button" expand="block" @click="postDynamicAskAlert(result.resultPassenger.outward.matchingId)">Covoiturer</ion-button>
                </ion-card-content>
              </ion-card>
            </div>

            <div v-if="!currentAsk.id && currentDynamic.role === 1 && currentDynamic.asks">
              <div v-if="currentDynamic.asks.length === 0" class="ion-text-center no-results">
                <small>{{$t('Dynamic.no-results')}}</small>
                <ion-button class="mc-dynamic-button mt-5 search-button" fill="outline" expand="block" @click="goToSearchPage()">Voir les résultats de recherche classiques</ion-button>
              </div>
              <ion-card  class="dynamic-card" v-for="(result, index) in currentDynamic.asks" :data-speech="launchSpeech(result.id)">
                <ion-card-content>
                  <div>
                    <div>{{result.user.givenName}} {{result.user.shortFamilyName}}</div>
                    <div v-if="result.user.phone">{{result.user.phone}}</div>
                    <div v-if="result.messages"><div  class="text-center" v-for="message in result.messages">{{message.text}}</div></div>
                    <div><ion-icon name="locate"></ion-icon> {{result.user.position.displayLabel[0]}}</div>
                  </div>
                  <ion-button class="mc-dynamic-button"  expand="block" @click="putDynamicAsks(result.id, '')">Accepter</ion-button>
                </ion-card-content>
              </ion-card>
            </div>
          </div>

          <!-- Close -->
          <ion-button class='mc-big-button' color="danger" expand="block" @click="closeDynamics()">
            {{ $t('Dynamic.close') }}
          </ion-button>
        </div>

        <!-- Debug Tools -->
        <!--
        <hr>
        <div class="text-center">Debug</div>
        <br>

        <ion-button class='mc-big-button' color="primary" expand="block" @click="startBackgroundGeolocation()">
          Start geolocation
        </ion-button>

        <ion-button class='mc-big-button' color="warning" expand="block" @click="stopBackgroundGeolocation()">
          Stop geolocation
        </ion-button>
        -->

      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">

  .dynamic-map {
    height: 300px;
    width: 300px;
    border-radius: 150px;
    margin-bottom: 10px;
    position: relative;
    overflow: auto;
    margin : auto;
    margin-bottom: 20px;
  }
  .dynamic-form ion-radio {
    margin-right: 10px;
  }

  .dynamic-card {
    margin-top: 0px;
    margin-right: 0px;
    margin-left: 0px;
    margin-bottom: 20px;
  }

  /*
  .marker-pin {
    width: 30px;
    height: 30px;
    border-radius: 50% 50% 50% 0;
    background: var(--ion-color-primary);
    position: absolute;
    transform: rotate(-45deg);
    left: 50%;
    top: 50%;
    margin: -15px 0 0 -15px;
  }
  // to draw white circle
  .marker-pin::after {
    content: '';
    width: 24px;
    height: 24px;
    margin: 3px 0 0 3px;
    background: #fff;
    position: absolute;
    border-radius: 50%;
  }
  // to align icon
  .custom-div-icon i {
    position: absolute;
    width: 22px;
    font-size: 22px;
    left: 0;
    right: 0;
    margin: 10px auto;
    text-align: center;

  }

  .custom-div-icon ion-icon {
    font-size: 24px;
    margin-left: 3px;
    margin-top: 9px;
    position: relative;
  }
   */

  .muted {
    color: lightgrey;
  }

  .no-results {
    color: #666;
    margin-bottom: 20px;
    line-height: 15px;
  }

  .mt-5 {
    margin-top: 5px;
  }

  .mc-dynamic-button {
    white-space: initial;
    font-weight: 700;
    --border-radius: 33px!important;
  }

</style>

<script>
  import {toast} from "../../Shared/Mixin/toast.mixin";
  import {speech} from "../../Shared/Mixin/speech.mixin";
  // import { BackgroundGeolocation } from '@mauron85/cordova-plugin-background-geolocation';
  import { LMap, LTileLayer, LPolyline, LMarker, LIcon } from "vue2-leaflet";
  import { BackgroundGeolocation, BackgroundGeolocationEvents } from '@ionic-native/background-geolocation';
  import { OpenNativeSettings } from '@ionic-native/open-native-settings';
  import { Plugins } from '@capacitor/core';
  import {isPlatform} from "@ionic/core";
  const { Geolocation } = Plugins;
  const { Permissions } = Plugins;
  const { LocalNotifications } = Plugins;



  export default {
    name: 'dynamic',
    data () {
      return {
        vocalPlugin: JSON.parse(process.env.VUE_APP_VOCAL),
        vocal: false,
        vocalProposal: [],
        map: {
          url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          zoom: 8,
          showCard: true,
          optionsCard: {
            dragging: !isPlatform(window.document.defaultView, "mobile"),
            touchZoom: isPlatform(window.document.defaultView, "mobile"),
            tap: !isPlatform(window.document.defaultView, "mobile"),
            zoomControl: false
          }
        },
      }
    },
    components: {
      LMap,
      LTileLayer,
      LPolyline,
      LMarker,
      LIcon
    },
    computed : {
      bounds() {
        if (this.state == 2 && this.destination) {
          const bounds = new L.LatLngBounds([[this.myPosition.latitude, this.myPosition.longitude], [this.destination.latitude, this.destination.longitude]]);
          if (!!this.$refs.dynamicMap) this.$refs.dynamicMap.mapObject.invalidateSize();
          return bounds;
        } else {
          return null;
        }
      },
      updatePositionInterval() {
        return this.$store.state.dynamicStore.updatePositionInterval
      },
      state() {
        return this.$store.state.dynamicStore.state
      },
      myPosition() {
        return this.$store.state.dynamicStore.myPosition;
      },
      destination() {
        return this.$store.state.dynamicStore.destination;
      },
      currentDynamic() {
        return this.$store.state.dynamicStore.currentDynamic
      },
      currentAsk() {
        return this.$store.state.dynamicStore.currentAsk
      },
      currentProof() {
        return this.$store.state.dynamicStore.currentProof
      },
      asksLength() {
        return this.$store.state.dynamicStore.asksLength
      }
    },
    mixins: [toast, speech],
    props : [],
    created() {
      if (this.state == 1) {
        this.$store.commit('reset_current_dynamic')
      }
      this.$store.dispatch('getActiveDynamic').then( res => {
        if(res.data['hydra:member'].length > 0) {
          this.setActiveDynamic()
        }
      });
    },
    methods: {
      goGeoSearch(type, action) {
        this.$router.push({ name: "geoSearch", query: { type, action } });
      },
      async setActiveDynamic() {
        this.presentToast("Un covoiturage dynamique est déjà actif, Veuillez le fermer si vous souhaitez renseigner une nouvelle destination", "secondary");

        const p = await Permissions.query({name: "geolocation"});
        if (p.state == "granted" || p.state == "prompt") {
          const coordinates = await Geolocation.getCurrentPosition().catch(error => {
            console.log(error);
            this.presentGpsToast('Commons.gps-activation');
          });
          this.$store.commit('set_dynamic_my_position', {latitude: coordinates.coords.latitude.toString(), longitude: coordinates.coords.longitude.toString()});
          this.startBackgroundGeolocation();
        } else if (p.state == "denied") {
          this.presentGpsToast('Commons.gps-permission');
        }
      },
      async launchDynamic() {
        const p = await Permissions.query({name: "geolocation"})
        if (p.state == "granted" || p.state == "prompt") {
          const coordinates = await Geolocation.getCurrentPosition().catch(error => {
            console.log(error);
            this.presentGpsToast('Commons.gps-activation');
          });
          this.$store.commit('set_dynamic_my_position', {latitude: coordinates.coords.latitude.toString(), longitude: coordinates.coords.longitude.toString()});
          this.$store.commit('set_dynamic_destination', this.$store.state.searchStore.searchObject.outwardWaypoints[1]);
          console.log(this.destination);
          this.currentDynamic.waypoints = [{latitude: this.myPosition.latitude, longitude: this.myPosition.longitude}, { latitude: this.destination.latitude, longitude: this.destination.longitude}];

          this.$store.dispatch('launchDynamics').then( () => {
            console.log(this.currentDynamic);
            this.startBackgroundGeolocation();
          });
        } else if (p.state == "denied") {
          this.presentGpsToast('Commons.gps-permission');
        }

      },
      async presentGpsToast(text) {
        const toast = await this.$ionic.toastController.create({
          message: this.$t(text),
          duration: 5000,
          showCloseButton: false,
          position: 'top',
          color: 'danger',
          buttons: [
            {
              text: 'Paramètres',
              handler: () => {
                OpenNativeSettings.open('location');
              }
            }
          ]
        });
        toast.present();
      },
      updateDynamics(result, body) {
        return this.$store.dispatch('putDynamics', {
          id : !!this.currentDynamic['@id'] ? this.currentDynamic['@id'].replace('/dynamics/','') : this.currentDynamic['@id'],
          body : body,
          result : result
        })
      },
      closeDynamics() {
        this.updateDynamics('reset_current_dynamic',{
          "latitude": this.myPosition.latitude,
          "longitude": this.myPosition.longitude,
          "finished": true
        }).then(() => {
          this.stopBackgroundGeolocation();
        }).catch(() => {
          this.$store.commit('reset_current_dynamic');
          this.stopBackgroundGeolocation();
        })
      },
      updatePosition() {
        this.updateDynamics('update_position',{
          "latitude": this.myPosition.latitude,
          "longitude": this.myPosition.longitude
        }).then(() => {
          if( this.currentDynamic.notification) {
            this.sendLocalNotification()
          }
        });
      },
      postDynamicAskAlert(matchingId) {
        return this.$ionic.alertController
          .create({
            header: "Demande de covoiturage",
            inputs: [
              {
                name: "message",
                id: "message",
                placeholder: "message"
              }
            ],
            buttons: [
              {
                text: 'Annuler',
                role: "cancel",
                cssClass: "secondary",
              },
              {
                text: 'Demander',
                handler: data => {
                  this.postDynamicAsks(matchingId, data.message)
                }
              }
            ]
          })
          .then(a => a.present());
      },
      postDynamicAsks(matchingId, message) {
        this.$store.dispatch('postDynamicAsks', {
          "matchingId": matchingId,
          "message": message
        });
      },
      putDynamicAsks(askId, message) {
        this.$store.dispatch('putDynamicAsks', {
          "askId" : askId,
          "status": 2,
          "message": message
        });
      },
      postDynamicProof() {
        this.$store.dispatch('postDynamicProofs', {
          "latitude": this.myPosition.latitude,
          "longitude": this.myPosition.longitude,
          "dynamicAskId": this.currentAsk.id
        });
      },
      putDynamicProof() {
        this.$store.dispatch('putDynamicProofs', {
          "proofId": this.currentProof.id,
          "latitude": this.myPosition.latitude,
          "longitude": this.myPosition.longitude,
        }).then(() => {
          if (this.currentDynamic.role == 2) {
            this.presentToast("Vous avez terminé votre covoiturage", "success");
            this.stopBackgroundGeolocation();
          }
        });;
      },
      startBackgroundGeolocation() {
        const config = {
          desiredAccuracy: 10,
          stationaryRadius: 1, // 20
          distanceFilter: 1, // 30
          interval: 15000,
          notificationTitle: 'Covoiturage Dynamique',
          notificationText: 'Activé',
          debug: false, //  enable this hear sounds for background-geolocation life-cycle.
          stopOnTerminate: false, // enable this to clear background location settings when the app terminates
        };

        BackgroundGeolocation.configure(config)
          .then(() => {

            BackgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location) => {
              console.log(location);

              this.$store.commit('set_dynamic_my_position', {latitude: location.latitude.toString(), longitude: location.longitude.toString() });

              this.updatePosition();



              // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
              // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
              // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
              BackgroundGeolocation.finish(); // FOR IOS ONLY
            });

          });

        if(this.updatePositionInterval) {
          clearInterval(this.updatePositionInterval);
        }
        this.updatePositionInterval = setInterval(() => {
          this.updatePosition();
        }, 15000);

        // start recording location
        BackgroundGeolocation.start();
      },
      stopBackgroundGeolocation() {
        BackgroundGeolocation.removeAllListeners();
        BackgroundGeolocation.stop();
        if(this.updatePositionInterval) {
          clearInterval(this.updatePositionInterval);
        }
      },
      async sendLocalNotification() {
        const notifs = await LocalNotifications.schedule({
          notifications: [
            {
              title: "Covoiturage Dynamique",
              body: this.currentDynamic.role == 1 ? "Vous avez reçu une demande de covoiturage" : "Votre covoiturage est accepté",
              id: 1,
              schedule: { at: new Date(Date.now() + 1000) },
              sound: null,
              attachments: null,
              actionTypeId: "",
              extra: null
            }
          ]
        });
      },
      goToSearchPage() {
        this.$router.push({ name: "search", params: {filters: null} });
      },
      launchNavigation() {
        let prefix;
        if (isPlatform(window.document.defaultView, "ios")) {
          window.open("http://maps.apple.com/?saddr=Current%20Location&daddr=" + this.currentAsk.user.position.latitude + "," + this.currentAsk.user.position.longitude , '_system');
        } else if (isPlatform(window.document.defaultView, "android")) {
          window.open("google.navigation:q=" + this.currentAsk.user.position.latitude + "," + this.currentAsk.user.position.longitude + "&mode=d" , '_system');
        }

        //window.open(prefix + ":" + this.currentAsk.user.position.latitude + "," + this.currentAsk.user.position.longitude , '_system');
        /*
          const options = {
            appSelection : {
              dialogHeaderText: 'Lancez la navigation',
              cancelButtonText: 'Annuler',
              rememberChoice : {
                enabled : false,
                prompt : {
                  headerText: 'Retenir votre choix ?',
                  bodyText: 'Utiliser la même application la prochaine fois ?',
                  yesButtonText: 'Oui',
                  noButtonText: 'Non'
                }
              }
            },
          };
          launchnavigator.navigate([this.currentAsk.position.latitude, this.currentAsk.position.longitude], options)
            .then(
              success => console.log('Launched navigator'),
              error => console.log('Error launching navigator', error)
            );
         */
        },
        launchSpeech(dynamicAskId) {
          if (this.vocal) {
            const f = this.vocalProposal.find(item => item === dynamicAskId);
            if (!f) {
              this.vocalProposal.push(dynamicAskId);
            const speechSentence = {
              phrase : 'Un nouveau covoiturage est proposé. Souhaitez-vous l\'accepter ?',
              results : [
                {
                  matchings : ['oui'],
                  phrase : 'Vous avez accepté le covoiturage.',
                  callback : () => {
                    this.putDynamicAsks(dynamicAskId, '')
                  }
                },
                {
                  matchings : ['refuser', 'non'],
                  phrase : 'Vous avez refusé le covoiturage.',
                  callback : () => {

                  }
                }
              ]
            };

            this.startSpeechRecognition(speechSentence);
            }
          }
        },
      setVocal(event) {
        this.vocal = event;
        if (this.vocal) {
          this.requestSpeechRecognitionPermission(false);
        }
      }
    }
  }
</script>
