<template>
  <div class="ion-page">
    <ion-header no-border>
      <ion-toolbar color="background">
        <ion-buttons slot="start">
          <ion-back-button default-href="profile"></ion-back-button>
        </ion-buttons>
        <h1 class="ion-text-center"> {{ $t('UpdateProfile.title') }} </h1>
      </ion-toolbar>
    </ion-header>

    <ion-content color="background" no-bounce>
      <div class="mc-white-container">

        <div v-if="user">
          <!-- Bloc photo -->
          <div class="mc-user-update-profile ion-margin-bottom" >
            <div class="mc-user-image">
              <ion-thumbnail v-if="!! user.avatars">
                <img :src="user.avatars[0]" alt="">
              </ion-thumbnail>
            </div>

            <ion-button class='mc-small-button' color="primary" fill="outline" @click="$refs.imageInput.click()">
              <ion-icon class="ion-margin-end" name="create"></ion-icon> {{ $t('UpdateProfile.photo') }}
            </ion-button>
            <input ref="imageInput" style="display: none" type="file" @change="changePicture($event)" />
          </div>

          <!-- Form -->

          <ion-item>
            <ion-label position="floating">{{$t('Register.givenName')}} *</ion-label>
            <ion-input
              type="text"
              :placeholder="$t('Register.givenName') + '*'"
              :value="user.givenName"
              @input="user.givenName = $event.target.value;"
            >
            </ion-input>
          </ion-item>
          <div v-if="$v.user.givenName.$error">
            <div class="mc-error-label"  v-if="!$v.user.givenName.required">{{$t('Validation.required')}}</div>
          </div>

          <ion-item>
            <ion-label position="floating">{{$t('Register.familyName')}} *</ion-label>
            <ion-input
              type="text"
              :placeholder="$t('Register.familyName') + '*'"
              :value="user.familyName"
              @input="user.familyName = $event.target.value;"
            >
            </ion-input>
          </ion-item>
          <div v-if="$v.user.familyName.$error">
            <div class="mc-error-label"  v-if="!$v.user.familyName.required">{{$t('Validation.required')}}</div>
          </div>

          <ion-item>
            <ion-label position="floating">{{$t('Register.gender')}} *</ion-label>
            <ion-select
              required
              :value="user.gender"
              @ionChange="user.gender = Number($event.target.value)"
              :cancel-text="$t('Commons.cancel')"
              :placeholder="$t('Register.gender')"
            >
              <ion-select-option value="3">{{$t('Register.nc')}}</ion-select-option>
              <ion-select-option value="2">{{$t('Register.male')}}</ion-select-option>
              <ion-select-option value="1">{{$t('Register.female')}}</ion-select-option>
            </ion-select>
          </ion-item>
          <div v-if="$v.user.gender.$error">
            <div class="mc-error-label"  v-if="!$v.user.gender.required">{{$t('Validation.required')}}</div>
          </div>

          <ion-item>
            <ion-label position="floating">{{$t('Register.email')}} *</ion-label>
            <ion-input
              type="text"
              :placeholder="$t('Register.email') + '*'"
              :value="user.email"
              disabled
              @input="user.email = $event.target.value;"
            >
            </ion-input>
          </ion-item>
          <div v-if="$v.user.email.$error">
            <div class="mc-error-label"  v-if="!$v.user.email.required">{{$t('Validation.required')}}</div>
            <div class="mc-error-label"  v-if="!$v.user.email.email">{{$t('Validation.email')}}</div>
          </div>

          <ion-item>
            <ion-label position="floating">{{$t('Register.phone')}} *</ion-label>
            <ion-input
              type="text"
              name="telephone"
              :value="user.telephone"
              @input="user.telephone = $event.target.value;"
              :placeholder="$t('Register.phone')"
            ></ion-input>
            <ion-icon slot="end" color="success" class="ion-margin-top" v-if="user.phoneValidatedDate" name="checkmark"></ion-icon>
          </ion-item>
          <div v-if="$v.user.telephone.$error">
            <div class="mc-error-label"  v-if="!$v.user.telephone.required">{{$t('Validation.required')}}</div>
          </div>

          <div v-if="!user.phoneValidatedDate" class="mc-button-phone">
            <ion-button class='mc-small-button' fill="outline" color="primary" v-on:click='setPhoneToken'>
              {{ $t('UpdateProfile.phoneToken') }}
            </ion-button>
          </div>


          <div class="phone-visibility">
            <ion-item lines="none">
              <ion-radio-group>
                <ion-item color="background" lines="none" >
                  <ion-label class="ion-text-wrap">{{$t('UpdateProfile.visibility-accepted')}}</ion-label>
                  <ion-radio slot="start" value="1" :checked="user.phoneDisplay == 1" @ionSelect="user.phoneDisplay = 1"></ion-radio>
                </ion-item>

                <ion-item color="background" lines="none">
                  <ion-label class="ion-text-wrap">{{$t('UpdateProfile.visibility-all')}}</ion-label>
                  <ion-radio slot="start" value="2" :checked="user.phoneDisplay == 2" @ionSelect="user.phoneDisplay = 2"></ion-radio>
                </ion-item>
              </ion-radio-group>
            </ion-item>
          </div>


          <ion-item  v-on:click="goGeoSearch('update_user_address', 'search')">
            <ion-label position="floating">{{$t('Register.address')}} *</ion-label>
            <ion-input
              type="text"
              name="address"
              :value="user.addresses[0].addressLocality"
              readonly="true"
              class="no-clickable"
              v-bind:placeholder="$t('Register.address')"
            ></ion-input>
          </ion-item>
          <div v-if="$v.user.addresses.$error">
            <div class="mc-error-label"  v-if="!$v.user.addresses.required">{{$t('Validation.required')}}</div>
          </div>

          <ion-item>
            <ion-label position="floating">{{ $t('Register.birthDate') }} *</ion-label>
            <ion-datetime
              display-format="DD/MM/YYYY"
              picker-format="DD/MM/YYYY"
              :cancel-text="$t('Commons.cancel')"
              :done-text="$t('Commons.validate')"
              :max="maxBirthDate"
              :value="user.birthDate"
              @ionChange="user.birthDate = $event.detail.value"
            ></ion-datetime>
          </ion-item>
          <div v-if="$v.user.birthDate.$error">
            <div class="mc-error-label"  v-if="!$v.user.birthDate.required">{{$t('Validation.required')}}</div>
          </div>

          <br>
          <ion-button class='mc-small-button' color="success" expand="block" @click="updateUser">
            {{ $t('Commons.save') }}
          </ion-button>

        </div>

      </div>
    </ion-content>
  </div>
</template>

<style lang="scss">
  .mc-user-update-profile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--ion-color-primary);

    .mc-user-bloc-info {
      display: flex;
    }

    ion-thumbnail {
      --size: 90px;
      --border-radius: 50%;
    }
  }

  .phone-visibility {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .mc-button-phone {
    text-align: right;
    width: 100%;
  }
</style>

<script>
  import { required, email, sameAs, minLength, helpers } from 'vuelidate/lib/validators'
  import { toast } from '../../Shared/Mixin/toast.mixin';

  export default {
    name: 'update-profile',
    data () {
      return {
        user: Object.assign({}, this.$store.state.userStore.user ),
        maxBirthDate: new Date().toISOString()
      }
    },
    mixins: [toast],
    validations: {
      user: {
        givenName: {
          required,
        },
        familyName: {
          required
        },
        gender: {
          required,
        },
        email: {
          required,
          email
        },
        telephone: {
          required,
        },
        addresses: {
          required
        },
        birthDate: {
          required
        }
      }
    },
    methods: {
      changePicture(e) {
        const file = e.target.files[0];
        this.$store.dispatch('updateUserPicture', { userId : this.user.id, file: file })
          .then(res => {
            this.$store.dispatch('getUser', { idUser: this.user.id }).then(res => {
              this.user = Object.assign({}, this.$store.state.userStore.user );
            });
            this.presentToast(this.$t("UpdateProfile.picture-success"), 'success')
          })
          .catch(err => {
            this.presentToast(this.$t("Commons.error"), 'danger')
          });
      },
      updateUser() {
        this.$store.dispatch('updateUser', this.user)
          .then(res => {
            this.$router.push('profile');
            this.presentToast(this.$t("UpdateProfile.success"), 'success')
          })
          .catch(err => {
            this.presentToast(this.$t("Commons.error"), 'danger')
          });
      },
      setPhoneToken() {
        this.$store.dispatch('generatePhoneToken', this.user.id)
          .then(res => {
            this.displayPhoneTokenAlert();
          })
          .catch(() => {
            this.presentToast(this.$t("Commons.error"), "danger");
          });

      },
      displayPhoneTokenAlert() {
        return this.$ionic.alertController
          .create({
            header: this.$t('UpdateProfile.phoneTokenPopup'),
            inputs: [
              {
                name: "phoneToken",
                id: "phoneToken",
                placeholder: this.$t('UpdateProfile.phoneTokenPopup')
              }
            ],
            buttons: [
              {
                text: 'Annuler',
                role: "cancel",
                cssClass: "secondary",
                handler: () => {

                }
              },
              {
                text: 'Vérifier',
                handler: data => {
                  if (data.phoneToken) {
                    this.checkPhoneToken(data.phoneToken);
                  } else {
                    this.presentToast(
                      `Il n'y a pas de code`,
                      "danger"
                    );
                  }
                }
              }
            ]
          })
          .then(a => a.present());
      },
      checkPhoneToken(phoneToken) {
        this.$store.dispatch('checkPhoneTokenPost', {telephone : this.user.telephone, phoneToken : phoneToken})
          .then(res => {
            if (res) {
              this.user = Object.assign({}, this.$store.state.userStore.user );
              this.presentToast(this.$t("Commons.success"), "success");
            } else {
              this.presentToast(this.$t("Commons.error"), "tertiary");
            }
          })
          .catch(() => {
            this.presentToast(this.$t("Commons.error"), "tertiary");
          });
      },
      goGeoSearch(type, action) {
        this.$router.push({ name: "geoSearch", query: { type, action }});
      },
    }
  }
</script>
