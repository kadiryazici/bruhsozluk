import { createApp } from 'vue';
import App from './App.vue';
import router from '/src/router/router';
import Icon from '/src/components/Icon/Icon.vue';
import VButton from '/src/components/Button/Button.vue';

const app = createApp(App);

app.config.globalProperties.$log = console.log;

app.component('Icon', Icon);
app.component('VButton', VButton);

app.use(router);
app.mount('#app');
