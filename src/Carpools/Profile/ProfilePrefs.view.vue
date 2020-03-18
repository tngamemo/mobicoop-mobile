<template>
  <div class="ion-page">
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="profile"></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center"> {{ $t('ProfilePrefs.title') }} </h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary">
      <div class="mc-white-container">

        <!-- SMOKE -->
        <div class="user-prefs-bloc-question">
          <h2>{{ $t('ProfilePrefs.smoke-title')}}</h2>
          <div>
              <ion-radio-group>
                <ion-item lines="none" >
                  <ion-label class="ion-text-wrap">{{$t('ProfilePrefs.smoke0')}}</ion-label>
                  <ion-radio slot="start" value="0" :checked="user.smoke == 0" @ionSelect="user.smoke = 0"></ion-radio>
                </ion-item>
                <ion-item lines="none" >
                  <ion-label class="ion-text-wrap">{{$t('ProfilePrefs.smoke1')}}</ion-label>
                  <ion-radio slot="start" value="1" :checked="user.smoke == 1" @ionSelect="user.smoke = 1"></ion-radio>
                </ion-item>
                <ion-item lines="none" >
                  <ion-label class="ion-text-wrap">{{$t('ProfilePrefs.smoke2')}}</ion-label>
                  <ion-radio slot="start" value="2" :checked="user.smoke == 2" @ionSelect="user.smoke = 2"></ion-radio>
                </ion-item>
              </ion-radio-group>
          </div>
        </div>

        <!-- MUSIC -->
        <div class="user-prefs-bloc-question">
          <h2>{{ $t('ProfilePrefs.music-title')}}</h2>
          <div>
              <ion-radio-group>
                <ion-item lines="none" >
                  <ion-label class="ion-text-wrap">{{$t('ProfilePrefs.music0')}}</ion-label>
                  <ion-radio slot="start" value="false" :checked="user.music == false" @ionSelect="user.smoke = false"></ion-radio>
                </ion-item>
                <ion-item lines="none" >
                  <ion-label class="ion-text-wrap">{{$t('ProfilePrefs.music1')}}</ion-label>
                  <ion-radio slot="start" value="true" :checked="user.music == true" @ionSelect="user.music = true"></ion-radio>
                </ion-item>

              </ion-radio-group>
          </div>
        </div>


        <!-- CHAT -->
        <div class="user-prefs-bloc-question">
          <h2>{{ $t('ProfilePrefs.chat-title')}}</h2>
          <div>
              <ion-radio-group>
                <ion-item lines="none" >
                  <ion-label class="ion-text-wrap">{{$t('ProfilePrefs.chat0')}}</ion-label>
                  <ion-radio slot="start" value="false" :checked="user.chat == false" @ionSelect="user.chat = false"></ion-radio>
                </ion-item>
                <ion-item lines="none" >
                  <ion-label class="ion-text-wrap">{{$t('ProfilePrefs.chat1')}}</ion-label>
                  <ion-radio slot="start" value="true" :checked="user.chat == true" @ionSelect="user.chat = true"></ion-radio>
                </ion-item>

              </ion-radio-group>
          </div>
        </div>

        <br>
        <ion-button class='mc-small-button' color="success" expand="block" @click="save()">
          <span v-if="this.$store.state.userStore.status == 'loading'">
            <ion-icon size="large" class="rotating" name="md-sync"></ion-icon>
          </span>
          <span v-if="this.$store.state.userStore.status != 'loading'">
          {{ $t('Commons.save') }}
          </span>
        </ion-button>

      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
.user-prefs-bloc-question {

  h2 {
    font-weight: 600;
    font-size: 18px;
  }

  ion-item {
    --background: #ffffff00;
    --color: var(--ion-color-primary)
  }

  background: #F5F6FA;
  border-radius: 15px;
  color: var(--ion-color-primary);
  margin-bottom: 15px;
  padding: 5px 20px;

}
</style>

<script>
  import {toast} from "../../Shared/Mixin/toast.mixin";

  export default {
    name: 'profile-prefs',
    data () {
      return {

      }
    },
    mixins: [toast],
    created() {

    },
    computed: {
      user: {
        get() {
          return Object.assign({} ,this.$store.state.userStore.user)
        },
      }
    },
    methods: {
      save() {
        this.$store.dispatch('updateUser', this.user).then(() => {
          this.$router.back();
        }).catch(() => {
          this.presentToast(this.$t("Commons.error"), "danger");
        });
      }
    }
  }
</script>
