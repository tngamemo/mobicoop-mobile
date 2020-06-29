<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>{{$t('solidaryTransport.volunteer.title')}} <sup>4/4</sup></ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content ref="volunteer" color="primary" class="is-scrollable">
      <div class="mc-st-container">
        <div class="mc-st-form">

          <div class="mc-st-form-content">
            <div class="mc-st-form-header">
              <div class="mc-st-form-title">{{$t('solidaryTransport.volunteer.steps.details')}}</div>
              <div class="mc-st-form-steps">
                <span class="mc-st-form-step is-validate"></span>
                <span class="mc-st-form-step is-validate"></span>
                <span class="mc-st-form-step is-validate"></span>
                <span class="mc-st-form-step is-active"></span>
              </div>
            </div>

            <div class="mc-st-form-item">
              <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.volunteer.form.fields.perimeter')}}</ion-label>

              <div class="mc-st-form-range-wrapper">
                <ion-range
                  ref="max-distance"
                  class="mc-st-form-range"
                  :min="volunteer.minDeviationDistance"
                  :max="volunteer.maxDeviationDistance"
                  :value="volunteer.maxDistance"
                  pin="true"
                  snaps="true"
                  ticks="false"
                  color="primary"
                  debounce="200"
                  @ionChange="changeMaxDistance($event)"
                >
                  <ion-label color="primary" slot="start">{{volunteer.minDeviationDistance}}km</ion-label>
                  <ion-label color="primary" slot="end">{{volunteer.maxDeviationDistance}}km</ion-label>
                </ion-range>
              </div>
            </div>

            <div class="mc-st-summary">
              <div class="mc-st-summary-text is-centered">
                Je suis prêt à me déplacer à <br><span class="answer">{{volunteer.maxDistance}}km de chez moi</span>.
              </div>
            </div>

            <template v-if="volunteer.structure">
              <div class="mc-st-form-item" v-if="volunteer.structure.needs.length !== 0">
                <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.volunteer.form.fields.needs')}}</ion-label>

                <div class="mc-st-form-checkbox-wrapper">
                  <ion-item class="mc-st-form-item" lines="none" v-for="(need, index) in volunteer.structure.needs" :key="index">
                    <ion-checkbox
                      class="mc-st-form-checkbox"
                      color="success"
                      slot="start"
                      :value="volunteer.needs[index].value"
                      :checked="volunteer.needs[index].value === true"
                      @ionChange="volunteer.needs[index].value = $event.target.checked;"
                    ></ion-checkbox>
                    <ion-label class="mc-st-form-label no-white-space" color="primary">{{ need.label }}</ion-label>
                  </ion-item>
                </div>
              </div>
            </template>

            <ion-item lines="none" class="mc-st-form-item">
              <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.volunteer.form.fields.vehicle')}}</ion-label>
              <ion-toggle
                :checked="volunteer.vehicle === true"
                @ionChange="changeVehicle($event)">
              </ion-toggle>
            </ion-item>

            <div class="mc-st-form-item" v-if="volunteer.structure.needs.length !== 0">
              <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.volunteer.form.fields.language')}}</ion-label>

              <div class="mc-st-form-checkbox-wrapper">
                <ion-item class="mc-st-form-item" lines="none" v-for="(language, index) in languages" :key="index">
                  <ion-checkbox
                    class="mc-st-form-checkbox"
                    color="success"
                    slot="start"
                    :value="language.value"
                    :checked="volunteer.languages.indexOf(language.value) !== -1"
                    @ionChange="changeLanguages($event)"
                  ></ion-checkbox>
                  <ion-label class="mc-st-form-label no-white-space" color="primary">{{ language.label }}</ion-label>
                </ion-item>
              </div>
            </div>

            <div class="mc-st-form-item as-comment">
              <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.volunteer.form.fields.comment')}}</ion-label>

              <ion-item class="mc-st-form-item as-textarea" lines="none">
                <ion-textarea :value="volunteer.comment" @ionChange="volunteer.comment = $event.target.value" :placeholder="$t('solidaryTransport.volunteer.form.fields.commentSample')" :auto-grow="true"></ion-textarea>
              </ion-item>
            </div>

            <ion-item class="mc-st-form-item as-agreement" lines="none">
              <ion-checkbox
                class="mc-st-form-checkbox"
                color="success"
                slot="start"
                :value="volunteer.userAgreementAccepted"
                @ionChange="volunteer.userAgreementAccepted = $event.target.checked"
              ></ion-checkbox>
              <ion-label class="mc-st-form-label no-white-space" color="primary">{{ $t('solidaryTransport.register.form.fields.agreement.accept', {'brand': brand}) }}</ion-label>
            </ion-item>
            <div class="mc-st-form-details">
              <span class="mc-st-form-note" @click="displayCGU()" v-html="$t('solidaryTransport.register.form.fields.agreement.read')"></span>

              <template v-if="$v.volunteer.userAgreementAccepted.$error">
                <div class="mc-st-form-error is-left"  v-if="!$v.volunteer.userAgreementAccepted.checked">{{$t('solidaryTransport.register.form.validators.checked')}}</div>
                <div class="mc-st-form-error is-left"  v-else-if="!$v.volunteer.userAgreementAccepted.required">{{$t('solidaryTransport.register.form.validators.required')}}</div>
              </template>
            </div>

          </div>

          <div class="mc-st-form-controls with-multiple">
            <ion-button class="mc-st-form-control as-back" color="light" v-html="$t('solidaryTransport.buttons.back')" @click="$router.back()"></ion-button>

            <ion-button class="mc-st-form-control" color="success" v-html="$t('solidaryTransport.buttons.next')" @click="validate()"></ion-button>
          </div>

        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="scss"></style>

<script>
import _ from 'lodash'
import { mapState, mapGetters } from 'vuex'
import { required, sameAs } from 'vuelidate/lib/validators'
import { toast } from '../../Shared/Mixin/toast.mixin'

export default {
  name: 'solidaryTransport.volunteer.details',
  components: {},
  data () {
    return {
      languages: this.$t('solidaryTransport.volunteer.form.fields.languages'),
      brand: process.env.VUE_APP_NAME
    }
  },
  computed: {
    ...mapGetters([]),
    volunteer: {
      get() {
        return this.$store.state.solidaryTransportStore.temporary.volunteer;
      },
      set() {
        this.$store.commit("solidaryVolunteerUpdate", this.volunteer);
      }
    }
  },
  validations: {
    volunteer: {
      userAgreementAccepted: {
        required,
        checked: sameAs( () => true )
      }
    },
  },
  mixins: [toast],
  methods: {
    displayCGU: function () {
      this.$router.push({ name: "solidaryTransport.article", query: { id: process.env.VUE_APP_SOLIDARY_CGU_ARTICLE_ID, title: this.$t('solidaryTransport.commons.cgu')}});
    },
    changeLanguages: function ($event) {
      this.volunteer.languages.push($event.target.value)
      this.volunteer.languages = _.uniq(this.volunteer.languages)
    },
    changeVehicle: function ($event) {
      this.volunteer.vehicle = $event.target.checked
    },
    changeMaxDistance: function ($event) {
      this.volunteer.maxDistance = $event.target.value
    },
    validate: function () {
      this.$v.$reset();
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$refs.volunteer.getScrollElement().then((parent) => {
          let child = document.getElementsByClassName('mc-st-form-error')[0]
          var childPos = child.offsetTop
          var parentPos = parent.offsetTop
          var top = childPos - parentPos - 30
          this.$refs.volunteer.scrollToPoint(0, top, 0)
        })
      } else {
        if (!this.processing) {
          this.processing = true
          this.$store.dispatch('postSolidaryVolunteer')
            .then((data) => {
              this.presentToast("Votre proposition en tant que bénévole à bien été envoyée", 'success');
              this.$router.push({name:'solidaryTransport.home'})
            })
            .catch((error) => {
              this.presentToast("Une erreur est survenue", 'danger')
            })
            .finally(() => {
              this.processing = false
            })
        }
      }
    }
  },
  mounted: function () {
    this.$refs['max-distance'].value = this.volunteer.maxDistance
  },
  created: function () {
    this.volunteer.maxDistance  = (this.volunteer.minDeviationDistance + this.volunteer.maxDeviationDistance)/2;
  }
}
</script>
