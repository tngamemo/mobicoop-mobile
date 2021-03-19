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
        <ion-button expand="block" color="danger" @click="stop()">Stop</ion-button>
        <br>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">

</style>

<script>
  import {toast} from "../../Shared/Mixin/toast.mixin";
  import { Plugins } from "@capacitor/core";
  const { SpeechRecognition } = Plugins;
  import { TextToSpeech } from '@capacitor-community/text-to-speech';

  export default {
    name: 'speech',
    data () {
      return {
        activated: false,
        recognitionListener: null,
        stopRecognitionListener: null
      }
    },
    mixins: [toast],
    created() {
      this.activated = false;
    },
    methods: {
      start() {
        SpeechRecognition.hasPermission().then(permission => {
          if(permission.permission) {
            this.startRecognition();
          } else {
            this.requestPermission();
          }
        }).catch(() => {
          this.requestPermission()
        })
      },
      requestPermission() {
        SpeechRecognition.requestPermission().then(() => {
          this.startRecognition();
        }).catch(() => {

        });
      },
      startRecognition() {
        this.activated = true;
        this.speak('Un nouveau covoiturage est proposé. Que souhaitez vous faire ?');
        this.recognitionListener = SpeechRecognition.addListener('speech-recognition-result', (res) => {
          if (res.matches[0].toLowerCase().includes("accepter")) {
            this.speak('Vous avez accepté le covoiturage.');
            this.presentToast("Vous avez accepté le covoiturage", "success");
            this.stop();
          }
          if (res.matches[0].toLowerCase().includes("refuser")) {
            this.speak('Vous avez refusé le covoiturage.');
            this.presentToast("Vous avez refusé le covoiturage", "danger");
            this.stop();
          }
        });
        this.stopRecognitionListener = SpeechRecognition.addListener('speech-recognition-stopped', () => {
          this.stop()
        })
        SpeechRecognition.start({
          language: "fr-FR",
          maxResults: 1000,
          prompt: "Parlez",
          partialResults: true,
          popup: false,
        }).then(res => {

        }).catch(() => {
          this.stop()
        });
      },
      stop() {
        this.activated = false;
        if (this.recognitionListener) {
          this.recognitionListener.remove();
        }
        if (this.stopRecognitionListener) {
          this.stopRecognitionListener.remove();
        }
        SpeechRecognition.stop();
      },
      async speak(text) {
        await TextToSpeech.speak({
          text: text,
          lang: 'fr_FR',
          rate: 1.0,
          pitch: 1.0,
          volume: 1.0,
          category: 'ambient',
        });
      }
    }
  }
</script>
