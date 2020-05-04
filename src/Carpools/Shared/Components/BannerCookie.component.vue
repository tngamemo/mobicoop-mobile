<template>
  <div v-if="!this.$store.getters.userCookies" class="mc-banner-cookie">
    <p>
      {{$t('BannerCookie.desc')}}
      <a
        style="color:#284b99"
        v-on:click="$router.push('/article/4')"
      >{{$t('BannerCookie.politic')}}</a>
    </p>
    <button class="mc-button-cookie" v-on:click="setUserCookie">{{$t('BannerCookie.agree')}}</button>
  </div>
</template>

<style lang="scss">
.mc-banner-cookie {
  position: absolute;
  z-index: 1;
  bottom: 0;
  background: white;
  padding: 10px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  border: 1px solid var(--ion-color-primary);
  p {
    font-size: 0.8rem;
    margin-bottom: 0;
  }

  .mc-button-cookie {
    float: right;
    background: #666;
    padding: 8px;
    color: #fff;
    border-width: 2px 4px;
    border-radius: 40px;
    font-size: 1em;
  }
}
</style>

<script>
export default {
  name: "BannerCookie",
  data: function() {
    return {
    };
  },
  mounted() {},
  methods: {
    setUserCookie() {
      this.$store.commit("changeUserCookies", true);
    }
  }
};
</script>
