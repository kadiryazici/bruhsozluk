<template>
   <button
      :class="[
         props.color,
         `text-${props.textColor}`,
         {
            'no-hover': noHover,
            'no-padding': noPadding,
            square: square
         }
      ]"
      ı
      class="button _button"
   >
      <div :class="{ loading }" class="button-text">
         <slot />
      </div>
      <Icon class="loading-icon" v-if="loading" name="refresh" />
   </button>
</template>

<script lang="ts">
export type Colors = 'turq' | 'ruby' | 'primary' | 'secondary' | 'tertiary';
</script>

<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(
   defineProps<{
      color?: Colors;
      square?: boolean;
      textColor: Colors;
      noHover?: boolean;
      noPadding?: boolean;
      loading?: boolean;
      size?: string;
   }>(),
   {
      textColor: 'primary'
   }
);

ref: buttonFontSize = computed(() => {
   return props.size || '20px';
});
</script>

<style lang="scss" scoped>
._button {
   border-radius: vars.$radius;
   display: inline-flex;
   align-items: center;
   justify-content: center;
   color: colors.$primary;
   position: relative;

   &:not(.no-padding) {
      padding: funcs.padding(1.5);
   }

   &.square {
      width: 40px;
      height: 40px;
      max-width: 40px;
      max-height: 40px;
   }

   .button-text {
      font-size: v-bind('buttonFontSize');

      &.loading {
         opacity: 0;
      }
   }

   .loading-icon {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      animation: 0.75s circleAnimation linear infinite;
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

@keyframes circleAnimation {
   0% {
      transform: rotate(0deg);
   }
   100% {
      transform: rotate(360deg);
   }
}
</style>
