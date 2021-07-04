<script lang="ts" setup></script>

<template>
   <div class="_skeleton"></div>
</template>

<style lang="scss">
._skeleton {
   width: 100%;
   height: 35px;
   border-radius: vars.$radius;
   background-color: colors.$skeletonBackgroundColor;
   position: relative;
   animation: breathAnimation 1s ease alternate-reverse infinite;
   will-change: background-color;
   transform: translate3d(0, 0, 0);
   backface-visibility: hidden;
}

@keyframes breathAnimation {
   0% {
      background-color: colors.$skeletonBackgroundColor;
   }
   100% {
      background-color: colors.$skeletonEffectColor;
   }
}
</style>
