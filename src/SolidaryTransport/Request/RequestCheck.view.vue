<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>{{$t('solidaryTransport.request.title')}} <sup>2/6</sup></ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content ref="request" color="primary">
      <div class="mc-st-container">
        <div class="mc-st-form">

          <div class="mc-st-form-content">
            <div class="mc-st-form-header">
              <div class="mc-st-form-title">{{$t('solidaryTransport.request.steps.check')}}</div>
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
                <ion-label class="mc-st-form-label as-title" color="primary" position="stacked">{{$t('solidaryTransport.request.form.fields.structure')}}</ion-label>
                <ion-select 
                  required
                  :value="request.structure"
                  @ionChange="request.structure = $event.target.value;"
                  :cancel-text="$t('solidaryTransport.buttons.cancel')"
                  :ok-text="$t('solidaryTransport.buttons.validate')"
                >
                  <ion-select-option :value="structure" v-for="(structure, index) in structures" :key="index">{{structure.name}}</ion-select-option>
                </ion-select>
              </ion-item>
              <div class="mc-st-form-details">
                <span class="mc-st-form-note">{{$t('solidaryTransport.request.form.fields.structures')}}</span>
                <span class="mc-st-form-error" v-if="$v.request.structure.$error">{{$t('solidaryTransport.register.form.validators.required')}}</span>
              </div>

              <!-- <ion-item class="mc-st-form-item" v-if="getMandatoryProofs(request.structure.proofs).length !== 0">
                <ion-label class="mc-st-form-label as-title" color="primary">{{$t('solidaryTransport.request.form.fields.mandatory')}}</ion-label>
              </ion-item> -->

              <ion-item class="mc-st-form-item" v-for="(proof, index) in getOrderedProofs(request.structure.proofs)" :key="'proof-' + proof.id" lines="none">
                <ion-label class="mc-st-form-label as-title" color="primary" position="stacked">{{proof.label}}</ion-label>

                <template v-if="proof.checkbox">
                  checkbox
                </template>

                <template v-if="proof.input">
                  input
                </template>

                <template v-if="proof.selectbox">
                  selectbox
                </template>

                <template v-if="proof.radio">
                  radio
                </template>

                <template v-if="proof.file">
                  file
                </template>

              </ion-item>

            </template>
            
          </div>

          <div class="mc-st-form-controls with-multiple" v-if="structures">
            <ion-button class="mc-st-form-control as-back" color="light" v-html="$t('solidaryTransport.buttons.back')" @click="$router.back()"></ion-button>

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

<style lang="scss"></style>

<script>
import _ from 'lodash'
import { mapState, mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'solidaryTransport.request.check',
  components: {},
  data () {
    return {
      structures: undefined,
      proofs: undefined
    }
  },
  computed: {
    ...mapGetters([
      'getAddressToDisplay',
      'getOrderedProofs'
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
  validations () {
    console.log('validations')
    let validations = {
      request: {}
    }
    if (this.structures) {
      console.log('structures')
      validations.request.structure =  { required }
    }
    if (this.request.structure.proofs) {
      console.log('proofs')
      validations.request.proofs =  { }
      _.each(this.request.structure.proofs, (proof) => {
        console.log(proof)
      })
    }
    return validations
  },
  methods: {
    test: function(current, compare) {
      console.log('test', current, compare)
      return true
    },
    validate: function () {
      this.$v.$reset();
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$refs.register.getScrollElement().then((parent) => {
          let child = document.getElementsByClassName('mc-st-form-error')[0]
          var childPos = child.offsetTop
          var parentPos = parent.offsetTop
          var top = childPos - parentPos - 30
          this.$refs.register.scrollToPoint(0, top, 0)
        })
      } else {
        this.$router.push({name: 'solidaryTransport.home.request.path'})
      }
    }
  },
  created: function () {
    this.$store.dispatch('getSolidaryStructuresByGeolocation', {lat: this.request.homeAddress.latitude, lng: this.request.homeAddress.longitude})
      .then((structures) => {
        this.structures = structures

        if (this.structures.length !== 0) {
          if (!this.request.structure) {
            this.request.structure = _.cloneDeep(this.structures[0])
          }
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
</script>