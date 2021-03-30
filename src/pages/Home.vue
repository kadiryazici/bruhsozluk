<script lang="ts" setup>
import HomeEntry from '/src/components/Home/HomeEntry.vue';
</script>

<template>
   <div>
      <HomeEntry :key="n" v-for="n in 5" />
   </div>
</template>

<style lang="scss" scoped></style>
