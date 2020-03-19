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
      <div class="mc-communities-first-block">
        <div class="mc-my-communities" v-if="!!userCommunities">
          <p>Mes communautés:</p>
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
              {{commu.name}}
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

        <ion-button class="mc-big-button" color="success" expand="block">
          <ion-icon name="add" class="ion-padding-end"></ion-icon>Créer une communauté
        </ion-button>
      </div>
      <div class="mc-white-container">
        <ion-item item v-for="(commu, index) in communities" :key="index">
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
      border: 1px solid white;
      border-radius: 50%;
      width: 80px;
      height: 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-weight: bolds;

      ion-thumbnail {
        --border-radius: 50%;
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
export default {
  name: "carpool-communities",
  data() {
    return {
      searchText: ""
    };
  },
  created() {
    // On récupére les communities
    this.$store.dispatch("getAllCommunities");

    if (!!this.$store.getters.userId) {
      this.$store.dispatch("getUserCommunities");
    }
  },
  computed: {
    communities() {
      return this.$store.getters.communities.filter(commu => {
        console.log(commu.name.toUpperCase())
        return commu.name.toUpperCase().includes(this.searchText.toUpperCase())
      });
    },

    userCommunities() {
      return this.$store.getters.userCommunities;
    }
  },
  methods: {}
};
</script>
