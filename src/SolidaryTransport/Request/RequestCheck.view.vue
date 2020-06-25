<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>{{$t('solidaryTransport.' + type + '.title')}} <sup>2/6</sup></ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content ref="request" color="primary" class="is-scrollable">
      <div class="mc-st-container">
        <div class="mc-st-form">

          <div class="mc-st-form-content">
            <div class="mc-st-form-header">
              <div class="mc-st-form-title">{{$t('solidaryTransport.' + type + '.steps.check')}}</div>
              <div class="mc-st-form-steps">
                <span class="mc-st-form-step is-validate"></span>
                <span class="mc-st-form-step is-active"></span>
                <span class="mc-st-form-step"></span>
                <span class="mc-st-form-step"></span>
                <span class="mc-st-form-step"></span>
                <span class="mc-st-form-step"></span>
              </div>
            </div>

            <template v-if="structures">

              <ion-item class="mc-st-form-item">
                <ion-label class="mc-st-form-label as-title" color="primary" position="stacked">{{$t('solidaryTransport.' + type + '.form.fields.structure')}} :</ion-label>
                <ion-select
                  required
                  :value="request.structure.id"
                  @ionChange="changeStructure($event)"
                  :cancel-text="$t('solidaryTransport.buttons.cancel')"
                  :ok-text="$t('solidaryTransport.buttons.validate')"
                >
                  <ion-select-option :value="structure.id" v-for="(structure, index) in structures" :key="index">{{structure.name}}</ion-select-option>
                </ion-select>
              </ion-item>
              <div class="mc-st-form-details">
                <span class="mc-st-form-note">{{$t('solidaryTransport.' + type + '.form.fields.structures')}}</span>
                <span class="mc-st-form-error is-left" v-if="$v.request.structure.$error">{{$t('solidaryTransport.register.form.validators.required')}}</span>
              </div>

              <ion-item class="mc-st-form-item as-section-title" lines="none" v-if="getMandatoryProofs(request.structure.structureProofs).length !== 0">
                <ion-label class="mc-st-form-label as-title" color="primary">{{$t('solidaryTransport.' + type + '.form.fields.mandatory')}} :</ion-label>
              </ion-item>

              <template v-for="(proof, index) in getMandatoryProofs(request.structure.structureProofs)">
                <template v-if="proof.checkbox">
                  <ion-item class="mc-st-form-item" :key="`proof-${proof.id}-${index}`" lines="none" >
                    <ion-checkbox
                      class="mc-st-form-checkbox"
                      color="success"
                      slot="start"
                      :checked="request.proofs.mandatory[proof.id].value"
                      :value="request.proofs.mandatory[proof.id].value"
                      @ionChange="request.proofs.mandatory[proof.id].value = $event.target.checked;"
                    ></ion-checkbox>
                    <ion-label class="mc-st-form-label no-white-space" color="primary">{{ proof.label }}*</ion-label>
                  </ion-item>
                </template>

                <template v-if="proof.input">
                  <ion-item class="mc-st-form-item" :key="`proof-${proof.id}-${index}`">
                    <ion-label position="floating">{{proof.label}}*</ion-label>
                    <ion-input
                      class="mc-st-form-input"
                      type="text"
                      :value="request.proofs.mandatory[proof.id].value"
                      @input="request.proofs.mandatory[proof.id].value = $event.target.value;"
                    ></ion-input>
                  </ion-item>
                </template>

                <template v-if="proof.selectbox">
                  <ion-item class="mc-st-form-item" :key="`proof-${proof.id}-${index}`">
                    <ion-label class="mc-st-form-label" color="primary" position="floating">{{ proof.label }}*</ion-label>

                    <ion-select
                      required
                      :value="request.proofs.mandatory[proof.id].value"
                      @ionChange="request.proofs.mandatory[proof.id].value = $event.target.value;"
                      :cancel-text="$t('solidaryTransport.buttons.cancel')"
                      :ok-text="$t('solidaryTransport.buttons.validate')"
                    >
                      <ion-select-option :value="index" v-for="(value, index) in request.proofs.mandatory[proof.id].options" :key="index">{{value}}</ion-select-option>
                    </ion-select>
                  </ion-item>
                </template>

                <template v-if="proof.radio">
                  <ion-list class="mc-st-form-item">
                    <ion-radio-group class="mc-st-form-radios">
                      <ion-list-header class="mc-st-form-radios-header">
                        <ion-label class="mc-st-form-label" color="primary">{{proof.label}}*</ion-label>
                      </ion-list-header>

                      <ion-item lines="none" class="mc-st-form-radios-item" v-for="(value, index) in request.proofs.mandatory[proof.id].options" :key="index">
                        <ion-label class="ion-text-wrap">{{value}}</ion-label>
                        <ion-radio slot="start" :value="index" :checked="request.proofs.mandatory[proof.id].value == index" @ionSelect="request.proofs.mandatory[proof.id].value = index"></ion-radio>
                      </ion-item>
                    </ion-radio-group>
                  </ion-list>
                </template>

                <template v-if="proof.file">
                  <div class="mc-st-form-item as-file" :key="`proof-${proof.id}-${index}`">
                    <ion-label class="mc-st-form-label" color="primary">{{ proof.label }}*</ion-label>

                    <template v-if="!processing">
                      <div v-if="request.proofs.mandatory[proof.id].file" class="file" style="color:black;">Votre fichier : {{request.proofs.mandatory[proof.id].file.name}}</div>
                    </template>
                    <div class="mc-st-form-controls">
                      <ion-button class="mc-st-form-control as-cta" color="light" @click="$refs['proof-file-' + proof.id][0].click()">
                        <ion-icon slot="start" name="map"></ion-icon>
                        <span v-html="$t('solidaryTransport.buttons.chooseProof')"></span>
                      </ion-button>
                    </div>
                    <input :ref="'proof-file-' + proof.id" style="display: none" type="file" @change="changeProofFile($event, request.proofs.mandatory[proof.id])" />

                  </div>
                </template>

                <div class="mc-st-form-details" v-if="$v.request.proofs.mandatory.$each[proof.id].$error">
                  <span class="mc-st-form-error is-left">{{$t('solidaryTransport.register.form.validators.required')}}</span>
                </div>
              </template>

              <ion-item class="mc-st-form-item as-section-title" lines="none" v-if="getOptionalProofs(request.structure.structureProofs).length !== 0">
                <ion-label class="mc-st-form-label as-title" color="primary">{{$t('solidaryTransport.' + type + '.form.fields.optional')}} :</ion-label>
              </ion-item>

              <template v-for="(proof, index) in getOptionalProofs(request.structure.structureProofs)">
                <template v-if="proof.checkbox">
                  <ion-item class="mc-st-form-item" :key="`proof-${proof.id}-${index}`" lines="none" >
                    <ion-checkbox
                      class="mc-st-form-checkbox"
                      color="success"
                      slot="start"
                      :checked="request.proofs.optional[proof.id].value"
                      :value="request.proofs.optional[proof.id].value"
                      @ionChange="request.proofs.optional[proof.id].value = $event.target.checked;"
                    ></ion-checkbox>
                    <ion-label class="mc-st-form-label no-white-space" color="primary">{{ proof.label }}</ion-label>
                  </ion-item>
                </template>

                <template v-if="proof.input">
                  <ion-item class="mc-st-form-item" :key="`proof-${proof.id}-${index}`">
                    <ion-label position="floating">{{proof.label}}</ion-label>
                    <ion-input
                      class="mc-st-form-input"
                      type="text"
                      :value="request.proofs.optional[proof.id].value"
                      @input="request.proofs.optional[proof.id].value = $event.target.value;"
                    ></ion-input>
                  </ion-item>
                </template>

                <template v-if="proof.selectbox">
                  <ion-item class="mc-st-form-item" :key="`proof-${proof.id}-${index}`">
                    <ion-label class="mc-st-form-label" color="primary" position="floating">{{ proof.label }}</ion-label>

                    <ion-select
                      required
                      :value="request.proofs.optional[proof.id].value"
                      @ionChange="request.proofs.optional[proof.id].value = $event.target.value;"
                      :cancel-text="$t('solidaryTransport.buttons.cancel')"
                      :ok-text="$t('solidaryTransport.buttons.validate')"
                    >
                      <ion-select-option :value="index" v-for="(value, index) in request.proofs.optional[proof.id].options" :key="index">{{value}}</ion-select-option>
                    </ion-select>
                  </ion-item>
                </template>

                <template v-if="proof.radio">
                  <ion-list class="mc-st-form-item">
                    <ion-radio-group class="mc-st-form-radios">
                      <ion-list-header class="mc-st-form-radios-header">
                        <ion-label class="mc-st-form-label" color="primary">{{proof.label}}</ion-label>
                      </ion-list-header>

                      <ion-item lines="none" class="mc-st-form-radios-item" v-for="(value, index) in request.proofs.optional[proof.id].options" :key="index">
                        <ion-label class="ion-text-wrap">{{value}}</ion-label>
                        <ion-radio slot="start" :value="index" :checked="request.proofs.optional[proof.id].value == index" @ionSelect="request.proofs.optional[proof.id].value = index"></ion-radio>
                      </ion-item>
                    </ion-radio-group>
                  </ion-list>
                </template>

                <template v-if="proof.file">
                  <div class="mc-st-form-item as-file" :key="`proof-${proof.id}-${index}`">
                    <ion-label class="mc-st-form-label" color="primary">{{ proof.label }}</ion-label>

                    <template v-if="!processing">
                      <div v-if="request.proofs.optional[proof.id].file" class="file" style="color:black;">Votre fichier : {{request.proofs.optional[proof.id].file.name}}</div>
                    </template>
                    <div class="mc-st-form-controls">
                      <ion-button class="mc-st-form-control as-cta" color="light" @click="$refs['proof-file-' + proof.id][0].click()">
                        <ion-icon slot="start" name="map"></ion-icon>
                        <span v-html="$t('solidaryTransport.buttons.chooseProof')"></span>
                      </ion-button>
                    </div>
                    <input :ref="'proof-file-' + proof.id" style="display: none" type="file" @change="changeProofFile($event, request.proofs.optional[proof.id])" />

                  </div>
                </template>
              </template>

            </template>

          </div>

          <div class="mc-st-form-controls in-summary" v-if="structures">
            <ion-button class="mc-st-form-control as-back" color="light" v-html="$t('solidaryTransport.buttons.back')" @click="$router.back()"></ion-button>

            <ion-button class="mc-st-form-control as-back" color="primary" @click="$refs['call'].click()">
              <ion-icon slot="start" name="chatboxes"></ion-icon>
              <span v-html="$t('solidaryTransport.buttons.askHelp')"></span>
              <a ref="call" :href="support" style="display:none;"></a>
            </ion-button>

            <ion-button class="mc-st-form-control" color="success" v-html="$t('solidaryTransport.buttons.next')" @click="validate()"></ion-button>
          </div>

          <div class="mc-st-loading" v-else>
            <ion-spinner name="crescent" class="mc-st-loading-spinner"></ion-spinner>
            <p class="mc-st-loading-message">{{$t('solidaryTransport.commons.loading')}}</p>
          </div>

        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import _ from 'lodash'
import { mapState, mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { toast } from '../../Shared/Mixin/toast.mixin'
import http from '../../Shared/Mixin/http.mixin'

const mandatory = (proof) => {
  if (proof.type === 'checkbox') {
    return proof.value === true
  }
  if (proof.type === 'input') {
    return !_.isEmpty(proof.value)
  }
  if (proof.type === 'selectbox' || proof.type === "radio") {
    return !_.isEmpty(proof.value)
  }
  if (proof.type === 'file') {
    return _.isObject(proof.file)
  }
  return false
}

export default {
  name: 'solidaryTransport.request.check',
  components: {},
  data () {
    return {
      processing: false,
      structures: undefined,
      support: process.env.VUE_APP_SOLIDARY_SUPPORT_HELP,
      type: this.$route.meta.type
    }
  },
  computed: {
    ...mapGetters([
      'getAddressToDisplay',
      'getMandatoryProofs',
      'getOptionalProofs',
      'getParameters'
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
  validations () {
    let validations = {
      request: {}
    }
    if (this.structures) {
      validations.request.structure =  { required }
    }
    if (this.request.proofs.mandatory) {
      //console.log('proofs', this.request.proofs)
      validations.request.proofs = {}
      validations.request.proofs.mandatory =  {
        $each: {
          mandatory
        }
      }
    }
    return validations
  },
  methods: {
    changeProofFile: function ($event, proof) {
      this.processing = true
      let file = $event.target.files[0]
      proof.file = file
      if (file.size <= 1000000) {
        setTimeout(() => {
          this.processing = false
        }, 0)
      } else {
        this.presentToast(this.$t("UpdateProfile.file-size"), 'danger')
      }
    },
    changeStructure: function($event) {
      let structure = _.find(this.structures, {id: parseInt($event.target.value)})
      this.$store.commit('solidaryStructureUpdate', structure)
    },
    validate: function () {
      this.$v.$reset();
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$refs.request.getScrollElement().then((parent) => {
          let child = document.getElementsByClassName('mc-st-form-error')[0]
          var childPos = child.offsetTop
          var parentPos = parent.offsetTop
          var top = childPos - parentPos - 30
          this.$refs.request.scrollToPoint(0, top, 0)
        })
      } else {
        this.$router.push({name: 'solidaryTransport.home.' + this.type + '.path'})
      }
    }
  },
  created: function () {
    this.$store.dispatch('getSolidaryStructuresByGeolocation', {lat: this.request.homeAddress.latitude, lng: this.request.homeAddress.longitude})
      .then((structures) => {

        if (structures.length !== 0) {
          if (!this.request.structure) {
            this.$store.commit('solidaryStructureUpdate', _.cloneDeep(structures[0]))
          }
        }

        setTimeout(() => {
           this.structures = structures
        }, 500)

        if(this.type === 'usual') {
          this.$router.replace({name: 'solidaryTransport.home.' + this.type + '.path'})
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
</script>
