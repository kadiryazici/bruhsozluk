<script lang="ts" setup></script>

<template>
   <div class="left">
      <slot name="left" />
   </div>
   <div class="right">
      <div class="right-content">
         <slot name="content" />
      </div>
   </div>
</template>

<style lang="scss" scoped>
$maxRightContentWidth: 950px;
$leftContentWidth: 300px;

.left {
   width: $leftContentWidth;
   height: 100%;
   background-color: colors.$tertiary;
   flex-shrink: 0;
   padding: funcs.padding(0);
   top: 0;
}
.right {
   width: 100%;
   // height: max-content;
   display: block;
   background-color: colors.$primary;
   padding: funcs.padding(5);
   // overflow: auto;

   .right-content {
      width: 100%;
      max-width: $maxRightContentWidth;
      margin: 0 auto;
   }
}
</style>
