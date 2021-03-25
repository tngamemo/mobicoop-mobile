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
        <h1 class="ion-text-center">Speech Test</h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" no-bounce>
      <div class="mc-white-container" >

        <ion-button expand="block" :color="activated ? 'success' : 'primary'" @click="start()">Start</ion-button>
        <br>
        <ion-button expand="block" color="danger" @click="stopSpeechRecognition()">Stop</ion-button>
        <br>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">

</style>

<script>
  import {toast} from "../../Shared/Mixin/toast.mixin";
  import {speech} from "../../Shared/Mixin/speech.mixin";

  export default {
    name: 'speech',
    data () {
      return {

      }
    },
    mixins: [toast, speech],
    created() {

    },
    methods: {
      start() {
        const speechSentence = {
          phrase : 'Un nouveau covoiturage est proposé. Que souhaitez vous faire ?',
          results : [
            {
              matching : 'accepter',
              phrase : 'Vous avez accepté le covoiturage.',
              callback : () => {
                this.presentToast('Vous avez bien accepté le covoiturage.', 'success')
              }
            },
            {
              matching : 'refuser',
              phrase : 'Vous avez refusé le covoiturage.',
              callback : () => {
                this.presentToast('Vous avez bien refusé le covoiturage.', 'danger')
              }
            }
          ]
        };

        this.startSpeechRecognition(speechSentence);
      }
    }
  }
</script>
