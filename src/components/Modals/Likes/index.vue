<script lang="ts" setup>
import { defineEmit, defineProps } from 'vue';
import Item from './Item.vue';
import type { Entry } from '/src/api/types.d';

const emit = defineEmit({
   hide: () => true
});

const props = defineProps<{
   users: Entry['liked_by'];
}>();
</script>

<template>
   <div class="_likes">
      <div class="head">
         <div class="title">
            <Icon class="_icon" name="favorite" />
            <span class="text">beğenenler</span>
         </div>

         <VButton
            class="_close_button"
            :text-color="'ruby'"
            :color="'tertiary'"
            @click="emit('hide')"
            noHover
            square
         >
            <Icon class="button-icon" :name="'close'" />
         </VButton>
      </div>

      <div class="users">
         <Item :key="user" v-for="user in props.users">{{ user }}</Item>
      </div>
   </div>
</template>

<style lang="scss" scoped>
$maxWidth: 400px;
$maxHeight: 80%;
$bg: colors.$tertiary;
$paddingLevel: 2;

._close_button {
   box-shadow: vars.$shadowDarkDown;
   position: absolute;
   right: 0;
   top: 0;
   transform: translate(50%, -50%);

   .button-icon {
      transition: transform 0.25s;
   }

   &:hover {
      transform: translate(50%, -50%) rotate(45deg);
      .button-icon {
         transform: rotate(-135deg);
         transform-origin: center center;
      }
   }
}

._likes {
   width: 100%;
   max-width: $maxWidth;
   max-height: $maxHeight;
   background-color: $bg;
   border-radius: vars.$radius;
   box-shadow: vars.$shadowDarkDown;
   position: relative;
   display: flex;
   flex-flow: column nowrap;
   padding-bottom: funcs.padding(1);

   & > * {
      width: 100%;
   }

   .head {
      text-align: center;
      display: block;
      position: sticky;
      position: -webkit-sticky;
      top: 0;

      .title {
         height: 40px;
         padding: funcs.padding(1) funcs.padding(2);
         box-shadow: vars.$shadowDarkDown;
         display: inline-flex;
         align-items: center;
         border-radius: vars.$radius;
         background-color: colors.$tertiary;
         transform: translateY(-50%);

         .text {
            color: colors.$secondary;
         }

         ._icon {
            color: colors.$ruby;
            margin-right: funcs.padding(2);
            text-shadow: 0px 0px 4px colors.$ruby;
         }
      }
   }

   .users {
      padding: funcs.padding($paddingLevel);
      overflow: auto;
   }
}
</style>
