import { createApp } from 'vue';
import App from '/src/App.vue';
import router from '/src/router/router';
import { createPinia } from 'pinia';
import { createHead } from '@vueuse/head';
import axios from 'axios';

import Icon from '/src/components/Icon/Icon.vue';
import VButton from '/src/components/Button/Button.vue';

import 'modal-component-vue3/css/style.css';
import { GetUserAuthID } from '/src/helpers/auth';

const app = createApp(App);

app.config.globalProperties.$log = console.log;

/* REGISTER GLOBAL COMPONENTS: */ {
   app.component('Icon', Icon);
   app.component('VButton', VButton);
}

const pinia = createPinia();
const head = createHead();
app.use(pinia) //
   .use(router)
   .use(head);
app.mount('#app');

axios.interceptors.request.use(function (config) {
   const id = GetUserAuthID();
   config.headers.Authorization = id;
   return config;
});
