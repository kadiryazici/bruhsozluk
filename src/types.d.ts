import { RouterLink, RouterView } from 'vue-router';

declare global {
   interface __VLS_GlobalComponents {
      RouterLink: typeof RouterLink;
      RouterView: typeof RouterView;
   }
}

declare module 'vue' {
   interface ComponentCustomProperties {
      $log: typeof console.log;
   }
}
