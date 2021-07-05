<script lang="ts" setup>
import { defineProps } from 'vue';
import EntryVue from '/src/components/Entry/Entry.vue';
import type { GetUserResponseEntries } from '/src/api/types.d';

const props = defineProps<{
   data: GetUserResponseEntries;
}>();
</script>

<template>
   <div class="home-entry">
      <div class="header">
         <RouterLink
            :to="{
               name: 'Header',
               params: {
                  id: props.data.header_id
               }
            }"
         >
            {{ props.data.header_name }}
         </RouterLink>
      </div>
      <EntryVue :entryData="props.data.entry" />
   </div>
</template>

<style lang="scss" scoped>
.home-entry {
   margin-bottom: funcs.padding(5);
   text-align: left;
}
.header {
   padding: funcs.padding(1) funcs.padding(2);
   background-color: colors.$turq;
   color: colors.$primary;
   border-radius: vars.$radius;
   display: inline-block;
   margin-bottom: funcs.padding(1.5);
   font-size: vars.$headerFontSize;
   * {
      color: inherit;
      text-decoration: inherit;
      &:visited {
         color: inherit;
      }
   }
}
</style>
