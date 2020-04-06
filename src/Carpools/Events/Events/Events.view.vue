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
        <MiniMap :LMarker="LMarker" />
        <div class="mc-events-search">
          <ion-searchbar
            @ionInput="searchText = $event.target.value"
            @ionClear="searchText = ''"
            color="transparent"
            placeholder="Rechercher un événement"
          ></ion-searchbar>
        </div>

        <ion-button
          class="mc-big-button"
          color="success"
          expand="block"
          v-on:click="goToPostEvent()"
        >
          <ion-icon name="add" class="ion-padding-end"></ion-icon>
          {{ $t('Events.create')}}
        </ion-button>

        <div class="mc-events-see-history">
          <span
            v-on:click="changeSortEvent()"
          >{{ this.sortEvent == "currentEvents" ? $t('Events.seePastEvent') : $t('Events.seeCurrentEvent')}}</span>
        </div>
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
              <p class="mc-events-date" v-if="event.fromDate">
                Début: {{event.fromDate | moment('utc', 'DD/MM/YYYY')}}
                <span
                  v-if="event.useTime"
                >à {{event.fromDate | moment('utc', 'HH[h]mm')}}</span>
              </p>
              <p class="mc-events-date" v-if="event.toDate">
                Fin: {{event.toDate | moment('utc', 'DD/MM/YYYY')}}
                <span
                  v-if="event.useTime"
                >à {{event.toDate | moment('utc', 'HH[h]mm')}}</span>
              </p>
              <ion-button v-if="sortEvent == 'currentEvents'" color="success" expand="block">
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

  .mc-events-see-history {
    text-align: right;
    span {
      opacity: 0.5;
      cursor: pointer;
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

    .mc-events-date {
      margin: 0px;
      font-style: italic !important;
      font-weight: initial;
      font-size: small;
    }
  }
}
</style>

<script>
import { toast } from "../../../Shared/Mixin/toast.mixin";
import MiniMap from "../../Shared/Components/MiniMap.component";

export default {
  name: "carpool-events",
  mixins: [toast],
  data() {
    return {
      searchText: "",
      LMarker: null,
      sortEvent: "currentEvents"
    };
  },
  components: {
    MiniMap
  },
  created() {
    // On récupére les communities
    this.$store
      .dispatch("getAllEvents")
      .then(resp => {
        this.getMarkerMap(this.$store.getters[this.sortEvent]);
      })
      .catch(error => {
        this.presentToast(this.$t("Commons.error"), "danger");
      });
  },
  computed: {
    events() {
      if (!!this.$store.getters[this.sortEvent]) {
        return this.$store.getters[this.sortEvent].filter(event => {
          return event.name
            .toUpperCase()
            .includes(this.searchText.toUpperCase());
        });
      }
    }
  },
  methods: {
    goToPostEvent() {
      this.$router.push({
        name: "post-event"
      });
    },

    goToEvent(idEvent) {
      if (this.sortEvent == "currentEvents") {
        this.$router.push({
          name: "carpool-event",
          params: { id: idEvent }
        });
      }
    },

    getMarkerMap(data) {
      const result = [];
      data.forEach(element => {
        result.push({
          latlng: [element.address.latitude, element.address.longitude],
          name: element.name
        });
      });
      this.LMarker = result;
    },

    changeSortEvent() {
      if (this.sortEvent == "currentEvents") {
        this.sortEvent = "pastEvents";
      } else {
        this.sortEvent = "currentEvents";
      }

      this.getMarkerMap(this.$store.getters[this.sortEvent]);
    }
  }
};
</script>
