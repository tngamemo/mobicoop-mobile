<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>{{$t('solidaryTransport.profile.personal.title')}}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary">
      <div class="mc-st-container">
        <div class="mc-st-form">

          <div class="mc-st-form-content" v-if="user">

            <div class="mc-user-update-profile ion-margin-bottom" >
              <div class="mc-user-image">
                <ion-thumbnail v-if="user.avatars">
                  <img :src="user.avatars[0]" alt="">
                </ion-thumbnail>
              </div>

              <ion-button class='mc-small-button' color="primary" fill="outline" @click="$refs.imageInput.click()">
                <ion-icon class="ion-margin-end" name="create"></ion-icon> {{ $t('UpdateProfile.photo') }}
              </ion-button>
              <input ref="imageInput" style="display: none" type="file" @change="changePicture($event)" />
            </div>

            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.gender')}} *</ion-label>
              <ion-select 
                required
                :value="user.gender"
                @ionChange="user.gender = parseInt($event.target.value)"
                :cancel-text="$t('solidaryTransport.buttons.cancel')"
                :ok-text="$t('solidaryTransport.buttons.validate')"
              >
                <ion-select-option value="1">{{$t('solidaryTransport.commons.gender.female')}}</ion-select-option>
                <ion-select-option value="2">{{$t('solidaryTransport.commons.gender.male')}}</ion-select-option>
                <ion-select-option value="3">{{$t('solidaryTransport.commons.gender.nc')}}</ion-select-option>
              </ion-select>
            </ion-item>
            <div class="mc-st-form-details" v-if="$v.user.gender.$error">
              <span class="mc-st-form-error">{{$t('solidaryTransport.register.form.validators.required')}}</span>
            </div>

            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.firstname')}} *</ion-label>
              <ion-input 
                class="mc-st-form-input" 
                type="text" 
                :value="user.givenName" 
                @input="user.givenName = $event.target.value;"
              ></ion-input>
            </ion-item>
            <div class="mc-st-form-details">
              <span class="mc-st-form-note">{{$t('solidaryTransport.register.form.fields.visibility')}}</span>
              <span class="mc-st-form-error" v-if="$v.user.givenName.$error">{{$t('solidaryTransport.register.form.validators.required')}}</span>
            </div>

            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.lastname')}} *</ion-label>
              <ion-input 
                class="mc-st-form-input" 
                type="text" 
                :value="user.familyName" 
                @input="user.familyName = $event.target.value;"
              ></ion-input>
            </ion-item>
            <div class="mc-st-form-details" v-if="$v.user.familyName.$error">
              <span class="mc-st-form-error">{{$t('solidaryTransport.register.form.validators.required')}}</span>
            </div>

            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.birthdate')}} *</ion-label>
              <ion-datetime
                display-format="DD/MM/YYYY"
                picker-format="DD/MM/YYYY"
                :cancel-text="$t('solidaryTransport.buttons.cancel')"
                :done-text="$t('solidaryTransport.buttons.validate')"
                :value="user.birthDate"
                @ionChange="user.birthDate = $event.detail.value; $v.$reset('user.birthDate');"
              ></ion-datetime>
            </ion-item>
            <div class="mc-st-form-details" v-if="$v.user.birthDate.$error">
              <span class="mc-st-form-error" v-if="!$v.user.birthDate.required">{{$t('solidaryTransport.register.form.validators.required')}}</span>
              <span class="mc-st-form-error" v-else-if="!$v.user.birthDate.isMaxBirthDate">{{$t('solidaryTransport.register.form.validators.age', { value: minAge })}}</span>
            </div>

            <ion-item class="mc-st-form-item" v-on:click="displayGeoSearch()">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.address')}} *</ion-label>
              <ion-input
                type="text"
                :value="getAddressToDisplay(user.addresses[0])"
                readonly="true"
                class="no-clickable"
              ></ion-input>
            </ion-item>
            <div class="mc-st-form-details" v-if="$v.user.addresses.$error">
              <span class="mc-st-form-error" v-if="!$v.user.addresses.required">{{$t('solidaryTransport.register.form.validators.required')}}</span>
            </div>

            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.phone')}} *</ion-label>
              <ion-input
                class="mc-st-form-input" 
                type="text"
                :value="user.telephone"
                @input="user.telephone = $event.target.value;"
              ></ion-input>
            </ion-item>
            <div class="mc-st-form-details" v-if="$v.user.telephone.$error">
              <span class="mc-st-form-error" v-if="!$v.user.telephone.minLength">{{$t('solidaryTransport.register.form.validators.telephone')}}</span>
              <span class="mc-st-form-error" v-else-if="!$v.user.telephone.required">{{$t('solidaryTransport.register.form.validators.required')}}</span>
            </div>

            <ion-item class="mc-st-form-item">
              <ion-label position="floating">{{$t('solidaryTransport.register.form.fields.email')}} *</ion-label>
              <ion-input 
                class="mc-st-form-input" 
                type="email"
                :value="user.email"
                @ionChange="checkMail()" 
                @input="user.email = $event.target.value"
              ></ion-input>
              <ion-icon class="mc-st-form-icon rotating" v-show="checking" slot="end" size="medium" color="primary" name="sync"></ion-icon>
            </ion-item>
            
          </div>

          <div class="mc-st-form-controls with-multiple" :class="{'is-loading': processing}">
            <ion-button class="mc-st-form-control as-back" color="light" v-html="$t('solidaryTransport.buttons.back')" @click="$router.back()"></ion-button>

            <ion-button class="mc-st-form-control as-loader" color="success" @click="updateUser()">
              <ion-icon slot="start" name="sync" size="large"></ion-icon>
              <span v-html="$t('solidaryTransport.buttons.save')"></span>
            </ion-button>
          </div>

        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="scss"></style>

<script>
import _ from 'lodash'
import moment from 'moment'
import { mapGetters, mapState } from 'vuex'
import { required, between, email, sameAs, minLength, helpers } from 'vuelidate/lib/validators'
import { toast } from '../../Shared/Mixin/toast.mixin'

const oneUppercase = helpers.regex("oneUppercase", /[A-Z]/);
const oneDigit = helpers.regex("oneDigit", /\d/);
const isMaxBirthDate = (value, vm) => {
  let n = new Date();
  n.setFullYear(n.getFullYear() - process.env.VUE_APP_REGISTER_MIN_AGE);
  return moment(value).isBefore(moment(n.toISOString()));
}

export default {
  name: 'solidaryTransport.profile.personal',
  components: {},
  data () {
    return {
      user: undefined,
      maxBirthDate: new Date().toISOString(),
      checking: false,
      processing: false
    }
  },
  computed: {
    ...mapGetters([
      'getAddressToDisplay'
    ])
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
  created() {
    if(this.$store.state.userStore.userToUpdate == null) {
      this.$store.state.userStore.userToUpdate = this.$store.state.userStore.user;
    }
    this.user = this.$store.state.userStore.userToUpdate;
  },
  methods: {
    changePicture(e) {
      const file = e.target.files[0];
      if (file.size <= 1000000) {
        if (this.user.images.length > 0) {
          Promise.all([this.user.images.map(item => {
            return this.$store.dispatch('deleteImage', item.id);
          })]).then(() => {
            this.updateUserPicture(file)
          })
        } else {
          this.updateUserPicture(file)
        }
      } else {
        this.presentToast(this.$t("UpdateProfile.file-size"), 'danger')
      }

    },
    updateUserPicture(file) {
      this.$store.dispatch('updateUserPicture', { userId : this.user.id, file: file })
        .then(res => {
          this.$store.dispatch('getUser', { idUser: this.user.id }).then(res => {
            this.user.avatars = this.$store.state.userStore.user.avatars;
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
          this.$router.back();
          this.$store.state.userStore.userToUpdate = null;
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
    changeNewsSubscription(event){
      this.user.newsSubscription = event.detail.checked
    }
  }
}
</script>