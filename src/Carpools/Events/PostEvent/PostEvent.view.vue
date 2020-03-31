<template>
  <div class="ion-page">
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="profile"></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center">{{ $t('PostEvent.title') }}</h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" no-bounce>
      <div class="mc-white-container mc-post-event" v-if="eventToPost">
        <ion-item>
          <ion-label position="floating">{{$t('PostEvent.name')}} *</ion-label>
          <ion-input
            type="text"
            :placeholder="$t('PostEvent.name') + '*'"
            :value="eventToPost.name"
            @input="eventToPost.name = $event.target.value;"
          ></ion-input>
        </ion-item>
        <div v-if="$v.eventToPost.name.$error">
          <div
            class="mc-error-label"
            v-if="!$v.eventToPost.name.required"
          >{{$t('Validation.required')}}</div>
        </div>

        <ion-item>
          <ion-label position="floating">{{$t('PostEvent.url')}}</ion-label>
          <ion-input
            type="text"
            :placeholder="$t('PostEvent.url')"
            :value="eventToPost.url"
            @input="eventToPost.url = $event.target.value;"
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">{{$t('PostEvent.description')}} *</ion-label>
          <ion-input
            type="text"
            :placeholder="$t('PostEvent.description') + '*'"
            :value="eventToPost.description"
            @input="eventToPost.description = $event.target.value;"
          ></ion-input>
        </ion-item>
        <div v-if="$v.eventToPost.description.$error">
          <div
            class="mc-error-label"
            v-if="!$v.eventToPost.description.required"
          >{{$t('Validation.required')}}</div>
        </div>

        <ion-item>
          <ion-textarea
            required
            :value="eventToPost.fullDescription"
            @ionChange="eventToPost.fullDescription = $event.target.value"
            :placeholder="$t('PostEvent.fullDescription')"
          ></ion-textarea>
        </ion-item>
        <div v-if="$v.eventToPost.fullDescription.$error">
          <div
            class="mc-error-label"
            v-if="!$v.eventToPost.fullDescription.required"
          >{{$t('Validation.required')}}</div>
        </div>
        <ion-item v-on:click="goGeoSearch('update_user_address', 'search')">
          <ion-label position="floating">{{$t('PostEvent.address')}} *</ion-label>
          <ion-input
            type="text"
            name="address"
            :value="eventToPost.address.addressLocality"
            readonly="true"
            class="no-clickable"
            v-bind:placeholder="$t('Register.address')"
          ></ion-input>
        </ion-item>
        <div v-if="$v.eventToPost.address.$error">
          <div
            class="mc-error-label"
            v-if="!$v.eventToPost.address.required"
          >{{$t('Validation.required')}}</div>
        </div>

        <ion-item>
          <ion-label position="floating">Date de début</ion-label>
          <ion-datetime
            display-format="DD/MM/YY"
            picker-format="DD/MM/YY"
            cancel-text="Annuler"
            done-text="Valider"
            :placeholder="$t('PostEvent.fromDate')"
            :value="eventToPost.fromDate"
            @ionChange="eventToPost.fromDate = $event.detail.value"
          ></ion-datetime>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Date de fin</ion-label>
          <ion-datetime
            display-format="DD/MM/YY"
            picker-format="DD/MM/YY"
            cancel-text="Annuler"
            done-text="Valider"
            :placeholder="$t('PostEvent.toDate')"
            :value="eventToPost.toDate"
            @ionChange="eventToPost.toDate = $event.detail.value"
          ></ion-datetime>
        </ion-item>

        <br />
        <ion-button class="mc-small-button" color="success" expand="block" @click="PostEvent()">
          <span v-if="this.$store.getters.statusPostEvent == 'loading'">
            <ion-icon size="large" class="rotating" name="md-sync"></ion-icon>
          </span>
          <span v-if="this.$store.getters.statusPostEvent != 'loading'">{{ $t('PostEvent.create') }}</span>
        </ion-button>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
.mc-post-event {
  .mc-post-event-avatar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--ion-color-primary);

    ion-thumbnail {
      --size: 90px;
      --border-radius: 50%;
    }
  }
  ion-item {
    margin-bottom: 20px;
  }
}
</style>

<script>
import {
  required,
  email,
  sameAs,
  minLength,
  helpers
} from "vuelidate/lib/validators";
import { toast } from "../../../Shared/Mixin/toast.mixin";

export default {
  name: "post-event",
  mixins: [toast],
  validations: {
    eventToPost: {
      name: {
        required
      },
      description: {
        required
      },
      fullDescription: {
        required
      },
      address: {
        required
      }
    }
  },
  computed: {
    eventToPost() {
      return this.$store.getters.postEvent;
    }
  },
  created() {
    if (!!!this.eventToPost) {
      this.$store.commit("init_post_event");
    }
  },
  methods: {
    PostEvent() {
      this.$v.$reset();
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.presentToast(this.$t("PostEvent.missingInfo"), "danger");
      } else {
        if (!! this.eventToPost.fromDate || !! this.eventToPost.toDate) {
          this.eventToPost.useTime = true;
        }
         this.eventToPost.user = this.$store.getters.user["@id"];

         this.$store
          .dispatch("postEvent", this.eventToPost)
          .then(resp => {
            this.presentToast(this.$t("EventPost.success"), "success");
            this.$store.commit("init_post_event");
            this.$router.push({ name: "events" });
          })
          .catch(err => {
            this.presentToast(this.$t("Commons.error"), "danger");
          });
      }
    },
    goGeoSearch(type, action) {
      this.$router.push({
        name: "geoSearch",
        query: { type: "update_event_address", action: "search" }
      });
    }
  }
};
</script>
