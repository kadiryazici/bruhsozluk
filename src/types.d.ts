import { RouterLink, RouterView } from 'vue-router';
import VIF from '/src/components/UtilityComponents/v-if.vue';

declare global {
   interface __VLS_GlobalComponents {
      RouterLink: typeof RouterLink;
      RouterView: typeof RouterView;
      VIF: typeof VIF;
   }
}

declare module '@vue/runtime-core' {
   interface ComponentCustomProperties {
      $log: typeof console.log;
   }
}
