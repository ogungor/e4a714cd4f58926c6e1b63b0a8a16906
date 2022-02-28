<template>
  <!--<ProgressSteps step="2" />-->
  <div class="card-infos-container py-4 px-3 px-md-5">
    <div class="col-12">
        <span class="d-flex justify-content-center h3">Ödeme Bilgileri</span>
      </div>
    <div class="d-flex flex-column-reverse flex-md-row pt-4">
      <div class="card-info d-flex flex-column col-12 col-md-7 px-2 mt-3 mt-md-0">
        <div>
          <vue-paycard :value-fields="valueFields" :isCardNumberMasked="false" />
        </div>
        <div class="mt-5">
          <span class="fw-bold">Kredi Kartı Bilgileri</span>
          <div class="d-flex flex-column pt-4">
            <span>Kartın Üzerindeki İsim</span>
            <input type="text" required v-model="valueFields.cardName" />
          </div>
          <div class="d-flex flex-column">
            <span>Kartın Numarası</span>
            <input type="text" minlength="19" required v-model="valueFields.cardNumber" maxlength="19" />
          </div>

          <!-- EXPIRE Date -->
          <div class="d-flex flex-column flex-md-row justify-content-between">
            <div class="expire-month pt-4">
              <span>Kartın Son Kullanma Tarihi</span>
              <div class="d-flex gap-2">
                <select
                  class="form-select"
                  v-model="valueFields.cardMonth"
                  aria-label="Month"
                  required
                >
                  <option
                    v-for="month in expireMonths"
                    :value="month.value"
                    :key="month.id"
                  >
                    {{ month.value }}
                  </option>
                </select>
                <select
                  class="form-select"
                  v-model="valueFields.cardYear"
                  aria-label="Year"
                  required
                >
                  <option
                    v-for="year in expireYears"
                    :value="year.value"
                    :key="year.id"
                  >
                    {{ year.value }}
                  </option>
                </select>
              </div>
            </div>
            <div class="d-flex flex-column pt-4">
              <span>CVV</span>
              <input type="number" maxlength="3" required v-model="valueFields.cardCvv" />
            </div>
          </div>
        </div>
      </div>
      <div class="summary-info d-flex flex-column col-12 col-md-5 p-4">
        <div>
          <span class="fw-bolder fs-4">{{ hotelInfos.hotelName }}</span>
          <div class="d-flex flex-wrap gap-2 justify-content-between mt-4">
            <div
              class="d-flex flex-column col-5 bg-white rounded-3 align-items-center px-2 py-3 box-border"
            >
              <span class="fw-bold">Giriş Tarihi</span>
              <span>{{ formatDate(hotelInfos.startDate) }}</span>
            </div>
            <div
              class="d-flex flex-column col-5 bg-white rounded-3 align-items-center px-2 py-3 box-border"
            >
              <span class="fw-bold">Çıkış Tarihi</span>
              <span>{{ formatDate(hotelInfos.endDate) }}</span>
            </div>
            <div
              class="d-flex flex-column col-5 bg-white rounded-3 align-items-center px-2 py-3 box-border"
            >
              <span class="fw-bold">Yetişkin</span>
              <span>{{ hotelInfos.adultSize }}</span>
            </div>
            <div
              class="d-flex flex-column col-5 bg-white rounded-3 align-items-center px-2 py-3 box-border"
            >
              <span class="fw-bold">Çocuk</span>
              <span>{{ hotelInfos.childSize || "0" }}</span>
            </div>
            <div
              class="d-flex flex-column col-5 bg-white rounded-3 align-items-center px-2 py-3 box-border"
            >
              <span class="fw-bold">Oda Tipi</span>
              <span>{{ setRoomTitle(roomInfos.roomType) }}</span>
            </div>
            <div
              class="d-flex flex-column col-5 bg-white rounded-3 align-items-center px-2 py-3 box-border"
            >
              <span class="fw-bold">Manzara</span>
              <span>{{ setScenicTitle(roomInfos.scenicType) }}</span>
            </div>
          </div>
          <div
            class="d-flex justify-content-between mt-5 rounded-3"
          >
            <input class="coupon-code-input" type="text" v-model="couponCode" placeholder="Kupon Kodu" />
            <button class="btn btn-primary" @click="useCoupon(couponCode)">
              Kodu Kullan
            </button>
          </div>
        </div>
        <div class="d-flex flex-column bg-white mt-4 px-4 py-3 rounded-top">
          <div class="d-flex justify-content-between">
            <span class="fw-bold">Oda Fiyatı</span>
            <span>{{ formatPrice(roomInfos.roomPrice) }} TL </span>
          </div>
          <div class="d-flex justify-content-between">
            <span class="fw-bold">Fiyat Etki Oranı</span>
            <span>% {{ roomInfos.roomPriceRate }}</span>
          </div>
          <div class="d-flex justify-content-between">
            <span class="fw-bold"
              >Konaklama ({{ roomInfos.numberOfDays }} Gün)</span
            >
            <span>{{ formatPrice(roomInfos.roomPrice * roomInfos.numberOfDays) }} TL</span>
          </div>
          <div
            class="d-flex justify-content-between"
            v-if="couponUsed && isCouponAvailable"
          >
            <span class="fw-bold">İndirim ({{ usedCouponCodeName }})</span>
            <span>-{{ discountAmount }} TL</span>
          </div>
        </div>
        <hr class="my-0" />
        <div
          class="d-flex flex-column align-items-center bg-white px-4 py-3 rounded-bottom"
        >
          <span class="fw-bold fs-6">TOPLAM TUTAR</span>
          <span class="fw-bold fs-3">{{ formatPrice(totalPrice) }}</span>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-between py-4">
      <button type="submit" class="btn btn-secondary" @click="goBack()">
        Geri
      </button>
      <button type="submit" class="btn btn-primary" @click="makeReservation()">
        Ödeme Yap ve Bitir
      </button>
    </div>
  </div>
  <vue-basic-alert :duration="300" :closeIn="3000" ref="couponUsed" />
  <vue-basic-alert :duration="300" :closeIn="3000" ref="couponNotUsed" />
  <vue-basic-alert :duration="300" :closeIn="3000" ref="wrongCardInfos" />
</template>

<script>
import axios from "axios";
import moment from "moment";
import { VuePaycard } from "vue-paycard";
import VueBasicAlert from "vue-basic-alert";

export default {
  name: "Checkout",
  components: {
    VuePaycard,
    VueBasicAlert
  },
  data() {
    return {
       valueFields: {
        cardName: "",
        cardNumber: "",
        cardMonth: "",
        cardYear: "",
        cardCvv: "",
      },
      couponCode: null,
      hotelInfos: JSON.parse(localStorage.getItem("hotelInfos")),
      roomInfos: JSON.parse(localStorage.getItem("roomInfos")),
      couponUsed: false,
      isCouponAvailable: null,
      usedCouponCodeName: null,
      discountAmount: null,
      expireMonths: [
        { id: 1, value: "01" },
        { id: 2, value: "02" },
        { id: 3, value: "03" },
        { id: 4, value: "04" },
        { id: 5, value: "05" },
        { id: 6, value: "06" },
        { id: 7, value: "07" },
        { id: 8, value: "08" },
        { id: 9, value: "09" },
        { id: 10, value: "10" },
        { id: 11, value: "11" },
        { id: 12, value: "12" },
      ],
      expireYears: [
        { id: 1, value: "2022" },
        { id: 2, value: "2023" },
        { id: 3, value: "2024" },
        { id: 4, value: "2025" },
        { id: 5, value: "2026" },
        { id: 6, value: "2027" },
      ],
    };
  },
  computed: {
    totalPrice: function () {
      // `this` points to the vm instance
      return (
        this.roomInfos.roomPrice * this.roomInfos.numberOfDays +
        (this.roomInfos.roomPrice *
          this.roomInfos.numberOfDays *
          this.roomInfos.roomPriceRate) /
          100 -
        this.discountAmount
      );
    },
  },
  created() {
    this.$store.dispatch("getCouponCodes");
  },
  methods: {
    useCoupon(couponCode) {
      axios(
        "https://5f6d939160cf97001641b049.mockapi.io/tkn/coupons?code=" +
          couponCode
      )
        .then((response) => response.data)
        .then((data) => {
          this.couponUsed = true;
          this.$refs.couponNotUsed.showAlert(
              "success", 
              "",
              "Kupon kullanıldı !",
              "Success 200",
              "This is the information of something you may know Success."
            );
          if (data.length) {
            data.forEach((item) => {
              const today = new Date();
              const expireDate = new Date(item.expiration_at);
              this.isCouponAvailable = today <= expireDate;
              if (this.isCouponAvailable) {
                this.usedCouponCodeName = item.code;
                this.discountAmount = item.discount_ammount;
                localStorage.setItem("discountAmount", this.discountAmount);
              }
            });
          } else {
            this.$refs.couponNotUsed.showAlert(
              "error", 
              "",
              "Kupon hatalı girildi !",
              "Error",
              "This is the information of something you may know Success."
            );
          }
        });
    },
    makeReservation() {
      if (
        this.valueFields.cardName &&
        this.checkOnlyLetter(this.valueFields.cardName) &&
        this.valueFields.cardNumber &&
        this.checkOnlyNumber(this.valueFields.cardNumber) &&
        this.valueFields.cardMonth &&
        this.valueFields.cardYear &&
        this.valueFields.cardCvv &&
        this.valueFields.cardCvv.toString().length === 3 &&
        this.checkOnlyNumber(this.valueFields.cardCvv)
      ) {
        const reservationInfos = {
          hotel_id: this.hotelInfos.hotelId,
          start_date: this.hotelInfos.startDate,
          end_date: this.hotelInfos.endDate,
          adult: this.hotelInfos.adultSize,
          child: this.hotelInfos.childSize,
          room_type: this.roomInfos.roomType,
          room_scenic: this.roomInfos.scenicType,
          price: this.totalPrice,
          coupon_code: this.couponCode,
          card_name: this.valueFields.cardName,
          card_number: this.valueFields.cardNumber,
          card_date_month: this.valueFields.cardMonth,
          card_date_year: this.valueFields.cardYear,
          card_cardCvv: this.valueFields.cardCvv,
        };
        axios
          .post(
            "https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-bookings",
            reservationInfos
          )
          .then((response) => {
            if (response.status === 201) {
              this.$store.commit("setReservationInfos", {
                reservationInfos: response.data,
              });
              this.changeStep(3);
            }
          });
      } else {
        this.$refs.wrongCardInfos.showAlert(
          "error", 
          "",
          "Kart bilgilerinizi eksiksiz ve doğru doldurunuz !",
           "Success 200",
          "This is the information of something you may know Success."
        );
      }
    },
    changeStep(step) {
      this.$store.commit("changeStepNumber", { stepNumber: step });
    },
    checkOnlyNumber(val) {
      return /^\d+$/.test(val);
    },
    checkOnlyLetter(val) {
      return /^[a-zA-ZğüşöçİĞÜŞÖÇ]+$/.test(val.replace(" ", ""));
    },
    formatDate(value) {
      return moment(value).format("DD.MM.YYYY");
    },
    setRoomTitle(value) {
      return value === 1 ? "Standart" : value === 2 ? "Deluxe" : "Suit";
    },
    setScenicTitle(value) {
      return value === 1
        ? "Kara Manzaralı"
        : value === 2
        ? "Havuz Manzaralı"
        : "Deniz Manzaralı";
    },
    formatPrice(price) {
      return (price).toLocaleString('tr-TR', {
        style: 'currency',
        currency: 'TRY',
      })
    },
    goBack() {
      this.$store.commit("changeStepNumber", { stepNumber: 1 });
    },
  },
};
</script>
<style>
.summary-info {
  background-color: #f6f9fd;
}
.box-border, .coupon-code-input {
    border: 1px solid lightblue;
}
.coupon-code-input {
  padding-left: 10px;
}
</style>
