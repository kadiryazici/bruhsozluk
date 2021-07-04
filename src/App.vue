<script lang="ts" setup>
import AppMain from '/src/AppMain.vue';
</script>

<template>
   <Suspense>
      <AppMain />
   </Suspense>
</template>

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
   color: colors.$turq;
   cursor: pointer;
   &:hover {
      text-decoration: underline;
   }
}

$animationTime: 0.25s;
$notificationAnimationtime: 0.5s;

.page-animate-in {
   animation: $animationTime page-animation-in;
}

.page-animate-out {
   animation: $animationTime page-animation-out;
}

.router-link {
   color: inherit;
   text-decoration: inherit;
   &:visited {
      color: inherit;
   }
}

@keyframes page-animation-in {
   0% {
      opacity: 0;
   }
   100% {
      opacity: 1;
   }
}
@keyframes page-animation-out {
   100% {
      opacity: 0;
   }
   0% {
      opacity: 1;
   }
}

.notification-in {
   animation: notificationIn $notificationAnimationtime ease-in-out;
}

.notification-out {
   animation: notificationIn $notificationAnimationtime ease-in-out reverse;
}

@keyframes notificationIn {
   0% {
      transform: translateX(120%);
      max-height: 0px;
   }
   35% {
      transform: translateX(120%);
      max-height: 200px;
   }
   100% {
      transform: translateX(0%);
   }
}

.can-create-in {
   --heightBegin: 0px;
   --heightFinish: 50px;
   animation: heightAnimation 0.35s ease-in-out;
}
.can-create-out {
   --heightBegin: 50px;
   --heightFinish: 0px;
   animation: heightAnimation 0.35s ease-in-out;
}
@keyframes heightAnimation {
   0% {
      max-height: var(--heightBegin);
   }
   100% {
      max-height: var(--heightFinish);
   }
}

[data-highlight-anim] {
   animation: highlightAnimation 1s 0.25s ease-in-out;
}
@keyframes highlightAnimation {
   100%,
   0% {
      box-shadow: 0px 0px 0px 0px colors.$secondary;
   }
   50% {
      box-shadow: 0px 0px 25px -4px colors.$secondary;
   }
}
</style>
