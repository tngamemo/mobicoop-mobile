<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>{{$t('solidaryTransport.volunteer.title')}} <sup>1/4</sup></ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content ref="volunteer" color="primary" class="is-scrollable">
      <div class="mc-st-container">
        <div class="mc-st-form">

          <div class="mc-st-form-content">
            <div class="mc-st-form-header">
              <div class="mc-st-form-title">{{$t('solidaryTransport.volunteer.steps.intro')}}</div>
              <div class="mc-st-form-steps">
                <span class="mc-st-form-step is-active"></span>
                <span class="mc-st-form-step"></span>
                <span class="mc-st-form-step"></span>
                <span class="mc-st-form-step"></span>
              </div>
            </div>

            <template v-if="structures">

              <ion-item class="mc-st-form-item" lines="none">
                <ion-checkbox class="mc-st-form-checkbox" :value="false" :checked="volunteer.hasStructure === false" color="success" slot="start" @ionChange="changeHasStructure(false)"
                ></ion-checkbox>
                <ion-label class="mc-st-form-label no-white-space" color="primary">{{$t('solidaryTransport.volunteer.form.fields.volunteerByMyself')}}</ion-label>
              </ion-item>

              <ion-item class="mc-st-form-item" lines="none">
                <ion-checkbox class="mc-st-form-checkbox" :value="true" :checked="volunteer.hasStructure === true" color="success" slot="start" @ionChange="changeHasStructure(true)"
                ></ion-checkbox>
                <ion-label class="mc-st-form-label no-white-space" color="primary">{{$t('solidaryTransport.volunteer.form.fields.volunteerByStructure')}}</ion-label>
              </ion-item>

              <ion-item class="mc-st-form-item" v-if="volunteer.hasStructure">
                <ion-label class="mc-st-form-label as-title" color="primary" position="stacked">{{$t('solidaryTransport.volunteer.form.fields.structure')}} :</ion-label>
                <ion-select 
                  required
                  :value="volunteer.structure.id"
                  @ionChange="changeStructure($event)"
                  :cancel-text="$t('solidaryTransport.buttons.cancel')"
                  :ok-text="$t('solidaryTransport.buttons.validate')"
                >
                  <ion-select-option :value="structure.id" v-for="(structure, index) in structures" :key="index">{{structure.name}}</ion-select-option>
                </ion-select>
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

export default {
  name: 'solidaryTransport.volunteer',
  components: {},
  data () {
    return {
      updating: false,
      structures: undefined
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
  methods: {
    changeHasStructure: function (value) {
      if (!this.updating) {
        this.updating = true
        this.volunteer.hasStructure = value

        setTimeout(() => {
          this.updating = false
        }, 100)
      }
    },
    validate: function () {
      this.$router.push({name: 'solidaryTransport.home.volunteer.availabilities'})
    }
  },
  created: function () {
    this.$store.dispatch('getSolidaryStructures')
      .then((structures) => {
        
        if (structures.length !== 0) {
          if (!this.volunteer.structure) {
            this.volunteer.structure = structures[0]
          }
        }

        setTimeout(() => {
           this.structures = structures
        }, 500)
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
</script>