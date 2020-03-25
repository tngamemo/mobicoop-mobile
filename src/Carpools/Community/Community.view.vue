<template>
  <div class="ion-page">
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
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
            <img :src="!!community.images[0] && community.images[0].versions.square_250" />
          </ion-thumbnail>
        </div>

        <div class="mc-community-description mc-community-padding">
          {{community.description}}
          <MiniMap :LPolyline="LPolyline" />

          <ion-button
            v-if="!isInCommunity"
            class="mc-big-button"
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
        </div>
      </div>
      <div class="mc-white-container" v-if="community">
        <div class="mc-community-users">
          <p>Il nous ont rejoint</p>
          <ion-row>
            <ion-scroll scrollX="true">
              <div
                v-for="(user, index) in community.communityUsers"
                :key="index"
                class="scroll-item"
              >
                <ion-thumbnail>
                  <img :src="user.user.avatars[0]" />
                </ion-thumbnail>
                {{user.user.givenName}}
              </div>
            </ion-scroll>
          </ion-row>
        </div>

        <SearchQuick :showPost="isInCommunity" />

        <ion-button
          v-if="isInCommunity"
          class="mc-big-button"
          color="danger"
          expand="block"
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
    padding: 30px;
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
        height: 160px;
        ion-thumbnail {
          --border-radius: 50%;
        }
      }
    }
  }
}
</style>

<script>
import { toast } from "../../Shared/Mixin/toast.mixin";
import SearchQuick from "../Shared/Components/SearchQuick.component";
import MiniMap from "../Shared/Components/MiniMap.component";

export default {
  name: "carpool-community",
  mixins: [toast],
  components: { SearchQuick, MiniMap },
  data() {
    return {
      community: "",
      LPolyline: []
    };
  },
  created() {
    this.getSpecificCommunity();
    this.getAdsCommunity();
  },
  computed: {
    isInCommunity() {
      const isInCommunity = this.community.communityUsers.find(
        item => item.user.id == this.$store.getters.userId
      );
      return !!isInCommunity;
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
        })
        .catch(error => {
          this.presentToast(this.$t("Commons.error"), "danger");
        });
    },

    getAdsCommunity() {
      // On récupére les communities\
      const communityId = this.$route.params.id;
      this.$store
        .dispatch("getAdsCommunity", communityId)
        .then(resp => {
          this.constructDataMap(resp.data['hydra:member']);
        })
        .catch(error => {
          console.log(error)
          this.presentToast(this.$t("Commons.error"), "danger");
        });
    },

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
          this.presentToast(this.$t("Commons.error"), "danger");
        });
    },

    leaveCommunity() {
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

    constructDataMap(data) {
      let polyline = [];
      data.forEach(element => {
        let result = [];
        element.outwardWaypoints.forEach(wayPoint => {
          result.push([wayPoint.address.latitude, wayPoint.address.longitude])
        });

        polyline.push(result)
      });

     this.LPolyline = polyline;
    }
  }
};
</script>
