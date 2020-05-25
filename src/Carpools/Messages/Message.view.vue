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
          <ion-back-button default-href="messages"></ion-back-button>
        </ion-buttons>
        <ion-item color="primary" lines="none" v-if="thread">
          <ion-avatar class="ion-margin-end ion-margin-start">
            <img v-if="thread.avatarsRecipient" v-bind:src="thread.avatarsRecipient" alt />
            <img v-if="!thread.avatarsRecipient" src="/assets/user.png" alt />
          </ion-avatar>
          <ion-label>
            <p class="message-name">
              <b>{{thread.givenName}} {{thread.shortFamilyName}}</b>
            </p>
          </ion-label>
        </ion-item>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" no-bounce>
      <div
        class="mc-white-container mc-white-container-no-padding-full message-flex"
        style="height: 100%"
      >
        <div class="top-message d-flex justify-between">
          <div>
            <div v-if="thread">
              <b>{{thread.date | moment('utc', 'ddd D MMMM')}}</b>
            </div>
          </div>
          <div class="d-flex align-center see-carpool" v-if="ask" v-on:click="goToDetail()">
            <ion-icon name="eye"></ion-icon>
            <span style="margin-left: 5px">{{$t('Message.see-carpool')}}</span>
          </div>
        </div>

        <div class="carpool-zone ion-margin-start ion-margin-end" v-if="ask">
          <div class="d-flex mc-carpool-way">
            <div class="mc-carpool-time" v-if="this.ask.frequency == 1">
              <p>{{ this.ask.pickUpTime | moment("utc", "HH:mm") }}</p>
              <p>{{ this.ask.dropOffTime | moment("utc", "HH:mm")}}</p>
            </div>
            <div class="mc-carpool-origin-destination">
              <div>
                <p class="timeline">{{this.ask.pickUpAddress.addressLocality}}</p>
                <p class="timeline">{{this.ask.dropOffAddress.addressLocality}}</p>
              </div>
            </div>
          </div>
          <div class="text-center ion-margin-bottom">
            <ion-text
              color="success"
              class="d-flex justify-center align-center"
              v-if="this.ask.status == 4 || this.ask.status == 5"
            >
              <ion-icon class="status-icon" name="checkmark"></ion-icon>
              <b>{{$t('Message.accepted')}}</b>
            </ion-text>
            <ion-text
              color="danger"
              class="d-flex justify-center align-center"
              v-if="this.ask.status == 6 || this.ask.status == 7"
            >
              <ion-icon class="status-icon" name="close"></ion-icon>
              <b>{{$t('Message.refused')}}</b>
            </ion-text>
            <ion-text
              color="secondary"
              class="d-flex justify-center align-center"
              v-if="this.ask.status == 2 || this.ask.status == 3"
            >
              <ion-icon class="status-icon" name="hourglass"></ion-icon>
              <b>{{$t('Message.waiting')}}</b>
            </ion-text>
          </div>
        </div>

        <div ref="messagesZone" class="messages-zone" v-if="this.thread">
          <div
            class="ion-text-center"
            v-if="$store.state.messageStore.statusPostMessage == 'loading' || $store.state.messageStore.statusCompleteThread == 'loading' || $store.state.carpoolStore.statusCarpoolAsk == 'loading'"
          >
            <ion-icon size="large" color="background" class="rotating" name="md-sync"></ion-icon>
          </div>

          <div
            class="ion-text-center"
            v-if="!($store.state.messageStore.statusPostMessage == 'loading' || $store.state.messageStore.statusCompleteThread == 'loading' || $store.state.carpoolStore.statusCarpoolAsk == 'loading') && this.thread.idMessage == -99"
          >{{$t('Message.no-thread')}}</div>

          <div v-for="(day, index) in days" :key="index">
            <div class="text-center from-now">{{ $moment(day.date).utc().startOf('minute').fromNow()}}</div>
            <div class="message-flex" v-for="(m, index) in day.messages" :key="index">
              <div
                :class="m.user.id === $store.state.userStore.user.id ? 'day-message-right' : 'day-message-left'"
              >{{m.text}}</div>
            </div>
          </div>
        </div>

        <div class="bottom-message">
          <ion-item>
            <ion-textarea
              style="margin-top: 0px"
              v-bind:placeholder="$t('Message.textarea')"
              v-bind:value="message"
              @input="message = $event.target.value"
            ></ion-textarea>
            <ion-icon
              :hidden="($store.state.messageStore.statusPostMessage == 'loading' || $store.state.messageStore.statusCompleteThread == 'loading')"
              color="primary"
              name="send"
              v-on:click="send(); $event.stopPropagation();"
              slot="end"
            ></ion-icon>
            <ion-icon
              :hidden="!($store.state.messageStore.statusPostMessage == 'loading' || $store.state.messageStore.statusCompleteThread == 'loading')"
              slot="end"
              color="primary"
              class="rotating"
              name="md-sync"
            ></ion-icon>
          </ion-item>
        </div>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
.message-flex {
  display: flex;
  flex-direction: column;
}

.status-icon {
  margin-right: 5px;
  font-size: 20px;
}

.top-message {
  background-color: #f5f6fa;
  color: var(--ion-color-primary);
  padding: 15px 30px;
  margin-top: -20px;
  border-top-left-radius: 15px !important;
  border-top-right-radius: 15px !important;
}

.see-carpool {
  opacity: 0.6;
  cursor: pointer;
}

.bottom-message {
  padding: 10px;
}

.carpool-zone {
}

.messages-zone {
  flex: 1;
  background-color: #f5f6fa;
  overflow: scroll;
  padding-top: 15px;

  .from-now {
    color: #979797;
  }

  .day-message-left {
    padding: 15px 20px;
    margin: 10px 15px;
    background: #ffffff;
    border-radius: 15px 15px 15px 0px;
    display: inline-block;
    max-width: 70%;
    align-self: flex-start;
    color: rgba(0, 0, 0, 0.6);
  }

  .day-message-right {
    padding: 15px 20px;
    margin: 10px 15px;
    background: rgba(var(--ion-color-primary-rgb), 0.2);
    border-radius: 15px 15px 0px 15px;
    display: inline-block;
    max-width: 70%;
    align-self: flex-end;
    color: rgba(0, 0, 0, 0.6);
  }
}

.mc-carpool-way {
  padding-left: 20px;
  color: var(--ion-color-primary);

  .mc-carpool-time {
    padding-right: 10px;
  }

  .mc-carpool-origin-destination {
    font-weight: bold;

    div {
      // border-left: 2px solid red;
      padding-left: 10px;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        width: 4px;
        height: calc(80% - 12px);
        background-color: var(--ion-color-primary);
        top: 50%;
        transform: translateY(-50%);
        left: 4px;
      }

      .timeline {
        position: relative;
        padding-left: 10px;

        &::before {
          content: "";
          position: absolute;
          margin: auto;
          width: 12px;
          height: 12px;
          border-radius: 6px;
          background-color: var(--ion-color-primary);
          top: 0px;
          bottom: 0;
          left: -10px;
        }
      }
    }
  }
}
</style>

<script>
import CarpoolItemDTO from "../Shared/CarpoolItemDTO";

export default {
  name: "message",
  data() {
    return {
      message: "",
      ask: null,
      days: [],
      thread : null,
    };
  },
  props: [],
  message: {
    get() {
      return this.$store.state.messageStore.completeThread;
    }
  },
  created() {
    if (this.$store.state.messageStore.tempDirectThread) {
      this.thread = this.$store.state.messageStore.tempDirectThread;
    } else if(this.$route.params.idAsk && this.$route.params.idAsk != -99) {
      this.thread = this.$store.state.messageStore.messagesCarpool.find(item => item.idAsk == this.$route.params.idAsk && item.idRecipient == this.$route.params.idRecipient)
    } else {
      this.thread = this.$store.state.messageStore.messagesDirect.find(item => item.idRecipient == this.$route.params.idRecipient)
    }

    if (this.thread) {
      // Get Complet Thread
      if (this.thread.idMessage != -99) {
        this.getCompleteThread();
      } else {
        this.$store.commit("complete_thread_reset");
      }

      // get Carpool Ask
      if (this.thread.idAsk) {
        this.$store
          .dispatch("getCarpoolAsk", {
            idAsk: this.thread.idAsk,
            userId: this.$store.state.userStore.user.id
          })
          .then(res => {
            this.$store.state.messageStore.askFromMessage = res.data;
            this.ask = new CarpoolItemDTO().carpoolItemFromAsk(res.data);
          });
      }
    } else {
      this.$router.push("messages");
    }
  },
  destroyed() {
    this.$store.commit('reset_temp_direct_thread');
  },
  methods: {
    getCompleteThread() {
      if( this.thread.idMessage) {
        this.$store
          .dispatch("getCompleteThread", this.thread.idMessage)
          .then(res => {
            this.days = [];
            res.data["hydra:member"].forEach(item => {
              const m = this.days.find(
                mes =>
                  this.$moment(mes.date).format("YYYY-MM-DD") === this.$moment(item.createdDate).format("YYYY-MM-DD")
              );
              if (m) {
                m.messages.push(item);
              } else {
                this.days.push({
                  date: this.$moment(item.createdDate).format(),
                  messages: [item]
                });
              }
            });
            // go to bottom of message zone
            this.$nextTick(() => {
              this.message = "";
              this.$refs.messagesZone.scrollTop = this.$refs.messagesZone.scrollHeight;
            });
          });
      }
    },

    send() {
      // construction du message
      let message = {};
      message.title = "";
      message.text = this.message;
      message.user = "/users/" + this.$store.state.userStore.user.id;
      if (this.thread.idAsk) {
        message.idAsk = this.thread.idAsk;
      }
      if (this.thread.idMessage && this.thread.idMessage != -99) {
        message.message = "/messages/" + this.thread.idMessage;
      }
      message.recipients = [{}];
      message.recipients[0].status = 1;
      if (this.thread.idRecipient) {
        message.recipients[0].user = "/users/" + this.thread.idRecipient;
      }
      message.recipients[0].sentDate = this.$moment().format();

      this.$store.dispatch("postMessage", message).then(res => {
        if (!this.thread.idMessage || this.thread.idMessage == -99) {
          this.thread.idMessage = res.data.id
        }
        this.getCompleteThread();
      }).catch(() => {
        this.presentToast(this.$t("Commons.error"), "tertiary");
      });
    },

    goToDetail() {
      this.$router.push({
        name: "carpool-detail",
        params: { param: "fromMessage" }
      });
    }
  }
};
</script>
