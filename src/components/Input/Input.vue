<script lang="ts">
export default {
   inheritAttrs: false
};
</script>

<script lang="ts" setup>
const props = defineProps<{
   errorMessage?: string;
   modelValue: string;
   type: 'text' | 'password';
   error?: boolean;
}>();

const emit = defineEmits<{
   (event: 'update:modelValue', value: string): void;
   (event: 'update:error', value: boolean): void;
}>();

function onInput(e: Event) {
   if (e.currentTarget instanceof HTMLInputElement) {
      emit('update:modelValue', e.currentTarget.value);
   }
}

function onChange() {
   emit('update:error', false);
}
</script>
<template inherit-attrs="false">
   <div class="input-wrapper">
      <input
         @input="onInput"
         @change="onChange"
         :value="props.modelValue"
         class="_input"
         :type="type"
         v-bind="$attrs"
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
