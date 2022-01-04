<template>
  <ProgressSteps step="1" />
  <div class="select-room-container px-5 mt-4">
    <div class="hotel-info-area py-4 px-4 d-flex flex-column">
      <div class="fw-bold">{{ hotelInfos.hotelName }}</div>
      <div class="d-flex gap-4">
        <div>
          <span class="fw-bold"> Giriş tarihi: </span
          >{{ formatTime(startDate) }}
        </div>
        <div>
          <span class="fw-bold">Çıkış tarihi:</span> {{ formatTime(endDate) }}
        </div>
        <div><span class="fw-bold">Yetişkin:</span> {{ adultSize }}</div>
        <div v-if="childSize">
          <span class="fw-bold">Çocuk:</span> {{ childSize }}
        </div>
      </div>
    </div>
    <div class="room-selection pt-5">
      <div class="fw-bold mb-2">Oda Tipi Seçimi</div>
      <div>
        <div
          class="btn-group d-flex justify-content-between flex-wrap"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <div
            class="d-flex flex-column radio-area px-4 py-3"
            v-for="roomType in selectedHotel.room_type"
            v-bind:class="{ active: selectedRoomType === roomType.id }"
            :key="roomType.id"
          >
            <input
              type="radio"
              class="btn-check"
              :name="'room' + roomType.id"
              :id="'room' + roomType.id"
              :value="roomType.id"
              autocomplete="off"
              v-model="selectedRoomType"
              required
            />
            <div class="d-flex flex-column">
              <span class="fw-bold">{{ roomType.title }}</span>
              <label class="btn px-0 py-1" :for="'room' + roomType.id">
                <img :src="roomType.photo" alt="" width="250" />
              </label>
            </div>
            <div>
              <div class="d-flex justify-content-between">
                <span>{{ dayDifferences }} Gün</span>
                <span>{{ roomType.price * dayDifferences }} TL</span>
              </div>
              <span>{{ adultSize }} Yetişkin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="scenic-selection pt-5">
      <div class="fw-bold mb-2">Manzara Seçimi</div>
      <div>
        <div
          class="btn-group d-flex justify-content-between flex-wrap"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <div
            class="d-flex flex-column radio-area px-4 py-3"
            v-bind:class="{ active: selectedScenicType === scenicType.id }"
            v-for="scenicType in selectedHotel.room_scenic"
            :key="scenicType.id"
          >
            <input
              type="radio"
              class="btn-check"
              :name="'scenic' + scenicType.id"
              :id="'scenic' + scenicType.id"
              :value="scenicType.id"
              autocomplete="off"
              v-model="selectedScenicType"
              required
            />
            <div class="d-flex flex-column">
              <span class="fw-bold">{{ scenicType.title }}</span>
              <label class="btn px-0 py-1" :for="'scenic' + scenicType.id">
                <img :src="scenicType.photo" alt="" width="250" />
              </label>
            </div>
            <div>
              <div class="d-flex justify-content-between">
                <span>{{ dayDifferences }} Gün</span>
                <span>+ {{ scenicType.price_rate }}%</span>
              </div>
              <span>{{ adultSize }} Yetişkin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="hasError" class="text-danger mt-2">
      Oda tipi ve manzara seçimi yaptığınıza emin olunuz.
    </div>
    <div class="d-flex justify-content-between py-4">
      <button type="submit" class="btn btn-secondary" @click="goBack()">
        Geri
      </button>
      <button type="submit" class="btn btn-primary" @click="checkRooms($event)">
        Kaydet ve Devam Et
      </button>
    </div>
  </div>
</template>

<script>
import ProgressSteps from "./ProgressSteps.vue";
import moment from "moment";
import { mapState } from "vuex";

export default {
  name: "SelectRoom",
  components: {
    ProgressSteps,
  },
  data() {
    return {
      selectedRoomType: null,
      selectedScenicType: null,
      hotelInfos: JSON.parse(localStorage.getItem("hotelInfos")),
      dayDifferences: null,
      adultSize: null,
      childSize: null,
      startDate: null,
      endDate: null,
      roomPrice: null,
      roomPriceRate: null,
      hasError: null,
    };
  },
  computed: mapState({
    selectedHotel: (state) => state.selectedHotel,
  }),
  mounted() {
    this.startDate = moment(this.hotelInfos.startDate);
    this.endDate = moment(this.hotelInfos.endDate);
    this.dayDifferences = this.endDate.diff(this.startDate, "days");

    this.adultSize = this.hotelInfos.adultSize;
    this.childSize = this.hotelInfos.childSize;
  },
  methods: {
    checkRooms(e) {
      if (this.selectedRoomType && this.selectedScenicType) {
        this.changeSteps(2);
      } else {
        this.hasError = true;
        e.preventDefault();
      }
    },
    changeSteps(value) {
      this.selectedHotel.room_type.forEach((item) => {
        if (item.id === this.selectedRoomType) {
          this.roomPrice = item.price;
        }
      });
      this.selectedHotel.room_scenic.forEach((item) => {
        if (item.id === this.selectedScenicType) {
          this.roomPriceRate = item.price_rate;
        }
      });
      const roomInfos = {
        roomType: this.selectedRoomType,
        scenicType: this.selectedScenicType,
        roomPrice: this.roomPrice,
        roomPriceRate: this.roomPriceRate,
        numberOfDays: this.dayDifferences,
      };
      localStorage.setItem("roomInfos", JSON.stringify(roomInfos));
      this.$store.commit("changeStepNumber", { stepNumber: value });
    },
    goBack() {
      this.$store.commit("changeStepNumber", { stepNumber: 0 });
    },
    formatTime(value) {
      return moment(value).format("DD.MM.YYYY");
    },
  },
};
</script>
<style>
.hotel-info-area {
  background-color: #f0eeee;
}
.radio-area {
  border-radius: 10px;
  border: 2px solid lightgray;
}
.active {
  border: 2px solid green;
}
.divider {
  color: lightgrey;
}
</style>
