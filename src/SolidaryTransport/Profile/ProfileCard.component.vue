<template>
  <div class="mc-st-profile-card" :class="{'is-detailed': detailed}">

    <div class="mc-st-profile-block mc-st-profile-generics">
      <div class="mc-st-profile-avatar">
        <template v-if="userStore.user">
          <ion-thumbnail>
            <template v-if="getUserAvatar(userStore.user)">
              <img :src="userStore.user.avatars[0]" :alt="userStore.user.givenName">
            </template>
          </ion-thumbnail>
        </template>
      </div>

      <div class="mc-st-profile-information">
        <div class="mc-st-profile-details">
          <div class="name">
            <span class="given-name">{{userStore.user.givenName}}</span> <span class="short-family-name">{{userStore.user.shortFamilyName}}</span>
          </div>
          <div class="age">{{getUserAge(userStore.user)}} {{$t('solidaryTransport.profile.yearsOld')}}</div>
          <div class="email" v-if="detailed">{{userStore.user.email}}</div>
          <div class="phone" v-if="detailed">{{userStore.user.telephone}}</div>
          <div class="locality">{{getUserAddress(userStore.user).addressLocality}}</div>
        </div>
      </div>

      <div class="mc-st-profile-actions">
        <template v-if="!detailed">
          <ion-icon class="mc-st-profile-action as-edit" @click="$router.push({name:'solidaryTransport.profile'})" name="create"></ion-icon>
          <ion-icon class="mc-st-profile-action as-logout" @click="logout()" name="exit"></ion-icon>
        </template>
        <template v-else>
          <ion-icon class="mc-st-profile-action as-edit" @click="$router.push({name:'solidaryTransport.profile.personal'})" name="create"></ion-icon>
        </template>
      </div>
    </div>

    <div class="mc-st-profile-block mc-st-profile-preferences" v-if="detailed">
      <div class="mc-st-profile-text">
        <div class="key as-smoke">Je ne fume pas en voiture</div>
        <div class="key as-music">J’écoute la radio ou de la musique</div>
        <div class="key as-chat">Je discute</div>
      </div>

      <div class="mc-st-profile-actions">
        <ion-icon class="mc-st-profile-action as-edit" @click="$router.push({name:'solidaryTransport.profile.preferences'})" name="create"></ion-icon>
      </div>
    </div>

    <div class="mc-st-profile-block mc-st-profile-realtime" v-if="detailed">
      <div class="mc-st-profile-text">
        <div class="title">Covoiturage temps réel </div>
        <div class="key as-proposal">Propositions en temps réel: OK </div>
        <div class="key as-vocal">Réponse vocale aux propositions: OK </div>
        <div class="key as-background">Fonctionnement en arrière-plan: OK</div>
      </div>

      <div class="mc-st-profile-actions">
        <ion-icon class="mc-st-profile-action as-edit" @click="$router.push({name:'solidaryTransport.profile.realtime'})" name="create"></ion-icon>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .mc-st-profile-card {
    &.is-detailed {
      color: var(--ion-color-primary);

      .mc-st-profile-actions {
        max-width: 30px;
      }
    }

    .mc-st-profile-block {
      display: flex;
      flex-direction: row;

      + .mc-st-profile-block {
        margin-top: 20px;
      }
    }

    .mc-st-profile-generics {
      .mc-st-profile-avatar {
        flex: 1;
        width: 25vw;
        max-width: 90px;

        ion-thumbnail {
          width: 25vw;
          height: 25vw;
          max-width: 90px;
          max-height: 90px;
          --border-radius: 100%;
        }
      }

      .mc-st-profile-information {
        flex: 1;
        padding: 0 5px 0 15px;

        .mc-st-profile-details {
          position: relative;
          top: 50%;
          transform: translateY(-50%);
          line-height: 1.3;

          .name {
            font-size: 14px;
            font-weight: bold;

            .given-name {}

            .short-family-name {}
          }

          .age, .email, .phone, .locality {
            font-size: 12px;
          }
        }
      }
    }

    .mc-st-profile-text {
      flex: 1;
      margin-right: 10px;
      padding: 15px 20px;
      background: var(--ion-color-light-tint);
      border-radius: 0 15px 15px 15px;
      font-size: 12px;
      line-height: 1.3;
      color: var(--ion-color-step-600, #666);

      .title {
        font-weight: bold;
        margin-bottom: 5px;
      }
    }

    .mc-st-profile-actions {
      flex: 1;
      max-width: 60px;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;

      .mc-st-profile-action {
        font-size: 30px;

        &.as-edit {
          font-size: 27px;
        }

        + .mc-st-profile-action {
          margin-left: 3px; 
        }
      }
    }

  }
</style>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'solidaryTransport.userCard',
  components: {},
  props: {
    isDetailed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      detailed: this.isDetailed
    }
  },
  computed: {
    ...mapState([
      'userStore'
    ]),
    ...mapGetters([
      'getUserAvatar',
      'getUserAge',
      'getUserAddress'
    ])
  },
  methods: {
    logout: function() {
      this.$store.dispatch('logout')
    }
  },
  created: function () {}
}
</script>