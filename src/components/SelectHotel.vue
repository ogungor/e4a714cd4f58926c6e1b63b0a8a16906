<template>
  <div class="select-date-container">
    <!--<ProgressSteps step="0"/>-->
    <div
      class="
        d-flex
        flex-column
        align-items-center
        justify-content-center
        px-4
        px-md-5
        select-hotel-wrapper
      "
    >
      <form id="selectHotel" action="" @submit.prevent="checkForm($event)">
        <div class="select-otel pt-4">
          <span class="input-text text-family"
            >Rezervasyon yapmak istediğiniz oteli seçiniz</span
          >
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <span class="bi-search"></span>
              </span>
            </div>
            <select
              class="form-select form-shadow"
              v-model="hotelId"
              aria-label="Otel Seçiniz"
              required
              @change="changeSelectedHotel($event)"
            >
              <!-- <option selected disabled>Choose Your Hotel</option> -->
              <option
                v-for="hotel in hotelsList"
                :value="hotel.id"
                :key="hotel.id"
              >
                {{ hotel.hotel_name }}
              </option>
            </select>
          </div>
          <div class="error-text" v-if="errors.hotelError">Otel seçin.</div>
        </div>

        <div class="d-flex gap-2 justify-content-start pt-4">
          <div class="">
            <span class="input-text text-family">Giriş Tarihi</span>
            <Datepicker
              class="form-shadow"
              required
              v-model="startDate"
              :enableTimePicker="false"
            ></Datepicker>
          </div>
          <div class="">
            <span class="input-text text-family">Çıkış Tarihi</span>
            <Datepicker
              class="form-shadow"
              required
              v-model="endDate"
              :enableTimePicker="false"
            ></Datepicker>
          </div>
        </div>
         <div class="error-text" v-if="errors.wrongDateRangeError">Giriş tarihi çıkış tarihinden önce olmalıdır.</div>
        <div class="d-flex gap-2 justify-content-start pt-4">
          <div class="d-flex flex-column w-100">
            <span class="input-text text-family">Yetişkin Sayısı</span>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <span class="bi-person"></span>
                </span>
              </div>
              <input
                class="form-shadow flex-grow-1 startDate"
                type="number"
                min="0"
                max="5"
                v-model="adultSize"
              />
            </div>

            <div class="error-text" v-if="errors.adultSizeError">
              {{ this.errors.adultSizeError }}
            </div>
          </div>
          <div class="d-flex flex-column w-100">
            <span class="input-text text-family">Çocuk Sayısı</span>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <span class="bi-person"></span>
                </span>
              </div>
              <input
                class="form-shadow flex-grow-1 endDate"
                type="number"
                min="0"
                max="5"
                v-model="childSize"
                :disabled="selectedHotel && !selectedHotel.child_status"
              />
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-end py-4">
          <button type="submit" class="btn btn-primary btn-sm">
            Kaydet ve Devam Et
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
//import ProgressSteps from "./ProgressSteps.vue";
import Datepicker from "vue3-date-time-picker";
import { mapState } from "vuex";

export default {
  name: "SelectHotel",
  components: {
    //ProgressSteps,
    Datepicker,
  },
  data() {
    return {
      hotelId: null,
      hotelName: null,
      startDate: null,
      endDate: null,
      adultSize: null,
      childSize: null,
      errors: {
        hotelError: null,
        startDateError: null,
        endDateError: null,
        adultSizeError: null,
        wrongDateRangeError: null
      },
    };
  },
  computed: mapState({
    hotelsList: (state) => state.hotelsList,
    selectedHotel: (state) => state.selectedHotel,
    hotelDetails: (state) => state.hotelDetails,
  }),
  created() {
    this.$store.dispatch("getHotels");
    this.$store.dispatch("getHotelDetails");
  },
  methods: {
    changeStep(value) {
      this.hotelsList.forEach((item) => {
        if (item.id === this.selectedHotel.id) {
          this.hotelName = item.hotel_name;
          return;
        }
      });
      const hotelInfos = {
        hotelId: this.hotelId,
        hotelName: this.hotelName,
        startDate: this.startDate,
        endDate: this.endDate,
        adultSize: this.adultSize,
        childSize: this.childSize,
      };
      localStorage.setItem("hotelInfos", JSON.stringify(hotelInfos));
      this.$store.commit("changeStepNumber", { stepNumber: value });
    },
    changeSelectedHotel(event) {
      this.$store.commit("setSelectedHotel", { id: event.target.value });
    },
    checkForm(e) {
      if (
        this.selectedHotel &&
        this.startDate &&
        this.endDate &&
        this.adultSize &&
        this.adultSize < this.selectedHotel.max_adult_size &&
        this.startDate < this.endDate
      ) {
        this.changeStep(1);
      } else {
        if (!this.selectedHotel) {
          this.errors.hotelError = true;
        }
        if (!this.startDate) {
          this.errors.startDateError = true;
        }
        if (!this.endDate) {
          this.errors.endDateError = true;
        }
        if (this.adultSize >= this.selectedHotel.max_adult_size) {
          this.errors.adultSizeError = true;
        }
        if(this.startDate >= this.endDate) {
          this.errors.wrongDateRangeError = true;
        }
      }
      e.preventDefault();
    },
  },
};
</script>

<style scoped>
.select-hotel-wrapper {
  background-image: url("../assets/images/1.jpg");
  background-size: cover;
  background-position: 23% 100%;
  height: 100vh;
}

.input-text {
  color: white;
  font-size: 16px;
  font-weight: 600;
}

.text-family {
  font-family: "Helvetica";
  font-weight: 400;
}

.form-shadow {
  border: 1px solid darkgrey;
  box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;
}

.startDate, .endDate {
  padding-left: 10px;
}

.error-text {
  color: red;
  font-size: 16px;
  font-weight: 600;
}
</style>