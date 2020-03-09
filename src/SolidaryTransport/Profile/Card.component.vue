<template>
  <div class="mc-user-card">

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
      <div class="name">
        <span class="given-name">{{userStore.user.givenName}}</span> <span class="short-family-name">{{userStore.user.shortFamilyName}}</span>
      </div>
    </div>

    <div class="mc-user-actions">
      <ion-icon name="create"></ion-icon>
      <ion-icon name="exit"></ion-icon>
    </div>

    {{userStore.user}}
  </div>
</template>

<style lang="scss">
  .mc-user-card {

    .mc-user-avatar {
      margin-top: 50px;

      ion-thumbnail {
        --border-radius: 90px;
        --size: 90px;
      }
    }

    .mc-user-information {

      .name {

        .given-name {

        }

        .short-family-name {

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
      'getUserAvatar'
    ])
  },
  methods: {},
  created: function () {}
}
</script>