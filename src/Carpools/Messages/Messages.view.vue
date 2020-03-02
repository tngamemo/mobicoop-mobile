<template>
  <div class="ion-page">
    <ion-header no-border>
      <ion-toolbar color="background">
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center"> {{ $t('Messages.title') }} </h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="background" no-bounce>
      <div class="mc-white-container mc-white-container-no-padding">
        <ion-list >
          <ion-item-sliding v-for="message in messages" :key="message.id">
            <ion-item class="message-list">
              <ion-avatar class="ion-margin-end ion-margin-start">
                <img v-if="message.avatarsRecipient" v-bind:src="message.avatarsRecipient" alt=""/>
                <img v-if="!message.avatarsRecipient" src="/assets/user.png" alt="" />
              </ion-avatar>
              <ion-label>
                <p>{{ message.id }}</p>
                <p><b>{{message.givenName}} {{message.shortFamilyName}}</b></p>
                <p v-if="message.carpoolInfos">{{message.carpoolInfos.origin}} → {{message.carpoolInfos.destination}}</p>
                <p>{{message.date}}</p>

              </ion-label>
            </ion-item>
            <ion-item-options side="end">
              <ion-item-option @click="deleteMessage(message.idMessage)">{{$t('Commons.delete')}}</ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        </ion-list>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
 .message-list {
   color: var(--ion-color-primary)
 }
</style>

<script>
  export default {
    name: 'messages',
    data () {
      return {
      }
    },
      computed: {
          messages : {
              get() {
                  return this.$store.state.messageStore.messages
              },
          }

      },
      created() {
          this.$store.dispatch('getAllMessagesCarpool', this.$store.state.userStore.user.id )
      },
    methods: {
    }
  }
</script>
