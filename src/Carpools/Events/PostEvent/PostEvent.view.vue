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
          <ion-back-button default-href="profile"></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center">{{ $t('PostEvent.title') }}</h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" no-bounce>
      <div class="mc-white-container mc-post-event" v-if="eventToPost">
        <!-- Bloc photo -->
        <div class="mc-user-update-profile ion-margin-bottom" >
          <div class="mc-user-image">
            <ion-thumbnail>
              <img v-if="image" :src="image" alt="">
            </ion-thumbnail>
          </div>

          <ion-button class='mc-small-button' color="primary" fill="outline" @click="$refs.imageInput.click()">
            <ion-icon class="ion-margin-end" name="create"></ion-icon> {{ $t('UpdateProfile.photo') }}
          </ion-button>
          <input ref="imageInput" style="display: none" type="file" @change="changePicture($event)" />
        </div>

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
          <div class="mc-error-label"  v-if="!$v.eventToPost.description.maxLength">{{$t('Validation.maxLength', { value: 255 })}}</div>
        </div>

        <ion-item>
          <ion-label position="floating">{{$t('PostEvent.fullDescription')}} *</ion-label>
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
          <ion-label position="floating">Date de début *</ion-label>
          <ion-datetime
            display-format="DD/MM/YY"
            picker-format="DD/MM/YY"
            cancel-text="Annuler"
            done-text="Valider"
            :placeholder="$t('PostEvent.fromDate')"
            @ionChange="eventToPost.fromDate = $event.detail.value"
          ></ion-datetime>
        </ion-item>
        <div v-if="$v.eventToPost.fromDate.$error">
          <div
            class="mc-error-label"
            v-if="!$v.eventToPost.fromDate.required"
          >{{$t('Validation.required')}}</div>
        </div>


        <ion-item v-if="!! eventToPost.fromDate">
          <ion-label position="floating">Heure de début</ion-label>
          <ion-datetime
            display-format="HH:mm"
            picker-format="HH:mm"
            cancel-text="Annuler"
            done-text="Valider"
            placeholder="Heure de début"
            @ionChange="changeBeginHour($event.detail.value)"
          ></ion-datetime>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Date de fin *</ion-label>
          <ion-datetime
            display-format="DD/MM/YY"
            picker-format="DD/MM/YY"
            cancel-text="Annuler"
            done-text="Valider"
            :placeholder="$t('PostEvent.toDate')"
            @ionChange="eventToPost.toDate = $event.detail.value"
          ></ion-datetime>
        </ion-item>
        <div v-if="$v.eventToPost.toDate.$error">
          <div
            class="mc-error-label"
            v-if="!$v.eventToPost.toDate.required"
          >{{$t('Validation.required')}}</div>
        </div>

        <ion-item v-if="!! eventToPost.toDate">
          <ion-label position="floating">Heure de fin</ion-label>
          <ion-datetime
            display-format="HH:mm"
            picker-format="HH:mm"
            cancel-text="Annuler"
            done-text="Valider"
            placeholder="Heure de fin"
            @ionChange="changeEndHour($event.detail.value)"
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
    margin-top: 20px;
  }
}
</style>

<script>
import {
  required,
  maxLength,
} from "vuelidate/lib/validators";
import { toast } from "../../../Shared/Mixin/toast.mixin";

export default {
  name: "post-event",
  mixins: [toast],
  data() {
    return {
      image: null
    }
  },
  validations: {
    eventToPost: {
      name: {
        required
      },
      description: {
        required,
        maxLength: maxLength(255)
      },
      fullDescription: {
        required
      },
      address: {
        required
      },
      fromDate: {
        required
      },
      toDate: {
        required
      }
    }
  },
  computed: {
    eventToPost() {
      return this.$store.getters.postEvent;
    },
    file() {
      return this.$store.state.eventStore.file;
    }
  },
  created() {
    if (!!!this.eventToPost) {
      this.$store.commit("init_post_event");
    }

  },
  mounted() {
    if (this.file) {
      this.getBase64(this.file);
    }
  },
  methods: {
    PostEvent() {
      this.$v.$reset();
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.presentToast(this.$t("PostEvent.missingInfo"), "danger");
      } else {

         this.eventToPost.user = this.$store.getters.user["@id"];

         this.$store
          .dispatch("postEvent", this.eventToPost)
          .then(resp => {
            this.presentToast(this.$t("Event.success"), "success");
            if (this.file) {
              this.$store.dispatch("updateEventPicture", {eventId: resp.data.id, eventFile: this.file}).then(() => {
                this.$store.commit("init_post_event");
                this.$router.back();
              }).catch( () => {
                this.$store.commit("init_post_event");
                this.$router.back();
              });
            } else {
              this.$store.commit("init_post_event");
              this.$router.back();
            }

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
    },

    changeBeginHour(value) {
      const hour = this.$moment(value).format('HH');
      const min = this.$moment(value).format('mm');

      const date = new Date(this.eventToPost.fromDate);
      date.setHours(hour);
      date.setMinutes(min);
      this.eventToPost.fromDate = this.$moment(date).utc().format();
      this.eventToPost.useTime = true;
    },

    changeEndHour(value) {
      const hour = this.$moment(value).format('HH');
      const min = this.$moment(value).format('mm');

      const date = new Date(this.eventToPost.toDate);
      date.setHours(hour);
      date.setMinutes(min);
      this.eventToPost.toDate = this.$moment(date).utc().format();
      this.eventToPost.useTime = true;
    },

    changePicture(e) {
      const file = e.target.files[0];
      if (file.size <= 1000000) {
        this.$store.state.eventStore.file = file;
        this.getBase64(file);
      } else {
        this.presentToast(this.$t("UpdateProfile.file-size"), 'danger')
      }
    },
    getBase64(file) {
      console.log(this.file);
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(this.file);
        this.image = reader.result
      };
      reader.onerror = (error) => {
        console.log('Error: ', error);
      };
    }
  }
};
</script>
