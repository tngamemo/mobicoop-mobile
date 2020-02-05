<template>
  <div id="app">
    <ion-app>
      <ion-vue-router />
    </ion-app>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },

    created: function () {

      // On change les couleurs en fonction de l'environement
      document.documentElement.style.setProperty('--ion-color-primary', '#' + process.env.VUE_APP_PRIMARY);
      document.documentElement.style.setProperty('--ion-color-background', '#' + process.env.VUE_APP_BACKGROUND);
      document.documentElement.style.setProperty('--ion-color-statusbar', '#' + process.env.VUE_APP_BACKGROUND);
      document.documentElement.style.setProperty('--ion-color-secondary', '#' + process.env.VUE_APP_SECONDARY);
      document.documentElement.style.setProperty('--ion-color-tertiary', '#' + process.env.VUE_APP_TERTIARY);
      document.documentElement.style.setProperty('--ion-color-success', '#' + process.env.VUE_APP_SUCCESS);
    }
  }
</script>

<style lang="scss">
  :root {
    --ion-color-primary: white;
    --ion-color-primary-rgb: 56, 128, 255;
    --ion-color-primary-contrast: var(--ion-color-background);
    --ion-color-primary-contrast-rgb: 255, 255, 255;
    --ion-color-primary-shade: white;
    --ion-color-primary-tint: white;

    --ion-color-secondary: rgba(215, 182, 75, 1);
    --ion-color-secondary-rgb: 12, 209, 232;
    --ion-color-secondary-contrast: #ffffff;
    --ion-color-secondary-contrast-rgb: 255, 255, 255;
    --ion-color-secondary-shade: var(--ion-color-secondary);
    --ion-color-secondary-tint: var(--ion-color-secondary);

    --ion-color-tertiary: rgba(222, 85, 168, 1);
    --ion-color-tertiary-rgb: 112, 68, 255;
    --ion-color-tertiary-contrast: #ffffff;
    --ion-color-tertiary-contrast-rgb: 255, 255, 255;
    --ion-color-tertiary-shade: var(--ion-color-tertiary);
    --ion-color-tertiary-tint: var(--ion-color-tertiary);

    --ion-color-success: rgba(76, 162, 110, 1);
    --ion-color-success-rgb: 12, 209, 232;
    --ion-color-success-contrast: #ffffff;
    --ion-color-success-contrast-rgb: 255, 255, 255;
    --ion-color-success-shade: var(--ion-color-success);
    --ion-color-success-tint: var(--ion-color-success);

    --ion-color-background: #284b99;
    --ion-color-background-contrast: var(--ion-color-primary);
    --ion-color-statusbar: #284b99;
    --ion-color-statusbar-contrast: var(--ion-color-primary);

    --ion-color-component: #284b99;
    --ion-color-component-contrast: var(--ion-color-primary);
  }

  @font-face {
    font-family: 'Poppins';
    src: url("../src/assets/fonts/Poppins-Regular.ttf");
  }

  * {
    font-family: 'Poppins'
  }

  ion-toolbar {
    --padding-start: 30px;
    --padding-end: 30px;
    --padding-bottom: 30px;
    --padding-top: 30px;
  }

  ion-content {
    --padding-start: 30px !important;
    --padding-end: 30px !important;
    --padding-bottom: 30px !important;
    --padding-top: 30px !important;
  }

  .mc-big-button {
    height: 50px !important;
    margin-bottom: 15px !important;
    --border-radius: 30px !important;
  }

  .ion-color-background{
      --ion-color-base: var(--ion-color-background,  #FFFFFF) !important;
      --ion-color-contrast: var(--ion-color-background-contrast) !important;
  }

  .fancy-button{
      --background:var(--charcoal,#36454f);
  }

  .ion-color-statusbar{
      --ion-color-base: var(--ion-color-statusbar,  #FFFFFF) !important;
      --ion-color-contrast: var(--ion-color-statusbar-contrast) !important;
  }

  ion-item {
    visibility: visible;
    cursor: pointer;

    --background-focused : transparent;
  }


  .plt-desktop {
    display: flex;
    justify-content: center;
    background: lightgrey;
  }

  .plt-desktop body {
    max-width: 600px;
  }

</style>
