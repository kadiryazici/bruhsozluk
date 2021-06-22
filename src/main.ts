import { createApp } from 'vue';
import App from './App.vue';
import router from '/src/router/router';
import { createPinia } from 'pinia';

import Icon from '/src/components/Icon/Icon.vue';
import VButton from '/src/components/Button/Button.vue';

import 'modal-component-vue3/css/style.css';

const app = createApp(App);

app.config.globalProperties.$log = console.log;

/* REGISTER GLOBAL COMPONENTS: */ {
   app.component('Icon', Icon);
   app.component('VButton', VButton);
}

const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount('#app');
