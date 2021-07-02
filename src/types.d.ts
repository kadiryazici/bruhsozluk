import { RouterLink, RouterView } from 'vue-router';
import Icon from '/src/components/Icon/Icon.vue';
import VButton from '/src/components/Button/Button.vue';

declare module 'vue' {
   interface GlobalComponents {
      RouterLink: typeof RouterLink;
      RouterView: typeof RouterView;
      VButton: typeof VButton;
      Icon: typeof Icon;
   }
   interface ComponentCustomProperties {
      $log: typeof console.log;
   }
}
