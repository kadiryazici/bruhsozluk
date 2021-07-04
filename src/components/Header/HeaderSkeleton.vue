<script lang="ts" setup>
import Skeleton from '/src/components/Skeleton/Skeleton.vue';
</script>

<template>
   <Skeleton class="skeleton header" />
   <Skeleton v-for="n in 5" :key="n" class="skeleton entry" />
</template>

<style lang="scss" scoped>
.skeleton {
   margin-bottom: funcs.padding(5);

   &.header {
      height: 55px;
   }

   &.entry {
      height: 100px;
   }
}
</style>
