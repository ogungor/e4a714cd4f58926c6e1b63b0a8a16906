import { createApp } from "vue";
import App from "./App.vue";

import "vue3-date-time-picker/dist/main.css";
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-icons/font/bootstrap-icons.css'

import store from './store/index'

createApp(App).use(store).mount("#app");

