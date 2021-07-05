<script lang="ts" setup>
import { defineProps } from 'vue';

interface Props {
   name: string;
}
const props = defineProps<Props>();
</script>

<template>
   <span translate="no" class="_icon material-icons">
      {{ props.name }}
   </span>
</template>

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
