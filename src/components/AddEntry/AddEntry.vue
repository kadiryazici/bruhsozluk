<script lang="ts" setup>
import { defineEmit, defineProps } from 'vue';
import type { Colors } from '/src/components/Button/Button.vue';

const props = defineProps<{
   modelValue: string;
   hideSend?: boolean;
   loading?: boolean;
}>();

const emit = defineEmit({
   'update:modelValue': (value: string) => true,
   send: () => true
});

const RegularButton = {
   textColor: 'secondary' as Colors,
   color: 'tertiary' as Colors,
   class: 'regular-button',
   size: '13px'
};

function handleInput(e: Event) {
   const target = e.currentTarget as HTMLTextAreaElement;
   emit('update:modelValue', target.value);
}
</script>

<template>
   <div class="_add_entry">
      <div class="_buttons">
         <VButton v-bind="RegularButton">bknz</VButton>
         <VButton v-bind="RegularButton">link</VButton>
         <VButton v-bind="RegularButton">spoiler</VButton>

         <VButton
            @click="emit('send')"
            class="send-button"
            :textColor="'primary'"
            :color="'turq'"
            size="13px"
            :loading="loading"
            v-if="!hideSend"
            >gönder</VButton
         >
      </div>
      <div class="_body">
         <textarea
            :value="props.modelValue"
            @input="handleInput"
            class="textarea"
         ></textarea>
      </div>
   </div>
</template>

<style lang="scss" scoped>
._add_entry {
   background-color: colors.$primary;
   border: 5px solid colors.$tertiary;
   border-radius: vars.$radius;

   ._buttons {
      width: 100%;
      padding: funcs.padding(3) funcs.padding(2);
      display: flex;

      .regular-button {
         margin-right: funcs.padding(1);
      }

      * {
         font-size: 14px;
      }

      .send-button {
         margin-left: auto;
      }
   }

   ._body {
      height: 300px;
      max-height: 350px;
      overflow: auto;
      width: 100%;
      border-top: 3px solid colors.$tertiary;
      display: flex;
      align-items: stretch;

      .textarea {
         padding: funcs.padding(2);
         border-radius: vars.$radius;
         background-color: transparent;
         width: 100% !important;
         height: 100% !important;
         box-sizing: border-box;
         font-size: 16px;
         color: colors.$secondary;
         resize: none;
         border: none;
         &:focus {
            outline: none;
         }
      }
   }
}
</style>
