<template>
   <button
      :class="[
         {
            turq: props.color === 'turq',
            ruby: props.color === 'ruby',
         },
         {
            'text-ruby': props.textColor === 'ruby',
            'text-secondary': props.textColor === 'secondary',
            'text-turq': props.textColor === 'turq',
            'text-primary': props.textColor === 'primary',
         },
      ]"
      ı
      class="button _button"
   >
      <slot />
   </button>
</template>

<script lang="ts">
export type Colors = 'turq' | 'ruby';
export type TextColors = 'turq' | 'ruby' | 'primary' | 'secondary';
</script>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps<{
   color?: Colors;
   textColor: TextColors;
}>();
</script>

<style lang="scss" scoped>
$wrapperWidth: 400px;
._button {
   border-radius: vars.$radius;
   padding: funcs.padding(1.5);
   display: inline-flex;
   align-items: center;
   justify-content: center;
   color: colors.$primary;
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
   }
}
</style>
