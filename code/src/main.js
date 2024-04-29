import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import PiniaPersist from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from "./router";
import axios from 'axios'
import VueAxios from 'vue-axios'
import Notifications from '@kyvg/vue3-notification'
import { notify } from "@kyvg/vue3-notification";
import dayjs from 'dayjs/esm/index.js'
import localeEsMx from 'dayjs/locale/es-mx'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import {TippyPlugin} from 'tippy.vue';
import CustomMixin from "@/common/mixin.js";
import mitt from 'mitt';
import Datepicker from '@vuepic/vue-datepicker';


import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import "./assets/js/nav-pills.js";
import "./assets/js/tooltip.js";
import "./assets/scss/soft-ui-dashboard.scss";
import '@vuepic/vue-datepicker/dist/main.css'

import { useUserStore } from './stores/user';

const app = createApp(App);

const emitter = mitt();
app.config.globalProperties.emitter = emitter;

app.config.globalProperties.dayjs = dayjs;
app.config.globalProperties.dayjs.locale(localeEsMx);
app.config.globalProperties.dayjs.extend(isSameOrBefore);
app.config.globalProperties.dayjs.extend(customParseFormat);

app.use(VueAxios, axios);
app.use(Notifications);

app.component('EasyDataTable', Vue3EasyDataTable);
app.component('Datepicker', Datepicker);

app.mixin(CustomMixin);

const options = {
  confirmButtonColor: '#038C5A',
  cancelButtonColor: '#ea0606',
  confirmButtonText: 'Si',
  cancelButtonText: 'No',
  allowOutsideClick: false,
  allowEscapeKey: false,
};
app.use(VueSweetalert2, options);
app.use(TippyPlugin);

//PINIA

const pinia = createPinia();
app.use(pinia);
pinia.use(PiniaPersist)
pinia.use(({ store }) => {
    store.$router = markRaw(router)
})

//END PINIA

app.use(router);

app.mount('#app');

import "bootstrap/dist/js/bootstrap.js"

console.info("Enviroment: " + import.meta.env.VITE_ENVIROMENT);

//AXIOS

const userStore = useUserStore();

/////

const axiosMS = axios.create({
  
  baseURL: import.meta.env.VITE_APIGW_BASE,
  headers: {
   // 'X-API-KEY': import.meta.env.VITE_APIKEY,
    'Content-Type': 'application/json',
  }
});

const axiosCRM = axios.create({
  baseURL: import.meta.env.VITE_APICRM_BASE,
  headers: {
    'Content-Type': 'application/json',
  }
});

// requestInterceptor(axiosMS);
// requestInterceptor(axiosCRM);

// responseInterceptor(axiosMS);
// responseInterceptor(axiosCRM);

app.config.globalProperties.$axiosMS = axiosMS;
app.config.globalProperties.$axiosCRM = axiosCRM;

///

// function requestInterceptor(axiosInstance) {
//   axiosInstance.interceptors.request.use( config => { 
//     const token = userStore.token; 
//     if (token) {
//         config.headers['Authorization'] = 'Bearer ' + token;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   });
// }

// function responseInterceptor(axiosInstance) {
//   axiosInstance.interceptors.response.use(function(response) {
//     return response;
//   }, function(error) {
//     if(error.config.url.includes('ping'))
//       return Promise.reject(error);
  
//     if(error.response.status === 401 || (error.response.status === 403 && error.response.data.message && error.response.data.message == 'You cannot consume this service')){
//       notify({
//         title: 'La sesión expiró.',
//         text: 'Vuelva a ingresar sus credenciales para continuar.',
//         type: 'error'
//       });
//       router.push('/login');
//     } else { 
//       if(!error.response.data || !error.response.data.errorDescription){
//         notify({
//           title: 'Problemas de conexion.',
//           text: 'No se pudo procesar la llamada al servicio.',
//           type: 'error'
//         });
//       }
//       else {
//         notify({
//           title: error.response.data.visualErrorDescription,
//           text: error.response.data.errorDescription,
//           type: 'error'
//         });
//       }
      
//     }
  
//     return Promise.reject(error);
//   });
// }



  