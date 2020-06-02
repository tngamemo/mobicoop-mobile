<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>{{$t('solidaryTransport.request.title')}} <sup>6/6</sup></ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content ref="request" color="primary" class="is-scrollable">
      <div class="mc-st-container">
        <div class="mc-st-form">

          <div class="mc-st-form-content">
            <div class="mc-st-form-header">
              <div class="mc-st-form-title">{{$t('solidaryTransport.request.steps.summary')}}</div>
              <div class="mc-st-form-steps">
                <span class="mc-st-form-step is-validate"></span>
                <span class="mc-st-form-step is-validate"></span>
                <span class="mc-st-form-step is-validate"></span>
                <span class="mc-st-form-step is-validate"></span>
                <span class="mc-st-form-step is-validate"></span>
                <span class="mc-st-form-step is-active"></span>
              </div>
            </div>

            <div class="mc-st-form-item">
              <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.request.form.fields.you')}}</ion-label>
            </div>

            <div class="mc-st-summary">

              <!-- User Information -->
              <div class="mc-st-summary-text">
                Vous êtes <span class="answer">{{request.givenName || 'John'}} {{request.familyName || 'Doe'}}</span>, <span class="answer">{{getUserAge(request) || 100}} ans</span>, habitant à <span class="answer">{{getCityToDisplay(request.homeAddress)}}</span>. Vous êtes joignable par téléphone au <span class="answer">{{request.telephone || '0000000000'}}</span> ou bien par mail via l'adresse <span class="answer">{{request.email || 'john@doe.com'}}</span>.
              </div>

            </div>

            <div class="mc-st-form-item">
              <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.request.form.fields.yourRequest')}}</ion-label>
            </div>

            <div class="mc-st-summary">

              <div class="mc-st-summary-text" v-if="request.subject">
                Vous souhaitez vous déplacer pour <span class="answer">{{getRequestSubjectToDisplay(request)}}</span>.
              </div>

              <div class="mc-st-summary-text" v-if="request.subject">
                Vous souhaitez vous déplacer pour <span class="answer">{{getRequestSubjectToDisplay(request)}}</span>.
              </div>

              <div class="mc-st-summary-card" v-if="request.when.departure.specificDate">
                <div class="mc-st-summary-card-header">12 juillet 2020</div>
                <div class="mc-st-summary-card-content">
                  <div class="times">
                    <div class="time as-from">9h00</div>
                    <div class="time as-to">9h10</div>
                  </div>
                  <div class="places">
                    <div class="place as-from">
                      <span class="city">Rennes</span>
                      <span class="address">Rue Hippolyte Vatar</span>
                    </div>
                    <div class="place as-to">
                      <span class="city">Rennes</span>
                      <span class="address">Ruelle aux Chapeliers</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mc-st-summary-card" v-if="request.when.return.specificDate">
                <div class="mc-st-summary-card-header">12 juillet 2020</div>
                <div class="mc-st-summary-card-content">
                  <div class="times">
                    <div class="time as-from">10h30</div>
                    <div class="time as-to">10h40</div>
                  </div>
                  <div class="places">
                    <div class="place as-from">
                      <span class="city">Rennes</span>
                      <span class="address">Allée Verlaine</span>
                    </div>
                    <div class="place as-to">
                      <span class="city">Rennes</span>
                      <span class="address">Rue Yvonne Jean-Haffen</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          <div class="mc-st-form-controls in-summary">
            <ion-button class="mc-st-form-control as-back" color="light" v-html="$t('solidaryTransport.buttons.back')" @click="$router.back()"></ion-button>

            <ion-button class="mc-st-form-control" color="success" v-html="$t('solidaryTransport.buttons.sendRequest')" @click="validate()"></ion-button>
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
import { toast } from '../../Shared/Mixin/toast.mixin'

export default {
  name: 'solidaryTransport.request.summary',
  components: {},
  data () {
    return {
      processing: false
    }
  },
  computed: {
    ...mapGetters([
      'getCityToDisplay',
      'getUserAge',
      'getRequestSubjectToDisplay'
    ]),
    request: {
      get() {
        return this.$store.state.solidaryTransportStore.temporary.request;
      },
      set() {
        this.$store.commit("solidaryRequestUpdate", this.request);
      }
    }
  },
  mixins: [toast],
  methods: {
    validate: function () {
      console.log('Push request in the DB')
    }
  },
  created: function () {
    if (_.isEmpty(this.request.origin)) {
      this.request.origin = _.cloneDeep(this.request.homeAddress)
    }
  }
}
</script>