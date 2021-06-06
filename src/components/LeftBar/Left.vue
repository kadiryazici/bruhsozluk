<script lang="ts" setup>
import { reactive } from '@vue/reactivity';
import LeftHeader from './HeaderItem.vue';
import { useModalStoreMethods } from '/src/stores/modalStore';
const { openLikeModal } = useModalStoreMethods();

const icons = reactive([
   {
      title: 'Profil',
      name: 'person',
      isLink: true,
      href: '/baslik',
   },
   {
      title: 'Ara',
      name: 'search',
      isLink: false,
      click: openLikeModal.bind(null, { headerID: '', entryID: '' }),
   },
   {
      title: 'Yenile',
      isLink: false,
      name: 'refresh',
   },
]);
</script>

<template>
   <aside id="left-content-wrapper">
      <div id="left-content">
         <div class="top-menu">
            <router-link class="logo" to="/">
               <VButton :textColor="'turq'">BRUH</VButton>
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
            <LeftHeader :key="n" v-for="n in 20" />
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
