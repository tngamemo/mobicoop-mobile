<template>
  <div class="ion-page">
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="home"></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center">{{ $t('Dynamic.title') }} </h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" no-bounce>
      <div class="mc-white-container" >

        <div class="ion-text-center" v-if="$store.state.dynamicStore.status == 'loading' || $store.state.dynamicStore.statusAsk == 'loading'" >
          <ion-icon size="large" color="primary" class="rotating"  name="md-sync"></ion-icon>
        </div>

        <!-- State 1 : Je choisi mon role -->
        <div class="dynamic-form" v-if="state == 1">
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
          <ion-item>
            <ion-label position="floating">{{$t('Dynamic.comment')}}</ion-label>
            <ion-textarea rows="2" cols="12"
                          :value="currentDynamic.comment"
                          @ionInput="currentDynamic.comment = $event.target.value">
            </ion-textarea>
          </ion-item>
          <br>
          <ion-button class='mc-big-button' color="success" expand="block" @click="launchDynamic()">
            {{ $t('Dynamic.launch') }}
          </ion-button>
        </div>

        <!-- State 2  -->
        <div v-if="state == 2">

          <ion-card v-if="currentDynamic['@id']">
            <ion-card-content>
              <div class="text-center" >Current Dynamic : {{currentDynamic['@id']}}</div>
              <div v-if="currentDynamic.comment" class="text-center" ><small>{{currentDynamic.comment}}</small></div>
            </ion-card-content>
          </ion-card>

          <ion-card v-if="currentAsk.id">
            <ion-card-content>
              <div class="text-center">Current Ask : {{currentAsk.id}}</div>
            </ion-card-content>
          </ion-card>


          <div v-if="!currentAsk.id && currentDynamic.role === 2 && currentDynamic.results && currentDynamic.results.length > 0">
            <ion-card v-for="(result, index) in currentDynamic.results">
              <ion-card-content class="d-flex justify-between">
                <div>
                  {{result.carpooler.givenName}} {{result.carpooler.shortFamilyName}} <br>
                  <ion-icon name="flag"></ion-icon> {{result.resultPassenger.outward.destination.displayLabel[0]}}
                </div>
              <ion-button @click="postDynamicAskAlert(result.resultPassenger.outward.matchingId)">Covoiturer</ion-button>
              </ion-card-content>
            </ion-card>
          </div>

          <div v-if="!currentAsk.id && currentDynamic.role === 1 && currentDynamic.asks && currentDynamic.asks.length > 0">
            <ion-card v-for="(result, index) in currentDynamic.asks">
              <ion-card-content class="d-flex justify-between">
                <div>
                  {{result.user.givenName}} {{result.user.shortFamilyName}}<br>
                  <ion-icon name="locate"></ion-icon> {{result.user.position.displayLabel[0]}}
                </div>
              <ion-button @click="putDynamicAsks(result.id, '')">Accepter</ion-button>
              </ion-card-content>
            </ion-card>
          </div>
        </div>

        <ion-button class='mc-big-button' color="danger" expand="block" @click="closeDynamics()">
          {{ $t('Dynamic.close') }}
        </ion-button>

        <ion-button class='mc-big-button' color="primary" expand="block" @click="startBackgroundGeolocation()">
          Start geolocation
        </ion-button>

        <ion-button class='mc-big-button' color="warning" expand="block" @click="stopBackgroundGeolocation()">
          Stop geolocation
        </ion-button>

      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
.dynamic-form ion-radio {
  margin-right: 10px;
}

</style>

<script>
  import {toast} from "../../Shared/Mixin/toast.mixin";
  // import { BackgroundGeolocation } from '@mauron85/cordova-plugin-background-geolocation';
  import { BackgroundGeolocation, BackgroundGeolocationEvents } from '@ionic-native/background-geolocation';



  export default {
    name: 'dynamic',
    data () {
      return {

      }
    },
    computed : {
      state() {
        return this.$store.state.dynamicStore.state
      },
      currentDynamic() {
        return this.$store.state.dynamicStore.currentDynamic
      },
      currentAsk() {
        return this.$store.state.dynamicStore.currentAsk
      }
    },
    mixins: [toast],
    props : [],
    created() {
      if (this.state == 1) {
        this.$store.commit('reset_current_dynamic')
      }
    },
    methods: {
      launchDynamic() {
        this.$store.dispatch('launchDynamics').then( () => {
          console.log(this.currentDynamic);
        });
      },
      updateDynamics(result, body) {
        this.$store.dispatch('putDynamics', {
          id : this.currentDynamic['@id'].replace('/dynamics/',''),
          body : body,
          result : result
        }).then( () => {
          console.log(this.currentDynamic);
        });
      },
      closeDynamics() {
        this.updateDynamics('reset_current_dynamic',{
          "latitude": "48.741958",
          "longitude": "7.086686",
          "finished": true
        }).then(() => {
          this.stopBackgroundGeolocation();
        });
      },
      updatePosition(lat, lng) {
        this.updateDynamics('update_position',{
          "latitude": lat.toString(),
          "longitude": lng.toString()
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
          "status": 2,
          "message": message
        });
      },
      startBackgroundGeolocation() {
        const config = {
          desiredAccuracy: 10,
          stationaryRadius: 1, // 20
          distanceFilter: 1, // 30
          interval: 15000,
          debug: true, //  enable this hear sounds for background-geolocation life-cycle.
          stopOnTerminate: false, // enable this to clear background location settings when the app terminates
        };

        BackgroundGeolocation.configure(config)
          .then(() => {

            BackgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location) => {
              console.log(location);

              this.updatePosition(location.latitude, location.longitude);

              // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
              // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
              // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
              BackgroundGeolocation.finish(); // FOR IOS ONLY
            });

          });

        // start recording location
        BackgroundGeolocation.start();
      },
      stopBackgroundGeolocation() {
        BackgroundGeolocation.stop();
      }
    }
  }
</script>
