<template>
  <!--<ProgressSteps step="1" />-->
  <div class="select-room-container">
    <div class="hotel-info-area py-4 px-5 d-flex flex-column">
      <div class="d-flex flex-column flex-md-row gap-4 justify-content-between">
        <div class="text-center text-md-start h5">
          {{ hotelInfos.hotelName }}
        </div>
        <div class="d-flex gap-3 text-center">
          <div>
            <span class="fw-bold"> Giriş Tarihi: </span
            >{{ formatTime(startDate) }}
          </div>
          <div>
            <span class="fw-bold">Çıkış Tarihi:</span> {{ formatTime(endDate) }}
          </div>
          <div><span class="fw-bold">Yetişkin:</span> {{ adultSize }}</div>
          <div v-if="childSize">
            <span class="fw-bold">Çocuk:</span> {{ childSize }}
          </div>
        </div>
      </div>
    </div>
    <div class="room-selection py-4 px-3 px-md-5">
      <div class="mb-2 h5">Oda Tipi Seçimi</div>
      <div>
        <div
          class="btn-group d-flex flex-column justify-content-between flex-wrap"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <div
            class="
              d-flex
              col-12
              flex-column
              radio-area
              px-2
              py-2
              mb-2
              card-item
            "
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
            <div class="d-flex flex-md-row flex-column justify-content-between">
              <div
                class="d-flex flex-row align-items-center gap-3 col-12 col-md-6"
              >
                <label class="btn px-0 py-0" :for="'room' + roomType.id">
                  <img
                    class="select-room-image"
                    :src="roomType.photo"
                    alt=""
                    width="200"
                  />
                </label>
                <div class="d-flex flex-column">
                  <span class="card-title">{{ roomType.title }} Tip Oda</span>
                  <span class="">Oda Kahvaltı Dahil</span>
                </div>
              </div>
              <div
                class="
                  d-flex
                  justify-content-around
                  align-items-center
                  col-12 col-md-6
                "
              >
                <div
                  class="
                    d-flex
                    flex-column
                    align-items-center align-items-md-start
                    mt-2 mt-md-0
                  "
                >
                  <span>{{ dayDifferences }} Gün</span>
                  <span>{{ adultSize }} Yetişkin</span>
                </div>
                <div class="d-flex justify-content-center">
                  <span class="fw-bold"
                    >{{ formatPrice(roomType.price * dayDifferences) }} TL</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="scenic-selection py-4 px-3 px-md-5">
      <div class="mb-2 h5">Manzara Seçimi</div>
      <div>
        <div
          class="btn-group d-flex flex-column justify-content-between flex-wrap"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <div
            class="
              d-flex
              col-12
              flex-column
              radio-area
              px-2
              py-2
              mb-2
              card-item
            "
            v-for="scenicType in selectedHotel.room_scenic"
            v-bind:class="{ active: selectedScenicType === scenicType.id }"
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
            <div class="d-flex flex-md-row flex-column justify-content-between">
              <div
                class="d-flex flex-row align-items-center gap-3 col-12 col-md-6"
              >
                <label class="btn px-0 py-0" :for="'scenic' + scenicType.id">
                  <img
                    class="select-room-image"
                    :src="scenicType.photo"
                    alt=""
                    width="200"
                  />
                </label>
                <div class="d-flex flex-column">
                  <span class="card-title">{{ scenicType.title }}</span>
                </div>
              </div>
              <div
                class="
                  d-flex
                  flex-column flex-md-row
                  col-12 col-md-6
                  justify-content-around
                "
              >
                <div class="d-flex mt-2 mt-md-0 justify-content-around">
                  <div class="d-flex flex-column align-self-center">
                    <ul class="room-properties">
                      <li>Oda Servisi</li>
                      <li>Balkon</li>
                      <li>Elektronik Anahtar Sistemi</li>
                      <li>LCD TV</li>
                    </ul>
                  </div>
                  <div class="d-flex flex-column align-self-center">
                    <ul class="room-properties">
                      <li>Minibar</li>
                      <li>Uydu Yayını</li>
                      <li>Su Isıtıcı</li>
                      <li>Banyo</li>
                    </ul>
                  </div>
                </div>
                <div
                  class="
                    d-flex
                    flex-column
                    align-self-center align-items-center
                  "
                >
                  <span class="fw-bold">Ekstra Vergi</span>
                  <span class="fw-bold">+ {{ scenicType.price_rate }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-between py-4 px-3 px-md-5">
      <button type="submit" class="btn btn-secondary" @click="goBack()">
        Geri
      </button>
      <button type="submit" class="btn btn-primary" @click="checkRooms($event)">
        Kaydet ve Devam Et
      </button>
    </div>
  </div>
  <vue-basic-alert :duration="300" :closeIn="3000" ref="alert" />
</template>

<script>
//import ProgressSteps from "./ProgressSteps.vue";
import VueBasicAlert from "vue-basic-alert";
import moment from "moment";
import { mapState } from "vuex";

export default {
  name: "SelectRoom",
  components: {
    //ProgressSteps,
    VueBasicAlert,
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
    };
  },
  computed: {
    ...mapState({
      selectedHotel: (state) => state.selectedHotel,
    }),
  },
  mounted() {
    this.startDate = moment(this.hotelInfos.startDate);
    this.endDate = moment(this.hotelInfos.endDate);
    this.dayDifferences = this.endDate.diff(this.startDate, "days");

    this.adultSize = this.hotelInfos.adultSize;
    this.childSize = this.hotelInfos.childSize;
  },
  methods: {
    formatPrice(price) {
      return (price).toLocaleString('tr-TR', {
        style: 'currency',
        currency: 'TRY',
      })
    },
    checkRooms(e) {
      if (this.selectedRoomType && this.selectedScenicType) {
        this.changeSteps(2);
      } else {
        this.$refs.alert.showAlert(
          "error",
          "",
          "Oda tipi ve manzara seçimi yaptığınıza emin olunuz.",
          "Success 200",
          "This is the information of something you may know Success."
        );
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
  background-color: #d6e2f1;
}
.radio-area {
  border-radius: 6px;
  border: 2px solid lightgray;
}
.active {
  border: 2px solid green;
}
.divider {
  color: lightgrey;
}
.select-room-image {
  border-radius: 5px;
}

.room-properties {
  font-family: "Helvetica";
  font-size: 12px;
}

.card-item {
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 400;
}
</style>
