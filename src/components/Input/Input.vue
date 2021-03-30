<script lang="ts" setup>
import { defineProps, defineEmit } from 'vue';

const props = defineProps<{
   error?: boolean;
   errorMessage?: string;
   modelValue: string;
}>();

const emit = defineEmit({
   'update:modelValue': (value: string) => true,
});

function onInput(e: Event) {
   if (e.currentTarget instanceof HTMLInputElement) {
      emit('update:modelValue', e.currentTarget.value);
   }
}
</script>
<template>
   <div class="input-wrapper">
      <input
         class="_input"
         :value="props.modelValue"
         @input="onInput"
         type="text"
      />
      <div :class="{ hidden: !error }" class="input-error">
         {{ props.errorMessage }}
      </div>
   </div>
</template>

<style lang="scss" scoped>
.input-wrapper {
   display: block;
   width: 100%;

   ._input {
      width: 100%;
      transition: all 0.25s;
      border: 3px solid;
      border-color: colors.$coal;
      height: 45px;
      padding: funcs.padding(1.5) funcs.padding(2);
      color: colors.$secondary;
      font-size: 16px;
      outline: none;
      border-radius: vars.$radius * 2;
      background-color: colors.$coal;

      &:focus {
         border-color: colors.$turq;
      }
   }
   .input-error {
      width: 100%;
      text-align: left;
      font-size: 12px;
      color: colors.$ruby;
      padding: 0 funcs.padding(2);

      &.hidden {
         visibility: hidden;
      }
   }
}
</style>
