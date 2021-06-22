<script lang="ts" setup>
import { defineProps } from 'vue';
import type { LeftContentItem } from '/src/api/types.d';

const props = defineProps<{
   itemData: LeftContentItem;
}>();
</script>

<template>
   <div class="left-header-wrapper">
      <div class="body">{{ props.itemData.name }}</div>
      <div class="count">{{ props.itemData.total_entry }}</div>
   </div>
</template>

<style lang="scss" scoped>
$wrapperPadding: 3px;
$bodyFontSize: 14px;
$counterFontSize: 12px;
$marginBottomLevel: 1.5;

.left-header-wrapper {
   padding: funcs.padding(2.5) funcs.padding(1.5);
   background-color: colors.$primary;
   border: 3px solid colors.$coal;
   position: relative;
   width: 100%;
   flex-flow: row nowrap;
   align-items: center;
   display: flex;
   overflow: hidden;
   border-radius: vars.$radius;
   margin-bottom: funcs.padding($marginBottomLevel);
   transition: all 0.25s;

   &:hover,
   &.active {
      cursor: pointer;
      border-color: colors.$turq;
   }

   .count {
      width: 100%;
      text-align: right;
      font-size: $counterFontSize;
      color: colors.$turq;
      flex: 1;
      margin-left: funcs.padding(1);
   }
   .body {
      font-size: $bodyFontSize;
      text-align: left;
      width: 100%;

      color: colors.$secondary;
   }
}
</style>
