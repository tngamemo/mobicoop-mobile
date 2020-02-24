<template>
  <div class="slider-container">
    <div class="slider-container-content">
  <ion-slides ref="slider" class="slider-style swiper-no-swiping" pager="true" :options="slideOpts">
    <ion-slide v-for="slide in slides">
      <div class="slide-title">{{slide.title}}</div>
      <div class="component-content">
        <component :ref="slide.component" v-bind:is="slide.component"></component>
      </div>
    </ion-slide>
  </ion-slides>
      </div >
  <div class="mc-swipper-buttons">
    <ion-button :style="{visibility: activeIndex !== 0 ? 'visible' : 'hidden'}" class='mc-small-button' color="background" fill="outline" @click="prev()" >
      {{ $t('Slider.prev') }}
    </ion-button>
    <ion-button class='mc-small-button' color="success" @click="next()" >
      {{ activeIndex >= slides.length - 1 ? $t('Slider.register') : $t('Slider.next') }}
    </ion-button>
  </div>
  </div>
</template>

<style lang="scss">

  .slider-container {
    height: 100%;
    position: relative;
  }

  .slider-container-content {
    height: calc(100% - 44px);
    position: relative;
  }

  .mc-swipper-buttons {
    position: absolute;
    bottom: 0px;
    right: 0px;
    left: 0px;
    display: flex;
    justify-content: space-between;
  }

  .slide-title {
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    color: var(--ion-color-background);
    opacity: 0.6;
    min-height: 27px;
    margin-bottom: 23px;
  }

  .slider-style {
    --bullet-background : black;
    --bullet-background-active: var(--ion-color-background);
    height: 100%;
  }

  .component-content {
    overflow-x: scroll;
    height: calc(100% - 50px);
  }

  .swiper-zoom-container {
    width: 100%;
    height: 100%;
    display: block;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center;
  }

  .swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction {
    top: 25px;
    left: 0;
    width: 100%;
    height: 10px;
  }

</style>

<script>
    import RegisterStep1 from '../../Carpools/Register/RegisterStep1.view'
    import RegisterStep2 from '../../Carpools/Register/RegisterStep2.view'

  export default {
    name: 'slider',
      components : {
          RegisterStep1,
          RegisterStep2
      },
    data () {
      return {
          activeIndex: 0,
          slideOpts : {
              initialSlide: 1,
              speed: 400,
              allowTouchMove: false,
          }
      }
    },
      mounted () {
          this.$watch(
              () => {
                  return this.$refs.slider
              },
              (val) => {
                 console.log(val);
                 this.activeIndex = val.swiper.activeIndex
              }
          )
      },
      // Pass an array of slides {title, component}
    props: ['slides'],
    methods: {
      next() {

          if (this.$refs[this.slides[this.activeIndex].component][0].validate()) {
              if (this.activeIndex >= this.slides.length - 1) {
                  console.log('save');
                  this.$emit('save');
              } else {
                  this.activeIndex = this.activeIndex + 1;
                  this.$refs.slider.slideNext()
              }
          }
      },
        prev() {
              this.activeIndex = this.activeIndex - 1;
              this.$refs.slider.slidePrev()
        },
    }
  }
</script>
