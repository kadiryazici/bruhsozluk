<script lang="ts" setup>
import LoginView from '/src/components/Login/Login.vue';
import { Head } from '@vueuse/head';
</script>

<template>
   <div class="login-wrapper">
      <Head>
         <title>Giriş | Bruhsözlük</title>
      </Head>
      <LoginView />
   </div>
</template>

<style lang="scss" scoped>
.login-wrapper {
   color: colors.$secondary;
   display: flex;
   width: 100%;
   justify-content: center;
}
</style>
