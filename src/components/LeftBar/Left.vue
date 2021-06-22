<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import LeftHeader from './HeaderItem.vue';
import type { LeftContent } from '/src/api/types';
import { getHome } from '/src/api/getLeft';
import { usePromise } from 'vierone';

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

const icons = reactive([
   {
      title: 'Profil',
      name: 'person',
      isLink: true,
      href: '/login'
   },
   {
      title: 'Ara',
      name: 'search',
      isLink: false
   },
   {
      title: 'Yenile',
      isLink: false,
      name: 'refresh',
      click: fetchLeft
   }
]);
</script>

<template>
   <aside id="left-content-wrapper">
      <div id="left-content">
         <div class="top-menu">
            <router-link class="logo" to="/">
               <VButton noPadding :textColor="'turq'">BRUH</VButton>
            </router-link>

            <div class="icons">
               <template :key="icon" v-for="icon in icons">
                  <template v-if="icon.isLink && icon.href">
                     <RouterLink class="button" :to="icon.href">
                        <icon
                           class="icon button hover:turq"
                           role="button"
                           :tabindex="0"
                           :title="icon.title"
                           :aria-label="icon.title"
                           :name="icon.name"
                        />
                     </RouterLink>
                  </template>

                  <icon
                     v-else
                     class="icon button hover:turq"
                     role="button"
                     :tabindex="0"
                     :title="icon.title"
                     :aria-label="icon.title"
                     :name="icon.name"
                     @click="icon.click ? icon.click() : undefined"
                  />
               </template>
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
