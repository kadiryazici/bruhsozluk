<template>
   <Main>
      <template #left>
         <Left />
      </template>
      <template #content>
         <router-view :key="route.fullPath"> </router-view>
      </template>
   </Main>

   <!-- MODALS WILL BE HERE -->
   <ModalWrapper v-model:visible="modalStore.likesModal">
      <ModalLikes />
   </ModalWrapper>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { watchEffect } from 'vue';

import Main from '/src/layouts/Main.vue';
import Left from '/src/components/LeftBar/Left.vue';

import ModalWrapper from '/src/components/ModalWrapper/index.vue';
import ModalLikes from '/src/components/Modals/Likes/index.vue';

import { useModalStore, useModalStoreGetters } from './store/modalStore';

const route = useRoute();
const modalStore = useModalStore();
const { isThereOpenModal } = useModalStoreGetters();
// MODAL CHECK

watchEffect(() => {
   if (isThereOpenModal.value) {
      document.body.style.setProperty('overflow', 'hidden');
   } else {
      document.body.style.setProperty('overflow', 'auto');
   }
});
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

a.button {
   text-decoration: none;
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

.link {
   text-decoration: none;
   &:hover {
      text-decoration: underline;
   }
}
</style>
