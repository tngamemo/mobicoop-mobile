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

        <ion-button @click="start()">Start</ion-button>
        <br>
        <ion-button @click="stop()">Stop</ion-button>
        <br>
        <div v-if="activated">Activé</div>
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

  export default {
    name: 'speech',
    data () {
      return {
        activated
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
        SpeechRecognition.start({
          language: "fr-FR",
          maxResults: 1000,
          prompt: "Parlez",
          partialResults: true,
          popup: true,
        }).then(res => {
          console.log(res);
          console.log(res.matches[0].toLowerCase());
          console.log(res.matches[0].toLowerCase().includes("accepter"));
          if (res.matches[0].toLowerCase().includes("accepter")) {
            this.presentToast("Accepter", "success");
            this.stop();
          }
          if (res.matches[0].toLowerCase().includes("refuser")) {
            this.presentToast("Refuser", "danger");
            this.stop();
          }
        }).catch(() => {
          console.log('catch');
          this.activated = false;
        });
      },
      stop() {
        this.activated = false;
        SpeechRecognition.stop();
      },
    }
  }
</script>
