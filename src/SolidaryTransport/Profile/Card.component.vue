<template>
  <div class="mc-user-card">

    <div class="mc-user-generics">
      <div class="mc-user-avatar">
        <template v-if="userStore.user">
          <ion-thumbnail>
            <template v-if="getUserAvatar(userStore.user)">
              <img :src="userStore.user.avatars[0]" :alt="userStore.user.givenName">
            </template>
          </ion-thumbnail>
        </template>
      </div>

      <div class="mc-user-information">
        <div class="mc-user-details">
          <div class="name">
            <span class="given-name">{{userStore.user.givenName}}</span> <span class="short-family-name">{{userStore.user.shortFamilyName}}</span>
          </div>
          <div class="age">{{getUserAge(userStore.user)}} {{$t('solidaryTransport.profile.yearsOld')}}</div>
        </div>
      </div>

      <div class="mc-user-actions">
        <ion-icon class="mc-user-action as-edit" @click="$router.push('solidaryTransport.profile.edit')" name="create"></ion-icon>
        <ion-icon class="mc-user-action as-logout" @click="logout()" name="exit"></ion-icon>
      </div>
    </div>

    <!-- {{userStore.user}} -->
  </div>
</template>

<style lang="scss">
  .mc-user-card {

    .mc-user-generics {
      display: flex;
      flex-direction: row;

      .mc-user-avatar {
        flex: 1 0 auto;
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

      .mc-user-information {
        flex: 1 0 auto;
        padding: 0 20px;
        max-width: calc(100% - 25vw - 60px);

        .mc-user-details {
          position: relative;
          top: 50%;
          transform: translateY(-50%);

          .name {
            line-height: 1.1;
            font-size: 14px;
            font-weight: bold;

            .given-name {}

            .short-family-name {}
          }

          .age {
            font-size: 12px;
          }
        }
      }

      .mc-user-actions {
        flex: 1 0 auto;
        max-width: 60px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;

        .mc-user-action {
          font-size: 30px;

          &.as-edit {
            font-size: 27px;
          }

          + .mc-user-action {
            margin-left: 3px; 
          }
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
  data () {
    return {}
  },
  computed: {
    ...mapState([
      'userStore'
    ]),
    ...mapGetters([
      'getUserAvatar',
      'getUserAge'
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