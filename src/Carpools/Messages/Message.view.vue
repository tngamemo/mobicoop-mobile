<template>
  <div class="ion-page">
    <ion-header no-border>
      <ion-toolbar color="background">
        <ion-buttons slot="start">
          <ion-back-button default-href="messages"></ion-back-button>
        </ion-buttons>
        <ion-item color="primary" lines="none" v-if="thread">
          <ion-avatar class="ion-margin-end ion-margin-start">
            <img v-if="thread.avatarsRecipient" v-bind:src="thread.avatarsRecipient" alt=""/>
            <img v-if="!thread.avatarsRecipient" src="/assets/user.png" alt="" />
          </ion-avatar>
          <ion-label>
            <p class="message-name"><b>{{thread.givenName}} {{thread.shortFamilyName}}</b></p>
          </ion-label>
        </ion-item>
      </ion-toolbar>
    </ion-header>

    <ion-content color="background" no-bounce>
      <div class="mc-white-container mc-white-container-no-padding-full message-flex" style="height: 100%">

        <div class="top-message d-flex justify-between">
          <div> <div v-if="thread"><b>{{thread.date | moment('utc', 'ddd D MMMM')}}</b></div></div>
          <div class="d-flex align-center see-carpool"><ion-icon name="eye"></ion-icon> <span style="margin-left: 5px">{{$t('Message.see-carpool')}}</span></div>
        </div>

        <div class="carpool-zone ion-margin">
          Carpool
        </div>

        <div class="messages-zone">

          <div class="ion-text-center" v-if="$store.state.messageStore.statusPostMessage == 'loading' || $store.state.messageStore.statusCompleteThread == 'loading'">
            <ion-icon size="large" color="background" class="rotating"  name="md-sync"></ion-icon>
          </div>

          <div class="ion-text-center" v-if="this.thread.idMessage == -99">
            {{$t('Message.no-thread')}}
          </div>


        </div>

        <div class="bottom-message">
          <ion-item>
            <ion-textarea style="margin-top: 0px"
              v-bind:placeholder="$t('Message.textarea')"
              v-bind:value="message"
              @input="message = $event.target.value"
            ></ion-textarea>
            <ion-icon
              color="primary"
              name="send"
              v-on:click="send(); $event.stopPropagation();"
              slot="end"
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

  .top-message {
    background-color: #F5F6FA;
    color: var(--ion-color-primary);
    padding: 15px 30px;
    margin-top: -30px;
    border-top-left-radius: 15px !important;
    border-top-right-radius: 15px !important;
  }

  .see-carpool {
    opacity: 0.6;
    cursor: pointer;
  }

  .bottom-message{
    padding: 10px;
  }

  .carpool-zone {

  }

  .messages-zone {
    flex: 1;
    background-color: #F5F6FA;
    overflow: scroll;
    padding-top: 15px;
  }
</style>

<script>
  export default {
    name: 'help',
    data () {
      return {
        message: ''
      }
    },
    props: ['thread'],
    message : {
      get() {
        return this.$store.state.messageStore.completeThread;
      },
    },
    created() {
      if (this.thread) {
        console.log(this.thread);
        // Get Complet Thread
        if (this.thread.idMessage != -99) {
          this.$store.dispatch('getCompleteThread',this.thread.idMessage );
        } else {
          this.$store.commit('complete_thread_reset' );
        }

        // get Carpool Ask
        if (this.thread.idAsk) {
          this.$store.dispatch('getCarpoolAsk', { idAsk: this.thread.idAsk, userId : this.$store.state.userStore.user.id} ).then(res => {
            console.log(res);
          });
        }
      } else {
        this.$router.push('messages')
      }
    },
    methods: {
      send() {

        // construction du message
        let message = {};
        message.title = "";
        message.text = this.message;
        message.user = "/users/" + this.$store.state.userStore.user.id;
        if (this.thread.idAsk) { message.idAsk = this.thread.idAsk }
        if (this.thread.idMessage && this.thread.idMessage != -99) { message.message = "/messages/" + this.thread.idMessage }
        message.recipients = [{}];
        message.recipients[0].status = 1;
        if (this.thread.idRecipient) { message.recipients[0].user = "/users/" + this.thread.idRecipient }
        message.recipients[0].sentDate= new Date();

        this.$store.dispatch('postMessage', message ).then(res => {
          console.log(res);
        });

      }
    }
  }
</script>
