import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createHead } from '@vueuse/head';
import axios from 'axios';
import 'modal-component-vue3/css/style.css';

import App from '/src/App.vue';
import Icon from '/src/components/Icon/Icon.vue';
import VButton from '/src/components/Button/Button.vue';

import { GetUserAuthID } from '/src/helpers/auth';
import { newRouter } from '/src/router/router';

/**
 ** Set Authorization header for every request.
 */
axios.interceptors.request.use(function (config) {
   const id = GetUserAuthID();
   config.headers.Authorization = id;
   return config;
});

const app = createApp(App);

app.config.globalProperties.$log = console.log;

app.component('Icon', Icon)
   .component('VButton', VButton)
   .use(createPinia())
   .use(newRouter())
   .use(createHead())
   .mount('#app');
