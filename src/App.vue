<template>
  <SelectHotel v-if="stepNumber === 0" />
  <SelectRoom v-if="stepNumber === 1" />
  <Checkout v-if="stepNumber === 2" />
  <ReservationCompleted v-if="stepNumber === 3" />
</template>

<script>
import SelectHotel from "./components/SelectHotel.vue";
import SelectRoom from "./components/SelectRoom.vue";
import Checkout from "./components/Checkout.vue";
import ReservationCompleted from "./components/ReservationCompleted.vue"
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    SelectHotel,
    SelectRoom,
    Checkout,
    ReservationCompleted
  },
  computed: mapState({
    stepNumber: (state) => state.stepNumber
  }),
};
</script>

<style></style>
