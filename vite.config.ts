import { SharedConfig } from 'vite';

const config: SharedConfig = {
   cssPreprocessOptions: {
      scss: {
         additionalData: `
            @use "src/scss/colors";
            @use "src/scss/mixins";
            @use "src/scss/vars";
            @use "src/scss/funcs";
         `,
      },
   },
};

export default config;
