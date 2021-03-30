<template>
   <Main>
      <template #left>
         <Left />
      </template>
      <template #content>
         <router-view :key="route.fullPath"> </router-view>
      </template>
   </Main>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import Main from '/src/layouts/Main.vue';
import Left from '/src/components/LeftBar/Left.vue';

const route = useRoute();
</script>

<style lang="scss">
html,
body,
#app {
   width: 100%;
   height: 100%;
   display: flex;
   flex-flow: row nowrap;
   align-items: stretch;
   background-color: colors.$primary;
}

// body {
//    overflow: hidden;
// }

* {
   font-family: 'Righteous', sans-serif;
   margin: 0;
   padding: 0;
   box-sizing: border-box;
}

.button {
   cursor: pointer;
   border: none;
   background-color: inherit;
   transition: 0.25s all;

   &.hover\:turq:hover *,
   &.hover\:turq:hover {
      color: colors.$turq !important;
   }

   &:active,
   &:focus {
      transform: scale(0.9);
      outline: none;
   }
}

* {
   scrollbar-width: thin;
   scrollbar-color: colors.$scrollbarThumb, colors.$scrollbarBackground;

   &::-webkit-scrollbar {
      width: 2px;
      background-color: colors.$scrollbarBackground;
   }

   &::-webkit-scrollbar-thumb {
      background-color: colors.$scrollbarThumb;
      &:hover {
         background-color: colors.$scrollbarThumbHover;
      }
   }
}
</style>
