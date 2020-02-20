<template>
    <ion-page>
      <ion-header no-border>
          <ion-toolbar color="background">
            <ion-buttons slot="start">
              <ion-back-button text=""></ion-back-button>
            </ion-buttons>
            <ion-title>{{ $t('SolidaryTransport.Help.title') }}</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content color="background">
          <ion-card v-if="articles" v-for="(article, index) in articles" @click="interactWithCard(index)" :key="index">
            <ion-card-header class="mc-card">
              <ion-card-title>{{article.title}}</ion-card-title>
            </ion-card-header>

            <ion-card-content v-html="article.description" v-if="active === index"></ion-card-content>
          </ion-card>
        </ion-content>
    </ion-page>
</template>

<style lang="scss">

</style>

<script>
export default {
  name: 'index',
  components: {},
  data () {
    return {
      active: 0,
      articles: [
        {
          title: "Besoin d’aide ? Vous pouvez contacter l’assistance téléphonique au XX.XX.XX.XX.XX",
          description: "Lorem ipsum sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat colutpat. Ut wisi enim as minim veniam, quis nostrud exerci lation ullamocorper suscipit lobortis nisl ut aliquip ex ea commodo"
        },
        {
          title: "Le transport solidaire, c’est quoi ?",
          description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur nisi quas numquam repellendus eaque veniam, optio nulla delectus cupiditate similique perferendis dolores exercitationem animi reiciendis eligendi aliquam illo rerum, et."
        },
        {
          title: "Quelles sont les conditions d’éligibilité au transport solidaire ?",
          description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, ea voluptas. Eum maxime vero sapiente omnis praesentium magnam fugiat laboriosam, molestiae beatae, sint? Obcaecati aspernatur quasi praesentium, cumque temporibus veritatis."
        }
      ]
    }
  },
  methods: {
    interactWithCard: function (index) {
      this.active = index
    }
    
  },
  created: function () {}
}
</script>