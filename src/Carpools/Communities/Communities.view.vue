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
      <div class="ion-text-center ion-margin-top" v-if="this.$store.getters.statusGetCommunities != 'loading'">
        <ion-icon size="large" color="primary" class="rotating" name="md-sync"></ion-icon>
      </div>

      <div class="mc-communities-first-block">
        <div class="mc-my-communities" v-if="!!userCommunities">
          <p>{{ $t('Communities.myCommunities')}}</p>
          <div class="d-flex">
            <div
              item
              v-for="(commu, index) in userCommunities"
              :key="index"
              class="mc-my-community"
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

        <ion-button class="mc-big-button" color="success" expand="block" v-on:click="showToast()">
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
                <img :src="!!commu.images[0] && commu.images[0].versions.square_250" />
              </ion-thumbnail>
            </div>
            <div class="mc-communities-text">
              {{commu.name}}
              <ion-button color="success" expand="block">
                <ion-icon name="eye" class="ion-padding-end"></ion-icon>
                {{ $t('Communities.see') }}
              </ion-button>
            </div>
          </div>
        </ion-item>
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
import { toast } from "../../Shared/Mixin/toast.mixin";

export default {
  name: "carpool-communities",
  mixins: [toast],
  data() {
    return {
      searchText: ""
    };
  },
  created() {
    // On récupére les communities
    this.$store.dispatch("getAllCommunities").catch(error => {
      this.presentToast(this.$t("Commons.error"), "danger");
    });

    if (!!this.$store.getters.userId) {
      this.$store.dispatch("getUserCommunities").catch(error => {
        this.presentToast(this.$t("Commons.error"), "danger");
      });
    }
  },
  computed: {
    communities() {
      return this.$store.getters.communities.filter(commu => {
        return commu.name.toUpperCase().includes(this.searchText.toUpperCase());
      });
    },

    userCommunities() {
      return this.$store.getters.userCommunities;
    }
  },
  methods: {
    showToast() {
      this.presentToast(this.$t("Communities.notDevelopp"), "warning");
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
