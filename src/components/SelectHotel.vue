<template>
  <div class="select-date-container">
    <ProgressSteps step="0"/>
    <div class="d-flex flex-column align-items-center px-5">
      <form id="selectHotel" action="" @submit.prevent="checkForm($event)">
        <div class="select-otel pt-4">
          <span>Rezervasyon yapmak istediğiniz oteli seçiniz</span>
          <select
            class="form-select"
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
          <div v-if="errors.hotelError">Otel seçin.</div>
        </div>
        <div class="d-flex gap-2 justify-content-start pt-4">
          <div class="">
            <span>Giriş Tarihi</span>
            <Datepicker required v-model="startDate" :enableTimePicker="false"></Datepicker>
          </div>
          <div class="">
            <span>Çıkış Tarihi</span>
            <Datepicker required v-model="endDate" :enableTimePicker="false"></Datepicker>
          </div>
        </div>
        <div class="d-flex gap-2 justify-content-start pt-4">
          <div class="d-flex flex-column col-6">
            <span>Yetişkin Sayısı</span>
            <input type="number" required v-model="adultSize" min="0" />

            <div v-if="errors.adultSizeError">{{this.errors.adultSizeError}}</div>
          </div>
          <div class="d-flex flex-column col-6">
            <span>Çocuk Sayısı</span>
            <input
              type="number"
              min="0"
              max="5"
              v-model="childSize"
              :disabled="selectedHotel && !selectedHotel.child_status"
            />
            <span
              v-if="
                Object.keys(selectedHotel).length && !selectedHotel.child_status
              "
              >Childs not allowed in this hotel.</span
            >
          </div>
        </div>
        <div class="d-flex justify-content-end py-4">
          <button type="submit" class="btn btn-primary">
            Kaydet ve Devam Et
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import ProgressSteps from "./ProgressSteps.vue";
import Datepicker from "vue3-date-time-picker";
import { mapState } from "vuex";

export default {
  name: "SelectHotel",
  components: {
    ProgressSteps,
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
      this.hotelsList.forEach(item => {
        if (item.id === this.selectedHotel.id){
          this.hotelName = item.hotel_name
          return
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
        this.adultSize && this.adultSize < this.selectedHotel.max_adult_size
      ) {
        this.changeStep(1);
      } else {
        if (!this.selectedHotel.length) {
          this.errors.hotelError = "Hotel required.";
        }
        if (!this.startDate) {
          this.errors.startDateError = "StartDate required.";
        }
        if (this.adultSize >= this.selectedHotel.max_adult_size) {
          this.errors.adultSizeError = "Maximum yetişkin sayısını aştınız";
        }
      }
      e.preventDefault();
    },
  },
};
</script>
