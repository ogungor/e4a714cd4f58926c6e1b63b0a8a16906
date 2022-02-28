<template>
  <div>
    <div class="p-5">
      <div class="d-flex justify-content-center">
        <img src="../assets/icons/check-icon.png" width="200" alt="" />
      </div>
      <div>
        <p class="fw-bold fs-3 text-center">
          Rezervasyon Kaydınız Başarıyla Alınmıştır
        </p>
        <p class="text-center">
          Rezervasyon özetiniz aşağıdaki gibidir. Yeni rezervasyon yaptırmak
          veya yaptırdığınız rezervasyonu iptal etmek için aşağıdaki butonları
          kullanabilirsiniz.
        </p>
      </div>
      <div class="d-flex justify-content-around mt-4">
        <button class="btn btn-primary" @click="makeNewReservation()">
          Yeni Rezervasyon Yap
        </button>
        <button
          type="submit"
          class="btn btn-primary"
          @click="deleteReservation()"
        >
          Rezervasyonu İptal Et
        </button>
      </div>
      <div v-if="reservationDeletedText" class="text-success">
        Rezervasyonunuz silinmiştir.
      </div>
      <div>
        <div class="reservation-info d-flex flex-column mt-4 p-4">
          <div>
            <span class="fw-bolder fs-4">{{ reservationInfos.hotelName }}</span>
            <div class="d-flex flex-wrap gap-2 justify-content-between mt-4">
              <div
                class="d-flex flex-column col-5 bg-white rounded-3 align-items-center px-2 py-3 box-border"
              >
                <span class="fw-bold">Giriş Tarihi</span>
                <span>{{ formatDate(reservationInfos.start_date) }}</span>
              </div>
              <div
                class="d-flex flex-column col-5 bg-white rounded-3 align-items-center px-2 py-3 box-border"
              >
                <span class="fw-bold">Çıkış Tarihi</span>
                <span>{{ formatDate(reservationInfos.end_date) }}</span>
              </div>
              <div
                class="d-flex flex-column col-5 bg-white rounded-3 align-items-center px-2 py-3 box-border"
              >
                <span class="fw-bold">Yetişkin</span>
                <span>{{ reservationInfos.adult }}</span>
              </div>
              <div
                class="d-flex flex-column col-5 bg-white rounded-3 align-items-center px-2 py-3 box-border"
              >
                <span class="fw-bold">Çocuk</span>
                <span>{{ reservationInfos.child || "0" }}</span>
              </div>
              <div
                class="d-flex flex-column col-5 bg-white rounded-3 align-items-center px-2 py-3 box-border"
              >
                <span class="fw-bold">Oda Tipi</span>
                <span>{{ reservationInfos.room_type }}</span>
              </div>
              <div
                class="d-flex flex-column col-5 bg-white rounded-3 align-items-center px-2 py-3 box-border"
              >
                <span class="fw-bold">Manzara</span>
                <span>{{ reservationInfos.room_scenic }}</span>
              </div>
            </div>
          </div>
          <div class="d-flex flex-column bg-white mt-4 px-4 py-3 rounded-top">
            <div class="d-flex justify-content-between">
              <span class="fw-bold">Oda Fiyatı</span>
              <span>{{ roomInfos.roomPrice }} TL </span>
            </div>
            <div class="d-flex justify-content-between">
              <span class="fw-bold">Fiyat Etki Oranı</span>
              <span>% {{ roomInfos.roomPriceRate }}</span>
            </div>
            <div class="d-flex justify-content-between">
              <span class="fw-bold"
                >Konaklama ({{ roomInfos.numberOfDays }} Gün)</span
              >
              <span>{{ formatPrice(reservationInfos.price) }} TL</span>
            </div>
            <div
              class="d-flex justify-content-between"
              v-if="reservationInfos.coupon_code"
            >
              <span class="fw-bold"
                >İndirim ({{ reservationInfos.coupon_code }})</span
              >
              <span>-{{ discountAmount }} TL</span>
            </div>
          </div>
          <hr class="my-0" />
          <div
            class="d-flex flex-column align-items-center bg-white px-4 py-3 rounded-bottom"
          >
            <span class="fw-bold fs-6">TOPLAM TUTAR</span>
            <span class="fw-bold fs-3">{{ formatPrice(reservationInfos.price) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "fa-icons";
import { mapState } from "vuex";
import axios from "axios";
import moment from "moment";

export default {
  name: "ReservationCompleted",
  data() {
    return {
      hotelInfos: JSON.parse(localStorage.getItem("hotelInfos")),
      roomInfos: JSON.parse(localStorage.getItem("roomInfos")),
      discountAmount: localStorage.getItem("discountAmount"),
      reservationDeletedText: null,
    };
  },
  computed: mapState({
    reservationInfos: (state) => state.reservationInfos,
  }),
  methods: {
    makeNewReservation() {
      localStorage.removeItem("hotelInfos");
      localStorage.removeItem("roomInfos");
      localStorage.removeItem("discountAmount");
      this.changeStep(0);
    },
    deleteReservation() {
      axios
        .delete(
          "https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-bookings/" +
            this.reservationInfos.id
        )
        .then((response) => {
          if (response.status === 200) {
            this.reservationDeletedText = true;
            setTimeout(() => {
              this.changeStep(0);
            }, 2000);
          }
        });
    },
    changeStep(step) {
      this.$store.commit("changeStepNumber", { stepNumber: step });
    },
    formatDate(value) {
      return moment(value).format("DD.MM.YYYY");
    },
    formatPrice(price) {
      return (price).toLocaleString('tr-TR', {
        style: 'currency',
        currency: 'TRY',
      })
    },
  },
};
</script>
<style>
.reservation-info {
  background-color: #f6f9fd;
}

.box-border {
    border: 1px solid lightblue;
}
</style>
