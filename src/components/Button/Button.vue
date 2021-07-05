<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
   color?: Colors;
   square?: boolean;
   textColor?: Colors;
   noHover?: boolean;
   noPadding?: boolean;
   loading?: boolean;
   size?: string;
   bordered?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
   textColor: 'primary',
   bordered: false
});

ref: buttonFontSize = computed(() => {
   return props.size || '20px';
});
</script>

<template>
   <button
      :class="[
         props.color,
         `text-${props.textColor}`,
         {
            'no-hover': props.noHover,
            'no-padding': props.noPadding,
            square: props.square,
            bordered: props.bordered
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
export type Colors =
   | 'turq'
   | 'ruby'
   | 'primary'
   | 'secondary'
   | 'tertiary'
   | 'lime'
   | 'sun';
</script>

<style lang="scss" scoped>
._button {
   border-radius: vars.$radius;
   display: inline-flex;
   align-items: center;
   justify-content: center;
   color: colors.$primary;
   position: relative;

   &.bordered {
      background-color: transparent !important;
      border: 2px solid;
   }

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
      display: flex;
      align-items: center;
      &,
      & * {
         font-size: v-bind('buttonFontSize');
      }

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
      border-color: colors.$turq;
   }
   &.ruby {
      background-color: colors.$ruby;
      border-color: colors.$ruby;
   }
   &.primary {
      background-color: colors.$primary;
      border-color: colors.$primary;
   }
   &.secondary {
      background-color: colors.$secondary;
      border-color: colors.$secondary;
   }
   &.tertiary {
      background-color: colors.$tertiary;
      border-color: colors.$tertiary;
   }
   &.lime {
      background-color: colors.$lime;
      border-color: colors.$lime;
   }
   &.sun {
      background-color: colors.$sun;
      border-color: colors.$sun;
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
      &-lime {
         color: colors.$lime;
      }
      &-sun {
         color: colors.$sun;
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
