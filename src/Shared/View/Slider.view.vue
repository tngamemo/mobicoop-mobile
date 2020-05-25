/**

Copyright (c) 2018, MOBICOOP. All rights reserved.
This project is dual licensed under AGPL and proprietary licence.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <gnu.org/licenses>.

Licence MOBICOOP described in the file
LICENSE
**************************/

<template>
  <div class="slider-container">
    <div class="slider-container-content">
      <ion-slides
        ref="slider"
        class="slider-style swiper-no-swiping"
        pager="true"
        :options="slideOpts"
        @ionSlideDidChange="slideDidChange()"
      >
        <ion-slide v-for="(slide, index) in slides" :key="index">
          <div class="slide-title">{{slide.title}}</div>
          <div class="component-content">
            <component :ref="slide.component.name" :is="slide.component"></component>
          </div>
        </ion-slide>
      </ion-slides>
    </div>
    <div class="mc-swipper-buttons">
      <ion-button
        :style="{visibility: (activeIndex !== 0 || this.previous) ? 'visible' : 'hidden'}"
        class="mc-small-button"
        color="primary"
        fill="outline"
        @click="prev()"
      >{{ $t('Slider.prev') }}</ion-button>
      <ion-button
        class="mc-small-button"
        color="success"
        @click="next()"
        :disabled="this.$store.getters.getSliderLoader"
      >
      <span v-if="this.$store.getters.getSliderLoader">
        <ion-icon size="large" class="rotating" name="md-sync"></ion-icon>
      </span>
      <span v-if="!this.$store.getters.getSliderLoader">{{ activeIndex >= slides.length - 1 ? $t('Slider.register') : $t('Slider.next') }}</span>
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
  color: var(--ion-color-primary);
  opacity: 0.6;
  min-height: 27px;
  margin-bottom: 23px;
}

.slider-style {
  --bullet-background: black;
  --bullet-background-active: var(--ion-color-primary);
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

.swiper-container-horizontal > .swiper-pagination-bullets,
.swiper-pagination-custom,
.swiper-pagination-fraction {
  top: 25px;
  left: 0;
  width: 100%;
  height: 10px;
}
</style>

<script>
export default {
  name: "slider",
  data() {
    return {
      activeIndex: 0,
      slideOpts: {
        initialSlide: 1,
        speed: 400,
        allowTouchMove: false,
        observer: true
      },
      sliderShow: true
    };
  },
  async updated() {},
  mounted() {
    // go to slide if there is step param in route
    if (this.$route.query.step) {
      this.$nextTick(() => {
        this.$refs.slider.slideTo(this.$route.query.step, 0);
      });
      this.activeIndex = Number(this.$route.query.step);
    }

    this.$watch(
      () => {
        return this.$refs.slider;
      },
      val => {
        this.activeIndex = val.swiper.activeIndex;
      }
    );
  },
  // Pass an array of slides {title, component}
  props: ["slides", "previous"],
  methods: {
    next() {
      if (
        this.$refs[this.slides[this.activeIndex].component.name][0].validate()
      ) {
        if (this.activeIndex >= this.slides.length - 1) {
          this.$emit("save");
        } else {
          this.activeIndex = this.activeIndex + 1;
          this.$router.replace({ query: { step: this.activeIndex } });
          this.$refs.slider.slideNext();
        }
      }
    },
    prev() {
      if (this.activeIndex == 0 && !!this.previous) {
        this.$router.push(this.previous);
      } else {
        this.activeIndex = this.activeIndex - 1;
        this.$router.replace({ query: { step: this.activeIndex } });
        this.$refs.slider.slidePrev();
      }
    },

    slideDidChange() {
      if (!!this.$refs.slider) {
        this.$refs.slider.getActiveIndex().then(res => {
          if (!!this.slides[res]) {
            this.$store.commit(
              "slider_change",
              this.slides[res].component.name
            );
          }
        });
      }
    }
  }
};
</script>
