<script lang="ts" setup>
import { Head } from '@vueuse/head';

import SignupView from '/src/components/Signup/SignupView.vue';
</script>

<template>
   <div class="signup-wrapper">
      <Head>
         <title>Kayıt Oluş | Bruhsözlük</title>
      </Head>
      <SignupView />
   </div>
</template>

<style lang="scss" scoped>
.signup-wrapper {
   color: colors.$secondary;
   display: flex;
   width: 100%;
   justify-content: center;
}
</style>
