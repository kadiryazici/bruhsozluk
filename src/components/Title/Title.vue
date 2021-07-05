<script lang="ts" setup>
interface Props {
   seperator?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
   seperator: false
});
</script>

<template inherit-attrs="false">
   <div class="_title">
      <div class="_body">
         <div class="_title-icon">
            <slot name="icon" />
         </div>
         <div class="_title-body">
            <slot />
         </div>
      </div>
      <div v-if="seperator" class="seperator"></div>
   </div>
</template>

<style lang="scss" scoped>
._title {
   display: flex;
   align-items: center;
   flex-direction: row;
   flex-wrap: wrap;

   ._body {
      display: flex;
      flex-flow: row nowrap;
      ._title-icon {
         display: inline;
         flex-shrink: 1;
         flex-grow: 0;
         align-self: center;
         margin-right: funcs.padding(2);
         &,
         & * {
            font-size: 35px;
         }
      }

      ._title-body {
         width: 100%;
         flex-grow: 1;
         align-items: center;
         display: inline-flex;
         &,
         & * {
            font-size: 25px;
         }
      }
   }

   .seperator {
      height: 1px;
      background-color: darken(colors.$secondary, 75%);
      width: 100%;
      margin-top: funcs.padding(1);
   }
}
</style>
