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
import { Plugins } from "@capacitor/core";
const { SpeechRecognition } = Plugins;
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import {toast} from "./toast.mixin";


/*
  Speech : {
    phrase : string
    results : [
      {
        matchings : string
        phrase : string
        callback: ()
      }
    ]
  }
 */
export const speech = {
  data () {
    return {
      speechSentence: null,
      activatedSpeechRecognition: false,
      speechRecognitionListener: null,
      stopSpeechRecognitionListener: null
    }
  },
  methods: {
    startSpeechRecognition(speechSentence) {
      this.speechSentence = speechSentence;
      SpeechRecognition.hasPermission().then(permission => {
        if(permission.permission) {
          this.activateSpeechRecognition();
        } else {
          this.requestSpeechRecognitionPermission(true);
        }
      }).catch(() => {
        this.requestSpeechRecognitionPermission(true)
      })
    },
    requestSpeechRecognitionPermission(launch) {
      SpeechRecognition.requestPermission().then(() => {
        if (launch) {
          this.activateSpeechRecognition();
        }
      }).catch(() => {

      });
    },
    activateSpeechRecognition() {
      this.activatedSpeechRecognition = true;
      this.speak(this.speechSentence.phrase);
      this.speechRecognitionListener = SpeechRecognition.addListener('speech-recognition-result', (res) => {
        if (this.speechSentence.results) {
          this.speechSentence.results.forEach(item => {
            if (item.matchings.some(match => res.matches[0].toLowerCase().includes(match))) {
              this.speak(item.phrase);
              item.callback();
              this.stopSpeechRecognition();
            }
          })
        }
      });
      this.stopSpeechRecognitionListener = SpeechRecognition.addListener('speech-recognition-stopped', () => {
        this.stopSpeechRecognition()
      });
      SpeechRecognition.start({
        language: "fr-FR",
        maxResults: 1000,
        prompt: "Parlez",
        partialResults: true,
        popup: false,
      }).then(res => {

      }).catch(() => {
        this.stopSpeechRecognition()
      });
    },
    stopSpeechRecognition() {
      this.activatedSpeechRecognition = false;
      if (this.speechRecognitionListener) {
        this.speechRecognitionListener.remove();
      }
      if (this.stopSpeechRecognitionListener) {
        this.stopSpeechRecognitionListener.remove();
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
};
