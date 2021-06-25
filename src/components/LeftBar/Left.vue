<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import LeftHeader from './HeaderItem.vue';
import type { LeftContent } from '/src/api/types';
import { getHome } from '/src/api/getLeft';
import { usePromise } from 'vierone';
import { useAppStore } from '/src/stores/appStore';
import { useModalStore } from '/src/stores/modalStore';

const appStore = useAppStore();
const modalStore = useModalStore();

const leftItems = reactive<LeftContent>([]);
onMounted(async () => {
   await fetchLeft();
});

async function fetchLeft() {
   const [res, err] = await usePromise(getHome());
   leftItems.length = 0;
   if (res) {
      const { data } = res;
      leftItems.push(...data);
   }
}
</script>

<template>
   <aside id="left-content-wrapper">
      <div id="left-content">
         <div class="top-menu">
            <RouterLink class="logo" to="/">
               <VButton noPadding :textColor="'turq'">BRUH</VButton>
            </RouterLink>

            <div class="icons">
               <!-- LOGIN -->
               <RouterLink
                  v-if="!appStore.isLogged"
                  class="router-link button"
                  :to="{ name: 'Login' }"
               >
                  <icon
                     class="icon button hover:turq"
                     role="button"
                     :tabindex="0"
                     title="Profil"
                     aria-label="Profil"
                     name="person"
                  />
               </RouterLink>
               <icon
                  v-else
                  class="icon button hover:turq"
                  role="button"
                  :tabindex="0"
                  title="Profil"
                  aria-label="Profil"
                  name="person"
                  @click="modalStore.isProfileModalOpen = true"
               />

               <Icon
                  title="Ara"
                  aria-label="ara"
                  role="button"
                  class="icon button hover:turq"
                  tabindex="0"
                  @click="modalStore.isSearchModalOpen = true"
                  name="search"
               />

               <Icon
                  title="Yenile"
                  aria-label="Yenile"
                  role="button"
                  class="icon button hover:turq"
                  tabindex="0"
                  name="refresh"
                  @click="fetchLeft"
               />
            </div>
         </div>

         <section class="headers-section">
            <LeftHeader
               :itemData="item"
               :key="item.id"
               v-for="item in leftItems"
            />
         </section>
      </div>
   </aside>
</template>

<script setup></script>

<style lang="scss" scoped>
#left-content-wrapper {
   height: 100%;
   background-color: colors.$primary;
   // border-radius: vars.$radius;
   overflow: hidden;
   position: fixed;
   width: 300px;

   #left-content {
      height: 100%;
      background-color: colors.$primary;
      // border-radius: vars.$radius;
      overflow: auto;
      overscroll-behavior-y: contain;

      .top-menu {
         width: 100%;
         height: 30px + funcs.padding(3) * 2;
         display: flex;
         align-items: center;
         flex-flow: row wrap;
         position: -webkit-sticky;
         position: sticky;
         top: 0;
         padding: funcs.padding(3);
         background-color: colors.$primary;
         z-index: 2;
         box-shadow: vars.$shadowDarkDown;

         .logo {
            font-size: vars.$logoFontSize;
            cursor: pointer;
            color: colors.$turq;
            text-decoration: none;
         }

         .icons {
            margin-left: auto;

            .icon {
               font-size: 30px;
               height: 30px;
               width: 30px;
               color: colors.$secondary;
               margin-left: funcs.padding(2);
               display: inline-flex;
               align-items: center;
               justify-content: center;
            }
         }
      }
      .headers-section {
         width: 100%;
         padding: funcs.padding(3);
      }
   }
}

@keyframes roll {
   0% {
      transform: rotate(0deg);
   }
   100% {
      transform: rotate(360deg);
   }
}
</style>
