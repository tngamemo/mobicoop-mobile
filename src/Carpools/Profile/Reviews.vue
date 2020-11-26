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
        <h1 class="ion-text-center"> {{ $t('Reviews.title') }} </h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary" no-bounce>
      <div class="mc-white-container">
        <ion-segment class="mb-20" :value="tab" @ionChange="segmentChanged($event)">
          <ion-segment-button value="toGive">
            <ion-label>{{ $t('Reviews.toGive') }}</ion-label>
          </ion-segment-button>
          <ion-segment-button value="received">
            <ion-label>{{ $t('Reviews.received') }}</ion-label>
          </ion-segment-button>
          <ion-segment-button value="given">
            <ion-label>{{ $t('Reviews.given') }}</ion-label>
          </ion-segment-button>
        </ion-segment>

        <div class="ion-text-center" v-if="$store.state.reviewStore.statusReviews == 'loading'">
          <ion-icon size="large" color="primary" class="rotating"  name="md-sync"></ion-icon>
        </div>

        <div v-if="$store.state.reviewStore.statusReviews == 'success'">
          <div v-if="tab == 'toGive'">
            <div v-for="review in reviews.reviewsToGive">
              <div class="d-flex align-center mc-user" style="margin-bottom: 5px;">
                <div class="mc-user-image">
                  <ion-thumbnail v-if="!!review.reviewed.avatar">
                    <img :src="review.reviewed.avatar" alt="" />
                  </ion-thumbnail>
                </div>
                <b>{{review.reviewed.givenName}} {{review.reviewed.shortFamilyName}}</b>
              </div>
              <div class="d-flex justify-end" style="margin-bottom: 5px;">
                <ion-icon style="margin-right: 5px; margin-left: 0px;" color="primary" class="ion-margin-end" name="quote"></ion-icon>
                <div class="mc-review-text"><ion-textarea auto-grow="true" v-bind:value="review.content" @input="review.content = $event.target.value"></ion-textarea></div>
                <ion-icon style="margin-right: 0px; margin-left: 5px; margin-top: auto" color="primary" class="ion-margin-end" name="quote"></ion-icon>
              </div>
              <div class="d-flex justify-end">
                <ion-button style="margin-right: 20px" class='mc-small-button' color="success" @click="sendReview(review)">
                  {{ $t('Commons.send') }}
                </ion-button>
              </div>
            </div>
          </div>
          <div v-if="tab == 'received'">
            <div v-for="review in reviews.receivedReviews">
              <div class="mc-review-bubble">
                <div style="margin-bottom: -10px"><ion-icon style="margin-right: 5px; margin-left: 0px;" color="primary" class="ion-margin-end" name="quote"></ion-icon></div>
                <div style="margin: 0px 25px;"><b>{{ review.content}}</b></div>
                <div style="margin-top: -10px" class="d-flex justify-end"><ion-icon style="margin-right: 0px; margin-left: 5px; margin-top: auto" color="primary" class="ion-margin-end" name="quote"></ion-icon></div>
              </div>
              <div class="d-flex justify-end align-center mc-user" style="margin-bottom: 5px;">
                <div class="mc-user-image">
                  <ion-thumbnail v-if="!!review.reviewer.avatar">
                    <img :src="review.reviewer.avatar" alt="" />
                  </ion-thumbnail>
                </div>
                <b>{{review.reviewer.givenName}} {{review.reviewer.shortFamilyName}}</b><span style="margin-right: 5px; margin-left: 5px"> - </span> {{review.date | moment('utc', 'DD/MM/YYYY')}}
              </div>
            </div>
          </div>
          <div v-if="tab == 'given'">
            <div v-for="review in reviews.givenReviews">
              <div class="mc-review-bubble">
                <div style="margin-bottom: -10px"><ion-icon style="margin-right: 5px; margin-left: 0px;" color="primary" class="ion-margin-end" name="quote"></ion-icon></div>
                <div style="margin: 0px 25px;"><b>{{ review.content}}</b></div>
                <div style="margin-top: -10px" class="d-flex justify-end"><ion-icon style="margin-right: 0px; margin-left: 5px; margin-top: auto" color="primary" class="ion-margin-end" name="quote"></ion-icon></div>
              </div>
              <div class="d-flex justify-end align-center mc-user" style="margin-bottom: 5px;">
                <div class="mc-user-image">
                  <ion-thumbnail v-if="!!review.reviewed.avatar">
                    <img :src="review.reviewed.avatar" alt="" />
                  </ion-thumbnail>
                </div>
                <b>{{review.reviewed.givenName}} {{review.reviewed.shortFamilyName}} </b><span style="margin-right: 5px; margin-left: 5px"> - </span> {{review.date | moment('utc', 'DD/MM/YYYY')}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
  hr {
    background-color: rgba(0, 0, 0, 0.4);
    margin-top: 25px;
    margin-bottom: 25px;
  }

  .mb-20 {
    margin-bottom: 20px
  }

  ion-textarea {
    --padding-top: 5px
  }

  .mc-user {
    color: var(--ion-color-primary);
  }

  .mc-user-image {
    margin-right: 10px;
  }

  ion-thumbnail {
    --size: 40px;
    --border-radius: 50%;
  }

  .mc-review-text {
     width: 80%;
     border: solid 2px var(--ion-color-primary);
     border-radius: 0px 10px 10px 10px;
  }

  .mc-review-bubble {
    margin-left: auto;
    width: fit-content;
    max-width: 80%;
    background: #F5F6FA;
    border-radius: 10px 10px 0px 10px;
    padding: 5px 10px;
    margin-bottom: 5px;
    color: #00000080;
  }

</style>

<script>

  export default {
    name: 'reviews',
    data () {
      return {
        tab : 'toGive'
      }
    },
    components: {

    },
    created() {
      this.$store.dispatch('getReviews').then(res => {}).catch(err => {});
    },
    computed: {
      reviews: {
        get() {
          console.log(this.$store.state.reviewStore.resultReviews);
          return this.$store.state.reviewStore.resultReviews
        },
      }
    },
    methods: {
      segmentChanged(event) {
        this.tab = event.detail.value
      },
      sendReview(review) {
        this.$store.dispatch('sendReview', review).then(res => {
          this.$store.dispatch('getReviews').then(res => {}).catch(err => {});
        }).catch(err => {
          this.$store.dispatch('getReviews').then(res => {}).catch(err => {});
        });
      }
    }
  }
</script>
