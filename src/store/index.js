import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    hotelsList: [],
    hotelDetails: [],
    selectedHotel: {},
    reservationInfos: [],
    stepNumber: 0,
  },
  mutations: {
    changeStepNumber(state, payload) {
      state.stepNumber = payload.stepNumber;
    },
    setSelectedHotel(state, payload) {
      state.selectedHotel = state.hotelDetails.find(item => item.id === payload.id)
    },
    setHotels(state, payload) {
      state.hotelsList = payload.hotelList;
    },
    setHotelDetails(state, payload) {
      state.hotelDetails = payload.hotelDetails;
    },
    setCouponCodes(state, payload) {
      state.couponCodes = payload.couponCodes;
    },
    setReservationInfos(state, payload){
      state.reservationInfos = payload.reservationInfos
    }
  },
  getters: {},
  actions: {
    getHotels(context) {
      axios("https://5f6d939160cf97001641b049.mockapi.io/tkn/hotels")
        .then((response) => response.data)
        .then((data) => {
          context.commit("setHotels", { hotelList: data });
        });
    },
    getHotelDetails(context) {
      axios("https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-details")
        .then((response) => response.data)
        .then((data) => {
          context.commit("setHotelDetails", { hotelDetails: data });
        });
    },
    getCouponCodes(context){
      axios("https://5f6d939160cf97001641b049.mockapi.io/tkn/coupons")
        .then((response) => response.data)
        .then((data) => {
          context.commit("setCouponCodes", { couponCodes: data });
        });
    }
  },
});
