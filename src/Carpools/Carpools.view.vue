<template>
  <ion-vue-router />
</template>

<script>
  import {Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed } from '@capacitor/core';
  const { PushNotifications } = Plugins;

export default {
  name: "carpools",
  data() {
    return {};
  },
  created() {


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
};
</script>
