<template>
  <ion-page>
    <ion-header no-border>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title text-center>{{$t('solidaryTransport.register.title')}}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="primary">
      <div class="mc-register-container">
        <ion-slides class="mc-register-slider" ref="slider" pager="true" scrollbar="false">
          
          <ion-slide class="mc-register-slide">
            <div class="mc-register-form">

              <div class="mc-register-form-content">
                <ion-item class="mc-register-form-item" lines="none">
                  <ion-checkbox
                    class="mc-register-form-checkbox"
                    name="registerType"
                    value="ask"
                    color="success"
                    slot="start"
                    @ionChange="updateType($event)"
                    :checked="type === 'ask'"
                  ></ion-checkbox>
                  <ion-label class="no-white-space">{{ $t('solidaryTransport.register.form.actions.ask') }}</ion-label>
                </ion-item>

                <ion-item class="mc-register-form-item" lines="none">
                  <ion-checkbox
                    class="mc-register-form-checkbox"
                    name="registerType"
                    value="give"
                    color="success"
                    slot="start"
                    @ionChange="updateType($event)"
                    :checked="type === 'give'"
                  ></ion-checkbox>
                  <ion-label class="no-white-space">{{ $t('solidaryTransport.register.form.actions.give') }}</ion-label>
                </ion-item>

                <div class="mc-register-form-actions" :class="{'is-active': buttons.fill.active}">
                  <ion-button class="mc-register-form-action as-fill" v-if="type === 'ask'" color="success" v-html="$t('solidaryTransport.register.form.test')" @click="$router.push({name:'solidaryTransport.register', query: {type: 'ask', step: 1}})"></ion-button>

                  <ion-button class="mc-register-form-action as-fill" v-if="type === 'give'" color="success" v-html="$t('solidaryTransport.register.form.fill')" @click="$router.push({name:'solidaryTransport.register', query: {type: 'give', step: 2}})"></ion-button>
                </div>
              </div>

            </div>
          </ion-slide>

          <ion-slide class="mc-register-slide">
            test 2
          </ion-slide>
          <ion-slide class="mc-register-slide">
            test 3
          </ion-slide>
        </ion-slides>
      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="scss">
  .mc-register-container {
    border-radius: 15px 15px 0px 0px;
    padding: 15px 0;
    height: 100%;
    position: relative;
    background-color: var(--ion-color-light);

    .mc-register-slider {
      position: relative;
      height: 100%;

      .swiper-pagination-bullets {
        position: absolute;
        top: -5px;
      }
      
      .swiper-slide {
        height: 100%;
        overflow: auto;
        color: var(--ion-color-primary);
        padding: 20px 30px 0;

        .mc-register-form {
          position: relative;
          
          .mc-register-form-item {
            font-size: 14px;

            .mc-register-form-checkbox {
              margin-right: 10px;
              margin-top: 10px;
              margin-bottom: 10px;
            }
          }

          .mc-register-form-actions {
            opacity: 0;
            transition: opacity .1s;

            &.is-active {
              opacity: 1;
              transition: opacity .3s;
            }

            .mc-register-form-action {
              --border-radius: 25px;
              --padding-start: 30px;
              --padding-end: 30px;
              height: 45px;
              font-size: 14px;
              font-weight: bold;


              &.as-fill {
                margin-top: 20px;
              }
            }
          }
        }

      }
    }
  }
</style>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'solidaryTransport.register',
  components: {},
  data () {
    return {
      step: 0,
      updating: false,
      buttons: {
        fill: {
          active: this.$route.query.type !== undefined
        }
      }
    }
  },
  computed: {
    type: function () {
      return this.$route.query.type
    }
  },
  methods: {
    updateType: function ($event) {
      console.log('here')
      if (!this.updating) {
        this.updating = true
        this.buttons.fill.active = false

        let detail = $event.detail
        if (detail.checked) {
          if (detail.value !== this.type) {
            setTimeout(() => {
              this.$router.replace({query: {type: detail.value}})
            }, 100)
          }
          setTimeout(() => {
            this.buttons.fill.active = true
          }, 300)
        } else {
          setTimeout(() => {
            this.$router.replace({query: {type: undefined}})
          }, 100)
          setTimeout(() => {
            this.buttons.fill.active = false
          }, 300)
        }

        setTimeout(() => {
          this.updating = false
        }, 100)
      }
      
    }
  },
  created: function () {

  }
}
</script>