<script lang="ts" setup>
import LeftHeader from '/src/components/LeftBar/Header.vue';
ref: icons = ['person', 'refresh', 'search', 'add_circle_outline'];
</script>
<template>
   <aside id="left-content-wrapper">
      <div id="left-content">
         <div class="top-menu">
            <router-link class="logo" to="/">
               <VButton :textColor="'turq'">BRUH</VButton>
            </router-link>

            <div class="icons">
               <icon
                  class="icon button hover:turq"
                  role="button"
                  :tabindex="0"
                  :title="icon"
                  :aria-label="icon"
                  v-for="icon in icons"
                  :name="icon"
                  @click="$log(icon)"
               />
            </div>
         </div>

         <section class="headers-section">
            <LeftHeader :key="n" v-for="n in 20" />
         </section>
      </div>
   </aside>
</template>

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
