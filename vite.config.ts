import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import autoprefixer from 'autoprefixer';

export default defineConfig({
   css: {
      postcss: {
         plugins: [autoprefixer()]
      },
      preprocessorOptions: {
         scss: {
            additionalData: `
               @use "src/scss/colors";
               @use "src/scss/mixins";
               @use "src/scss/vars";
               @use "src/scss/funcs";
            `
         }
      }
   },
   plugins: [
      vue({
         script: {
            refSugar: true
         }
      })
   ],
   build: {
      polyfillDynamicImport: true,
      assetsInlineLimit: 0
   },
   server: {
      port: 8080,
      host: true
   }
});
