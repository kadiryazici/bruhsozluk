<template>
   <span translate="no" class="_icon material-icons">
      {{ props.name }}
   </span>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
const props = defineProps<{
   name: string;
}>();
</script>

<style lang="scss" scoped>
._icon {
   user-select: none;
   -webkit-user-select: none;
   -moz-user-select: none;
   -webkit-touch-callout: none;
   display: inline-flex;
   align-items: center;
   justify-content: center;
}
</style>
