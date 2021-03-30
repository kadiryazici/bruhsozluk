<script lang="ts" setup>
import LoginView from '/src/components/Login/Login.vue';
</script>

<template>
   <div class="login-wrapper">
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
