<template>
  <div class="progress-steps-container">
    <div class="progress-steps d-flex justify-content-around px-2 py-4">
      <div
        class="d-flex flex-column align-items-center"
        :class="{ 'active-step': step === '0', 'passive-step': step !== '0' }"
      >
        <i
          class="bi-calendar3 progress-icons d-flex justify-content-center align-items-center"
        ></i>
        <span class="mt-2"> Otel ve Tarih Seçimi</span>
      </div>
      <div
        class="d-flex flex-column align-items-center"
        :class="{ 'active-step': step === '1', 'passive-step': step !== '1' }"
      >
        <i
          class="bi-house-door progress-icons d-flex justify-content-center align-items-center"
        ></i>
        <span class="mt-2"> Oda Tipi ve Manzara Seçimi</span>
      </div>
      <div
        class="d-flex flex-column align-items-center"
        :class="{ 'active-step': step === '2', 'passive-step': step !== '2' }"
      >
        <i
          class="bi-credit-card-2-front progress-icons d-flex justify-content-center align-items-center"
        ></i>
        <span class="mt-2"> Önizleme ve Ödeme İşlemleri</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressSteps",
  components: {},
  props: {
    step: {
      type: String,
    },
  },
};
</script>

<style>
.active-step span {
  color: black !important;
}
.active-step i {
  border: 1px solid black;
}
.passive-step span {
  color: grey;
}
.passive-step i {
  border: 1px solid grey;
  color: grey;
}
.progress-steps {
  padding: 10px 20px;
  background-color: #f0eeee;
}

.progress-icons {
  border: 1px solid grey;
  padding: 20px;
  border-radius: 50%;
  width: 80px;
  height: 80px;
}
</style>
