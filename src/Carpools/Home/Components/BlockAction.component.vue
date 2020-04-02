<template>
  <div class="mc-block-action" v-bind:style="style.background">
    <div class="mc-block-action-title" v-bind:style="style.backgroundHeader">
      <p>
        <b>{{ $t(`BlockAction.${action}.title`) }}</b>
      </p>
    </div>
    <div style="padding: 10px">
      <div class="mc-block-action-visuel">
        <div class="mc-block-action-image">
          <img class src="/assets/background.png" />
          <div class="mc-block-action-icon" v-bind:style="style.backgroundHeader">
            <ion-icon :name="icon" size="medium"></ion-icon>
          </div>
        </div>
      </div>
      <p class="text-center">
        <b v-html="$t(`BlockAction.${action}.text`)"></b>
      </p>

      <div class="mc-block-action-container-button">
        <div
          class="mc-block-action-button pointer"
          v-bind:style="style.text"
          @click="$emit('clickButton')"
        >
          <ion-icon :name="icon" size="large" class="ion-padding-end hidden-xs"></ion-icon>
          {{ $t(`BlockAction.${action}.button`)}}
        </div>

        <div
          class="mc-block-action-button mc-block-action-second-button pointer"
          v-if="secondButton"
          v-bind:style="style.text"
          @click="$emit('clickSecondButton')"
        >
          <ion-icon :name="icon" size="large" class="ion-padding-end hidden-xs"></ion-icon>
          {{ $t(`BlockAction.${action}.secondButton`)}}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.mc-block-action {
  border-radius: 10px;
  margin-bottom: 20px;
  color: white;
  .mc-block-action-title {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 10px 10px;
    margin-bottom: 10px;

    p {
      margin: 0px;
    }
  }

  .mc-block-action-image {
    position: relative;
    margin: 0 auto;
    width: 100px;

    .mc-block-action-icon {
      position: absolute;
      bottom: 0;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .mc-block-action-container-button {
    width: 80%;
    margin: auto;
    padding-bottom: 20px;
    .mc-block-action-button {
      text-align: center;
      background: #ffffff;
      border-radius: 37px;
      padding: 10px 20px;
      min-height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .mc-block-action-second-button {
      margin-top: 15px;
    }
  }
}
</style>


<script>
export default {
  name: "block-action",
  props: ["action", "color", "colorBg", "icon", "secondButton"],
  computed: {
    style() {
      let style = [];
      style.backgroundHeader = `background-color: ${this.color}`;
      style.text = `color: ${this.color}`;
      style.background = `background-color: ${this.colorBg}`;
      return style;
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
