<script lang="ts" setup>
import Skeleton from '/src/components/Skeleton/Skeleton.vue';
</script>

<template>
   <Skeleton v-for="n in 10" :key="n" class="skeleton" />
</template>

<style lang="scss" scoped>
.skeleton {
   margin-top: funcs.padding(2);
   height: 40px;
}
</style>
