<template>
  <div class="mc-st-profile-card" :class="{'is-detailed': detailed, 'is-extracted': extracted}">
    <template v-if="userStore.user">
      <template v-if="!asCar">
        <div class="mc-st-profile-block mc-st-profile-generics">
          <div class="mc-st-profile-avatar">
            <ion-thumbnail>
              <template v-if="getUserAvatar(userStore.user)">
                <img :src="userStore.user.avatars[0]" :alt="userStore.user.givenName">
              </template>
            </ion-thumbnail>
          </div>

          <div class="mc-st-profile-information">
            <div class="mc-st-profile-details">
              <div class="key as-name">
                <span class="given-name">{{userStore.user.givenName}}</span> <span class="short-family-name">{{userStore.user.shortFamilyName}}</span>
              </div>
              <div class="key as-age">{{getUserAge(userStore.user)}} {{$t('solidaryTransport.profile.yearsOld')}}</div>
              <div class="key as-email" v-if="detailed">{{userStore.user.email}}</div>
              <div class="key as-phone" v-if="detailed">{{userStore.user.telephone}}</div>
              <div class="key as-locality">{{getUserAddress(userStore.user).addressLocality}}</div>
            </div>
          </div>

          <div class="mc-st-profile-actions" v-if="!extracted">
            <template v-if="!detailed">
              <ion-icon class="mc-st-profile-action as-edit" @click="$router.push({name:'solidaryTransport.profile'})" name="create"></ion-icon>
              <ion-icon class="mc-st-profile-action as-logout" @click="logout()" name="log-out"></ion-icon>
            </template>
            <template v-else>
              <ion-icon class="mc-st-profile-action as-edit" @click="$router.push({name:'solidaryTransport.profile.personal'})" name="create"></ion-icon>
            </template>
          </div>
        </div>

        <div class="mc-st-profile-block mc-st-profile-preferences" v-if="detailed">
          <div class="mc-st-profile-text">
            <div class="key as-smoke">{{ $t('solidaryTransport.profile.preferences.smoke.' + userStore.user.smoke) }}</div>
            <div class="key as-music">{{ $t('solidaryTransport.profile.preferences.music.' + userStore.user.music) }}</div>
            <div class="key as-chat">{{ $t('solidaryTransport.profile.preferences.chat.' + userStore.user.chat) }}</div>
          </div>

          <div class="mc-st-profile-actions">
            <ion-icon class="mc-st-profile-action as-edit" @click="$router.push({name:'solidaryTransport.profile.preferences'})" name="create"></ion-icon>
          </div>
        </div>
      </template>

      <template v-if="detailed || asCar">
        <div class="mc-st-profile-block mc-st-vehicle" v-if="getUserCar(userStore.user)">
          <div class="mc-st-vehicle-image">
            <ion-thumbnail>
              <template v-if="getUserCar(userStore.user).image">
                <img :src="getUserCar(userStore.user).image" :alt="getUserCar(userStore.user).brand">
              </template>
              <template v-else>
                <ion-icon name="car" size="large" color="light"></ion-icon>
              </template>
            </ion-thumbnail>
          </div>

          <div class="mc-st-vehicle-information">
            <div class="mc-st-vehicle-details">
              <div class="key as-brand">
                <ion-icon name="car" size="small" color="primary"></ion-icon>
                <span>{{getUserCar(userStore.user).brand || 'Brand'}}</span>
              </div>
              <div class="key as-model">
                <ion-icon name="water" size="small" color="primary"></ion-icon>
                <span>{{getUserCar(userStore.user).model || 'Model'}}</span>
              </div>
              <div class="key as-color">
                <ion-icon name="color-palette" size="small" color="primary"></ion-icon>
                <span>{{getUserCar(userStore.user).color|| 'Color'}}</span>
              </div>
            </div>
          </div>

          <div class="mc-st-profile-actions" v-if="!extracted">
            <template v-if="!detailed">
              <ion-icon class="mc-st-profile-action as-edit" @click="$router.push({name:'solidaryTransport.profile'})" name="create"></ion-icon>
              <ion-icon class="mc-st-profile-action as-logout" @click="logout()" name="exit"></ion-icon>
            </template>
            <template v-else>
              <ion-icon class="mc-st-profile-action as-edit" @click="$router.push({name:'solidaryTransport.profile.vehicle'})" name="create"></ion-icon>
            </template>
          </div>
        </div>
      </template>

      <!-- Covoiturage dynamique -->
      <template v-if="!asCar">
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
      </template>
    </template>
  </div>
</template>

<style lang="scss">
  .mc-st-profile-card {
    &.is-detailed, &.is-extracted {
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

          .key {
            &.as-name {
              font-size: 14px;
              font-weight: bold;

              .given-name {}

              .short-family-name {}
            }

            &.as-age, &.as-email, &.as-phone, &.as-locality {
              font-size: 12px;
            }
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
      color: var(--ion-color-step-600);

      .title {
        font-weight: bold;
        margin-bottom: 5px;
      }
    }

    .mc-st-vehicle {
      .mc-st-vehicle-image {
        flex: 1;
        width: 25vw;
        max-width: 90px;
        position: relative;

        ion-thumbnail {
          width: 25vw;
          height: 25vw;
          max-width: 90px;
          max-height: 90px;
          --border-radius: 15px;
        }

        ion-icon {
          top: 50%;
          left: 50%;
          position: relative;
          transform: translate(-50%, -50%);
          opacity: .7;
        }
      }

      .mc-st-vehicle-information {
        flex: 1;
        padding: 0 5px 0 15px;

        .mc-st-vehicle-details {
          position: relative;
          top: 50%;
          transform: translateY(-50%);
          
          .key {
            display: flex;
            flex-direction: row;
            line-height: 1.3;
            font-size: 14px;
            color: var(--ion-color-step-600);

            + .key {
              margin-top: 3px;
            }

            ion-icon {
              margin-right: 5px;
            }

            span {

            }
          }
          
        }
      }
    }

    .mc-st-profile-actions {
      flex: 1;
      max-width: 60px;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;

      .mc-st-proofile-text {
        .key {
          + .key {
            margin-top: 3px;
          }
        }
      }

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
    },
    isExtracted: {
      type: Boolean,
      required: false,
      default: false
    },
    asCarOnly: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      detailed: this.isDetailed,
      extracted: this.isExtracted,
      asCar: this.asCarOnly
    }
  },
  computed: {
    ...mapState([
      'userStore'
    ]),
    ...mapGetters([
      'getUserAvatar',
      'getUserAge',
      'getUserAddress',
      'getUserCar'
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