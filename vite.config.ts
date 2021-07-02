import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
   css: {
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
      minify: 'esbuild'
   },
   server: {
      port: 8080,
      host: true
   }
});
