<script lang="ts" setup>
import { computed } from 'vue';
import type { Colors } from '/src/components/Button/Button.vue';

interface Props {
   text: string;
   iconName?: string;
}
const props = withDefaults(defineProps<Props>(), {
   iconName: 'help'
});

const emit = defineEmits<{
   (event: 'deny'): void;
   (event: 'accept'): void;
}>();

//#region Button Props
ref: acceptButton = computed(() => ({
   textColor: 'lime' as Colors,
   color: 'lime' as Colors,
   bordered: true,
   onClick: () => {
      emit('accept');
   }
}));
ref: denyButton = computed(() => ({
   textColor: 'ruby' as Colors,
   color: 'ruby' as Colors,
   bordered: true,
   onClick: () => {
      emit('deny');
   }
}));
//#endregion
</script>

<template>
   <div class="_confirm">
      <div class="_type">
         <Icon :name="props.iconName" />
      </div>
      <div class="_body">
         <div class="_text">
            {{ props.text }}
         </div>
         <div class="_buttons">
            <VButton v-bind="acceptButton">
               <Icon class="_icon" name="done" />
               evet
            </VButton>
            <span class="seperator"></span>
            <VButton v-bind="denyButton">
               <Icon class="_icon" name="close" />
               hayır
            </VButton>
         </div>
      </div>
   </div>
</template>

<style lang="scss" scoped>
._confirm {
   display: flex;
   width: 400px;
   min-height: 250px;
   flex-flow: column nowrap;
   background-color: colors.$primary;
   overflow: hidden;
   border-radius: vars.$radius;

   ._type {
      width: 100%;
      height: 100px;
      background-color: colors.$turq;
      display: flex;
      align-items: center;
      justify-content: center;
      * {
         font-size: 50px;
         color: colors.$secondary;
         text-shadow: vars.$shadowDarkDownText;
      }
   }

   ._body {
      height: 100%;
      width: 100%;
      flex: 1;
      padding: funcs.padding(3);
      display: flex;
      flex-flow: row wrap;
   }

   ._text {
      width: 100%;
      font-size: 19px;
      text-align: center;
      color: colors.$secondary;
   }

   ._buttons {
      width: 100%;
      align-self: flex-end;
      justify-content: center;
      display: flex;

      ._icon {
         margin-right: funcs.padding(2);
      }
      .seperator {
         width: funcs.padding(2);
         display: inline-block;
         height: 10px;
      }
   }
}
</style>
