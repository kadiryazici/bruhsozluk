<script lang="ts" setup>
import SignupView from '/src/components/Signup/SignupView.vue';
import { Head } from '@vueuse/head';
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
