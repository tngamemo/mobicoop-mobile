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
        <!--
        <div class="mc-post-community-avatar ion-margin-bottom">
          <div class="mc-community-image">
            <ion-thumbnail>
              <img :src="communityToPost.avatar[0]" alt />
            </ion-thumbnail>
          </div>

          <ion-button
            class="mc-small-button"
            color="primary"
            fill="outline"
            @click="$refs.imageInput.click()"
          >
            <ion-icon class="ion-margin-end" name="create"></ion-icon>
            {{ $t('PostCommunity.avatar') }}
          </ion-button>
          <input ref="imageInput" style="display: none" type="file" @change="changePicture($event)" />
        </div>
        -->

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

export default {
  name: "post-community",
  mixins: [toast],
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
    }
  },
  created() {
    if (!!!this.communityToPost) {
      this.$store.commit("init_post_community");
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
            this.$store.commit("init_post_community");
            this.$router.push({ name: "communities" });
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
    changePicture(e) {
      const file = e.target.files[0];
      //todo updateCommunityPicture
    },
    domainInfo() {
      this.presentToast(this.$t("PostCommunity.restriction-detail"), "secondary");
    }
  }
};
</script>
