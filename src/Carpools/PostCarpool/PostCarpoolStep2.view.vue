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
  <div>
    <div class="mc-form-carpool-time-ponctual" v-if="isPonctual">
      <ion-row>
        <ion-col>
          <ion-item>
            <ion-label position="floating">Date de départ</ion-label>
            <ion-datetime
              display-format="DD/MM/YY"
              picker-format="DD/MM/YY"
              cancel-text="Annuler"
              done-text="Valider"
              :max="'2099-12-31T23:59:59.000Z'"
              :placeholder="$t('PostCarpool.dayOutward')"
              :value="this.$store.getters.carpoolToPost.outwardDate"
              @ionChange="changePostOutwardDate($event)"
            ></ion-datetime>
          </ion-item>
          <div v-if="$v.carpoolToPost.outwardDate.$error">
            <div
              class="mc-error-label"
              v-if="!$v.carpoolToPost.outwardDate.required"
            >{{$t('Validation.required')}}</div>
            <div
              class="mc-error-label"
              v-if="!$v.carpoolToPost.outwardDate.isAfterNow"
            >{{$t('Validation.isAfterNow')}}</div>
          </div>
        </ion-col>

        <ion-col>
          <ion-item>
            <ion-label position="floating">Heure de départ</ion-label>
            <ion-datetime
              display-format="HH:mm"
              picker-format="HH:mm"
              cancel-text="Annuler"
              done-text="Valider"
              :placeholder="$t('PostCarpool.timeOutward')"
              :value="outwardTimeInit"
              @ionChange="changePostOutwardTime($event)"
              minute-values="0,5,10,15,20,25,30,35,40,45,50,55"
            ></ion-datetime>
          </ion-item>
          <div v-if="$v.outwardTimeCopy.$error">
            <div
              class="mc-error-label"
              v-if="!$v.outwardTimeCopy.required"
            >{{$t('Validation.required')}}</div>
          </div>
        </ion-col>
      </ion-row>

      <ion-row>
        <ion-item lines="none">
          <ion-label>{{$t('PostCarpool.return')}}</ion-label>
          <ion-checkbox
            slot="start"
            :checked="this.$store.getters.carpoolToPost.oneWay == false"
            @ionChange="changeOneWay()"
          ></ion-checkbox>
        </ion-item>
      </ion-row>

      <ion-row v-if="carpoolToPost.oneWay == false">
        <ion-col>
          <ion-item v-if="isPonctual">
            <ion-label position="floating">{{$t('PostCarpool.dayReturn')}}</ion-label>
            <ion-datetime
              display-format="DD/MM/YY"
              picker-format="DD/MM/YY"
              cancel-text="Annuler"
              done-text="Valider"
              :max="'2099-12-31T23:59:59.000Z'"
              :placeholder="$t('PostCarpool.dayReturn')"
              :value="this.$store.getters.carpoolToPost.returnDate"
              @ionChange="changePostReturnDate($event)"
            ></ion-datetime>
          </ion-item>
          <div v-if="$v.carpoolToPost.returnDate.$error">
            <div
              class="mc-error-label"
              v-if="!$v.carpoolToPost.returnDate.required"
            >{{$t('Validation.required')}}</div>
            <div
              class="mc-error-label"
              v-if="!$v.carpoolToPost.returnDate.isAfterDate"
            >{{$t('Validation.isAfterDate')}}</div>
          </div>
        </ion-col>

        <ion-col>
          <ion-item v-if="isPonctual">
            <ion-label position="floating">{{$t('PostCarpool.timeReturn')}}</ion-label>
            <ion-datetime
              display-format="HH:mm"
              picker-format="HH:mm"
              cancel-text="Annuler"
              done-text="Valider"
              :placeholder="$t('PostCarpool.timeReturn')"
              :value="returnTimeInit"
              @ionChange="changePostReturnTime($event)"
              minute-values="0,5,10,15,20,25,30,35,40,45,50,55"
            ></ion-datetime>
          </ion-item>
          <div v-if="$v.returnTimeCopy.$error">
            <div
              class="mc-error-label"
              v-if="!$v.returnTimeCopy.required"
            >{{$t('Validation.required')}}</div>
          </div>
        </ion-col>
      </ion-row>
    </div>

    <div class="mc-form-carpool-time-regular" v-if="!isPonctual">
      <div
        class="mc-schedule-select"
        v-for="(schedule, index) in carpoolToPost.schedule"
        :key="index"
      >
        <div class="mc-schedule-delete" v-if="index > 0">
          <ion-icon name="trash" size="large" v-on:click="deleteStepSchedule(index)"></ion-icon>
        </div>
        <ion-item>
          <ion-label>{{$t(`PostCarpool.mon`)}}</ion-label>
          <ion-checkbox
            slot="start"
            :checked="schedule.mon"
            @ionChange="setDaySelect($event, index, 'mon')"
            :disabled="disabledDayIfAlreadySelected('mon', index)"
          ></ion-checkbox>
        </ion-item>

        <ion-item>
          <ion-label>{{$t(`PostCarpool.tue`)}}</ion-label>
          <ion-checkbox
            slot="start"
            :checked="schedule.tue"
            @ionChange="setDaySelect($event, index, 'tue')"
            :disabled="disabledDayIfAlreadySelected('tue', index)"
          ></ion-checkbox>
        </ion-item>

        <ion-item>
          <ion-label>{{$t(`PostCarpool.wed`)}}</ion-label>
          <ion-checkbox
            slot="start"
            :checked="schedule.wed"
            @ionChange="setDaySelect($event, index, 'wed')"
            :disabled="disabledDayIfAlreadySelected('wed', index)"
          ></ion-checkbox>
        </ion-item>

        <ion-item>
          <ion-label>{{$t(`PostCarpool.thu`)}}</ion-label>
          <ion-checkbox
            slot="start"
            :checked="schedule.thu"
            @ionChange="setDaySelect($event, index, 'thu')"
            :disabled="disabledDayIfAlreadySelected('thu', index)"
          ></ion-checkbox>
        </ion-item>

        <ion-item>
          <ion-label>{{$t(`PostCarpool.fri`)}}</ion-label>
          <ion-checkbox
            slot="start"
            :checked="schedule.fri"
            @ionChange="setDaySelect($event, index, 'fri')"
            :disabled="disabledDayIfAlreadySelected('fri', index)"
          ></ion-checkbox>
        </ion-item>

        <ion-item>
          <ion-label>{{$t(`PostCarpool.sat`)}}</ion-label>
          <ion-checkbox
            slot="start"
            :checked="schedule.sat"
            @ionChange="setDaySelect($event, index, 'sat')"
            :disabled="disabledDayIfAlreadySelected('sat', index)"
          ></ion-checkbox>
        </ion-item>

        <ion-item>
          <ion-label>{{$t(`PostCarpool.sun`)}}</ion-label>
          <ion-checkbox
            slot="start"
            :checked="schedule.sun"
            @ionChange="setDaySelect($event, index, 'sun')"
            :disabled="disabledDayIfAlreadySelected('sun', index)"
          ></ion-checkbox>
        </ion-item>

        <ion-row>
          <ion-col>
            <ion-item>
              <ion-label position="floating">Heure de départ</ion-label>
              <ion-datetime
                display-format="HH:mm"
                picker-format="HH:mm"
                cancel-text="Annuler"
                done-text="Valider"
                :placeholder="$t('PostCarpool.timeOutward')"
                :value="getTimeSchedule(index, 'outwardTime')"
                @ionChange="changeTimeSchedule($event, index, 'outwardTime')"
              ></ion-datetime>
            </ion-item>
          </ion-col>

          <ion-col>
            <ion-item>
              <ion-label position="floating">{{$t('PostCarpool.timeReturn')}} (facultatif)</ion-label>
              <ion-datetime
                display-format="HH:mm"
                picker-format="HH:mm"
                cancel-text="Annuler"
                done-text="Valider"
                :placeholder="$t('PostCarpool.timeReturn')"
                :value="getTimeSchedule(index, 'returnTime')"
                @ionChange="changeTimeSchedule($event, index, 'returnTime')"
              ></ion-datetime>
            </ion-item>
          </ion-col>
        </ion-row>
      </div>
      <div
        v-if="hasALeastFirstStepSchedule"
        v-on:click="addScheduleStep()"
        class="text-center d-flex align-center pointer mc-button-step-schedule"
      >
        <div>
          <ion-icon name="add-circle-outline"></ion-icon>
          {{$t('PostCarpool.addSchedule')}}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.mc-form-carpool-time-ponctual {
  margin-top: 40px;

  ion-row {
    margin-bottom: 40px;
  }
}

.mc-button-step-schedule {
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 2;

  div {
    border: 2px solid rgba(0, 0, 0, 0.12);
    background: white;
    padding: 10px;
    border-radius: 20px;
    z-index: 2;
  }
}

.mc-form-carpool-time-regular {
  margin-bottom: 60px;
}

.mc-schedule-select {
  padding: 30px 30px;
  border-radius: 10px;
  border: 2px solid rgba(0, 0, 0, 0.12);
  margin-bottom: 20px;
  position: relative;

  .mc-schedule-delete {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 1;
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
  requiredIf
} from "vuelidate/lib/validators";

import { toast } from "../../Shared/Mixin/toast.mixin";
var moment = require('moment');



export default {
  name: "post-carpool-step2",
  data() {
    return {
      dateOutwardCarpool: Object.assign(
        {},
        this.$store.getters.carpoolToPost.outwardDate
      ),
      outwardTimeInit: this.computeOutWardTime(),
      outwardTimeCopy: this.$store.getters.carpoolToPost.outwardTime,
      returnTimeInit: this.computeReturnTime(),
      returnTimeCopy: this.$store.getters.carpoolToPost.returnTime
    };
  },
  validations: {
    carpoolToPost: {
      role: {
        required
      },
      outwardDate: {
        required: requiredIf(function(outwardDate) {
          return this.$store.getters.carpoolToPost.frequency == 1;
        }),
        isAfterNow : function isAfterNow(value) {
          return moment(value).isSameOrAfter(moment().startOf('day'));
        }
      },
      returnDate: {
        required: requiredIf(function(returnDate) {
          return (
            this.$store.getters.carpoolToPost.frequency == 1 && !this.$store.getters.carpoolToPost.oneWay
          );
        }),
        isAfterDate : function isAfterDate(value) {
          if (this.$store.getters.carpoolToPost.frequency == 1 && !this.$store.getters.carpoolToPost.oneWay) {
            return moment(value).isSameOrAfter(moment(this.$store.getters.carpoolToPost.outwardDate));
          } else {
            return true;
          }
        }
      }
    },
    outwardTimeCopy: {
      required: requiredIf(function(outwardTime) {
        return this.$store.getters.carpoolToPost.frequency == 1;
      })
    },
    returnTimeCopy: {
      required: requiredIf(function(returnTimeCopy) {
        return this.$store.getters.carpoolToPost.frequency == 1 && !this.$store.getters.carpoolToPost.oneWay;
      })
    }
  },
  mixins: [toast],
  created() {},
  computed: {
    carpoolToPost() {
      return this.$store.getters.carpoolToPost;
    },

    isPonctual() {
      return this.$store.getters.carpoolToPost.frequency == 1;
    },

    hasALeastFirstStepSchedule() {
      let result = false;
      let resultArray = [];

      if (this.carpoolToPost.frequency == 2) {
        this.carpoolToPost.schedule.forEach(element => {
          const hasOneDaySelect = [
            "mon",
            "tue",
            "wed",
            "thu",
            "fri",
            "sat",
            "sun"
          ].some(day => {
            return element[day] == true;
          });
          resultArray.push(
            hasOneDaySelect && (element.returnTime || element.outwardTime)
              ? true
              : false
          );
        });
      }

      result = resultArray.every(item => item == true);
      return result;
    }
  },
  updated() {
    this.scrollToEnd();
  },
  methods: {
    validate() {
      this.$v.$reset();
      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      } else {

        // Si on est en trajet régulier
        if (this.carpoolToPost.frequency == 1) {
          this.$store.commit("changeTimeOutwardCarpool", {
            outwardTime: this.outwardTimeCopy
          });

          this.$store.commit("changeTimeReturnCarpool", {
            returnTime: this.returnTimeCopy
          });
        }

        // Si on est en trajet régulier mais que les créneaux ne sont pas bien remplit
        if (
          !this.hasALeastFirstStepSchedule &&
          this.carpoolToPost.frequency == 2
        ) {
          this.presentToast("Les créneaux ne sont pas bien définis", "danger");
          return false;
        } else if (this.carpoolToPost.frequency == 2) {
           this.$store.dispatch("changeOneWayRegular");
        }
        return true;
      }
    },

    changePostOutwardDate($event) {
      this.$store.commit("changeDateOutwardCarpool", {
        outwardDate: new Date($event.detail.value)
      });
    },

    changePostOutwardTime($event) {
      const outwardTime = this.$moment($event.detail.value).format("HH:mm");
      this.outwardTimeCopy = outwardTime;
    },

    changePostReturnDate($event) {
      this.$store.commit("changeDateReturnCarpool", {
        returnDate: new Date($event.detail.value)
      });
    },

    changePostReturnTime($event) {
      const returnTime = this.$moment($event.detail.value).format("HH:mm");
      this.returnTimeCopy = returnTime;
    },

    changeOneWay() {
      if (this.$store.getters.carpoolToPost.oneWay == false) {
        this.$store.getters.carpoolToPost.oneWay = true;
      } else {
        this.$store.getters.carpoolToPost.oneWay = false;
      }
    },

    computeOutWardTime() {
      if (!!this.$store.getters.carpoolToPost.outwardTime) {
        const hour = this.$store.getters.carpoolToPost.outwardTime.split(
          ":"
        )[0];
        const min = this.$store.getters.carpoolToPost.outwardTime.split(":")[1];
        const date = new Date();

        if (!!hour && !!min) {
          date.setHours(hour, min);
          return date.toString();
        } else {
          return "";
        }
      } else {
        return "";
      }
    },

    computeReturnTime() {
      if (!!this.$store.getters.carpoolToPost.returnTime) {
        const hour = this.$store.getters.carpoolToPost.returnTime.split(":")[0];
        const min = this.$store.getters.carpoolToPost.returnTime.split(":")[1];
        const date = new Date();
        date.setHours(hour, min);
        return date.toString();
        if (!!hour && !!min) {
          date.setHours(hour, min);
          return date.toString();
        } else {
          return "";
        }
      } else {
        return "";
      }
    },

    setDaySelect($event, index, prop) {
      this.$store.commit("changeSelectDaySchedule", { index, prop });
    },

    getTimeSchedule(index, prop) {
      if (!!this.carpoolToPost.schedule[index]) {
        const hour = this.carpoolToPost.schedule[index][prop].split(":")[0];
        const min = this.carpoolToPost.schedule[index][prop].split(":")[1];

        if (!!hour && !!min) {
          const date = new Date();
          date.setHours(hour, min);
          return date.toString();
        } else {
          return "";
        }
      } else {
        return "";
      }
    },

    changeTimeSchedule($event, index, prop) {
      if (!!this.carpoolToPost.schedule[index]) {
        const value = this.$moment($event.detail.value).format("HH:mm");
        this.$store.commit("changeTimeSchedule", { index, prop, value });
      }
    },

    addScheduleStep() {
      this.$store.commit("carpoolPost_schedule_add");
    },

    scrollToEnd: function() {
      const container = this.$el.querySelector(".mc-form-carpool-time-regular");
      if (!!container) {
        container.scrollTop = container.scrollHeight;
      }
    },

    deleteStepSchedule(index) {
      this.$store.commit("carpoolPost_schedule_delete_slot", { index });
    },

    disabledDayIfAlreadySelected(day, index) {
      const arrayTmp = [];
      this.carpoolToPost.schedule.forEach(stepSchedule => {
        arrayTmp.push(stepSchedule[`${day}`]);
      });

      // Si le jour est check une fois
      const isCheked = arrayTmp.some(value => value == true);

      // On disabled si le jour est checked et que nous ne sommes pas sur la step qui le check.
      if (isCheked && arrayTmp[index] == false) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
