<template>
  <div class="mc-form-carpool-message">
    <ion-item>
      <ion-label position="floating">Mon message aux passagers</ion-label>
      <ion-textarea rows="20" cols="12"
        :value="carpoolToPost.comment"
        @ionInput="changeComment($event.target.value)">
      </ion-textarea>
    </ion-item>
  </div>
</template>

<style lang="scss">
.mc-form-carpool-message {
  margin-top: 20px;
}
</style>

<script>
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
  requiredIf
} from "vuelidate/lib/validators";

export default {
  name: "post-carpool-step6",
  data() {
    return {};
  },
  validations: {},
  computed: {
    carpoolToPost() {
      return this.$store.getters.carpoolToPost;
    }
  },
  methods: {
    validate() {
      this.$v.$reset();
      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      } else {
        return true;
      }
    },

    changeComment(value){
      this.$store.commit('changeOptionsCarpoolPost', {property: 'comment', value: value})
    }
  }
};
</script>
