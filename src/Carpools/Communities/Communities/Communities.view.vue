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
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center">{{ $t('Communities.title') }}</h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" no-bounce>
      <div
        class="ion-text-center ion-margin-top"
        v-if="this.$store.getters.statusGetCommunities == 'loading'"
      >
        <ion-icon size="large" color="light" class="rotating" name="md-sync"></ion-icon>
      </div>

      <div
        class="mc-communities-first-block"
        v-if="this.$store.getters.statusGetCommunities != 'loading'"
      >
        <div class="mc-my-communities" v-if="!!userCommunities">
          <p>{{ $t('Communities.myCommunities')}}</p>
          <div class="d-flex" style="overflow-y: scroll">
            <div
              item
              v-for="(commu, index) in userCommunities"
              :key="index"
              class="mc-my-community pointer"
              v-on:click="goToCommunity(commu.id)"
            >
              <ion-thumbnail>
                <img :src="!!commu.images[0] && commu.images[0].versions.square_250" />
              </ion-thumbnail>
            </div>
          </div>
        </div>

        <div class="mc-communities-search">
          <ion-searchbar
            @ionInput="searchText = $event.target.value"
            @ionClear="searchText = ''"
            color="transparent"
            placeholder="Rechercher une communauté"
          ></ion-searchbar>
        </div>

        <ion-button v-if="canCreateCommunity" class="mc-big-button" color="success" expand="block" v-on:click="goToPostCommunity()">
          <ion-icon name="add" class="ion-padding-end"></ion-icon>
          {{ $t('Communities.create')}}
        </ion-button>
      </div>
      <div class="mc-white-container">
        <div class="ion-text-center ion-margin-top" v-if="!communities">
          <ion-icon size="large" color="primary" class="rotating" name="md-sync"></ion-icon>
        </div>
        <ion-item
          item
          v-for="(commu, index) in communities"
          :key="index"
          v-on:click="goToCommunity(commu.id)"
        >
          <div class="d-flex mc-communities-community">
            <div class="mc-communities-avatar">
              <ion-thumbnail>
                <img :src="!!commu.images[0] && commu.images[0].versions.square_250" alt />
              </ion-thumbnail>
            </div>
            <div class="mc-communities-text">
              <div>{{commu.name}}</div>
              <ion-button color="success">
                <ion-icon slot="start" name="eye" style="margin-left: 0px"></ion-icon>
                {{ $t('Communities.see') }}
              </ion-button>
            </div>
          </div>
        </ion-item>

        <ion-infinite-scroll threshold="100px" id="infinite-scroll">
          <ion-infinite-scroll-content
            loadingSpinner="circles"
            loadingText="Chargement...">
          </ion-infinite-scroll-content>
        </ion-infinite-scroll>

      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
.mc-communities-first-block {
  margin: 30px;
  .mc-my-communities {
    margin-bottom: 20px;
    padding-bottom: 10px;
    font-weight: bold;
    border-bottom: 1px solid white;
    .mc-my-community {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-weight: bolds;

      ion-thumbnail {
        --border-radius: 50%;
        --size: 60px;
        margin-right: 20px;
      }
    }
  }
  .searchbar-input {
    box-shadow: none !important;
  }
  .mc-communities-search {
    margin-bottom: 20px;
    ion-searchbar {
      --box-shadow: none !important;
      border-bottom: 1px solid white;
    }
  }
}

.mc-communities-community {
  padding: 10px;
  .mc-communities-avatar {
    ion-thumbnail {
      --border-radius: 50%;
    }
  }

  .mc-communities-text {
    margin-left: 20px;
    color: var(--ion-color-primary);
    font-weight: bold;

    ion-button {
      --border-radius: 30px !important;
    }
  }
}
</style>

<script>
import { toast } from "../../../Shared/Mixin/toast.mixin";

export default {
  name: "carpool-communities",
  mixins: [toast],
  data() {
    return {
      searchText: "",
      canCreateCommunity: JSON.parse(process.env.VUE_APP_CAN_CREATE_COMMUNITY)
    };
  },
  created() {
    // On récupére les communities
    this.$store.state.communityStore.page = 1;
    this.getAllCommunities();

    if (!!this.$store.getters.userId) {
      this.$store.dispatch("getUserCommunities").catch(error => {
        this.presentToast(this.$t("Commons.error"), "danger");
      });
    }


  },
  mounted() {
    const infiniteScroll = document.getElementById('infinite-scroll');

    infiniteScroll.addEventListener('ionInfinite', event => {
      setTimeout(() => {
        this.$store.state.communityStore.page = this.$store.state.communityStore.page + 1;
        this.getAllCommunities();
        event.target.complete();

        // App logic to determine if all data is loaded
        // and disable the infinite scroll
        if (this.$store.state.communityStore.communities.length >= this.$store.state.communityStore.total) {
          event.target.disabled = true;
        }
      }, 500);
    });
  },
  computed: {
    communities() {
      if (!!this.$store.getters.communities) {
        return this.$store.getters.communities.filter(commu => {
          return commu.name
            .toUpperCase()
            .includes(this.searchText.toUpperCase());
        });
      }
    },

    userCommunities() {
      return this.$store.getters.userCommunities;
    }
  },
  methods: {
    getAllCommunities() {
      this.$store.dispatch("getAllCommunities").catch(error => {
        this.presentToast(this.$t("Commons.error"), "danger");
      });
    },
    goToPostCommunity() {
      this.$router.push({
        name: "post-community",
      });
    },

    goToCommunity(idCommu) {
      this.$router.push({
        name: "carpool-community",
        params: { id: idCommu }
      });
    }
  }
};
</script>
