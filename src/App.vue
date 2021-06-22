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
import { openModalCount } from 'modal-component-vue3';
import { VerifyUser } from './helpers/auth';
import { useAppStore } from './stores/appStore';

const route = useRoute();

const appStore = useAppStore();

// MODAL CHECK

// watchEffect(() => {
//    console.log(openModalCount.value);
//    if (openModalCount.value > 0) {
//       document.body.style.setProperty('overflow', 'hidden');
//    } else {
//       document.body.style.setProperty('overflow', 'auto');
//    }
// });
</script>

<style lang="scss">
html,
body,
#app {
   width: 100%;
   min-height: 100%;
   background-color: colors.$primary;
}
#app {
   display: flex;
   flex-flow: row nowrap;
   align-items: stretch;
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

a.button {
   text-decoration: none;
}

.button {
   cursor: pointer;
   border: none;
   background-color: inherit;
   transition: 0.25s all;
   outline: none;

   &:not(.no-hover) {
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
}

* {
   scrollbar-width: thin;
   scrollbar-color: colors.$scrollbarThumb transparent;

   &::-webkit-scrollbar {
      width: 2px;
      height: 2px;
      background-color: transparent;
   }

   &::-webkit-scrollbar-thumb {
      background-color: colors.$scrollbarThumb;
      &:hover {
         background-color: colors.$scrollbarThumbHover;
      }
   }
}

.link {
   text-decoration: none;
   &:hover {
      text-decoration: underline;
   }
}
</style>
