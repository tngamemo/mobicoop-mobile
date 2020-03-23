<template>
  <div class="ion-page">
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center">{{ $t('Events.title') }}</h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" no-bounce>
      <div class="mc-events-first-block">

        <div class="mc-events-search">
          <ion-searchbar
            @ionInput="searchText = $event.target.value"
            @ionClear="searchText = ''"
            color="transparent"
            placeholder="Rechercher un événement"
          ></ion-searchbar>
        </div>

        <ion-button class="mc-big-button" color="success" expand="block" v-on:click="showToast()">
          <ion-icon name="add" class="ion-padding-end"></ion-icon>
          {{ $t('Events.create')}}
        </ion-button>
      </div>
      <div class="mc-white-container">
        <div class="ion-text-center ion-margin-top" v-if="!events">
          <ion-icon size="large" color="primary" class="rotating" name="md-sync"></ion-icon>
        </div>
        <ion-item
          item
          v-for="(event, index) in events"
          :key="index"
          v-on:click="goToEvent(event.id)"
        >
          <div class="d-flex mc-events-item">
            <div class="mc-events-avatar">
              <ion-thumbnail>
                <img :src="!!event.images[0] && event.images[0].versions.square_250" />
              </ion-thumbnail>
            </div>
            <div class="mc-events-text">
              {{event.name}}
              <ion-button color="success" expand="block">
                <ion-icon name="eye" class="ion-padding-end"></ion-icon>
                {{ $t('Events.see') }}
              </ion-button>
            </div>
          </div>
        </ion-item>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
.mc-events-first-block {
  margin: 30px;
  .searchbar-input {
    box-shadow: none !important;
  }
  .mc-events-search {
    margin-bottom: 20px;
    ion-searchbar {
      --box-shadow: none !important;
      border-bottom: 1px solid white;
    }
  }
}

.mc-events-item {
  padding: 10px;
  .mc-events-avatar {
    ion-thumbnail {
      --border-radius: 50%;
    }
  }

  .mc-events-text {
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
  name: "carpool-events",
  mixins: [toast],
  data() {
    return {
      searchText: ""
    };
  },
  created() {
    // On récupére les communities
    this.$store.dispatch("getAllEvents").catch(error => {
      this.presentToast(this.$t("Commons.error"), "danger");
    });
  },
  computed: {
    events() {
      return this.$store.getters.events.filter(event => {
        return event.name.toUpperCase().includes(this.searchText.toUpperCase());
      });
    },
  },
  methods: {
    showToast() {
      this.presentToast(this.$t("Events.notDevelopp"), "warning");
    },

    goToEvent(idEvent) {
      this.$router.push({
        name: "carpool-event",
        params: { id: idEvent }
      });
    }
  }
};
</script>
