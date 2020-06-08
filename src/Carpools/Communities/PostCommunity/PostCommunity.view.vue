import Compressor from "compressorjs";
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
        <h1 class="ion-text-center">{{ $t('PostCommunity.title') }}</h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" no-bounce>
      <div class="mc-white-container mc-post-community" v-if="communityToPost">
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

        <!-- Form -->

        <ion-item>
          <ion-label position="floating">{{$t('PostCommunity.name')}} *</ion-label>
          <ion-input
            type="text"
            :placeholder="$t('PostCommunity.name') + '*'"
            :value="communityToPost.name"
            @input="communityToPost.name = $event.target.value;"
          ></ion-input>
        </ion-item>
        <div v-if="$v.communityToPost.name.$error">
          <div
            class="mc-error-label"
            v-if="!$v.communityToPost.name.required"
          >{{$t('Validation.required')}}</div>
        </div>

        <ion-item>
          <ion-label position="floating">{{$t('PostCommunity.description')}} *</ion-label>
          <ion-input
            type="text"
            :placeholder="$t('PostCommunity.description') + '*'"
            :value="communityToPost.description"
            @input="communityToPost.description = $event.target.value;"
          ></ion-input>
        </ion-item>
        <div v-if="$v.communityToPost.description.$error">
          <div
            class="mc-error-label"
            v-if="!$v.communityToPost.description.required"
          >{{$t('Validation.required')}}</div>
        </div>

        <ion-item>
          <ion-label position="floating">{{$t('PostCommunity.maxiDescription')}}</ion-label>
          <ion-textarea
            required
            :value="communityToPost.fullDescription"
            @ionChange="communityToPost.fullDescription = $event.target.value"
            :placeholder="$t('PostCommunity.maxiDescription')"
          ></ion-textarea>
        </ion-item>
        <div v-if="$v.communityToPost.fullDescription.$error">
          <div
            class="mc-error-label"
            v-if="!$v.communityToPost.fullDescription.required"
          >{{$t('Validation.required')}}</div>
        </div>
        <ion-item v-on:click="goGeoSearch('update_user_address', 'search')">
          <ion-label position="floating">{{$t('PostCommunity.address')}} *</ion-label>
          <ion-input
            type="text"
            name="address"
            :value="communityToPost.address.addressLocality"
            readonly="true"
            class="no-clickable"
            v-bind:placeholder="$t('Register.address')"
          ></ion-input>
        </ion-item>
        <div v-if="$v.communityToPost.address.$error">
          <div
            class="mc-error-label"
            v-if="!$v.communityToPost.address.required"
          >{{$t('Validation.required')}}</div>
        </div>
        <ion-item>
          <ion-label position="floating">{{$t('PostCommunity.restriction')}}</ion-label>
          <ion-input
            type="text"
            :placeholder="$t('PostCommunity.restriction')"
            :value="communityToPost.domain"
            @input="communityToPost.domain = $event.target.value;"
          ></ion-input>
          <ion-icon style="margin-top:20px" @click="domainInfo()" slot="end" name="information-circle-outline"></ion-icon>
        </ion-item>

        <br />
        <ion-button class="mc-small-button" color="success" expand="block" @click="postCommunity()">
          <span v-if="this.$store.getters.statusPostCommunity == 'loading'">
            <ion-icon size="large" class="rotating" name="md-sync"></ion-icon>
          </span>
          <span
            v-if="this.$store.getters.statusPostCommunity != 'loading'"
          >{{ $t('PostCommunity.create') }}</span>
        </ion-button>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
.mc-post-community {
  .mc-post-community-avatar {
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
import Compressor from 'compressorjs';

export default {
  name: "post-community",
  mixins: [toast],
  data() {
    return {
      image: null
    }
  },
  validations: {
    communityToPost: {
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
    communityToPost() {
      return this.$store.getters.postCommunity;
    },
    file() {
      return this.$store.state.communityStore.file;
    }
  },
  created() {
    if (!!!this.communityToPost) {
      this.$store.commit("init_post_community");
    }
  },
  mounted() {
    if (this.file) {
      this.getBase64(this.file);
    }
  },
  methods: {
    postCommunity() {
      this.$v.$reset();
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.presentToast(this.$t("PostCommunity.missingInfo"), "danger");
      } else {
        this.communityToPost.user = this.$store.getters.user["@id"];
        this.communityToPost.communityUsers = [
          { user: this.communityToPost.user }
        ];
        this.$store
          .dispatch("postCommunity", this.communityToPost)
          .then(resp => {
            this.presentToast(this.$t("PostCommunity.success"), "success");
            if (this.file) {
              this.$store.dispatch("updateCommunityPicture", {communityId: resp.data.id, communityFile: this.file}).then(() => {
                this.$store.commit("init_post_community");
                this.$router.back();
              }).catch( () => {
                this.$store.commit("init_post_community");
                this.$router.back();
              });
            } else {
              this.$store.commit("init_post_community");
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
        query: { type: "update_community_address", action: "search" }
      });
    },
    domainInfo() {
      this.presentToast(this.$t("PostCommunity.restriction-detail"), "secondary");
    },
    changePicture(e) {
      const file = e.target.files[0];
      if (file) {
        this.compressFile(file);
      }
    },
    compressFile: function (file) {
      const context = this;
      new Compressor(file, {
        convertSize: 1000000,
        success(result) {
          if (result) {
            const f = new File([result], file.name, {type: result.type});
            context.$store.state.communityStore.file = f;
            context.getBase64(f);
          }
        },
        error(err) {
          context.presentToast(this.$t("Commons.error"), 'danger')
        },
      });
    },
    getBase64(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.image = reader.result
      };
      reader.onerror = (error) => {
        console.log('Error: ', error);
      };
    }
  }
};
</script>
