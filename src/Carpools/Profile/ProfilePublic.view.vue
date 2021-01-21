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
          <ion-back-button default-href="/carpools/home"></ion-back-button>
        </ion-buttons>
        <h1 v-if="user" class="ion-text-center">{{user.profileSummary.givenName }} {{user.profileSummary.shortFamilyName}}</h1>
        <ion-buttons  v-if="user" slot="end">
          <ion-button v-on:click="presentActionSheet()">
            <ion-icon slot="icon-only" name="more"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" no-bounce>
      <div class="mc-white-container">

        <div v-if="loading" class="ion-text-center">
          <ion-icon size="large" color="primary" class="rotating" name="md-sync"></ion-icon>
        </div>

        <div v-if="user">
        <!-- Bloc user -->
        <div class="mc-user-profile ion-margin-bottom" v-if="user.profileSummary">
          <div class="mc-user-bloc-info">
            <div class="mc-user-image position-relative">
              <ion-thumbnail v-if="!! user.profileSummary.avatar">
                <img :src="user.profileSummary.avatar" alt="" />
              </ion-thumbnail>
              <ion-icon v-if="showExeprienced && user.profileSummary.experienced" class="experienced" name="star"></ion-icon>
            </div>

            <div class="mc-user-info">
              <p>
                <b>{{user.profileSummary.givenName }} {{user.profileSummary.shortFamilyName}}</b>
              </p>
              <p>{{user.profileSummary.age }} ans</p>
              <p>{{user.profileSummary.email }}</p>
              <p>{{user.profileSummary.telephone }}</p>
            </div>
          </div>

        </div>

          <div class="d-flex justify-between">
            <div class="user-prefs-bloc">
              <div><b>Covoiturages réalisés : {{user.profileSummary.carpoolRealized}}</b></div>
              <div><b>Taux de réponse : {{user.profileSummary.answerPct}}%</b></div>
              <div>Connecté : <b>{{ $moment(user.profileSummary.lastActivityDate).utc().startOf('minute').fromNow() }}</b></div>
              <div>Inscrit : <b>{{ $moment(user.profileSummary.createdDate).utc().startOf('minute').fromNow() }}</b></div>
            </div>
          </div>

        <div class="d-flex justify-between">
          <div class="user-prefs-bloc">
            <div v-if="user.smoke === 0">{{ $t('ProfilePrefs.smoke0')}}</div>
            <div v-if="user.smoke === 1">{{ $t('ProfilePrefs.smoke1')}}</div>
            <div v-if="user.smoke === 2">{{ $t('ProfilePrefs.smoke2')}}</div>
            <div v-if="user.music === false">{{ $t('ProfilePrefs.music0')}}</div>
            <div v-if="user.music === true">{{ $t('ProfilePrefs.music1')}}</div>
            <div v-if="user.chat === false">{{ $t('ProfilePrefs.chat0')}}</div>
            <div v-if="user.chat === true">{{ $t('ProfilePrefs.chat1')}}</div>
          </div>
        </div>

        <!-- Reviews -->
          <div v-for="review in user.reviews">
            <div class="mc-review-bubble">
              <div style="margin-bottom: -10px"><ion-icon style="margin-right: 5px; margin-left: 0px;" color="primary" class="ion-margin-end" name="quote"></ion-icon></div>
              <div style="margin: 0px 25px;"><b>{{ review.content}}</b></div>
              <div style="margin-top: -10px" class="d-flex justify-end"><ion-icon style="margin-right: 0px; margin-left: 5px; margin-top: auto" color="primary" class="ion-margin-end" name="quote"></ion-icon></div>
            </div>
            <div class="d-flex justify-end align-center mc-user" style="margin-bottom: 5px;">
              <div class="mc-user-image position-relative">
                <ion-thumbnail v-if="!!review.reviewer.avatar">
                  <img :src="review.reviewer.avatar" alt="" />
                </ion-thumbnail>
                <ion-icon v-if="showExperienced && review.reviewer.experienced" class="experienced" name="star"></ion-icon>
              </div>
              <b>{{review.reviewer.givenName}} {{review.reviewer.shortFamilyName}}</b><span style="margin-right: 5px; margin-left: 5px"> - </span> {{review.date | moment('utc', 'DD/MM/YYYY')}}
            </div>
          </div>

        </div>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
.mc-user-profile {
  display: flex;
  justify-content: space-between;
  color: var(--ion-color-primary);

  .mc-user-bloc-info {
    display: flex;
    width: calc(100% - 48px);
    flex-wrap: wrap;

  }

  .mc-user-image {
    margin-right: 20px;
    margin-bottom: 20px;
  }

  ion-thumbnail {
    --size: 90px;
    --border-radius: 50%;
  }

  .mc-user-info {
    p {
      margin: 0;
    }
  }

}

.user-prefs-bloc {

  padding: 15px 20px;
  background: #F5F6FA;
  border-radius: 0px 15px 15px 15px;
  color: rgba(0, 0, 0, 0.4);
  width: 100%;
  margin-right: 0px;
  margin-bottom: 30px;
}

.mc-user {
  color: var(--ion-color-primary);
}

.mc-user-image {
  margin-right: 10px;
}

ion-thumbnail {
  --size: 40px;
  --border-radius: 50%;
}

.mc-review-text {
  width: 80%;
  border: solid 2px var(--ion-color-primary);
  border-radius: 0px 10px 10px 10px;
}

.mc-review-bubble {
  margin-left: auto;
  width: fit-content;
  max-width: 80%;
  background: #F5F6FA;
  border-radius: 10px 10px 0px 10px;
  padding: 5px 10px;
  margin-bottom: 5px;
  color: #00000080;
}

</style>

<script>
import {toast} from "../../Shared/Mixin/toast.mixin";

export default {
  name: "profile-public",
  data() {
    return {
      user : null,
      loading : false,
      showExperienced: JSON.parse(process.env.VUE_APP_EXPERIENCED)
    };
  },
  mixins: [toast],
  computed: {

  },
  created() {
    this.getUser(this.$route.params.id)
  },
  methods: {
    getUser(id) {
      this.loading = true;
      this.$store.dispatch('getPublicUser', {id: id}).then(res => {
        this.loading = false;
        this.user = res.data
      }).catch(() => {
        this.loading = false;
        this.presentToast(this.$t("Commons.error"), "danger");
      })
    },
    presentActionSheet() {
      return this.$ionic.actionSheetController
        .create({
          buttons: [
            /*
            {
              text: this.user.id ? (this.user.id === this.$store.state.userStore.user.id ? this.$t('DetailCarpool.unblock') : this.$t('DetailCarpool.blocked') ) : this.$t('DetailCarpool.block'),
              icon: '',
              handler: () => {
                if (this.user.id == null || this.user.id === this.$store.state.userStore.user.id) {
                  this.$store.dispatch('blockUser', this.thread.idRecipient).then(res => {
                    this.$router.back();
                  });
                }
              },
            },
             */
            {
              text: this.$t('DetailCarpool.report'),
              icon: '',
              handler: () => {
                this.$router.push({ name: "carpool-contact", query: {demand : 'report'} });
              },
            },
            {
              text: 'Annuler',
              icon: '',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked')
              },
            },
          ],
        })
        .then(a => a.present())
    }
  }
};
</script>
