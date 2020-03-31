<template>
  <div class="mc-form-carpool-price">
    <div class="mc-carpool-price">
      <span>Participation (<span>par passager</span>)</span>
      <div class="mc-carpool-price-input">
        <ion-item>
          <ion-input
            type="number"
            :placeholder="'00'"
            :value="priceCarpool"
            @input="changePrice($event.target.value)"
          ></ion-input>€
        </ion-item>
        <span>{{priceKmTmp}}€/km</span>
      </div>

    </div>
    <div v-if="$v.priceCarpool.$error">
      <div class="mc-error-label" v-if="$v.priceCarpool.required">{{$t('Validation.required')}}</div>
       <div class="mc-error-label" v-if="!$v.priceCarpool.minValue">{{$t('Validation.minValue', { value: '0' })}}</div>
    </div>

    <div class="mc-carpool-price-warning">
          <p v-if='warningPriceKm == 1' class="warning">
            <ion-icon name="warning" size="large"></ion-icon><br>
            Le prix de votre trajet est supérieur à la moyenne, et vos chances d'être contacté seront donc réduites.
          </p>
          <p v-if='warningPriceKm == 2' class="danger">
            <ion-icon name="warning" size="large"></ion-icon><br>
            Le prix de votre trajet, très haut, est au-delà du barème fiscale moyen (0,30€/km) : vos chances d'être contacté seront donc très réduites, il est par ailleurs interdit de proposer des prestations rémunérées de transport qui sortent du cadre du partage de frais en covoiturage.
          </p>
          <p v-if='warningPriceKm == 3' class="danger">
            <ion-icon name="warning" size="large"></ion-icon><br>
            Le prix de votre trajet, dépasse le seuil maximum fixé par notre plateforme (0,50€/km). Votre trajet ne pourra pas être publié
          </p>


      <div class="align-left text-success warning" v-if='seeRoundPrice'>
          Nous avons arrondi le tarif de votre annonce à {{ priceRound  }} afin d'améliorer votre expérience et celle des autres usagers. Merci de votre compréhension.
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.mc-form-carpool-price {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
  .mc-carpool-price {
    display: flex;
    flex-direction: column;
    color: var(--ion-color-primary);
    justify-content: center;
    align-items: center;
    span {
      flex: 2;
    }

    .mc-carpool-price-input {
      flex: 1;

      span {
        color: var(--ion-color-primary);
        font-size: smaller;
      }
    }
  }

  .mc-carpool-price-warning {
    .warning {
      border: 2px solid #F2994A;
      color: #F2994A;
      border-radius: 10px;
      padding: 10px;
    }

    .danger {
      border: 2px solid red;
      color: red;
      border-radius: 10px;
      padding: 10px;
    }
  }
}
</style>

<script>
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
  requiredIf,
  minValue
} from "vuelidate/lib/validators";

export default {
  name: "post-carpool-step5",
  data() {
    return {
      warningPriceKm: 0,
      seeRoundPrice: false,
      priceRound: this.$store.getters.priceCarpool,
      priceKmTmp: this.$store.getters.carpoolToPost.priceKm
    };
  },
  validations: {
    priceCarpool: {
      required,
      minValue: (value) => value > 0,
    }
  },
  computed: {
    carpoolToPost() {
      return this.$store.getters.carpoolToPost;
    },

    priceCarpool() {
      return this.$store.getters.priceCarpool;
    },

    distanceCarpool() {
      return this.$store.getters.distanceCarpool;
    }
  },
  methods: {
    validate() {
      this.$v.$reset();
      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      } else {

        this.priceRound = !!this.priceRound ? this.priceRound : this.$store.getters.priceCarpool;
        this.$store.commit('changeOptionsCarpoolPost', {property: 'priceKm', value: this.priceKmTmp})
        this.$store.commit('price_carpool_success', {price: this.priceRound})
        return true;
      }
    },

    changePrice(value) {
      // this.$store.commit("changeOptionsCarpoolPost", { property, value });
      const price = value;
      this.priceKmTmp = (price / this.distanceCarpool * 1000).toFixed(2);
      if (isNaN(this.priceKmTmp)) {
        this.priceKmTmp = 0;
      }
      const initialPriceKm = process.env.VUE_APP_PRICE_BY_KM;

      if (this.priceKmTmp >= (initialPriceKm * 2) && this.priceKmTmp < 0.30) {
          this.warningPriceKm = 1;
      } else if (this.priceKmTmp >=  0.30 && this.priceKmTmp < 0.5) {
          this.warningPriceKm = 2
      } else if (this.priceKmTmp >= 0.5) {
          this.warningPriceKm = 3;
      } else {
          this.warningPriceKm = 0;
      }

    console.log(this.priceKmTmp)
      this.$store.dispatch('getPriceofCarpool', {priceKm: this.priceKmTmp}).then(resp => {
        this.priceRound = resp.data.value;
        if (resp.data.value != price) {
          this.seeRoundPrice = true;
        } else {
          this.seeRoundPrice = false;
        }
      })
    }
  }
};
</script>
