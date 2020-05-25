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
          >{{ this.type == "after" ? $t('Events.seePastEvent') : $t('Events.seeCurrentEvent')}}</span>
        </div>
      </div>
      <div class="mc-white-container">
        <div class="ion-text-center ion-margin-top" v-if="$store.state.eventStore.page == 1 && $store.state.eventStore.statusGetEvents == 'loading'">
          <ion-icon size="large" color="primary" class="rotating" name="md-sync"></ion-icon>
        </div>

        <div v-if="!($store.state.eventStore.page == 1 && $store.state.eventStore.statusGetEvents == 'loading')">
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
              <ion-button v-if="type == 'after'" color="success" expand="block">
                <ion-icon name="eye" class="ion-padding-end"></ion-icon>
                {{ $t('Events.see') }}
              </ion-button>
            </div>
          </div>
        </ion-item>
        </div>

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
    };
  },
  components: {
    MiniMap
  },
  created() {
    // On récupére les communities
    this.$store.state.eventStore.page = 1;
    this.getAllEvents();
  },
  mounted() {
    const infiniteScroll = document.getElementById('infinite-scroll');

    infiniteScroll.addEventListener('ionInfinite', event => {
      setTimeout(() => {
        this.$store.state.eventStore.page = this.$store.state.eventStore.page + 1;
        this.getAllEvents();
        event.target.complete();

        // App logic to determine if all data is loaded
        // and disable the infinite scroll
        if (this.$store.state.eventStore.events.length >= this.$store.state.eventStore.total) {
          event.target.disabled = true;
        }
      }, 500);
    });
  },
  computed: {
    type() {
      return this.$store.state.eventStore.type;
    },
    events() {
        return this.$store.state.eventStore.events.filter(event => {
          return event.name
            .toUpperCase()
            .includes(this.searchText.toUpperCase());
        });
    }
  },
  methods: {
    getAllEvents() {
      this.$store.dispatch("getAllEvents").then(resp => {
          this.getMarkerMap(this.$store.state.eventStore.events);
        }).catch(error => {
          this.presentToast(this.$t("Commons.error"), "danger");
        });
    },
    goToPostEvent() {
      this.$router.push({
        name: "post-event"
      });
    },

    goToEvent(idEvent) {
      if (this.type == "after") {
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
      if (this.type == "after") {
        this.$store.state.eventStore.type = "strictly_before";
        this.$store.state.eventStore.page = 1;
        this.getAllEvents();
      } else {
        this.$store.state.eventStore.type = "after";
        this.$store.state.eventStore.page = 1;
        this.getAllEvents();
      }
    }
  }
};
</script>
