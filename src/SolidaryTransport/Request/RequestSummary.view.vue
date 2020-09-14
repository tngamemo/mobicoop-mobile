<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>{{$t('solidaryTransport.' + type + '.title')}} <sup>6/6</sup></ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content ref="request" color="primary" class="is-scrollable" v-if="!success">
      <div class="mc-st-container">
        <div class="mc-st-form">

          <div class="mc-st-form-content">
            <div class="mc-st-form-header">
              <div class="mc-st-form-title">{{$t('solidaryTransport.' + type + '.steps.summary')}}</div>
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
              <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.' + type + '.form.fields.you')}}</ion-label>
            </div>

            <div class="mc-st-summary">

              <!-- User Information -->
              <div class="mc-st-summary-text">
                Je suis <span class="answer">{{request.givenName || 'John'}} {{request.familyName || 'Doe'}}</span>, <span class="answer">{{getUserAge(request) || 100}} ans</span>, habitant à <span class="answer" v-if="request.homeAddress">{{request.homeAddress.county}}</span>. Je suis joignable par téléphone au <span class="answer">{{request.telephone || '0000000000'}}</span> <span v-if="request.email">ou bien par mail via l'adresse <span class="answer">{{request.email}}</span></span> .
              </div>

            </div>

            <div class="mc-st-form-item">
              <ion-label class="mc-st-form-label as-title no-white-space" color="primary">{{$t('solidaryTransport.' + type + '.form.fields.yourRequest')}}</ion-label>
            </div>

            <div class="mc-st-summary">

              <div class="mc-st-summary-text" v-if="request.subject">
                {{$t('solidaryTransport.' + this.type +'.summary.wish')}} <span class="answer">{{getRequestSubjectToDisplay(request)}}</span>.
              </div>

              <template v-if="request.frequency === 1">
                <div class="mc-st-summary-text" v-if="request.subject">
                  {{$t('solidaryTransport.' + this.type +'.summary.is')}} <span class="answer">ponctuelle</span>.

                  {{$t('solidaryTransport.' + this.type +'.summary.start')}}
                  <template v-if="request.when.departure.specificDate"> le <span class="answer">{{$moment(request.when.departure.specificDate).format('D MMMM YYYY')}}</span>
                  </template>

                  <template v-if="request.when.departure.marginDate">
                    <span class="answer">{{getLabelForKeyToDisplay(departureDates,request.when.departure.marginDate)}}</span>
                  </template>

                  <template v-if="request.when.departure.specificHour"> à <span class="answer">{{$moment(request.when.departure.specificHour).format('HH[h]mm')}}</span>
                  </template>

                  <template v-if="request.when.departure.marginHour">, de préférence <span class="answer">{{getHourForKeyToDisplay(departureHours,request.when.departure.marginHour)}}</span>
                  </template>

                  <span v-if="request.when.return.specificHour || request.when.return.marginHour"> {{$t('solidaryTransport.' + this.type +'.summary.end')}} </span>
                  <template v-if="request.when.return.specificHour"> à <span class="answer">{{$moment(request.when.return.specificHour).format('HH[h]mm')}}</span>
                  </template>

                  <template v-if="request.when.return.marginHour">
                    <span class="answer">{{getHourForKeyToDisplay(returnHours,request.when.return.marginHour)}}</span>
                  </template>.
                </div>

                <div class="mc-st-summary-card">
                  <div class="mc-st-summary-card-header">
                    <span>Votre aller</span>
                    <span v-if="request.when.departure.marginHour">, {{getHourForKeyToDisplay(departureHours,request.when.departure.marginHour)}}</span>
                  </div>
                  <div class="mc-st-summary-card-content">
                    <div class="times" v-if="request.when.departure.specificHour">
                      <div class="time as-from">{{$moment(request.when.departure.specificHour).format('HH[h]mm')}}</div>
                    </div>
                    <div class="times" v-else></div>
                    <div class="places">
                      <div class="place as-from" v-if="request.origin">
                        <span class="city">{{request.origin.county}}</span>
                        <span class="address">{{request.origin.streetAddress}}</span>
                      </div>
                      <div class="place as-to">
                        <template v-if="request.destination">
                          <span class="city">{{request.destination.county}}</span>
                          <span class="address">{{request.destination.streetAddress}}</span>
                        </template>
                        <template v-else>
                          <span class="city">A définir ultérieurement</span>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mc-st-summary-card" v-if="request.when.return.specificHour || request.when.return.marginHour">
                  <div class="mc-st-summary-card-header">
                    <span>Votre retour</span>
                    <span v-if="request.when.return.marginHour">, {{getHourForKeyToDisplay(returnHours,request.when.return.marginHour)}}</span>
                  </div>
                  <div class="mc-st-summary-card-content">
                    <div class="times" v-if="request.when.return.specificHour">
                      <div class="time as-from">{{$moment(request.when.return.specificHour).format('HH[h]mm')}}</div>
                    </div>
                    <div class="times" v-else></div>
                    <div class="places">
                      <div class="place as-from">
                        <template v-if="request.destination">
                          <span class="city">{{request.destination.county}}</span>
                          <span class="address">{{request.destination.streetAddress}}</span>
                        </template>
                        <template v-else>
                          <span class="city">A définir ultérieurement</span>
                        </template>
                      </div>
                      <div class="place as-to" v-if="request.origin">
                        <span class="city">{{request.origin.county}}</span>
                        <span class="address">{{request.origin.streetAddress}}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </template>

              <template v-if="request.frequency === 2">
                <div class="mc-st-summary-text" v-if="request.subject">
                  {{$t('solidaryTransport.' + type + '.summary.is')}} <span class="answer">régulière</span> et concerne les jours suivants :
                </div>

                <div class="mc-st-form-days-wrapper">
                  <ion-button class="mc-st-form-day" :color="request.days[day.value] ? 'primary' : 'light'" v-for="(day, index) in departureDays" :key="day.value">
                    <span class="label">{{day.label}}</span>
                  </ion-button>
                </div>

                <div class="mc-st-summary-card">
                  <div class="mc-st-summary-card-header">
                    <span>Votre aller</span>
                    <span v-if="request.when.departure.marginHour">, {{getHourForKeyToDisplay(departureHours,request.when.departure.marginHour)}}</span>
                  </div>
                  <div class="mc-st-summary-card-content">
                    <div class="times" v-if="request.when.departure.specificHour">
                      <div class="time as-from">{{$moment(request.when.departure.specificHour).format('HH[h]mm')}}</div>
                    </div>
                    <div class="times" v-else></div>
                    <div class="places">
                      <div class="place as-from" v-if="request.origin">
                        <span class="city">{{request.origin.county}}</span>
                        <span class="address">{{request.origin.streetAddress}}</span>
                      </div>
                      <div class="place as-to">
                        <template v-if="request.destination">
                          <span class="city">{{request.destination.county}}</span>
                          <span class="address">{{request.destination.streetAddress}}</span>
                        </template>
                        <template v-else>
                          <span class="city">A définir ultérieurement</span>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mc-st-summary-card" v-if="request.when.return.marginHour !== 'no-need'">
                  <div class="mc-st-summary-card-header">
                    <span>Votre retour</span>
                    <span v-if="request.when.return.marginHour">, {{getHourForKeyToDisplay(returnHours,request.when.return.marginHour)}}</span>
                  </div>
                  <div class="mc-st-summary-card-content">
                    <div class="times" v-if="request.when.return.specificHour">
                      <div class="time as-from">{{$moment(request.when.return.specificHour).format('HH[h]mm')}}</div>
                    </div>
                    <div class="times" v-else></div>
                    <div class="places">
                      <div class="place as-from">
                        <template v-if="request.destination">
                          <span class="city">{{request.destination.county}}</span>
                          <span class="address">{{request.destination.streetAddress}}</span>
                        </template>
                        <template v-else>
                          <span class="city">A définir ultérieurement</span>
                        </template>
                      </div>
                      <div class="place as-to" v-if="request.origin">
                        <span class="city">{{request.origin.county}}</span>
                        <span class="address">{{request.origin.streetAddress}}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mc-st-summary-text" v-if="request.subject">
                  Je ferai ce trajet du <span class="answer">{{$moment(request.when.departure.specificDate).format('D MMMM YYYY')}}</span> au <span class="answer">{{$moment(request.when.return.specificDate).format('D MMMM YYYY')}}</span><template v-if="request.when.return.marginHour === 'no-need'"> et <span class="answer">{{getHourForKeyToDisplay(returnHours,request.when.return.marginHour)}}</span></template>.
                </div>

              </template>
            </div>

          </div>

          <div class="mc-st-form-controls in-summary" :class="{'is-loading': processing}">
            <ion-button class="mc-st-form-control as-back" color="light" v-html="$t('solidaryTransport.buttons.back')" @click="$router.back()"></ion-button>

            <ion-button class="mc-st-form-control as-loader" color="success" v-show="processing">
              <ion-icon slot="start" name="sync" size="large"></ion-icon>
              <span v-html="$t('solidaryTransport.' + type + '.form.fields.sendRequest')"></span>
            </ion-button>
            <ion-button class="mc-st-form-control" color="success" @click="validate()" v-show="!processing">
              <ion-icon slot="start" name="checkmark" size="large"></ion-icon>
              <span v-html="$t('solidaryTransport.' + type + '.form.fields.sendRequest')"></span>
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
import { mapState, mapGetters } from 'vuex'
import { toast } from '../../Shared/Mixin/toast.mixin'

export default {
  name: 'solidaryTransport.request.summary',
  components: {},
  data () {
    return {
      processing: false,
      success: false,
      type: this.$route.meta.type,
      departureDates: this.$t('solidaryTransport.' + this.$route.meta.type + '.form.fields.when.departure.dates'),
      departureDays: this.$t('solidaryTransport.' + this.$route.meta.type + '.form.fields.when.departure.days'),
      departureHours: [],
      returnHours: []
    }
  },
  computed: {
    ...mapGetters([
      'getUserAge',
      'getRequestSubjectToDisplay',
      'getLabelForKeyToDisplay',
      'getHourForKeyToDisplay'
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
      if (!this.processing) {
        this.processing = true
        this.$store.dispatch('postSolidaryResource', this.type)
          .then((data) => {
            this.presentToast("Votre demande de coup de pouce a été envoyée", 'success');
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
  },
  created: function () {
    this.departureHours.push({'value': 'morning', 'min_time': this.request.structure.mMinTime, 'max_time': this.request.structure.mMaxTime});
    this.departureHours.push({'value': 'afternoon', 'min_time': this.request.structure.aMinTime, 'max_time': this.request.structure.aMaxTime});
    this.departureHours.push({'value': 'evening', 'min_time': this.request.structure.eMinTime, 'max_time': this.request.structure.eMaxTime});
    this.returnHours.push({'value': 'morning','min_time': this.request.structure.mMinTime, 'max_time': this.request.structure.mMaxTime});
    this.returnHours.push({'value': 'afternoon', 'min_time': this.request.structure.aMinTime, 'max_time': this.request.structure.aMaxTime});
    this.returnHours.push({'value': 'evening', 'min_time': this.request.structure.eMinTime, 'max_time': this.request.structure.eMaxTime});
  }
}
</script>
