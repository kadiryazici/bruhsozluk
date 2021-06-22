<template>
   <button
      :class="[
         props.color,
         `text-${props.textColor}`,
         {
            'no-hover': noHover,
            'no-padding': noPadding
         }
      ]"
      ı
      class="button _button"
   >
      <slot />
   </button>
</template>

<script lang="ts">
export type Colors = 'turq' | 'ruby' | 'primary' | 'secondary' | 'tertiary';
</script>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps<{
   color?: Colors;
   square?: boolean;
   textColor: Colors;
   noHover?: boolean;
   noPadding?: boolean;
}>();
</script>

<style lang="scss" scoped>
._button {
   border-radius: vars.$radius;
   display: inline-flex;
   align-items: center;
   justify-content: center;
   color: colors.$primary;

   &:not(.no-padding) {
      padding: funcs.padding(1.5);
   }

   &.square {
      width: 40px;
      height: 40px;
      max-width: 40px;
      max-height: 40px;
   }

   &,
   & * {
      font-size: 20px;
   }

   &.turq {
      background-color: colors.$turq;
   }
   &.ruby {
      background-color: colors.$ruby;
   }
   &.primary {
      background-color: colors.$primary;
   }
   &.secondary {
      background-color: colors.$secondary;
   }
   &.tertiary {
      background-color: colors.$tertiary;
   }

   &.text {
      &-ruby {
         color: colors.$ruby;
      }
      &-turq {
         color: colors.$turq;
      }
      &-primary {
         color: colors.$primary;
      }
      &-secondary {
         color: colors.$secondary;
      }
      &-tertiary {
         color: colors.$tertiary;
      }
   }
}
</style>
