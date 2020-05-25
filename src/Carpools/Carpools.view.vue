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
  <ion-vue-router />
</template>

<script>
  import {Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed } from '@capacitor/core';
  import {isPlatform} from "@ionic/core";
  const { PushNotifications } = Plugins;

export default {
  name: "carpools",
  data() {
    return {};
  },
  created() {

    if(isPlatform(window.document.defaultView, "capacitor")) {
      // On success, we should be able to receive notifications
      PushNotifications.addListener('registration',
        (token) => {
          console.log('Push registration success, token: ' + token.value);
          this.$store.dispatch('postPushToken', token.value)
        }
      );

      // Some issue with our setup and push will not work
      PushNotifications.addListener('registrationError',
        (error) => {
          console.log('Error on registration: ' + JSON.stringify(error));
        }
      );

      // Show us the notification payload if the app is open on our device
      PushNotifications.addListener('pushNotificationReceived',
        (notification) => {
          console.log('Push received: ' + JSON.stringify(notification));
        }
      );

      // Method called when tapping on a notification
      PushNotifications.addListener('pushNotificationActionPerformed',
        (notification) => {
          console.log('Push action performed: ' + JSON.stringify(notification));
        }
      );
    }
  }
};
</script>
