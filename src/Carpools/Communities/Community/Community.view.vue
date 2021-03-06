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
        <h1 v-if="community" class="ion-text-center">{{ community.name}}</h1>
        <h1 v-if="!community" class="ion-text-center">{{ $t('Community.title')}}</h1>
      </ion-toolbar>
    </ion-header>

    <ion-content class="mc-carpool-community" color="primary" no-bounce>
      <div
        class="ion-text-center ion-margin-top"
        v-if="this.$store.getters.statusGetCommunity == 'loading'"
      >
        <ion-icon size="large" color="light" class="rotating" name="md-sync"></ion-icon>
      </div>

      <div
        class="ion-text-center ion-margin-top"
        v-if="this.$store.getters.statusGetCommunity != 'loading' && !community"
      >Une erreur est survenue</div>

      <div v-if="community">
        <div class="mc-community-avatar">
          <ion-thumbnail>
            <img :src="!!community.images[0] ? community.images[0].versions.square_250 : '/assets/communities.png'" alt="" />
          </ion-thumbnail>
        </div>

        <div class="mc-community-description mc-community-padding">
          {{community.description}}
          <MiniMap :LMarker="LMarker" :LPolyline="LPolyline" />

          <ion-button
            v-if="!isInCommunity && !!this.$store.state.userStore.user"
            :disabled="community.domain && isNotInDomain()"
            class="mc-big-button join-community"
            color="success"
            expand="block"
            v-on:click="joinCommunity()"
          >
            <ion-icon
              size="large"
              color="light"
              class="rotating"
              name="md-sync"
              v-if="this.$store.getters.statusJoinCommunity == 'loading'"
            ></ion-icon>
            <div v-if="this.$store.getters.statusJoinCommunity != 'loading'">
              <ion-icon name="add" class="ion-padding-end"></ion-icon>
              {{ $t('Community.joinCommu')}}
            </div>
          </ion-button>
          <div v-if="!isInCommunity && community.domain" class="text-center">{{ $t('Community.domain')}} {{community.domain}}</div>
        </div>
      </div>
      <div class="mc-white-container" v-if="community">
        <div class="mc-community-users" v-if="isInCommunity">
          <p>Il nous ont rejoints</p>
          <ion-row>
            <ion-scroll scrollX="true">
              <div
                v-for="(user, index) in community.communityUsers"
                :key="index"
                class="scroll-item pointer"
                @click="goToMessage(user.user)"
              >
                <ion-thumbnail>
                  <img :src="user.user.avatars[0]" alt="" />
                </ion-thumbnail>
                {{user.user.givenName}}

                <div>
                  <ion-icon
                    size="large"
                    color="primary"
                    name="star"
                    v-if="idCommunityReferent == user.user.id"
                  ></ion-icon>
                  <ion-icon
                    size="large"
                    color="primary"
                    name="star-half"
                    v-if="user.status == 2 && !idCommunityReferent == user.user.id"
                  ></ion-icon>
                  <ion-icon size="large" color="primary" name="chatboxes"></ion-icon>
                </div>


              </div>
            </ion-scroll>
          </ion-row>
        </div>

        <SearchQuick
          :showPost="isInCommunity"
          :searchWithFilter="true"
          :postWithFilter="true"
          :communities="[this.community.id]"
        />

        <ion-button
          v-if="isInCommunity"
          class="mc-big-button"
          color="danger"
          expand="block"
          :disabled="isOwner()"
          v-on:click="leaveCommunity()"
        >
          <ion-icon
            size="large"
            color="light"
            class="rotating"
            name="md-sync"
            v-if="this.$store.getters.statusLeaveCommunity == 'loading'"
          ></ion-icon>
          <div v-if="this.$store.getters.statusLeaveCommunity != 'loading'">
            <ion-icon name="close" class="ion-padding-end"></ion-icon>
            {{ $t('Community.leaveCommu')}}
          </div>
        </ion-button>
        <div class="mc-leave-text text-center" v-if="isOwner()"><small>{{ $t('Community.isOwnerLeave')}}</small></div>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
.mc-carpool-community {
  .mc-community-avatar {
    display: flex;
    justify-content: center;
    ion-thumbnail {
      --size: 90px;
      --border-radius: 50%;
    }
  }

  .mc-community-padding {
    padding: 20px;
  }

  .mc-community-users {
    background: rgba(var(--ion-color-primary-rgb), 0.1);
    border-radius: 30px;
    color: var(--ion-color-primary);
    font-weight: bold;
    padding: 10px 20px;
    margin-bottom: 40px;

    ion-scroll[scrollX] {
      white-space: nowrap;
      width: 100%;
      overflow: scroll;
      display: flex;

      .scroll-item {
        background: white;
        border-radius: 30px;
        margin: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        width: 120px;
        min-width: 120px;
        height: 160px;
        ion-thumbnail {
          --border-radius: 50%;
        }
      }
    }
  }
}

  .join-community {
    margin-top: 20px;
  }

  .mc-leave-text {
    color: var(--ion-color-danger);
  }
</style>

<script>
import { toast } from "../../../Shared/Mixin/toast.mixin";
import SearchQuick from "../../Shared/Components/SearchQuick.component";
import MiniMap from "../../Shared/Components/MiniMap.component";

export default {
  name: "carpool-community",
  mixins: [toast],
  components: { SearchQuick, MiniMap },
  data() {
    return {
      community: "",
      LPolyline: [],
      LMarker: [],
    };
  },
  created() {
    this.getSpecificCommunity();
    // this.getAdsCommunity();
  },
  computed: {
    isInCommunity() {
      const isInCommunity = this.community.communityUsers.find(
        item => item.user.id == this.$store.getters.userId
      );
      return !!isInCommunity;
    },

    idCommunityReferent() {
      return this.community.user.id;
    }
  },
  methods: {
    getSpecificCommunity() {
      // On récupére les communities\
      const communityId = this.$route.params.id;
      this.$store
        .dispatch("getSpecificCommunity", communityId)
        .then(resp => {
          this.community = resp.data;

          this.LMarker.push({
            latlng: [
              this.community.address.latitude,
              this.community.address.longitude
            ],
            name: this.community.name
          });

          this.constructDataMap(this.community.ads);
        })
        .catch(error => {
          this.presentToast(this.$t("Commons.error"), "danger");
        });
    },

    /*
    getAdsCommunity() {
      // On récupére les communities\
      const communityId = this.$route.params.id;
      this.$store
        .dispatch("getAdsCommunity", communityId)
        .then(resp => {
          this.constructDataMap(resp.data["hydra:member"]);
        })
        .catch(error => {
          console.log(error);
          this.presentToast(this.$t("Commons.error"), "danger");
        });
    },

     */

    joinCommunity() {
      const payload = {
        community: this.community["@id"],
        user: this.$store.getters.user["@id"]
      };

      this.$store
        .dispatch("joinCommunity", payload)
        .then(resp => {
          this.presentToast(this.$t("Community.join_success"), "success");
          this.getSpecificCommunity();
        })
        .catch(error => {
          if(error.response.status === 403) {
            this.presentToast(this.$t("Community.join-error"), "danger");
          } else {
            this.presentToast(this.$t("Commons.error"), "danger");
          }
        });
    },

    leaveCommunity() {
      return this.$ionic.alertController
        .create({
          header: this.$t("Community.leaveCommu"),
          message: this.$t( "Community.leaveHasMember"),
          buttons: [
            {
              text: this.$t("Commons.cancel"),
              role: 'cancel',
              cssClass: 'secondary'
            },
            {
              text: this.$t("Commons.confirm"),
              handler: () => {
                const communityUser = this.community.communityUsers.find(
                  item => item.user.id == this.$store.getters.userId
                );
                const payload = {
                  cummunityUserId: communityUser["id"]
                };

                this.$store
                  .dispatch("leaveCommunity", payload)
                  .then(resp => {
                    this.presentToast(this.$t("Community.leave_success"), "success");
                    this.getSpecificCommunity();
                  })
                  .catch(error => {
                    this.presentToast(this.$t("Commons.error"), "danger");
                  });
              },
            },
          ],
        })
        .then(a => a.present());

    },

    constructDataMap(data) {
      let polyline = [];
      data.forEach(element => {
        let result = [];
        element.outwardWaypoints.forEach(wayPoint => {
          result.push([wayPoint.address.latitude, wayPoint.address.longitude]);
        });

        polyline.push(result);
      });

      this.LPolyline = polyline;
    },

    goToMessage(user) {
      this.$store.commit('set_temp_direct_thread', user);
      this.$router.push({ name: "message" , params : {idAsk : -99, idRecipient : user.id}});
    },

    isOwner() {
      return this.$store.getters.userId === this.idCommunityReferent
    },

    isNotInDomain() {
      const email = this.$store.state.userStore.user.email;
      const res = !email.includes(this.community.domain);
      return res;
    }

  }
};
</script>
