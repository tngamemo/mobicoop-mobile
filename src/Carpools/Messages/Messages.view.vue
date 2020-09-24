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
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center">{{ $t('Messages.title') }}</h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" no-bounce>
      <div class="mc-white-container mc-white-container-no-padding">
        <div class="d-flex justify-between top-buttons-padding mc-messages-type-selector">
          <ion-button
            class="mc-small-button"
            color="primary"
            :fill="direct ? 'outline' : 'solid'"
            @click="direct = false"
          >
            <ion-icon name="car"></ion-icon>
            <span class="ion-margin-start">{{ $t('Messages.carpool') }}</span>
          </ion-button>
          <ion-button
            class="mc-small-button"
            color="primary"
            :fill="direct ? 'solid' : 'outline'"
            @click="direct = true"
          >
            <ion-icon name="chatbubbles"></ion-icon>
            <span class="ion-margin-start">{{ $t('Messages.direct') }}</span>
          </ion-button>
        </div>
        <hr style="margin-bottom: 0px" />

        <div
          class="ion-text-center ion-margin-top"
          v-if="direct ?  $store.state.messageStore.statusMessagesDirect == 'loading' : $store.state.messageStore.statusMessagesCarpool == 'loading'"
        >
          <ion-icon size="large" color="primary" class="rotating" name="md-sync"></ion-icon>
        </div>

        <div
          class="ion-text-center ion-margin-top"
          v-if="direct ?  $store.state.messageStore.statusMessagesDirect == 'error' : $store.state.messageStore.statusMessagesCarpool == 'error'"
        >{{ $t('Messages.error')}}</div>

        <div
          class="ion-text-center ion-margin-top"
          v-if="(direct ?  $store.state.messageStore.statusMessagesDirect == 'success' : $store.state.messageStore.statusMessagesCarpool == 'success') && messages.length == 0"
        >{{ $t('Messages.none')}}</div>

        <ion-list
          v-if="direct ?  $store.state.messageStore.statusMessagesDirect == 'success' : $store.state.messageStore.statusMessagesCarpool == 'success'"
        >
          <ion-item-sliding v-for="message in messages" :key="message.id">
            <ion-item class="message-list" @click="goToMessage(message)">
              <ion-avatar class="ion-margin-end ion-margin-start avatar">
                <img v-if="message.avatarsRecipient" v-bind:src="message.avatarsRecipient" alt="" />
                <img v-if="!message.avatarsRecipient" src="/assets/user.png" alt="" />
              </ion-avatar>
              <ion-label>
                <p class="message-name d-flex align-center">
                  <img class="c-icon mr-5" v-if="message.blockerId" style="visibility: visible" src="/assets/account-cancel.png"/><b>{{message.givenName}} {{message.shortFamilyName}}</b>
                </p>
                <p
                  v-if="message.carpoolInfos"
                >{{message.carpoolInfos.origin}} → {{message.carpoolInfos.destination}}</p>
                <p v-if="message.carpoolInfos"> {{message.carpoolInfos.criteria.fromDate | moment('ddd D MMMM')}} <span v-if="message.carpoolInfos.criteria.fromTime">{{message.carpoolInfos.criteria.fromTime | moment('utc') | moment(' à HH[h]mm')}}</span></p>
                <p v-if="!message.carpoolInfos">{{message.date | moment('ddd D MMMM à HH[h]mm')}}</p>
              </ion-label>
            </ion-item>
            <!--
            <ion-item-options side="end">
              <ion-item-option color="danger" @click="deleteThreadAlertConfirm(message.idMessage)">{{$t('Commons.delete')}}</ion-item-option>
            </ion-item-options>
            -->
          </ion-item-sliding>
        </ion-list>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">

  .mr-5 {
    margin-right : 5px;
  }

.mc-messages-type-selector {
  @media screen and (max-width: 320px) {
    flex-wrap: wrap;
    justify-content: center;
  }
}
.top-buttons-padding {
  padding-right: 30px;
  padding-left: 30px;
}
.message-list {
  color: var(--ion-color-primary);
}
.message-name {
  font-size: 16px !important;
}

.avatar {
  width: 60px;
  height: 60px;
  background-color: #c4c4c4;
}
</style>

<script>
export default {
  name: "messages",
  data() {
    return {
      direct: false
    };
  },
  computed: {
    messages: {
      get() {
        return this.direct
          ? this.$store.state.messageStore.messagesDirect
          : this.$store.state.messageStore.messagesCarpool;
      }
    }
  },
  created() {
    this.$store.dispatch(
      "getAllMessagesCarpool",
      this.$store.state.userStore.user.id
    );
    this.$store.dispatch(
      "getAllMessagesDirect",
      this.$store.state.userStore.user.id
    );
  },
  methods: {
    goToMessage(message) {
      this.$router.push({
        name: "message",
        params: {
          idAsk: message.idAsk ? message.idAsk : -99,
          idRecipient: message.idRecipient
        }
      });
    },
    deleteThreadAlertConfirm(messageId) {
      return this.$ionic.alertController
        .create({
          header: this.$t("Messages.confirmDeleteHeader"),
          message: this.$t("Messages.confirmDeleteText"),
          buttons: [
            {
              text: this.$t("Commons.cancel"),
              role: "cancel",
              cssClass: "secondary"
            },
            {
              text: this.$t("Commons.confirm"),
              handler: () => {
                this.deleteThread(messageId);
              }
            }
          ]
        })
        .then(a => a.present());
    },
    deleteThread(messageId) {
      this.$store
        .dispatch("deleteThread", messageId)
        .then(res => {
          this.presentToast(this.$t("Message.delete-success"), "success");
        })
        .catch(err => {
          this.presentToast(this.$t("Commons.error"), "tertiary");
        });
    }
  }
};
</script>
